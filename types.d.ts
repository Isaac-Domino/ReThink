import { XataArrayFile } from "@xata.io/client"

export type savedDataDbType  = {
    id: string;
    document: XataArrayFile[] | null | undefined; 
    file_link: string | null | undefined;
    file_key: string | null,
    name: string;
    user_id: string;
    document_vector: number[];
    xata: {
      createdAt: Date;
      updatedAt: Date;
      version: number;
    };
} 