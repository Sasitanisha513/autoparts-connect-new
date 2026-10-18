const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "කරුණාකර පණිවිඩයක් ඇතුළත් කරන්න.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",

      contents: `
You are AutoParts AI Assistant for AutoParts Connect,
an online auto parts marketplace.

Help customers with:
- Auto parts
- Vehicle compatibility
- New and reconditioned parts
- Part prices
- Suppliers
- Ordering
- Cart and checkout
- Pickup orders
- General AutoParts Connect questions

Give simple, friendly and helpful answers.

IMPORTANT RESPONSE RULES:
- Keep your answers short and concise.
- Usually answer in 1-3 short sentences.
- Do not give long explanations unless the customer asks for details.
- Do not list all available services unless the customer asks.
- For simple greetings such as "hello", "hi", or "hey", give only a short friendly greeting and ask how you can help.
- Answer only what the customer asks.
- Do not repeat unnecessary information.
- Use simple English that customers can easily understand.

If you are not sure about a specific product price,
availability, or vehicle compatibility, do not make up information.

Tell the customer to check the relevant product details
in AutoParts Connect.

Customer message:
${message}
      `,
    });

    res.json({
      reply: response.text || "Sorry, I could not generate a response.",
    });
  } catch (error) {
    console.error("Gemini Chatbot Error:", error);

    res.status(500).json({
      reply:
        "සමාවන්න, මේ අවස්ථාවේ AI Assistant වෙත සම්බන්ධ වීමට නොහැක.",
    });
  }
});

module.exports = router;