module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed." });
  }

  const prompt = typeof request.body?.prompt === "string" ? request.body.prompt.trim() : "";
  if (!prompt || prompt.length > 10000) {
    return response.status(400).json({ error: "Enter a question up to 10,000 characters." });
  }

  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: "The Sarvam API key is not configured on the server." });
  }

  try {
    const sarvamResponse = await fetch("https://api.sarvam.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": apiKey
      },
      body: JSON.stringify({
        model: "sarvam-105b-conversations",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await sarvamResponse.json();
    if (!sarvamResponse.ok) {
      return response.status(502).json({ error: "Sarvam could not answer right now. Please try again." });
    }

    const answer = data.choices?.[0]?.message?.content;
    if (typeof answer !== "string" || !answer.trim()) {
      return response.status(502).json({ error: "Sarvam returned an empty answer. Please try again." });
    }

    return response.status(200).json({ answer });
  } catch {
    return response.status(502).json({ error: "Could not reach Sarvam. Please try again." });
  }
};
