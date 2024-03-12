import { XataArrayFile } from "@xata.io/client"

export type savedDataDbType  = {
    id: string,
    name: string,
    document: XataArrayFile[] | null | undefined,
    thumbnail_url: string | null,
    file_link: string | null | undefined,
    file_key: string | null,
    user_id: string,
    document_vector: number[],
    xata: {
      createdAt: string,
      updatedAt: string,
      version: number,
    };
} 