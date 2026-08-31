/*
# Create project enquiries table

1. New Tables
- `project_enquiries` stores project enquiry submissions received from the public website.
- `id` uniquely identifies each enquiry.
- `name`, `phone`, `email` store the visitor's contact details.
- `project_type`, `project_location`, `budget`, `message` store the requested project information.
- `created_at` records when the enquiry was received.

2. Security
- Row level security is enabled.
- All four public CRUD policies explicitly deny direct browser access.
- The server function uses the service role to store submissions after validation.

3. Important Notes
- Enquiries are private business data and are not exposed through the public data API.
- Email delivery is handled separately by the server function through Resend.
*/

CREATE TABLE IF NOT EXISTS public.project_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  project_type text NOT NULL,
  project_location text NOT NULL,
  budget text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.project_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "deny_public_select_project_enquiries" ON public.project_enquiries;
CREATE POLICY "deny_public_select_project_enquiries" ON public.project_enquiries FOR SELECT
  TO anon, authenticated USING (false);

DROP POLICY IF EXISTS "deny_public_insert_project_enquiries" ON public.project_enquiries;
CREATE POLICY "deny_public_insert_project_enquiries" ON public.project_enquiries FOR INSERT
  TO anon, authenticated WITH CHECK (false);

DROP POLICY IF EXISTS "deny_public_update_project_enquiries" ON public.project_enquiries;
CREATE POLICY "deny_public_update_project_enquiries" ON public.project_enquiries FOR UPDATE
  TO anon, authenticated USING (false) WITH CHECK (false);

DROP POLICY IF EXISTS "deny_public_delete_project_enquiries" ON public.project_enquiries;
CREATE POLICY "deny_public_delete_project_enquiries" ON public.project_enquiries FOR DELETE
  TO anon, authenticated USING (false);
