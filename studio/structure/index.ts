import type { StructureResolver } from "sanity/structure";
import { singletonSchemaTypes } from "./singletons";

const HIDDEN_FROM_LIST = new Set([
  ...singletonSchemaTypes,
  "localeFieldsTest",
]);

const SINGLETONS = [
  { schemaType: "siteSettings", title: "Site settings", id: "siteSettings" },
  { schemaType: "homePage", title: "Home", id: "homePage" },
  { schemaType: "aboutPage", title: "About", id: "aboutPage" },
  { schemaType: "servicesPage", title: "Services", id: "servicesPage" },
  { schemaType: "faqPage", title: "FAQ", id: "faqPage" },
  { schemaType: "contactPage", title: "Contact", id: "contactPage" },
] as const;

function singletonItem(
  S: Parameters<StructureResolver>[0],
  entry: (typeof SINGLETONS)[number],
) {
  return S.listItem()
    .title(entry.title)
    .id(entry.id)
    .child(
      S.document()
        .schemaType(entry.schemaType)
        .documentId(entry.id)
        .title(entry.title),
    );
}

export const structure: StructureResolver = (S) => {
  const pages = S.list()
    .title("Pages")
    .items(
      SINGLETONS.filter((s) => s.schemaType !== "siteSettings").map((entry) =>
        singletonItem(S, entry),
      ),
    );

  return S.list()
    .title("Serendib Global Auto")
    .items([
      singletonItem(S, SINGLETONS[0]),
      S.divider(),
      S.listItem().title("Pages").child(pages),
      S.listItem()
        .title("Vehicles")
        .child(
          S.documentTypeList("vehicle")
            .title("Vehicles")
            .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_FROM_LIST.has(item.getId() || ""),
      ),
    ]);
};