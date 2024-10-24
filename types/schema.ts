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

export interface SchemaType {
  ETId: number;
  TableName: string;
  Family: string;
  DoSummary: boolean;
  Fields: FieldType[];
  Indexes: IndexType[];
}

import { RoleData } from "@/schemas/roleSchema";
import { ProfileData } from "@/schemas/profileSchema";
import { BlogData } from "@/schemas/blogSchema";

export type MainData = RoleData | ProfileData | BlogData | RoleData[] | ProfileData[] | BlogData[];
