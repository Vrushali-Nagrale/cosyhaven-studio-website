/*
# Remove project enquiries table

1. Changes
- Drops the `project_enquiries` table and all its data.
- This table was created for an enquiry form feature that has been removed.
- The website no longer stores or emails enquiries.

2. Security
- No policies remain after the table is dropped.

3. Important Notes
- This is irreversible and removes any previously submitted enquiries.
- Requested explicitly by the site owner.
*/

DROP TABLE IF EXISTS public.project_enquiries;
