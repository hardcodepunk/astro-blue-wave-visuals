import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = ['siteSettings', 'aboutTeaser', 'bioWithPreview', 'trustedBy', 'processSteps']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.listItem()
        .title('Bio With Preview')
        .id('bioWithPreview')
        .child(S.document().schemaType('bioWithPreview').documentId('bioWithPreview')),

      S.listItem()
        .title('Trusted By')
        .id('trustedBy')
        .child(S.document().schemaType('trustedBy').documentId('trustedBy')),

      S.listItem()
        .title('Process')
        .id('processSteps')
        .child(S.document().schemaType('processSteps').documentId('processSteps')),

      S.listItem()
        .title('About Teaser')
        .id('aboutTeaser')
        .child(S.document().schemaType('aboutTeaser').documentId('aboutTeaser')),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() as string),
      ),
    ])
