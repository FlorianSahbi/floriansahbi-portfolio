import { defineDocumentType } from "contentlayer/source-files";
import { computedFields } from "../computedFields";
import { Meta } from "./meta";

export const UseCases = defineDocumentType(() => ({
  name: "UseCases",
  filePathPattern: "./**/useCases/*.mdx",
  contentType: "mdx",
  fields: {
    meta: { type: 'nested', of: Meta, required: true },
    published: { type: "boolean", required: false },
    keywords: { type: 'list', of: { type: 'string' }, required: false },
    featured: { type: "boolean", required: false },
    title: { type: "string", required: true },
    teaser: { type: "string", required: false },
    description: { type: "string", required: true },
    date: { type: "date", required: false },
    url: { type: "string", required: false },
    repository: { type: "string", required: false },
    slug: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    coverImage: { type: "string", required: false },
    year: { type: "number", required: false },
    client: { type: "string", required: false, },
    role: { type: "string", required: false, },
  },
  computedFields,
}));