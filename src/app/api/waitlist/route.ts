import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Store in Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, created_at: new Date().toISOString() }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return Response.json({ error: 'Failed to save email' }, { status: 500 })
    }

    // Send email notification to Anthony
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Artist OS <noreply@artistos.vercel.app>',
          to: 'absoluteishere@gmail.com',
          subject: `🎯 New Waitlist Signup: ${email}`,
          html: `
            <h2>New Waitlist Signup</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p>Check your Telegram for the live notification.</p>
          `,
        }),
      })
    } catch (emailError) {
      console.error('Email send error:', emailError)
      // Don't fail the request if email fails
    }

    return Response.json({ success: true, email })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
