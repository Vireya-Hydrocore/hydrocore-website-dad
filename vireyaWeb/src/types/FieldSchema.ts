export type FieldSchema = {
  label: string;
  type: "string" | "number" | "dropdown" | "date";
  disabled?: boolean;
  options?: { id: string | number; nome: string }[];
};