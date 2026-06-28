export default async function handler(req, res) {
  try {

    const { message } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("FULL RESPONSE:", JSON.stringify(data));

    // 🔥 SAFE EXTRACTION (IMPORTANT FIX)
    let reply = "No response from AI";

    if (data && data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content;

      if (content && content.parts && content.parts.length > 0) {
        reply = content.parts[0].text;
      }
    }

    return res.status(200).json({ reply });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      reply: "Server Error"
    });
  }
}
