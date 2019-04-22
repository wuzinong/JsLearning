// import icon from 'react-icons/lib/io/leaf'
// import icon from 'react-icons/lib/go/home'
import icon from 'react-icons/lib/md/domain'  // TODO: Remove unused icon options

export default {
  name: 'organization',
  title: 'Organization',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name', title: 'Name',
      type: 'string'
    },
    {
      name: 'description', title: 'Description', description: 'Used as provider description on Marketplace product pages.',
      type: 'text'
    },
    // TODO: Description must handle newlines. If rendering of newlines as paragraphs <p> is cumbersome,
    //       we can consider whether description shopuld be a text block (rich), as defined below.
    //       See: https://www.sanity.io/docs/front-ends/presenting-block-text
    //       Remove this if not used.
    // {
    //   name: 'description', title: 'Description', description: 'Used as provider description on Marketplace product pages.',
    //   type: 'array', of: [
    //     {
    //       type: 'block',
    //       // Turn off all styling
    //       styles: [], lists: [], marks: { decorators: [], annotations: [] }
    //     }
    //   ]
    // },
    {
      name: 'logoImage', title: 'Logo image', description: 'Used as provider logo on Marketplace product pages.',
      type: 'image'
    },
    {
      name: 'country', title: 'Country',
      type: 'reference', to: {type: 'country'}
    },
    // TODO: Is this needed? Morten Bui?
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
