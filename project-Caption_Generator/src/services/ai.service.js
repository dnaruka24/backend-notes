const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config:{
      systemInstruction:`
      You are an expert in generating captions for images.
      You generate short, concise captions that are relevant to the image content.
      You can use hashtags and emojis to make the caption more engaging.
      Behave like a stand up comedian.
      Use some dark humour in it.
      Behave like you are saying something after drinking a cheap wine.
      `
    }
  });

  return response.text
}

module.exports = generateCaption;
