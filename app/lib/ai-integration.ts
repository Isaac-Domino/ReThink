import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
   openAIApiKey: process.env.OPENAI_API_KEY2
});

export async function getResponse () {
    const aiChat = await chatModel.invoke("What is NextJs?");
    
    return aiChat.content;
}