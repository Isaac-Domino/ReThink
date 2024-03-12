import { HfInference } from '@huggingface/inference'
import { HuggingFaceStream,  StreamingTextResponse } from 'ai'
import { experimental_buildLlama2Prompt, experimental_buildOpenAssistantPrompt, experimental_buildStarChatBetaPrompt,  } from 'ai/prompts'
import { Message } from 'ai/react'
import { getContextHg } from '@/lib/context'

const Hf = new HfInference(process.env.HF_ACCESS_TOKEN);

export const runtime = 'edge';



export async function POST (req: Request) {
  const { messages, fileKey } = await req.json();

  try {
    const lastMessage = messages[messages.length - 1];
   // const context = await getContextHg(lastMessage.content, fileKey);

    const prompt = {
        role: "system",
        content: "You are a friendly chatbot who computer technician ",
    }
    
          
    const response = Hf.textGenerationStream({
        model: 'HuggingFaceH4/zephyr-7b-beta',
        //inputs: experimental_buildOpenAssistantPrompt([prompt, ...messages.filter((message: Message) => message.role === "user")]),
        //inputs: experimental_buildOpenAssistantPrompt(messages),
        inputs: messages,
        parameters: {
          max_new_tokens: 200,
          truncate: 1000,
          return_full_text: false,
          repetition_penalty: 1,
          top_k: 10,
        }
       }) 
      const stream = HuggingFaceStream(response);
      return new StreamingTextResponse(stream);
      
    
     } catch (error) {
         console.log("Error streaming", error);
         throw Error;
     }
  }
