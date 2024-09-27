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
      FieldName: "UID",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
    {
      FieldName: "UserName",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
    {
      FieldName: "FirstName",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
    {
      FieldName: "LastName",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
    {
      FieldName: "Email",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
    {
      FieldName: "UserType",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
    {
      FieldName: "ProfileImage",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
    {
      FieldName: "Bio",
      DataType: "TEXT",
      MaxLength: 4096,
      Required: false,
    },
    {
      FieldName: "IsDeleted",
      DataType: "BOOLEAN",
      Default: false,
    },
    {
      FieldName: "CreatedAt",
      DataType: "NUMBER",
      Required: false,
      Default: Date.now(),
    },
    {
      FieldName: "UpdatedAt",
      DataType: "NUMBER",
      Required: false,
      Default: Date.now(),
    },
    {
      FieldName: "Role",
      DataType: "TEXT",
      MaxLength: 2048,
      Required: false,
    },
  ],
  Indexes: [
    {
      Fields: ["UID"],
      IndexValue: "UID",
      ForceUpdate: false,
      Delete: false,
    },
    {
      Fields: ["UserType"],
      IndexValue: "UserType",
      ForceUpdate: false,
      Delete: false,
    },
    {
      Fields: ["Role"],
      IndexValue: "Role",
      ForceUpdate: false,
      Delete: false,
    },
  ],
};

export interface ProfileData {
  UID: string;
  FirstName: string;
  LastName: string;
  Email: string;
  UserType: string;
  ProfileImage?: string;
  Bio?: string;
  IsDeleted: boolean;
  CreatedAt: number;
  UpdatedAt: number;
  Role: string; // New field for role
}
