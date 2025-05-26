import { defineNestedType } from 'contentlayer/source-files'

export const Navigation = defineNestedType(() => ({
  name: 'Navigation',
  fields: {
    label: { type: 'string', required: true },
    href: { type: 'string', required: true },
  },
}))
