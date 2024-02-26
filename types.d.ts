import { XataArrayFile } from "@xata.io/client"

export type savedDataDbType  = {
    document: XataArrayFile[] | null | undefined; 
    file_link: string | null | undefined;
    id: string;
    name: string;
    number_of_documents: number;
    number_of_questions: number;
    user_id: string;
    document_vector: number[];
    xata: {
      createdAt: Date;
      updatedAt: Date;
      version: number;
    };
} 