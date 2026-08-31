const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
}

const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" }
const requiredFields = ['name', 'phone', 'email', 'projectType', 'projectLocation', 'budget', 'message'] as const

type Enquiry = Record<(typeof requiredFields)[number], string>

function response(body: Record<string, string>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders })
}

function isEnquiry(value: unknown): value is Enquiry {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return requiredFields.every((field) => typeof record[field] === 'string' && record[field].trim().length > 0)
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers: corsHeaders })
  if (req.method !== 'POST') return response({ error: 'Method not allowed' }, 405)

  try {
    const payload: unknown = await req.json()
    if (!isEnquiry(payload)) return response({ error: 'Please complete all required fields.' }, 400)

    const enquiry = Object.fromEntries(requiredFields.map((field) => [field, payload[field].trim()])) as Enquiry
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) return response({ error: 'Please provide a valid email address.' }, 400)
    if (requiredFields.some((field) => enquiry[field].length > 2000)) return response({ error: 'One or more fields are too long.' }, 400)

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    const resendFromEmail = Deno.env.get('RESEND_FROM_EMAIL')
    if (!supabaseUrl || !serviceRoleKey || !resendApiKey || !resendFromEmail) {
      console.error('Required server configuration is missing')
      return response({ error: 'Enquiry service is not configured.' }, 503)
    }

    const stored = await fetch(`${supabaseUrl}/rest/v1/project_enquiries`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(enquiry),
    })
    if (!stored.ok) {
      console.error('Could not store project enquiry', stored.status)
      return response({ error: 'Could not process your enquiry.' }, 500)
    }

    const emailBody = [
      'PROJECT ENQUIRY',
      '',
      `Name: ${enquiry.name}`,
      `Phone: ${enquiry.phone}`,
      `Email: ${enquiry.email}`,
      `Project Type: ${enquiry.projectType}`,
      `Project Location: ${enquiry.projectLocation}`,
      `Approximate Budget: ${enquiry.budget}`,
      `Project Details: ${enquiry.message}`,
    ].join('\n')

    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: ['cozyhavenstudio9@gmail.com'],
        reply_to: enquiry.email,
        subject: `Project Enquiry from ${enquiry.name}`,
        text: emailBody,
      }),
    })
    if (!sent.ok) {
      console.error('Could not send project enquiry email', sent.status)
      return response({ error: 'Could not send your enquiry.' }, 502)
    }

    return response({ message: 'Enquiry sent successfully.' })
  } catch (error) {
    console.error('Project enquiry failed', error)
    return response({ error: 'Could not send your enquiry.' }, 500)
  }
})
