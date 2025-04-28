import type {
  Project,
  UseCases,
  About,
  Home,
  Globals,
  Contact
} from "../../.contentlayer/generated";

import {
  allProjects,
  allUseCases,
  allAbouts,
  allHomes,
  allGlobals,
  allContacts
} from "../../.contentlayer/generated";

export const FR = "fr" as const;
export const EN = "en" as const;
export type Locale = typeof FR | typeof EN;

export const PROJECT = "project" as const;
export const PROJECTS = "projects" as const
export const USE_CASES = "useCases" as const;
export const ABOUT = "about" as const;
export const HOME = "home" as const;
export const GLOBALS = "globals" as const;
export const CONTACT = "contact" as const;
export type ContentType =
  | typeof PROJECT
  | typeof PROJECTS
  | typeof USE_CASES
  | typeof ABOUT
  | typeof HOME
  | typeof GLOBALS
  | typeof CONTACT;

interface ContentMap {
  project: Project;
  useCases: UseCases;
  home: Home;
  about: About;
  globals: Globals;
  contact: Contact;
  projects: never
}
export const contentMap: { [K in ContentType]: ContentMap[K][] } = {
  project: allProjects,
  useCases: allUseCases,
  home: allHomes,
  about: allAbouts,
  globals: allGlobals,
  contact: allContacts,
  projects: [],
};
