import { OpenAIApi, Configuration } from "openai-edge";
import { HfInference } from "@huggingface/inference";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    const result = await response.json();
    console.log("OpenAI API response:", result);

    if (result && result.data && result.data.length > 0) {
        return result.data[0].embedding as number[];
    }
    else {
        throw new Error("Unexpected response format from OpenAI API");
      }
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}



const hf = new HfInference(process.env.HF_ACCESS_TOKEN)
export async function getEmbeddingsFromHG(text: string) {
    try {
       const embed = await hf.featureExtraction({
         model: "sentence-transformers/all-MiniLM-L6-v2",
         inputs: text
       })

        console.log("EMBEDDED TEXT: ", embed);
        return embed;
    }
    catch(error) {
       console.log("Something went wrong");
       throw error;
    }
}