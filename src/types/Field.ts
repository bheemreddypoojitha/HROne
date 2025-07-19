export type FieldType = "string" | "number" | "nested";

export interface Field {
  id: string;
  key: string;
  type: FieldType;
  enabled?: boolean;
  children?: Field[];
}