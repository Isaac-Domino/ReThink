import { pipeline } from '@xenova/transformers'


export async function documentResponse() {
    const pipe = await pipeline('document-question-answering', "impira/layoutlm-document-qa");

    let result = await pipe("/Logo.png", "whats the color of logo?");
    console.log(result);  // Outputs
     
}