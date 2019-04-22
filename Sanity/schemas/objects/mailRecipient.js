import emailIcon from 'react-icons/lib/md/email'

// Object definition for an email recipient.
// Reused as part of other object definitions.

// TODO: Include in schema as object to simplify using as include.

export default {
  name: 'mailRecipient',
  title: 'Mail recipient',
  icon: emailIcon,
  type: 'object',
  fields: [
    {
      name: 'name', 
      title: 'Name', 
      type: 'string'
    },
    {
      name: 'email', 
      title: 'Email address', 
      type: 'string'
    }
  ],
  preview: {
    select: { title: 'name', subtitle: 'email' },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title, 
        subtitle: subtitle, 
        media: emailIcon
      }
    }
  }
}
