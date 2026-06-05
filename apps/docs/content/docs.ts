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

export const docsSections: DocsSection[] = [
  {
    title: "Components",
    items: [
      {
        slug: "button",
        title: "Button",
        description: "Action trigger with variants and size support.",
        registryName: "button",
        importExample: `import { Button } from "@/components/ui/button";`,
        usageExample: `<Button variant="premium">Continue</Button>`,
      },
      {
        slug: "dialog",
        title: "Dialog",
        description: "Accessible modal dialog built on Base UI.",
        registryName: "dialog",
        importExample: `import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";`,
        usageExample:
          "<Dialog><DialogTrigger>Open</DialogTrigger><DialogContent>Dialog content</DialogContent></Dialog>",
      },
      {
        slug: "dropdown-menu",
        title: "Dropdown Menu",
        description: "Contextual menu with sections, labels, and shortcuts.",
        registryName: "dropdown-menu",
        importExample:
          'import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";',
        usageExample:
          "<DropdownMenu><DropdownMenuTrigger>Open menu</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Profile</DropdownMenuItem></DropdownMenuContent></DropdownMenu>",
      },
      {
        slug: "input",
        title: "Input",
        description: "Form input with label, helper text, and error handling.",
        registryName: "input",
        importExample: `import { Input } from "@/components/ui/input";`,
        usageExample: '<Input label="Email" name="email" type="email" helperText="We never share your email." />',
      },
    ],
  },
];

export const docsItems = docsSections.flatMap((section) => section.items);

export function getDocsItemBySlug(slug: string) {
  return docsItems.find((item) => item.slug === slug);
}
