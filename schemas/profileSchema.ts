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
      FieldName: "userId",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "userName",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "email",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    {
      FieldName: "bio",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
    {
      FieldName: "profileImage",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
    {
      FieldName: "website",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
    {
      FieldName: "dateJoined",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: true,
    },
    { FieldName: "IsDeleted", DataType: "BOOLEAN", Default: false },
  ],
  Indexes: [
    {
      Fields: ["userId"],
      IndexValue: "userId",
      ForceUpdate: false,
      Delete: false,
    },
  ],
};

export interface ProfileData {
  userId: string;
  userName: string;
  email: string;
  bio?: string;
  profileImage?: string;
  website?: string;
  dateJoined: string;
  IsDeleted?: boolean;
}
