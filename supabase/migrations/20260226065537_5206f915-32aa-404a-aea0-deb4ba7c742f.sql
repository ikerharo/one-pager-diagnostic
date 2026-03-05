-- Restrict update to only allow changing status to 'aceptada' and setting acceptance fields
DROP POLICY "Allow public update" ON public.proposals;

CREATE POLICY "Allow acceptance update" ON public.proposals FOR UPDATE TO anon
  USING (status = 'revision')
  WITH CHECK (status = 'aceptada');
