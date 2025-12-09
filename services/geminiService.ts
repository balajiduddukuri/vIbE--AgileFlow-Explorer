import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { NodeData } from "../types";

// Initialize Gemini Client
// The API key is obtained from the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAIResponse = async (
  messages: { role: string; text: string }[],
  contextNode: NodeData
): Promise<string> => {
  try {
    const history = messages.map(m => 
      `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`
    ).join('\n');

    const prompt = `
      You are an expert Agile Coach and Scrum Master assistant.
      The user is asking a question about a specific step in the Agile Process Flow: "${contextNode.label}".
      
      Here is the context for this step provided in the documentation:
      - Type: ${contextNode.type}
      - Responsibility: ${contextNode.responsibility || 'Not specified'}
      - Participants: ${contextNode.participants || 'Not specified'}
      - Description: ${contextNode.description || 'Not specified'}
      - Detailed Content: ${contextNode.content || 'Not specified'}
      - Activities: ${contextNode.activities?.join(', ') || 'Not specified'}

      Current conversation history:
      ${history}

      User's latest question:
      ${messages[messages.length - 1].text}

      Provide a helpful, concise, and professional answer based on standard Agile/Scrum practices and the specific context provided above.
      If the context gives specific rules (like "DOD will be written by Dev Team"), strict adherence to that information is required.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "I apologize, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the Agile knowledge base right now. Please check your API configuration.";
  }
};