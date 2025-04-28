import { defineComputedFields } from "contentlayer/source-files";

export const computedFields = defineComputedFields({
  lang: {
    type: "string",
    resolve: doc =>
      doc._raw.sourceFilePath.split("/")[0],
  },
  slug: {
    type: "string",
    resolve: doc =>
      doc._raw.sourceFileName.replace(/\.[^/.]+$/, ""),
  },
});
