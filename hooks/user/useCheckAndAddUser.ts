import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useGetUser } from "@/hooks/user/useGetUser";
import { useAddUser } from "@/hooks/user/useAddUser";
import { useCreateSchema } from "@/hooks/schema/useCreateSchema";
import { profileSchema, ProfileData } from "@/schemas/profileSchema";
import { blogSchema } from "@/schemas/blogSchema";
import { roleSchema, RoleData } from "@/schemas/roleSchema";
import usePostSchema from "@/hooks/schema/usePostSchema";
import { useReadSchemas } from "@/hooks/schema/useReadSchemas";
import { useUpdateSchema } from "@/hooks/schema/useUpdateSchema";
import { useRecoilState } from "recoil";
import { isUserConfiguredState } from "@/recoil/atoms";

export const useCheckAndAddUser = () => {
  const { user } = useUser();
  const { data: userProfileData, getUser, loading: loadingGet } = useGetUser();
  const { addUser, loading: loadingAdd } = useAddUser();
  const { createSchema } = useCreateSchema();
  const { postSchema: addRole } = usePostSchema(Number(process.env.NEXT_PUBLIC_WALACOR_ROLE_ETID));
  const { data: rolesData, readSchemas: fetchRoles } = useReadSchemas(Number(process.env.NEXT_PUBLIC_WALACOR_ROLE_ETID));
  const { updateRecord: updateProfile } = useUpdateSchema(Number(process.env.NEXT_PUBLIC_WALACOR_PROFILE_ETID));

  const [userChecked, setUserChecked] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [setupStage, setSetupStage] = useState("Setting Up User...");
  const [isConfigured, setIsConfigured] = useRecoilState(isUserConfiguredState);

  useEffect(() => {
    const checkAndAddUser = async () => {
      if (user && !userChecked) {
        try {
          await getUser({ userId: user.id });

          const profile = userProfileData as ProfileData;

          const sessionConfigured = sessionStorage.getItem("userConfigured");

          if (sessionConfigured === "true" || isConfigured || profile?.isConfigured) {
            console.log("User is already configured.");
            setIsConfigured(true);
            setSetupStage("Done");
            setUserChecked(true);
            return;
          }

          console.log("User not configured, creating schemas and adding user...");
          setSetupStage("Creating Schemas...");

          const schemas = [
            { etid: profileSchema.ETId, schemaData: profileSchema },
            { etid: blogSchema.ETId, schemaData: blogSchema },
            { etid: roleSchema.ETId, schemaData: roleSchema },
          ];

          for (const schema of schemas) {
            await createSchema(schema.etid, schema.schemaData);
          }

          if (!profile) {
            await addUser();
          }

          setSetupStage("Adding Permissions...");
          await fetchRoles();

          if (rolesData) {
            const viewerRoleExists = (rolesData as unknown as RoleData[])?.some((role) => role.roleName === "Viewer");

            if (!viewerRoleExists) {
              const newRole: RoleData = {
                id: "",
                roleName: "Viewer",
                scope: "ReadOnly",
              };
              await addRole(newRole);
            }
          }

          const updatedProfile: Partial<ProfileData> = {
            UID: profile?.UID || user.id,
            isConfigured: true,
          };

          await updateProfile(updatedProfile);

          sessionStorage.setItem("userConfigured", "true");

          setIsConfigured(true);
          setSetupStage("Done");
          setUserChecked(true);
        } catch (error) {
          console.error("Error in user check and add process:", error);
        }
      }
    };

    checkAndAddUser();
  }, [user, userChecked, getUser, addUser, createSchema, userProfileData, addRole, fetchRoles, rolesData, updateProfile, isConfigured, setIsConfigured]);

  return { loading: loadingGet || loadingAdd || loadingRoles, setupStage, isConfigured };
};
