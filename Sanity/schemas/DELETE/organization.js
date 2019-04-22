import icon from 'react-icons/lib/md/palette'
// import icon from 'react-icons/lib/ti/leaf'
// import icon from 'react-icons/lib/go/home'
// import icon from 'react-icons/lib/md/domain'


// TODO: Delete!

export default {
  name: 'provider',
  title: 'Provider',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name', title: 'Name',
      type: 'string'
    },
    {
      name: 'description', title: 'Description', description: 'Used as provider description on Marketplace product pages.',
      type: 'string'
    },
    {
      name: 'logoImage', title: 'Logo image', description: 'Used as provider logo on Marketplace product pages.',
      type: 'image'
    },
    {
      name: 'country', title: 'Country',
      type: 'reference', to: {type: 'country'}
    },
    {
      name: 'analyticsName', title: 'Provider dashboard name', description: 'Name used in Provider dashboard, for example "DNV GL Maritime".',
      type: 'string'
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'country.name',
      media: 'logoImage'
    }
  }
}
