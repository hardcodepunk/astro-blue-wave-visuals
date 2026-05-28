import {defineField, defineType} from 'sanity'

export const processSteps = defineType({
  name: 'processSteps',
  title: 'Process',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'How we work',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      description: 'Three steps work best.',
      type: 'array',
      of: [
        defineField({
          name: 'step',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'body'},
          },
        }),
      ],
      validation: (r) => r.max(6),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Process'}
    },
  },
})
