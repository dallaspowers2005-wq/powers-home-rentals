import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { to, from_name, subject, body } = req.body;

    const { data, error } = await resend.emails.send({
      from: `${from_name} <onboarding@resend.dev>`,
      to: [to],
      subject,
      text: body,
    });

    if (error) throw new Error(error.message);
    res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: error.message });
  }
}
