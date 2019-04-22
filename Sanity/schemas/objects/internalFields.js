
// Object definition for an internal notes field.
// Reused as part of other object definitions.

export default {
  name: 'internal',
  title: 'Internal fields',
  type: 'object',
  fields: [
    {
      name: 'notes',
      title: 'Notes',
      type: 'text'
    },
  ],
  options: {
    collapsible: true,
    collapsed: false
  }
}
