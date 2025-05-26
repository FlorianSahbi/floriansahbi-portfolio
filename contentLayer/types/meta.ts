import { defineNestedType } from 'contentlayer/source-files'

const OgImage = defineNestedType(() => ({
  name: 'OgImage',
  fields: {
    url: { type: 'string', required: true },
    width: { type: 'number', required: false },
    height: { type: 'number', required: false },
    alt: { type: 'string', required: false },
  },
}))

const OpenGraph = defineNestedType(() => ({
  name: 'OpenGraph',
  fields: {
    title: { type: 'string', required: false },
    description: { type: 'string', required: false },
    url: { type: 'string', required: false },
    images: { type: 'list', of: OgImage, required: false },
    locale: { type: 'string', required: false },
    type: { type: 'string', required: false },
    siteName: { type: 'string', required: false },
  },
}))

const TwitterMeta = defineNestedType(() => ({
  name: 'TwitterMeta',
  fields: {
    card: { type: 'string', required: false },
    title: { type: 'string', required: false },
    description: { type: 'string', required: false },
    images: { type: 'list', of: { type: 'string' }, required: false },
  },
}))

export const Meta = defineNestedType(() => ({
  name: 'Meta',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
    openGraph: { type: 'nested', of: OpenGraph, required: false },
    twitter: { type: 'nested', of: TwitterMeta, required: false },
  },
}))
