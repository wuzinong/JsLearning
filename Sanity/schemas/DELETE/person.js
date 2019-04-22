import icon from 'react-icons/lib/md/person'

// TODO: Delete!!!

export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name', title: 'Name', type: 'string', description: 'Please use "Firstname Lastname" format'
    },
    {
      name: 'email', title: 'Email', type: 'string'
    },
    {
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'name', maxLength: 100 }
    },
    {
      name: 'image', title: 'Image', type: 'image',
      options: { hotspot: true }
    }
  ],
  preview: {
    select: {title: 'name', subtitle: 'email', media: 'image'}
  }
}
