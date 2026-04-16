CREATE TABLE public.google_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author text NOT NULL,
  photo_url text,
  rating integer NOT NULL,
  review_text text NOT NULL,
  time_description text,
  google_author_name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(google_author_name, review_text)
);

ALTER TABLE public.google_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews são visíveis publicamente"
  ON public.google_reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role pode inserir reviews"
  ON public.google_reviews FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role pode atualizar reviews"
  ON public.google_reviews FOR UPDATE
  TO service_role
  USING (true);