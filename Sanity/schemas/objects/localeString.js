
// Defines reusable field for translations

const supportedLanguages = [
  {id: 'en',     lang: 'en',      title: 'English' }, // isDefault: true
  {id: 'es',     lang: 'es',      title: 'Spanish / Español'},
  {id: 'fr',     lang: 'fr',      title: 'French / Français'},
  {id: 'no',     lang: 'no',      title: 'Norwegian / Norsk'},
  {id: 'pt',     lang: 'pt',      title: 'Portuguese / Português'},
  {id: 'ko',     lang: 'ko',      title: 'Korean / 한국어)'},
  {id: 'zhHans', lang: 'zh-Hans', title: 'Chinese, simplified / 中文(简体)'},
  {id: 'zhHant', lang: 'zh-Hant', title: 'Chinese, traditional / 中文(繁體)'},
]

const useFieldset = supportedLanguages.find(function(element) {
  return element.isDefault;
});

export default {
  name: 'localeString',
  title: 'Localization string',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true}
    }
  ],
  fields: supportedLanguages.map(lang => (
    {
      title: `${lang.title} [${lang.lang}]`,
      name: lang.id,
      type: 'string',
      fieldset: (lang.isDefault || !useFieldset) ? null : 'translations'
    }
  ))
}