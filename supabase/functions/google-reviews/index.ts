const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_PLACES_API_KEY')
const PLACE_QUERY = 'Octorlink Eunápolis'
const GOOGLE_LANGUAGE = 'pt-BR'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (!GOOGLE_API_KEY) {
    return new Response(JSON.stringify({ error: 'Google API key not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const searchUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
    searchUrl.searchParams.set('query', PLACE_QUERY)
    searchUrl.searchParams.set('language', GOOGLE_LANGUAGE)
    searchUrl.searchParams.set('key', GOOGLE_API_KEY)

    const searchRes = await fetch(searchUrl.toString())

    if (!searchRes.ok) {
      const errorData = await searchRes.text()
      throw new Error(`Places search failed [${searchRes.status}]: ${errorData}`)
    }

    const searchData = await searchRes.json()
    if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
      throw new Error(`Places text search failed [${searchData.status}]: ${searchData.error_message || 'Unknown error'}`)
    }

    const place = searchData.results?.[0]

    if (!place) {
      return new Response(JSON.stringify({ reviews: [], rating: 0, totalReviews: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const detailsUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    detailsUrl.searchParams.set('place_id', place.place_id)
    detailsUrl.searchParams.set('fields', 'name,rating,user_ratings_total,reviews')
    detailsUrl.searchParams.set('reviews_sort', 'newest')
    detailsUrl.searchParams.set('language', GOOGLE_LANGUAGE)
    detailsUrl.searchParams.set('key', GOOGLE_API_KEY)

    const detailsRes = await fetch(detailsUrl.toString())

    if (!detailsRes.ok) {
      const errorData = await detailsRes.text()
      throw new Error(`Place details failed [${detailsRes.status}]: ${errorData}`)
    }

    const detailsData = await detailsRes.json()
    if (detailsData.status !== 'OK') {
      throw new Error(`Place details failed [${detailsData.status}]: ${detailsData.error_message || 'Unknown error'}`)
    }

    const placeDetails = detailsData.result

    const reviews = (placeDetails.reviews || []).map((r: any) => ({
      author: r.author_name || 'Cliente',
      photoUrl: r.profile_photo_url || null,
      rating: r.rating || 5,
      text: r.text || '',
      time: r.relative_time_description || '',
    }))

    return new Response(JSON.stringify({
      reviews,
      rating: placeDetails.rating || 0,
      totalReviews: placeDetails.user_ratings_total || 0,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: unknown) {
    console.error('Error fetching Google reviews:', error)
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
