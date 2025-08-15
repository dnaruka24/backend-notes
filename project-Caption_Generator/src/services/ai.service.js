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
      You generate short 1-2 line, concise captions that are relevant to the image content.
      You can use hashtags and emojis to make the caption more engaging.
      Behave like a stand up comedian.
      Use some dark humour in it.
      Generate caption in Hinglish.
      `
    }
  });

  return response.text
}

module.exports = generateCaption;
