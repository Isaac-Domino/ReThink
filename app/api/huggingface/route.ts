import { HfInference} from '@huggingface/inference'
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { createReadStream } from 'fs';


const HF_ACCESS_TOKEN="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";
const hf = new HfInference(HF_ACCESS_TOKEN);

export async function POST(req: NextApiRequest, res: NextApiResponse) {   
    const { upload } = req.body;

    const filePath = upload;
    const imageStream = createReadStream(filePath);

    // Read the image data from the stream
    const imageBuffer = fs.readFileSync(filePath);
   
    const docmodel = await hf.documentQuestionAnswering({
        model: "impira/layoutlm-document-qa",
        inputs: {
            image: upload,
            question: "What is the due date?"
        }
    })

   res.status(200).json({
     dataAnswer: docmodel.answer 
   })
}