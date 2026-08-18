CREATE TABLE public.inquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kind text NOT NULL CHECK (kind IN ('contact', 'valuation', 'construction')),
  reference text NOT NULL UNIQUE,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  service text,
  message text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.inquiries TO service_role;

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE INDEX inquiries_created_at_idx ON public.inquiries (created_at DESC);