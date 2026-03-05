CREATE TABLE public.proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL DEFAULT '[CLIENTE]',
  status TEXT NOT NULL DEFAULT 'revision',
  accepted_by TEXT,
  accepted_role TEXT,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- No RLS needed - this is a public-facing proposal page
ALTER TABLE public.proposals DISABLE ROW LEVEL SECURITY;

-- Insert default proposal in review status
INSERT INTO public.proposals (client_name, status) VALUES ('[CLIENTE]', 'revision');
