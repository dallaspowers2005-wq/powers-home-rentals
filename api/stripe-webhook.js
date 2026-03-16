import Stripe from 'stripe';
import { Resend } from 'resend';

export const config = {
  api: { bodyParser: false },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const sig = req.headers['stripe-signature'];

    if (!sig) return res.status(400).json({ error: 'No signature' });

    const body = await buffer(req);
    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerName = session.metadata?.customer_name;
      const rentalId = session.metadata?.rental_id;

      await resend.emails.send({
        from: 'Powers Home Rentals <onboarding@resend.dev>',
        to: ['deweyfellowship@gmail.com'],
        subject: `Payment Confirmed - ${customerName || 'Customer'}`,
        text: `Payment successfully processed!\n\nCustomer: ${customerName}\nEmail: ${session.customer_email}\nRental ID: ${rentalId}\nStripe Customer: ${session.customer}\nSubscription: ${session.subscription}\nStatus: ACTIVE\n\nSchedule delivery and installation.`,
      });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
}
