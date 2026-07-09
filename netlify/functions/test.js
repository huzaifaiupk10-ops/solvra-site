const https = require('https');

function callGroq(apiKey) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'llama3-8b-8192',
      max_tokens: 50,
      messages: [
        { role: 'user', content: 'Say hello in one word.' }
      ]
    });
    const options = {
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json',
        'content-length': Buffer.byteLength(body)
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

exports.handler = async function (event) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { statusCode: 200, body: JSON.stringify({ error: 'GROQ_API_KEY not set' }) };
  }

  try {
    const result = await callGroq(apiKey);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: result.status, response: result.body })
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: err.message })
    };
  }
};
