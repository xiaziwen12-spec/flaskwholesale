import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas/index";

export default defineConfig({
  name: "flaskwholesale",
  title: "FlaskWholesale",
  projectId: "12npkiv4",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
