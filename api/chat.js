export default function handler(req, res) {
  return res.status(200).json({
    reply: process.env.GEMINI_API_KEY || "KEY NOT FOUND"
  });
}
