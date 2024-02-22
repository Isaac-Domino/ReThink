// Generated by Xata Codegen 0.29.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  { name: "questions", columns: [{ name: "question", type: "string" }] },
  { name: "Response", columns: [] },
  {
    name: "document",
    columns: [
      { name: "name", type: "string", notNull: true, defaultValue: "null" },
      {
        name: "number_of_questions",
        type: "int",
        notNull: true,
        defaultValue: "0",
      },
      {
        name: "number_of_documents",
        type: "int",
        notNull: true,
        defaultValue: "0",
      },
      { name: "user_id", type: "string" },
      { name: "document", type: "file[]" },
      { name: "uid", type: "string" },
      { name: "document_vector", type: "vector", vector: { dimension: 1536 } },
      { name: "file_link", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Questions = InferredTypes["questions"];
export type QuestionsRecord = Questions & XataRecord;

export type Response = InferredTypes["Response"];
export type ResponseRecord = Response & XataRecord;

export type Document = InferredTypes["document"];
export type DocumentRecord = Document & XataRecord;

export type DatabaseSchema = {
  questions: QuestionsRecord;
  Response: ResponseRecord;
  document: DocumentRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Rusty-Ramos-s-workspace-9h3m5o.ap-southeast-2.xata.sh/db/rethinkdb",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
