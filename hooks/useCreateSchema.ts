import axios from "axios";
import useAuthenticatedToken from "./useAuthenticatedToken";

interface BlogData {
  id: string;
  userId: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  authorName: string;
  authorImage: string;
  authorFallback: string;
  date: string;
  content: string;
}

export function useCreateSchema() {
  const token = useAuthenticatedToken();

  const createSchema = async (data: BlogData) => {
    const schema = {
      ETId: 50,
      SV: 1,
      Schema: {
        ETId: Number(process.env.NEXT_PUBLIC_WALACOR_SCHEMA),
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
            FieldName: "href",
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
      },
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_EC2_WALACOR}/api/schemas/`,
        schema,
        {
          headers: {
            Authorization: `${token}`,
            ETId: Number(process.env.NEXT_PUBLIC_WALACOR_SCHEMA),
            SV: 1,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating schema:", error);
      throw error;
    }
  };

  return { createSchema };
}
