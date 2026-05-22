import {defineField, defineType} from 'sanity'

export const bioWithPreview = defineType({
  name: 'bioWithPreview',
  title: 'Bio With Preview',
  type: 'document',
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio',
      description: 'Text shown next to the preview image on the homepage.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mirrorLayout',
      title: 'Put image on the left',
      description: 'Switches the text and image sides on desktop.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'bioTextScale',
      title: 'Bio text size',
      description: 'Use 100 for default. Try 90 for smaller, 110 for larger.',
      type: 'number',
      initialValue: 100,
      validation: (r) => r.min(75).max(140),
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview image',
      description: 'Photo shown next to the bio.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Bio With Preview'}
    },
  },
})
