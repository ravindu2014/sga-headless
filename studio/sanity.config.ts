import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { singletonSchemaTypes } from "./structure/singletons";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "n2zalqm8";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "sga-stage-1",
  title: "Serendib Global Auto",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (template) => !singletonSchemaTypes.has(template.templateId || ""),
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (singletonSchemaTypes.has(schemaType)) {
        return prev.filter(
          ({ action }) => action && !["delete", "duplicate"].includes(action),
        );
      }
      return prev;
    },
  },
});