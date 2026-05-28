import {defineField, defineType} from 'sanity'

export const trustedBy = defineType({
  name: 'trustedBy',
  title: 'Trusted By',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'Small label above the row, e.g. "Trusted by".',
      type: 'string',
      initialValue: 'Trusted by',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Client name',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'image',
              title: 'Logo image',
              description: 'SVG or transparent PNG works best.',
              type: 'image',
            }),
            defineField({
              name: 'url',
              title: 'Link (optional)',
              type: 'url',
            }),
          ],
          preview: {
            select: {title: 'name', media: 'image'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Trusted By'}
    },
  },
})
