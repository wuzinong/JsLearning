import icon from 'react-icons/lib/fa/globe'

export default {

  name: 'subregion',
  title: 'Subregion',
  type: 'document',
  icon,

  fields: [

    { name: 'name', title: 'Name', type: 'string' },
    { name: 'region', title: 'Region', type: 'reference', to: [{type: 'region'}] }

  ],

  preview: {
    select: {title: 'name', subtitle: 'region.name', media: 'icon'}
  }

}