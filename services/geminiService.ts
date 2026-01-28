
import { GoogleGenAI, Type } from "@google/genai";
import { VocabularyItem, QuizQuestion } from "../types";

export const extractVocabularyFromImage = async (base64Image: string): Promise<VocabularyItem[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image.split(',')[1],
          },
        },
        {
          text: "Ushbu rasmdagi barcha so'z va iboralarni (vocabulary) aniqlang. Har bir so'z uchun uning o'zbek tilidagi tarjimasini, qisqa ta'rifini va bitta misol gapni yozing. Natijani JSON formatida qaytaring.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING, description: 'The original word or phrase found in the image' },
            translation: { type: Type.STRING, description: 'Uzbek translation' },
            definition: { type: Type.STRING, description: 'Short English definition' },
            example: { type: Type.STRING, description: 'Example sentence in English' },
          },
          required: ['word', 'translation', 'definition', 'example'],
        },
      },
    },
  });

  const rawText = response.text;
  const items: any[] = JSON.parse(rawText);
  
  return items.map((item, index) => ({
    ...item,
    id: `item-${Date.now()}-${index}`,
  }));
};

export const generateQuizQuestions = async (items: VocabularyItem[]): Promise<QuizQuestion[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const vocabText = items.map(i => `${i.word}: ${i.translation}`).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Mana bu so'zlar ro'yxati asosida 5-10 ta test savollari yarating. Savollar asosan so'zlarning ma'nosi yoki tarjimasini tekshirishi kerak. Natijani JSON formatida qaytaring.\n\n${vocabText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Must contain 4 options including the correct one'
            },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING },
          },
          required: ['question', 'options', 'correctAnswer', 'explanation'],
        },
      },
    },
  });

  const rawText = response.text;
  const questions: any[] = JSON.parse(rawText);
  
  return questions.map((q, index) => ({
    ...q,
    id: `q-${Date.now()}-${index}`,
  }));
};
