import icon from 'react-icons/lib/io/leaf'
// import icon from 'react-icons/lib/go/home'
// import icon from 'react-icons/lib/md/domain'  // TODO: Remove unused icon options

import internalFields from '../../objects/internalFields'

export default {
  name: 'provider',
  title: 'Provider',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name', title: 'Internal name',
      description: 'Name used in Analytics reports, etc. Be sure to follow the naming convention, for example "DNV GL Maritime".',
      type: 'string'
    },
    {
      name: 'organization', title: 'Organization',
      type: 'reference', to: [{type: 'organization'}, {type: 'orgUnit'}]
    },
    internalFields,
  ],
  preview: {
    select: {
      title:    'name',
      subtitle: 'coalesce(orgUnit.organization.country.name, organization.country.name)',
      media:    'coalesce(orgUnit.organization.logoImage,    organization.logoImage)'
    }
  }
}
