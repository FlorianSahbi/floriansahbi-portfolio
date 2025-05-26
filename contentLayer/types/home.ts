import { defineDocumentType } from 'contentlayer/source-files'
import { computedFields } from '../computedFields'
import { Meta } from './meta'

export const Home = defineDocumentType(() => ({
  name: 'Home',
  filePathPattern: './**/home.mdx',
  contentType: 'mdx',
  fields: {
    meta: { type: 'nested', of: Meta, required: true },
    title: { type: 'string', required: true },
    seoTitle: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    footerNoteLabel: { type: 'string', required: true },
    footerNoteLink: { type: 'string', required: true },
    footerNoteCtaLabel: { type: 'string', required: true },
  },
  computedFields,
}))
