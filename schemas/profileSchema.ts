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

interface ProfileSchemaType {
  ETId: number;
  TableName: string;
  Family: string;
  DoSummary: boolean;
  Fields: FieldType[];
  Indexes: IndexType[];
}

export const profileSchema: ProfileSchemaType = {
  ETId: Number(process.env.NEXT_PUBLIC_WALACOR_PROFILE_ETID),
  TableName: "profiles",
  Family: "profile-family",
  DoSummary: true,
  Fields: [
    {
      FieldName: "id",
      DataType: "TEXT",
      MaxLength: 256,
      Required: false,
    },
    {
      FieldName: "userId",
      DataType: "TEXT",
      MaxLength: 256,
      Required: false,
    },
    {
      FieldName: "firstName",
      DataType: "TEXT",
      MaxLength: 256,
      Required: false,
    },
    {
      FieldName: "lastName",
      DataType: "TEXT",
      MaxLength: 256,
      Required: false,
    },
    {
      FieldName: "email",
      DataType: "TEXT",
      MaxLength: 256,
      Required: false,
    },
    {
      FieldName: "role",
      DataType: "TEXT",
      MaxLength: 256,
      Required: false,
      Default: "Viewer",
    },
    {
      FieldName: "isVerified",
      DataType: "BOOLEAN",
      Default: false,
      Required: false,
    },
  ],
  Indexes: [
    {
      Fields: ["id"],
      IndexValue: "id",
      ForceUpdate: false,
      Delete: false,
    },
    {
      Fields: ["userId"],
      IndexValue: "userId",
      ForceUpdate: false,
      Delete: false,
    },
    {
      Fields: ["email"],
      IndexValue: "email",
      ForceUpdate: false,
      Delete: false,
    },
  ],
};

export interface ProfileData {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
}
