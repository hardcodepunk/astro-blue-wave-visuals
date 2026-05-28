import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site description',
      type: 'text',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroMp4',
      title: 'Hero MP4 URL',
      type: 'url',
    }),
    defineField({
      name: 'heroWebm',
      title: 'Hero WebM URL',
      type: 'url',
    }),
    defineField({
      name: 'heroPoster',
      title: 'Hero poster URL',
      type: 'url',
    }),
    defineField({
      name: 'showreelUrl',
      title: 'Showreel URL',
      description: 'YouTube or Vimeo URL for the showreel modal.',
      type: 'url',
    }),
    defineField({
      name: 'showreelPoster',
      title: 'Showreel poster URL',
      description: 'Optional still frame shown before the reel plays.',
      type: 'url',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
    }),
    defineField({
      name: 'shopUrl',
      title: 'Shop URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
  ],
})
