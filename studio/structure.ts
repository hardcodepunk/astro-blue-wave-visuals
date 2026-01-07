import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.listItem()
        .title('About Teaser')
        .id('aboutTeaser')
        .child(S.document().schemaType('aboutTeaser').documentId('aboutTeaser')),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => !['siteSettings', 'aboutTeaser'].includes(item.getId() as string),
      ),
    ])
