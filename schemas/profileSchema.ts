export const profileSchema = {
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
