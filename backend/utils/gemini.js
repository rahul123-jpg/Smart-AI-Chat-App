import "dotenv/config";

const MODEL = "models/gemini-2.5-flash";
const API_KEY = process.env.GEMINI_API_KEY;
const geminiAPIResponse = async (message) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await response.json();

    // 🛑 QUOTA / BLOCK / EMPTY RESPONSE HANDLE
    if (data.error) {
      console.log("Gemini API error:", data.error.message);
      return "⚠️ Gemini quota exceeded. Please wait 1 minute and try again.";
    }

    if (
      !data.candidates ||
      !Array.isArray(data.candidates) ||
      data.candidates.length === 0 ||
      !data.candidates[0]?.content?.parts?.length
    ) {
      console.log("Gemini invalid response:", data);
      return "⚠️ Gemini did not return any response.";
    }

    return data.candidates[0].content.parts[0].text;

  } catch (err) {
    console.log("Gemini fetch error:", err);
    return "⚠️ Gemini server error.";
  }
};
export default geminiAPIResponse;

