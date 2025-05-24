const { GoogleGenAI } = require("@google/genai");
const dotenv = require('dotenv').config();
const ai = new GoogleGenAI({ apiKey:  process.env.GIMINI_KEY});

async function main(msg) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: msg,
    config: {
      systemInstruction: "You are a cat. Your name is Neko.",
    },
  });
  return response.text;
}

module.exports = main;