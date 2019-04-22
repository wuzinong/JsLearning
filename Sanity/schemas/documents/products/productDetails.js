import prodIcon from 'react-icons/lib/fa/cube'

// Reusable feature icon description field.
const featureDescrField = {
  name: 'description', title: 'Short feature description',
  description: 'Add a 5-10 word description explaining the benefits of this feature.',
  type: 'string',
  validation: Rule => Rule.required().max(85)
}

// Reusable video URL validation rule
const videoUrlRexEx = new RegExp(
  '(' +
    'http:[/][/]www.dailymotion.com|' +
    'https:[/][/](' +
      'www.youtube.com[/]embed|player.vimeo.com[/]video|fast.vistia.net|production.presstogo.com|' +
      '.*.dnvgl.com|.*.azureedge.net|.*.veracity.com|.*.dnv.com' +
    ')' +
  ')'
);

// TODO: Move into reusable module  
function glueLines(strArray) {
  // 60 characters is a good match for Sanity's field description display width.
  let cutoff = 60, resultStr = [];
  
  // Loop throgh the strings "glueing" the first words together in each of them.
  console.log('HEPP: ' + strArray);
  strArray.forEach( function(str) {
    let words = str.split(/[ \s]+/);
    
    // Find cutoff position, leaving a minimum of 5 words to "glue".
    let totLen = str.length, i = words.length;
    while (totLen > cutoff && i-- > 5 ) {
      totLen -= words[i].length + 1; // +1 for space between words
    }
    
   // Glue words before cutoff point together using non breaking spaces, '\u00a0'
    resultStr.push( words.slice(0, i).join('\u00a0') )
    
    // Use space between the rest.
    if (i < words.length) {
      resultStr.push( words.slice(i, 999).join(' ') )
    }
  });
  
  // Return everything as one string.
  return resultStr.join(' ');
}


// ============================================================================
// PRODUCT DETAILS
// ============================================================================
// Referenced by 'Product', this document type stores the content making up the
// product presentation and details about the providers purchase flow handling.
// Providers will be granted access to edit this document type.

export default {
  name: 'productDetails',
  title: 'Product details',
  type: 'document',
  icon: prodIcon,

  fieldsets: [
    {name: 'termFS',              title: 'Legal terms (expandable)',         options: {collapsible: true, collapsed: true}},
    {name: 'emailNotificationFS', title: 'Email notifications (expandable)', options: {collapsible: true, collapsed: true}},
    {name: 'purchaseHandlingFS',  title: 'Purchase handling (expandable)',   options: {collapsible: true, collapsed: true}}
  ],

  fields: [

    // Product name
    {
      name: 'name', title: 'Name', description: 'Product name used as page heading.',
      type: 'string'
    },


    // MAIN IMAGE BANNER
    // ========================================================================

    {
      name: 'banner',
      title: 'Banner image and video',
      type: 'object',

      fieldsets: [
        {name: 'bannerOptionsFS', title: 'Text and video options (expandable)', options: {collapsible: true, collapsed: true}},
      ],
    
      fields: [
        {
          name: 'image', title: 'Banner image',
          description: 'Main product image used in page heading. Image must support wide letterbox format.',
          type: 'image', options: { hotspot: true }
          // TODO: Add caption etc.
        },
        {
          name: 'text', title: 'Banner text',
          description: 'Will be set in large type overlaying the left side of the banner image.',
          type: 'string'
        },
        // TODO: Add black text option.
        // TODO: User story: Handle option not set.
        {
          name: 'overlay', title: 'Increase text contrast',
          description: 'Apply a transparent overly behind the banner image text to emphasize legibility.',
          fieldset: 'bannerOptionsFS',
          type: 'string', options: {
            list: [
              {title: 'No overlay',     value: 'none'},
              {title: 'Slight overlay', value: 'slight'},
              {title: 'Medium overlay', value: 'medium'},
            ],
            layout: 'radio', direction: 'horizontal'
          }
        },
        {
          name: 'video', title: 'Optional video URL',
          description: glueLines([
            'Will add a "play video" button on top of the banner image if URL is specified.',
            'For Youtube, use the Embed URL (https://www.youtube.com/embed/<id>).',
            'For Vimeo, use the Player URL (https://player.vimeo.com/video/<id>).',
            'Also supports Dailymotion, Vistia and Presstogo.'
          ]),
          fieldset: 'bannerOptionsFS',
          type: 'url',

          // TODO: Make rule reusable and apply to section video fields too.
          validation: Rule => Rule.regex(videoUrlRexEx, { name: 'Video URL' })
        },
      ]
    },


    // PRODUCT FEATURE HIGHLIGHTS
    // ========================================================================

    {
      name: 'features', title: 'Product feature highlights',
      description: '3 highlighted product features illustrated with small icons.',
      validation: Rule => Rule.required().length(3),
      type: 'array', of: [

        // Predefined icons
        {
          name: 'predefinedIcon',
          title: 'Select standard feature icon (recommended)',
          type: 'object',
          fields: [
            {
              name: 'standardIcon', title: 'Feature icon',
              description: 'Select a feature icon to illustrate this product feature.',
              type: 'reference', to: [ {type: 'productIcon'} ],
              validation: Rule => Rule.required()
            },
            featureDescrField
          ],
          preview: {
            select: {media: 'standardIcon.image', title: 'description'}
          }
        },

        // Uploaded, product specific icons
        {
          name: 'uploadedIcon',
          title: 'Upload a custom feature icon file',
          type: 'object',
          fields: [
            {
              name: 'image', title: 'Feature icon',
              description:
                'Upload a small feature icon to illustrate this product feature. ' +
                'The file should have white or transparent background.',
              type: 'image',
              validation: Rule => Rule.required()
            },
              featureDescrField
          ],
          preview: {
            select: {media: 'image', title: 'description'}
          }
        }
      ]
    },


    // PRODUCT DETAIL SECTIONS (ALTERNATING LEFT AND RIGHT IMAGES)
    // ========================================================================

    {
      name: 'sections',
      title: 'Product detail sections',
      description: 'Add 2-5 sections describing the product.',
      type: 'array', of: [
        {
          name: 'section', title: 'Section',
          type: 'object',        
          fields: [
            {
              name: 'image',
              title: 'Section image',
              description: 'Main product image used in page heading. Image must support wide letterbox format.', // TODO
              type: 'image', options: { hotspot: true }
              // TODO: Add caption etc.
            },
            {
              name: 'text',
              title: 'Section text',
              description: 'Leave empty if no product specific terms apply.', // TODO
              type: 'array', of: [{type: 'block'}],
              validation: Rule => Rule.required()
            },
            {
              name: 'video',
              title: 'Optional video URL',
              description: 'Will add a "play video" button on top of the banner image if URL is specified.',
              type: 'url'  // TODO: Add validation
            }
          ],
          preview: {
            select: {media: 'image', blocks: 'text' },
            prepare(selection) {
              const {media, blocks} = selection
              const block = (blocks || []).find(block => block._type === 'block')
              return {
                media: media,
                title: block
                  ? block.children
                    .filter(child => child._type === 'span')
                    .map(span => span.text)
                    .join('')
                  : 'No title'
                  // TODO: Add subtitle for video: "Video: https://youtube..." denoting sections with video?
                }
            }
          }
        },
      ]
    },


    // ADDITIONAL INFORMATION LINKS
    // ========================================================================

    // TODO: Add header text field

    {
      name: 'additionalInfo', title: 'Additional product information (optional)',
      description: 'Links to external information resources illustrated with icons.',
      validation: Rule => Rule.max(10),  // TODO: Max 4? Giulia?
      type: 'array', of: [
        {
          name: 'additionalInfoLink',
          title: 'Link to additional product information',
          type: 'object',
          fields: [
            // TODO: User story task: Add caption based on this text for icon.
            {
              name: 'title', title: 'Link title',
              // description: 'Short title for this link.',  // TODO
              type: 'string',
              validation: Rule => Rule.required().max(50)
            },
            {
              name: 'description', title: 'Link description',
              // description: 'Short description for this link.',  // TODO
              type: 'string',
              validation: Rule => Rule.max(85)
            },
            {
              name: 'standardIcon', title: 'Link icon',
              description: 'Select an icon to illustrate this link.',
              type: 'reference', to: [ {type: 'productIcon'} ],
              validation: Rule => Rule.required()
            },
            {
              name: 'URL', title: 'Link URL',
              description: 'Please provide a full URL starting with "http://" or "https://".',
              type: 'url',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {media: 'standardIcon.image', title: 'title', subtitle: 'description'}
          }
        }
      ]
    },


    // TERMS OF USE
    // ========================================================================

    {
      name: 'termsOfUse',
      title: 'Terms of use',
      description: 'Leave empty if no product specific terms apply.',
      fieldset: 'termFS',
      type: 'array', of: [{type: 'block'}]
    },


    // PURCHASE HANDLING
    // ========================================================================

    // INFORMATION REQUESTS

    {
      name: 'requestHandlerEmails', title: 'Request handler emails', description: 'These emails will receive request for information and price quote emails.',
      fieldset: 'purchaseHandlingFS',
      type: 'array', of: [ { type: 'mailRecipient' } ]
    },

  ],


  // PRODUCT PREVIEW
  // ==========================================================================

  preview: {
    select: {title: 'name', providerName: 'provider.name', providerCountry: 'provider.country.name', media: 'banner.image'},
    prepare(selection) {
      const {title, providerName, providerCountry, media} = selection
      return {
        title: title,
        subtitle: `${providerName ? providerName : 'Unknown'}${providerCountry ? ', ' + providerCountry : ''}`,
        // subtitle: providerName,
        media : media
      }
    }
  }
}
