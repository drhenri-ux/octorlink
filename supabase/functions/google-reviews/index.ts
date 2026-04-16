import { corsHeaders } from '@supabase/supabase-js/cors'

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_PLACES_API_KEY')

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
    // First, find the place
    const searchRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount,places.reviews',
      },
      body: JSON.stringify({ textQuery: 'Octorlink Eunápolis' }),
    })

    if (!searchRes.ok) {
      const errorData = await searchRes.text()
      throw new Error(`Places search failed [${searchRes.status}]: ${errorData}`)
    }

    const searchData = await searchRes.json()
    const place = searchData.places?.[0]

    if (!place) {
      return new Response(JSON.stringify({ reviews: [], rating: 0, totalReviews: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const reviews = (place.reviews || []).map((r: any) => ({
      author: r.authorAttribution?.displayName || 'Cliente',
      photoUrl: r.authorAttribution?.photoUri || null,
      rating: r.rating || 5,
      text: r.text?.text || '',
      time: r.relativePublishTimeDescription || '',
    }))

    return new Response(JSON.stringify({
      reviews,
      rating: place.rating || 0,
      totalReviews: place.userRatingCount || 0,
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
