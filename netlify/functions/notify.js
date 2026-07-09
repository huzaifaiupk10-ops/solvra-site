exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    // Notify not configured — form still saved to Netlify Forms, just no email
    return { statusCode: 200, body: JSON.stringify({ ok: true, note: 'Email notifications not configured' }) };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const firstName = (data['first-name'] || '').trim();
  const lastName  = (data['last-name']  || '').trim();
  const email     = (data['email']      || '').trim();
  const company   = (data['company']    || 'Not provided').trim();
  const service   = (data['service']    || 'Not specified').trim();
  const message   = (data['message']    || '').trim();

  if (!email || !message) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:sans-serif">
  <div style="max-width:580px;margin:40px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
    <div style="background:#0D0B09;padding:28px 32px;border-bottom:2px solid #C4965A">
      <p style="margin:0;font-family:serif;font-size:20px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#F0EBE0">SOLVRA</p>
      <p style="margin:6px 0 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C4965A">New Lead</p>
    </div>
    <div style="padding:32px">
      <table style="width:100%;border-collapse:collapse">
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:10px 0;color:#888;font-size:13px;width:100px">Name</td>
          <td style="padding:10px 0;font-size:14px;font-weight:600;color:#111">${firstName} ${lastName}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:10px 0;color:#888;font-size:13px">Email</td>
          <td style="padding:10px 0"><a href="mailto:${email}" style="color:#C4965A;font-size:14px;text-decoration:none">${email}</a></td>
        </tr>
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:10px 0;color:#888;font-size:13px">Company</td>
          <td style="padding:10px 0;font-size:14px;color:#333">${company}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:10px 0;color:#888;font-size:13px">Service</td>
          <td style="padding:10px 0;font-size:14px;color:#333">${service}</td>
        </tr>
      </table>
      <div style="margin-top:24px;padding:20px;background:#fafafa;border-left:3px solid #C4965A;border-radius:0 6px 6px 0">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999">Message</p>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#333">${message.replace(/\n/g, '<br>')}</p>
      </div>
      <div style="margin-top:28px;text-align:center">
        <a href="mailto:${email}?subject=Re: Your SOLVRA inquiry" style="display:inline-block;background:#C4965A;color:#fff;text-decoration:none;padding:12px 28px;border-radius:4px;font-size:13px;letter-spacing:1px;text-transform:uppercase">Reply to ${firstName}</a>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f9f9f9;border-top:1px solid #eee">
      <p style="margin:0;font-size:11px;color:#aaa;text-align:center">Submitted via solvradev.com</p>
    </div>
  </div>
</body>
</html>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `SOLVRA Leads <${senderEmail}>`,
        to: ['huzaifaiupk10@gmail.com'],
        reply_to: email,
        subject: `New inquiry: ${firstName} ${lastName} — ${service}`,
        html
      })
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', res.status, err);
      throw new Error('Email send failed');
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('Notify error:', err.message);
    // Don't expose internal errors — the form was already saved to Netlify Forms
    return { statusCode: 200, body: JSON.stringify({ ok: true, note: 'Email failed silently' }) };
  }
};
