import icon from 'react-icons/lib/ti/point-of-interest'

export default {
  name: 'productIcon',
  title: 'Product feature icon',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name', title: 'Name',
      type: 'string'
    },
    {
      // TODO: Remove if we don't have the time to actually describe the icons.
      name: 'description', title: 'Description',
      description: 'Guides providers on what to use the icon for.',
      type: 'string'
    },
    {
      name: 'image', title: 'Icon SVG',
      description: 'Used for visual hints about product features and additional info on product pages.',
      type: 'image'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image'
    }
  }
}
