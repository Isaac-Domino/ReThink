import { HfInference } from '@huggingface/inference'
import { HuggingFaceStream,  StreamingTextResponse } from 'ai'
import { experimental_buildLlama2Prompt, experimental_buildOpenAssistantPrompt, experimental_buildStarChatBetaPrompt,  } from 'ai/prompts'
import { getContext } from '@/lib/context';
import { Message } from 'ai/react';

const Hf = new HfInference(process.env.HF_ACCESS_TOKEN);

export const runtime = 'edge';


export async function POST(req: Request) {
   const { messages, fileKey } = await req.json();

   try {
    const lastMessage = messages[messages.length - 1];
    const context = await getContext(lastMessage.content, fileKey);

   
    console.log("MESSAGE", messages);
    console.log("LAST MESSAGE", lastMessage);
    console.log("CONTEXT", context)

   /* const prompt = {
      role: "assistant",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of Pinecone and Vercel.
      START CONTEXT BLOCK
       ${context}
      END OF CONTEXT BLOCK
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      `,
    }; */

  /*  const questionAnswer = await Hf.questionAnswering({
      model: 'deepset/roberta-base-squad2',
      inputs: {
        question: messages,
        context: context
      },
        
    }) */  
    
    const PromptOpenAssistant = `
     <|im_start|>system
     You are a Computer Technician Assistant, answer only about computer related.<|im_end|>
     <|im_start|>${lastMessage}<|im_end|>
     <|im_start|>assistant
    `

    const LlamaContext = `
         <s>[INST] <<SYS>>
          You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.
         If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.
        <</SYS>>${messages} [/INST]`

      const response = Hf.textGenerationStream({
      model: 'OpenAssistant/codellama-13b-oasst-sft-v10',
      //inputs: experimental_buildOpenAssistantPrompt([prompt, ...messages.filter((message: Message) => message.role === "user")]),
      //inputs: experimental_buildOpenAssistantPrompt(messages),
      inputs: experimental_buildOpenAssistantPrompt([PromptOpenAssistant, ...messages.filter((message: Message) => message.role === "user")]),
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


