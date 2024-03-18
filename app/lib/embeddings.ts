import { HfInference } from "@huggingface/inference";
import { OpenAIApi, Configuration } from "openai-edge";

export const runtime = 'edge';
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);


/*export async function transformers (text: string) {
   
   const generateEmbeddings = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

   try {
    const result = await generateEmbeddings(text, {
      pooling: "mean",
      normalize: true
     })

     console.log("EMBEDDED TEXT: ", result.data);
      return result.data as number[];
   } catch (error) {
      console.log("Error", error)
      throw error;
   }
}
*/
//HUGGINGFACE INFERENCE 
export async function getEmbeddingsFromHG(text: string) {
    try {
       const embed = await hf.featureExtraction({
         model: "sentence-transformers/all-MiniLM-L6-v2",
         inputs: text.replace(/\n/g, " ")
       })

        console.log("EMBEDDED TEXT: ", embed);
        return embed as number[];
    }
    catch(error) {
       console.log("Something went wrong");
       throw error;
    }
}



const config = new Configuration({
   apiKey: process.env.OPENAI_API_KEY_2,
 });
 
 const openai = new OpenAIApi(config);
 
 export async function getEmbeddings(text: string) {
   try {
     const response = await openai.createEmbedding({
       model: "text-embedding-ada-002",
       input: text.replace(/\n/g, " "),
     });
     const result = await response.json();
     console.log('RESULT FROM AI: ', result)
     return result.data[0].embedding as number[];
   } catch (error) {
     console.log("error calling openai embeddings api", error);
     throw error;
   }
}