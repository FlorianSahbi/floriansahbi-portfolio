import { defineDocumentType } from "contentlayer/source-files";
import { computedFields } from "../computedFields";
import { Meta } from "./meta";

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "./**/project.mdx",
  contentType: "mdx",
  fields: {
    meta: { type: 'nested', of: Meta, required: true },
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    slug: { type: "string", required: true },
  },
  computedFields,
}));