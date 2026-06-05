import { generatedDocsSections } from "./components.generated";

export type DocsItem = {
  slug: string;
  title: string;
  description: string;
  registryName: string;
  importExample: string;
  usageExample: string;
};

export type DocsSection = {
  title: string;
  items: DocsItem[];
};

export const docsSections: DocsSection[] = generatedDocsSections;

export const docsItems = docsSections.flatMap((section) => section.items);

export function getDocsItemBySlug(slug: string) {
  return docsItems.find((item) => item.slug === slug);
}
