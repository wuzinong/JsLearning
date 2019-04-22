import icon from 'react-icons/lib/fa/flag'

export default {

  name: 'country',
  title: 'Country',
  type: 'document',
  icon,

  fieldsets: [
    { name: 'geography',    title: 'Geography',     options: { collapsible: true, collapsed: true } },
    { name: 'commerce',     title: 'Commerce',      options: { collapsible: true, collapsed: true } },
    { name: 'countryCodes', title: 'Country codes', options: { collapsible: true, collapsed: true } } 
  ],

  fields: [

    // GENERAL
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'independent',
      title: 'Independent',
      type: 'boolean',
      description: 'Denotes the country is considered a sovereign state.'
    },
    {
      name: 'flag',
      title: 'Flag image (SVG)',
      type: 'image',
      options: { hotspot: false }
    },

    // GEOGRAPHY
    {
      name: 'region',
      title: 'Region',
      fieldset: 'geography',
      type: 'reference', to: [{type: 'region'}]
    },
    {
      name: 'subregion',
      title: 'Subregion',
      fieldset: 'geography',
      type: 'reference', to: [{type: 'subregion'}],
    },

    // COMMERCE
    {
      name: 'currencies',
      title: 'Currencies',
      description: 'Use three letter code, for example "USD", "EUR" or "NOK".',
      fieldset: 'commerce',
      type: 'array', of: [{type: 'string'}],
      options: { layout: 'tags' }
    },
    {
      name: 'sellTo',
      title: 'Sell to this country',
      fieldset: 'commerce',
      type: 'boolean'
    },
    {
      name: 'withholdingTax',
      title: 'Withholding tax applies',
      fieldset: 'commerce',
      type: 'boolean'
    },

    // COUNTRY CODES
    { name: 'countryCode',    title: 'Country code Alpha 2',   type: 'string', fieldset: 'countryCodes' },
    { name: 'countryCodeA3',  title: 'Country code Alpha 3',   type: 'string', fieldset: 'countryCodes' },
    { name: 'countryCodeNum', title: 'Country code Numeric 3', type: 'string', fieldset: 'countryCodes' },
    {
      name: 'callingCode',
      title: 'Telephone calling code',
      decription: 'E.g. 47 for Norway',
      fieldset: 'countryCodes',
      type: 'array', of: [{type: 'string'}],
      options: { layout: 'tags' }
    },
    {
      name: 'topLevelDomains',
      title: 'Top level domains',
      description: 'Start with a dot, for example ".com" or ".no".',
      fieldset: 'countryCodes',
      type: 'array', of: [{type: 'string'}],
      options: { layout: 'tags' }
    },

    // TRANSLATIONS
    {
      name: 'translations',
      title: 'Translations',
      type: 'localeString',
      options: {collapsible: true}
    }

  ],

  // PREVIEW
  preview: {
    select: { name: 'name', region: 'region.name', independent: 'independent', flag: 'flag' },
    prepare(selection) {
      const {name, region, independent, flag} = selection
      return {
        title: name,
        subtitle: `${!independent ? '⚠️ Non-sovereign: ' : ''}` + region, 
        media : flag
      }
    }
  }

}
