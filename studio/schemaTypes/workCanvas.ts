import {defineField, defineType} from 'sanity'

export const workCanvas = defineType({
  name: 'workCanvas',
  title: 'Work Canvas',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Recent visuals',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Selected work',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      description: 'Mix images and short autoplay clips. They will pack into a masonry-style canvas.',
      type: 'array',
      of: [
        defineField({
          name: 'visual',
          title: 'Visual',
          type: 'object',
          fields: [
            defineField({
              name: 'kind',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video', value: 'video'},
                ],
                layout: 'radio',
              },
              initialValue: 'image',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'imageUrl',
              title: 'Image URL',
              description: 'Direct URL or /img/your-file.jpg from the public folder.',
              type: 'string',
              hidden: ({parent}) => parent?.kind !== 'image',
            }),
            defineField({
              name: 'videoMp4',
              title: 'MP4 URL',
              type: 'url',
              hidden: ({parent}) => parent?.kind !== 'video',
            }),
            defineField({
              name: 'videoWebm',
              title: 'WEBM URL',
              type: 'url',
              hidden: ({parent}) => parent?.kind !== 'video',
            }),
            defineField({
              name: 'videoPoster',
              title: 'Video poster URL',
              type: 'url',
              hidden: ({parent}) => parent?.kind !== 'video',
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
          preview: {
            select: {kind: 'kind', alt: 'alt'},
            prepare({kind, alt}) {
              return {title: alt || (kind === 'video' ? 'Video' : 'Image'), subtitle: kind}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      initialValue: 'All work',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA link',
      type: 'string',
      initialValue: '/projects',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Work Canvas'}
    },
  },
})
