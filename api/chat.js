export default async function handler(req, res) {
  try {
    console.log("FUNCTION HIT OK");

    const { message } = req.body;

    console.log("MESSAGE:", message);

    const key = process.env.GEMINI_API_KEY;

    console.log("API KEY:", key);

    return res.status(200).json({
      reply: "DEBUG OK - API HIT SUCCESS"
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      reply: "ERROR IN FUNCTION"
    });
  }
}
