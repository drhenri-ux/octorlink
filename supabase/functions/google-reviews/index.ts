import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_PLACES_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const PLACE_QUERY = 'Octorlink Eunápolis'
const GOOGLE_LANGUAGE = 'pt-BR'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  try {
    // 1. Try to fetch fresh reviews from Google and cache them
    if (GOOGLE_API_KEY) {
      try {
        const searchUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
        searchUrl.searchParams.set('query', PLACE_QUERY)
        searchUrl.searchParams.set('language', GOOGLE_LANGUAGE)
        searchUrl.searchParams.set('key', GOOGLE_API_KEY)

        const searchRes = await fetch(searchUrl.toString())
        const searchData = await searchRes.json()
        const place = searchData.results?.[0]

        if (place) {
          const detailsUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json')
          detailsUrl.searchParams.set('place_id', place.place_id)
          detailsUrl.searchParams.set('fields', 'name,rating,user_ratings_total,reviews')
          detailsUrl.searchParams.set('reviews_sort', 'newest')
          detailsUrl.searchParams.set('language', GOOGLE_LANGUAGE)
          detailsUrl.searchParams.set('key', GOOGLE_API_KEY)

          const detailsRes = await fetch(detailsUrl.toString())
          const detailsData = await detailsRes.json()

          if (detailsData.status === 'OK') {
            const placeDetails = detailsData.result
            const googleReviews = (placeDetails.reviews || [])
              .filter((r: any) => r.text && r.text.trim().length > 0)

            // Upsert reviews into cache table
            for (const r of googleReviews) {
              await supabase.from('google_reviews').upsert({
                author: r.author_name || 'Cliente',
                photo_url: r.profile_photo_url || null,
                rating: r.rating || 5,
                review_text: r.text,
                time_description: r.relative_time_description || '',
                google_author_name: r.author_name || 'unknown',
              }, { onConflict: 'google_author_name,review_text' })
            }

            // Update overall rating info
            var overallRating = placeDetails.rating || 0
            var totalReviews = placeDetails.user_ratings_total || 0
          }
        }
      } catch (googleErr) {
        console.warn('Google API fetch failed, using cache:', googleErr)
      }
    }

    // 2. Return cached 5-star reviews from DB
    const { data: cachedReviews, error: dbError } = await supabase
      .from('google_reviews')
      .select('*')
      .eq('rating', 5)
      .order('created_at', { ascending: false })
      .limit(8)

    if (dbError) throw dbError

    const reviews = (cachedReviews || []).map((r: any) => ({
      author: r.author,
      photoUrl: r.photo_url,
      rating: r.rating,
      text: r.review_text,
      time: r.time_description || '',
    }))

    return new Response(JSON.stringify({
      reviews,
      rating: typeof overallRating !== 'undefined' ? overallRating : 5,
      totalReviews: typeof totalReviews !== 'undefined' ? totalReviews : 0,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: unknown) {
    console.error('Error:', error)
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
