import React from "react";
import Button from "./single/Button";
import { useCreateSchema } from "@/hooks/schema/useCreateSchema";

interface FieldType {
  FieldName: string;
  DataType: string;
  MaxLength?: number;
  Required?: boolean;
  Default?: any;
}

interface IndexType {
  Fields: string[];
  IndexValue: string;
  ForceUpdate: boolean;
  Delete: boolean;
}

interface SchemaType {
  ETId: number;
  TableName: string;
  Family: string;
  DoSummary: boolean;
  Fields: FieldType[];
  Indexes: IndexType[];
}

interface SchemaDetailsProps {
  schema: SchemaType;
  name: string;
}

const SchemaDetails: React.FC<SchemaDetailsProps> = ({ schema, name }) => {
  const { createSchema } = useCreateSchema(
    Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID)
  );

  return (
    <div className="bg-white p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p className="text-gray-700 mb-4">Table Name: {schema.TableName}</p>
      <p className="text-gray-700 mb-4">ETId: {schema.ETId}</p>
      <p className="text-gray-700 mb-4">Family: {schema.Family}</p>
      <p className="text-gray-700 mb-4">
        Summary Enabled: {schema.DoSummary ? "Yes" : "No"}
      </p>

      <h3 className="text-xl font-bold mb-2">Fields</h3>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        {schema.Fields.map((field, index) => (
          <li key={index}>
            <strong>{field.FieldName}</strong> - {field.DataType}
            {field.MaxLength && ` (Max Length: ${field.MaxLength})`}
            {field.Required && ` (Required)`}
            {field.Default !== undefined && ` (Default: ${field.Default})`}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-bold mb-2">Indexes</h3>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        {schema.Indexes.map((index, idx) => (
          <li key={idx}>
            <strong>Fields:</strong> {index.Fields.join(", ")}
            <br />
            <strong>Index Value:</strong> {index.IndexValue}
            <br />
            <strong>Force Update:</strong> {index.ForceUpdate ? "Yes" : "No"}
            <br />
            <strong>Delete:</strong> {index.Delete ? "Yes" : "No"}
          </li>
        ))}
      </ul>
      <Button
        onClick={createSchema}
        className="w-full bg-primary text-primary-foreground"
      >
        Create Schema
      </Button>
    </div>
  );
};

export default SchemaDetails;
