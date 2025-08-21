import { defineNestedType, defineDocumentType } from 'contentlayer/source-files'
import { computedFields } from '../computedFields'
import { Meta } from './meta'

const Work = defineNestedType(() => ({
  name: 'Work',
  fields: {
    title: { type: 'string', required: true },
    start: { type: 'string', required: true },
    end: { type: 'string', required: true },
    localisation: { type: 'string', required: true },
    description: { type: 'string', required: true },
    details: { type: 'list', of: { type: 'string' }, required: false },
  },
}))

const Study = defineNestedType(() => ({
  name: 'Study',
  fields: {
    title: { type: 'string', required: true },
    start: { type: 'string', required: true },
    end: { type: 'string', required: true },
    localisation: { type: 'string', required: true },
    description: { type: 'string', required: false },
    details: { type: 'list', of: { type: 'string' }, required: false },
  },
}))

const TravelItem = defineNestedType(() => ({
  name: 'TravelItem',
  fields: {
    title: { type: 'string', required: true },
    start: { type: 'string', required: true },
    end: { type: 'string', required: true },
    localisation: { type: 'string', required: true },
    description: { type: 'string', required: true },
    details: { type: 'list', of: { type: 'string' }, required: false },
  },
}))

const SkillGroup = defineNestedType(() => ({
  name: 'SkillGroup',
  fields: {
    title: { type: 'string', required: true },
    details: { type: 'list', of: { type: 'string' }, required: true },
  },
}))

const Hobby = defineNestedType(() => ({
  name: 'Hobby',
  fields: {
    title: { type: 'string', required: true },
    details: { type: 'list', of: { type: 'string' }, required: true },
  },
}))

const WorksSection = defineNestedType(() => ({
  name: 'WorksSection',
  fields: {
    title: { type: 'string', required: true },
    experiences: { type: 'list', of: Work, required: true },
  },
}))

const StudiesSection = defineNestedType(() => ({
  name: 'StudiesSection',
  fields: {
    title: { type: 'string', required: true },
    experiences: { type: 'list', of: Study, required: true },
  },
}))

const TravelSection = defineNestedType(() => ({
  name: 'TravelSection',
  fields: {
    title: { type: 'string', required: true },
    experiences: { type: 'list', of: TravelItem, required: true },
  },
}))

const SkillsSection = defineNestedType(() => ({
  name: 'SkillsSection',
  fields: {
    title: { type: 'string', required: true },
    experiences: { type: 'list', of: SkillGroup, required: true },
  },
}))

const HobbiesSection = defineNestedType(() => ({
  name: 'HobbiesSection',
  fields: {
    title: { type: 'string', required: true },
    experiences: { type: 'list', of: Hobby, required: true },
  },
}))

export const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: './**/about.mdx',
  contentType: 'mdx',
  fields: {
    meta: { type: 'nested', of: Meta, required: true },
    buttonLabel: { type: 'string', required: true },
    contactButtonLabel: { type: 'string', required: true },
    useCaseButtonLabel: { type: 'string', required: true },
    worksCtaDescription: { type: 'string', required: true },
    worksButtonLabel: { type: 'string', required: true },
    title: { type: 'string', required: true },
    subTitle: { type: 'string', required: true },
    seoTitle: { type: 'string', required: true },
    description: { type: 'string', required: true },
    works: { type: 'nested', of: WorksSection, required: true },
    studies: { type: 'nested', of: StudiesSection, required: true },
    travel: { type: 'nested', of: TravelSection, required: false },
    skills: { type: 'nested', of: SkillsSection, required: true },
    hobbies: { type: 'nested', of: HobbiesSection, required: true },
  },
  computedFields,
}))
