import { StaticImageData } from "next/image";

type FieldType = {
  FieldName: string;
  DataType: string;
  MaxLength?: number;
  Required?: boolean;
  Default?: any;
};

type IndexType = {
  Fields: string[];
  IndexValue: string;
  ForceUpdate: boolean;
  Delete: boolean;
};

interface BlogSchemaType {
  ETId: number;
  TableName: string;
  Family: string;
  DoSummary: boolean;
  Fields: FieldType[];
  Indexes: IndexType[];
}

export const blogSchema: BlogSchemaType = {
  ETId: Number(process.env.NEXT_PUBLIC_WALACOR_BLOG_ETID),
  TableName: "blogs",
  Family: "blog-family",
  DoSummary: true,
  Fields: [
    {
      FieldName: "id",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "userId",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "imageSrc",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "imageAlt",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "title",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "description",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "authorName",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "authorImage",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
    {
      FieldName: "authorFallback",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "date",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "content",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    { FieldName: "IsDeleted", DataType: "BOOLEAN", Default: false },
  ],
  Indexes: [
    {
      Fields: ["id"],
      IndexValue: "id",
      ForceUpdate: false,
      Delete: false,
    },
  ],
};

export interface BlogData {
  id: string;
  userId: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  authorName: string;
  authorImage: string;
  authorFallback: string;
  date: string;
  content: string;
  IsDeleted: boolean;
  CreatedAt: number;
  UpdatedAt: number;
}
