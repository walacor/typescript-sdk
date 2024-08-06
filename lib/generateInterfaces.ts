import fs from "fs";
import path from "path";
import { blogSchema, BlogSchemaType } from "../schemas/blogSchema";
import { profileSchema, ProfileSchemaType } from "../schemas/profileSchema";
import { StaticImageData } from "next/image";

function generateInterface(
  schema: BlogSchemaType | ProfileSchemaType,
  interfaceName: string
): string {
  let interfaceString = `import { StaticImageData } from "next/image";\n\n`;
  interfaceString += `export interface ${interfaceName} {\n`;

  schema.Fields.forEach((field) => {
    const fieldName = field.FieldName;
    let fieldType = "string";

    if (field.DataType === "BOOLEAN") {
      fieldType = "boolean";
    } else if (fieldName === "imageSrc") {
      fieldType = "string | StaticImageData";
    }

    const isOptional = field.Required ? "" : "?";
    interfaceString += `  ${fieldName}${isOptional}: ${fieldType};\n`;
  });

  interfaceString += `}\n`;

  return interfaceString;
}

function saveInterfaceToFile(interfaceString: string, fileName: string) {
  const outputPath = path.join(__dirname, "../types", fileName);
  fs.writeFileSync(outputPath, interfaceString, { encoding: "utf8" });
  console.log(`Interface ${fileName} generated and saved to ${outputPath}`);
}

// Generate interfaces
const blogInterface = generateInterface(blogSchema, "BlogData");
const profileInterface = generateInterface(profileSchema, "ProfileData");

// Save interfaces to files
saveInterfaceToFile(blogInterface, "BlogData.ts");
saveInterfaceToFile(profileInterface, "ProfileData.ts");
