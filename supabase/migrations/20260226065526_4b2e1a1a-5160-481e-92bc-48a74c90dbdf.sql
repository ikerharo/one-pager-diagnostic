ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read proposals (public-facing)
CREATE POLICY "Allow public read" ON public.proposals FOR SELECT TO anon USING (true);

-- Allow anyone to update status (for acceptance)
CREATE POLICY "Allow public update" ON public.proposals FOR UPDATE TO anon USING (true) WITH CHECK (true);
