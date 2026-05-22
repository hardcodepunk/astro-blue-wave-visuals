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

      S.listItem()
        .title('Bio With Preview')
        .id('bioWithPreview')
        .child(S.document().schemaType('bioWithPreview').documentId('bioWithPreview')),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) =>
          !['siteSettings', 'aboutTeaser', 'bioWithPreview'].includes(item.getId() as string),
      ),
    ])
