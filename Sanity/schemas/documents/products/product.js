import prodIcon    from 'react-icons/lib/fa/cube'
import keyIcon     from 'react-icons/lib/go/key'
import serviceIcon from 'react-icons/lib/md/desktop-mac'
import dataIcon    from 'react-icons/lib/go/database'
import internalFields from '../../objects/internalFields'


// ============================================================================
// PRODUCT
// ============================================================================
// This is the Product "head" which links to the other product parts such as
// the Product information. The split is made to restrict provider access to
// the central product fields in this document type, so providers can only
// access the Product information for their products.

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: prodIcon,

  fieldsets: [
    {name: 'termFS',              title: 'Legal terms (expandable)',         options: {collapsible: true, collapsed: true}},
    {name: 'emailNotificationFS', title: 'Email notifications (expandable)', options: {collapsible: true, collapsed: true}},
    {name: 'purchaseHandlingFS',  title: 'Purchase handling (expandable)',   options: {collapsible: true, collapsed: true}}
  ],

  fields: [


    // GENERAL FIELDS
    // ========================================================================

    // Internal name
    {
      name: 'name', title: 'Internal name',
      description: 'Product name for the Marketplace is specified in the Product details referenced below.',
      type: 'string'
    },

    // Product type
    {
      name: 'type',
      title: 'Product type',
      type: 'string', options: {
        list: [
          {title: 'Software as a Service (SaaS)',   value: 'service'},
          {title: 'Data set',                       value: 'data'},
          {title: 'API',                            value: 'API'},
          {title: 'Consulting',                     value: 'consulting'},
        ],
        layout: 'grid' //, direction: 'horizontal'  // TODO
      }
    },

    // URL path
    {
      name: 'urlSlug',
      title: 'URL slug',
      description: 'Unique URL path for the product to aid search engine visibility.', // TODO: Extend description: https://support.squarespace.com/hc/en-us/articles/205814578-Changing-URL-slugs
      type: 'slug',
      options: { source: 'name', maxLength: 100 }
    },

    // Product reference
    {
      name: 'productDetails',
      title: 'Product details',
      description:
       `Reference to the Product details document maintained by the provider. 
        This is the party with whom customers enters into a contract when purchasing through the Markletplace.`,
      type: 'reference', to: {type: 'productDetails'}
    },

    {
      name: 'provider',
      title: 'Product provider',
      description:
       `Reference to the legal owner and provider of this product. 
        This is the party with whom customers enters into a contract when purchasing through the Markletplace.`,
      type: 'reference', to: {type: 'provider'}
    },


    // PRODUCT VARIANTS
    // ========================================================================

    {
      name: 'productVariants',
      title: 'Product variants',
      description: 'Product variants ...',
      type: 'array', of: [
        {
          name: 'variant',
          title: 'Product variant',
          icon: prodIcon,
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Variant name',
              description: 'Will be used to present the variants in the Marketplace.',
              type: 'string'
            },
            {
              name: 'description', title: 'Short description', description: 'Will be used to present the variants in the Marketplace.',
              type: 'string'
            },
            {
              // TODO: Convert to array, as all products can have multiple payment types: 1 mth. subscr. / 1 year subscr. / etc.
              // Allow card payment or not? Amount limit for creditcards? Maybe on product level, not variant level.
              // How about trial version? Handle trial on product level?
              // OR: Have a checkbox on the variants to signify that teh variant/feature is included in the trial.
              // Trial: maybe best as a separate definition. Store email/account in trial contracts, so that trials cannot be repeated.
              // But how to extens trial periods? Do we need to extend contract periods? (Nah. immutable.) Instead, maybe a provider 
              // portal feature to set up/invite to trial, which creates a contract.
              name: 'purchaseType',
              title: 'Purchase type',
              type: 'string', options: {
                list: [
                  {title: 'Free',                           value: 'free'},
                  {title: 'Time limited trial',             value: 'trial'},
                  {title: 'Subscription',                   value: 'subscription'},
                  {title: 'Subscription with trial period', value: 'subscriptionWithTrial'},
                  {title: 'One time purchase',              value: 'oneTimePurchase'}
                ],
                layout: 'grid' //, direction: 'horizontal'  // TODO
              }
            },
            {
              name: 'ownership',
              title: 'Ownership',
              type: 'string', options: {
                list: [
                  {title: 'Personal',       value: 'personal'},
                  {title: 'Company/group',  value: 'group'}  // NOTE: Cannot provisdion containerts at a company level yet!!
                ],
                layout: 'radio', direction: 'horizontal'
              }
            },
            {
              name: 'availability',
              title: 'Availability',
              description: 'Controls what channels this Product variant can be purchased through.',
              type: 'array', of: [{type: 'string'}], options: {
                list: [
                  {title: 'Marketplace',       value: 'marketplace'},
                  {title: 'In-app purchases',  value: 'inAppPurchase'}
                ]
              }
            },


            // Provisioning

            {
              name: 'provisioning',
              title: 'Provisioning',
              description: 'Controls what needs to be provisioned for this Product variant.',
              icon: serviceIcon,
              type: 'array', of: [

                // Provisioning of Veracity service
                {
                  name: 'veracityService', title: 'Veracity service', description: 'Describes how to provision the service.',
                  type: 'object', fields: [
                    {
                      name: 'serviceId', title: 'Service ID', description: 'Identifies a Veracity service to be provisioned.',
                      type: 'string'
                    },
                    {
                      name: 'autoProvision', title: 'Provision service automatically', description: 'This will provision the service in Veracity without waiting for customer vetting.',
                      type: 'boolean'
                    },
                    {
                      name: 'subscriptionProperties', title: 'Subscription properties',
                      description: 'Identifies subscription properties to be set when provisioning this Product variant. Leave empty if creating the subscription is enough.',
                      type: 'array', of: [
                        {
                          name: 'subscriptionProperty', title: 'Property',
                          icon: keyIcon,
                          type: 'object', fields: [ {
                              name: 'propertyId', title: 'Property identifier', type: 'string'
                          } ]
                        }
                      ]
                    }
                  ],
                  preview: {
                    select: {serviceId: 'serviceId', properties: 'subscriptionProperties'},
                    prepare(selection) {
                      const {serviceId, properties} = selection
                      return {
                        title: `Service ${serviceId}`,
                        subtitle: properties.map(function(prop) { return prop['propertyId'] }).join(', '),
                        media: serviceIcon
                      }
                    }
                  }
                },

                // Provisioning of Veracity data set
                {
                  name: 'veracityDataSet', title: 'Veracity data set', description: 'Describes how to provision the data set.',
                  icon: dataIcon,
                  type: 'object', fields: [
                    {
                      name: 'containerId', title: 'Container ID', description: 'Identifies a Veracity Data Container to be provisioned.',
                      type: 'string'
                    }
                  ]
                }

              ]
            }

          ]
        }
      ]
    },


    // TODO: Fields to add / User story tasks
    // * State, e.g. "private preview", beta version, etc.


    // PURCHASE HANDLING
    // ========================================================================

    // INFORMATION REQUESTS

    {
      name: 'requestHandlerEmails', title: 'Request handler emails', description: 'These emails will receive request for information and price quote emails.',
      fieldset: 'purchaseHandlingFS',
      type: 'array', of: [ { type: 'mailRecipient' } ]
    },


    // INTERNAL FIELDS
    // ========================================================================

    internalFields,

  ],


  // PRODUCT PREVIEW
  // ==========================================================================

  preview: {
    select: {title: 'name', providerName: 'provider.name', providerCountry: 'provider.country.name', media: 'productDetails.banner.image'},
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
