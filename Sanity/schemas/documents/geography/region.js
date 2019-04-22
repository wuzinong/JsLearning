import icon from 'react-icons/lib/fa/globe'

export default {

  name: 'region',
  title: 'Region',
  type: 'document',
  icon,

  fields: [

    { name: 'name', title: 'Name', type: 'string' }

  ],

  preview: {
    select: {title: 'name', media: 'icon'}
  }


}
