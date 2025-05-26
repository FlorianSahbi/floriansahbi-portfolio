import { defineDocumentType } from 'contentlayer/source-files'
import { computedFields } from '../computedFields'
import { Meta } from './meta'

export const Contact = defineDocumentType(() => ({
  name: 'Contact',
  filePathPattern: './**/contact.mdx',
  contentType: 'mdx',
  fields: {
    meta: { type: 'nested', of: Meta, required: true },
    title: { type: 'string', required: false },
  },
  computedFields,
}))
