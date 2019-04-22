import icon from 'react-icons/lib/go/organization'
// import icon from 'react-icons/lib/go/home'
// import icon from 'react-icons/lib/md/domain'  // TODO: Remove unused icon options

export default {
  name: 'orgUnit',
  title: 'Org. unit',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name', title: 'Presentation name',
      description: 'Used as provider name on Marketplace product pages. (Overrides\u00a0the\u00a0name\u00a0of\u00a0the\u00a0parent\u00a0organization.)',
      type: 'string'
    },
    {
      name: 'description', title: 'Presentation description',
      // Non breaking space (\u00a0) forces linebreaks.
      description: 'Used as provider description on Marketplace product pages. (Overrides\u00a0the\u00a0description\u00a0of\u00a0the\u00a0parent\u00a0organization.)',
      type: 'text'
    },
    {
      name: 'organization', title: 'Parent organization',
      description: 'Select the organization this org. unit belongs to.',
      type: 'reference', to: [{type: 'organization'}]
    } // TODO: Add validation!!
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'organization.name',
      media: 'organization.logoImage'
    }
  }
}
