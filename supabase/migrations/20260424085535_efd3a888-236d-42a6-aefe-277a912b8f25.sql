-- Briefs table
CREATE TABLE public.customization_briefs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  industry TEXT NOT NULL,
  workflows TEXT NOT NULL,
  timeline TEXT NOT NULL,
  budget TEXT NOT NULL,
  product_name TEXT,
  product_id TEXT,
  attachment_url TEXT,
  attachment_name TEXT,
  attachment_size BIGINT,
  attachment_type TEXT,
  source TEXT NOT NULL DEFAULT 'customization_brief',
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.customization_briefs ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a brief
CREATE POLICY "Anyone can insert briefs"
ON public.customization_briefs
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can read (tighten further to admin role later if needed)
CREATE POLICY "Authenticated can read briefs"
ON public.customization_briefs
FOR SELECT
TO authenticated
USING (true);

CREATE INDEX idx_customization_briefs_created_at ON public.customization_briefs(created_at DESC);

-- Storage bucket for attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('brief-attachments', 'brief-attachments', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read brief attachments"
ON storage.objects
FOR SELECT
USING (bucket_id = 'brief-attachments');

CREATE POLICY "Anyone can upload brief attachments"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'brief-attachments');