import { defineNestedType } from "contentlayer/source-files"

export const Socials = defineNestedType(() => ({
  name: 'Socials',
  fields: {
    label: { type: 'string', required: true },
    href: { type: 'string', required: true },
    handle: { type: 'string', required: false },
  },
}))