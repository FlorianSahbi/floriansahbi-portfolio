import { defineDocumentType } from "contentlayer/source-files";
import { computedFields } from "../computedFields";
import { Navigation } from "./navigation";
import { Socials } from "./socials";

export const Globals = defineDocumentType(() => ({
  name: "Globals",
  filePathPattern: "./**/globals.mdx",
  contentType: "mdx",
  fields: {
    navigation: { type: 'list', of: Navigation, required: true },
    socials: { type: 'list', of: Socials, required: true },
  },
  computedFields,
}));