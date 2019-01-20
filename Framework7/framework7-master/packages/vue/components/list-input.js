import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-list-input',
  props: Object.assign({
    id: [String, Number],
    sortable: Boolean,
    media: String,
    tag: {
      type: String,
      default: 'li'
    },
    input: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    value: [String, Number, Array],
    defaultValue: [String, Number, Array],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
    placeholder: String,
    inputId: [String, Number],
    size: [String, Number],
    accept: [String, Number],
    autocomplete: [String],
    autocorrect: [String],
    autocapitalize: [String],
    spellcheck: [String],
    autofocus: Boolean,
    autosave: String,
    max: [String, Number],
    min: [String, Number],
    step: [String, Number],
    maxlength: [String, Number],
    minlength: [String, Number],
    multiple: Boolean,
    inputStyle: [String, Object],
    pattern: String,
    validate: [Boolean, String],
    tabindex: [String, Number],
    resizable: Boolean,
    clearButton: Boolean,
    noFormStoreData: Boolean,
    noStoreData: Boolean,
    ignoreStoreData: Boolean,
    errorMessage: String,
    errorMessageForce: Boolean,
    info: String,
    label: [String, Number],
    inlineLabel: Boolean,
    floatingLabel: Boolean
  }, Mixins.colorProps),

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
      return {
        isSortable: props.sortable,
        inputFocused: false,
        inputInvalid: false
      };
    })();

    return {
      state
    };
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const {
      inputFocused,
      inputInvalid
    } = self.state;
    const props = self.props;
    const {
      id,
      style,
      className,
      sortable,
      media,
      input: renderInput,
      tag,
      type,
      name,
      value,
      defaultValue,
      readonly,
      required,
      disabled,
      placeholder,
      inputId,
      size,
      accept,
      autocomplete,
      autocorrect,
      autocapitalize,
      spellcheck,
      autofocus,
      autosave,
      max,
      min,
      step,
      maxlength,
      minlength,
      multiple,
      inputStyle,
      pattern,
      validate,
      tabindex,
      resizable,
      clearButton,
      noFormStoreData,
      noStoreData,
      ignoreStoreData,
      errorMessage,
      errorMessageForce,
      info,
      label,
      inlineLabel,
      floatingLabel
    } = props;
    const domValue = self.domValue();
    const inputHasValue = self.inputHasValue();
    const isSortable = sortable || self.state.isSortable;

    const createInput = (InputTag, children) => {
      const needsValue = type !== 'file';
      const needsType = InputTag === 'input';
      const inputClassName = Utils.classNames({
        resizable: type === 'textarea' && resizable,
        'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
        'input-invalid': errorMessage && errorMessageForce || inputInvalid,
        'input-with-value': inputHasValue,
        'input-focused': inputFocused
      });
      let input;
      let inputValue;

      if (needsValue) {
        if (typeof value !== 'undefined') inputValue = value;else inputValue = domValue;
      }

      const valueProps = {};
      if ('value' in props) valueProps.value = inputValue;
      if ('defaultValue' in props) valueProps.defaultValue = defaultValue;
      {
        input = _h(InputTag, {
          ref: 'inputEl',
          style: inputStyle,
          class: inputClassName,
          domProps: Object.assign({
            disabled,
            readOnly: readonly,
            multiple,
            required
          }, valueProps),
          on: {
            focus: self.onFocus,
            blur: self.onBlur,
            input: self.onInput,
            change: self.onChange
          },
          attrs: {
            name: name,
            type: needsType ? type : undefined,
            placeholder: placeholder,
            id: inputId,
            size: size,
            accept: accept,
            autocomplete: autocomplete,
            autocorrect: autocorrect,
            autocapitalize: autocapitalize,
            spellcheck: spellcheck,
            autofocus: autofocus,
            autoSave: autosave,
            max: max,
            maxlength: maxlength,
            min: min,
            minlength: minlength,
            step: step,
            pattern: pattern,
            validate: typeof validate === 'string' && validate.length ? validate : undefined,
            'data-validate': validate === true || validate === '' ? true : undefined,
            tabindex: tabindex,
            'data-error-message': errorMessageForce ? undefined : errorMessage
          }
        }, [children]);
      }
      return input;
    };

    let inputEl;

    if (renderInput) {
      if (type === 'select' || type === 'textarea' || type === 'file') {
        if (type === 'select') {
          inputEl = createInput('select', self.$slots.default);
        } else if (type === 'file') {
          inputEl = createInput('input');
        } else {
          inputEl = createInput('textarea');
        }
      } else {
        inputEl = createInput('input');
      }
    }

    const hasErrorMessage = !!errorMessage || self.$slots['error-message'] && self.$slots['error-message'].length;
    const ItemTag = tag;
    return _h(ItemTag, {
      ref: 'el',
      style: style,
      class: Utils.classNames(className, {
        disabled
      }, Mixins.colorClasses(props)),
      attrs: {
        id: id
      }
    }, [this.$slots['root-start'], _h('div', {
      class: Utils.classNames('item-content item-input', {
        'inline-label': inlineLabel,
        'item-input-focused': inputFocused,
        'item-input-with-info': !!info || self.$slots.info && self.$slots.info.length,
        'item-input-with-value': inputHasValue,
        'item-input-with-error-message': hasErrorMessage && errorMessageForce || inputInvalid,
        'item-input-invalid': hasErrorMessage && errorMessageForce || inputInvalid
      })
    }, [this.$slots['content-start'], (media || self.$slots.media) && _h('div', {
      class: 'item-media'
    }, [media && _h('img', {
      attrs: {
        src: media
      }
    }), this.$slots['media']]), _h('div', {
      class: 'item-inner'
    }, [this.$slots['inner-start'], (label || self.$slots.label) && _h('div', {
      class: Utils.classNames('item-title item-label', {
        'item-floating-label': floatingLabel
      })
    }, [label, this.$slots['label']]), _h('div', {
      class: Utils.classNames('item-input-wrap', {
        'input-dropdown': type === 'select'
      })
    }, [inputEl, this.$slots['input'], hasErrorMessage && errorMessageForce && _h('div', {
      class: 'item-input-error-message'
    }, [errorMessage, this.$slots['error-message']]), clearButton && _h('span', {
      class: 'input-clear-button'
    }), (info || self.$slots.info) && _h('div', {
      class: 'item-input-info'
    }, [info, this.$slots['info']])]), this.$slots['inner'], this.$slots['inner-end']]), this.$slots['content'], this.$slots['content-end']]), isSortable && _h('div', {
      class: 'sortable-handler'
    }), this.$slots['root'], this.$slots['root-end']]);
  },

  watch: {
    'props.value': function watchValue() {
      const self = this;
      if (!self.$f7) return;
      self.updateInputOnDidUpdate = true;
    }
  },

  created() {
    const self = this;
    self.onChange = self.onChange.bind(self);
    self.onInput = self.onInput.bind(self);
    self.onFocus = self.onFocus.bind(self);
    self.onBlur = self.onBlur.bind(self);
    self.onTextareaResize = self.onTextareaResize.bind(self);
    self.onInputNotEmpty = self.onInputNotEmpty.bind(self);
    self.onInputEmpty = self.onInputEmpty.bind(self);
    self.onInputClear = self.onInputClear.bind(self);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    self.$f7ready(f7 => {
      const {
        validate,
        resizable,
        value,
        defaultValue,
        type
      } = self.props;
      const inputEl = self.$refs.inputEl;
      if (!inputEl) return;
      inputEl.addEventListener('input:notempty', self.onInputNotEmpty, false);
      inputEl.addEventListener('textarea:resze', self.onTextareaResize, false);
      inputEl.addEventListener('input:empty', self.onInputEmpty, false);
      inputEl.addEventListener('input:clear', self.onInputClear, false);

      if ((validate || validate === '') && (typeof value !== 'undefined' && value !== null && value !== '' || typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')) {
        setTimeout(() => {
          self.validateInput(inputEl);
        }, 0);
      }

      if (type === 'textarea' && resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    });
    self.$listEl = self.$$(el).parents('.list, .list-group').eq(0);

    if (self.$listEl.length) {
      self.setState({
        isSortable: self.$listEl.hasClass('sortable')
      });
    }
  },

  updated() {
    const self = this;
    const {
      $listEl
    } = self;
    if (!$listEl || $listEl && $listEl.length === 0) return;
    const isSortable = $listEl.hasClass('sortable');

    if (isSortable !== self.state.isSortable) {
      self.setState({
        isSortable
      });
    }

    const {
      validate,
      resizable,
      type
    } = self.props;
    const f7 = self.$f7;
    if (!f7) return;

    if (self.updateInputOnDidUpdate) {
      const inputEl = self.$refs.inputEl;
      if (!inputEl) return;
      self.updateInputOnDidUpdate = false;

      if (validate) {
        self.validateInput(inputEl);
      }

      if (type === 'textarea' && resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    }
  },

  beforeDestroy() {
    const self = this;
    const inputEl = self.$refs.inputEl;
    if (!inputEl) return;
    inputEl.removeEventListener('input:notempty', self.onInputNotEmpty, false);
    inputEl.removeEventListener('textarea:resze', self.onTextareaResize, false);
    inputEl.removeEventListener('input:empty', self.onInputEmpty, false);
    inputEl.removeEventListener('input:clear', self.onInputClear, false);
  },

  methods: {
    domValue() {
      const self = this;
      const {
        inputEl
      } = self.$refs;
      if (!inputEl) return undefined;
      return inputEl.value;
    },

    inputHasValue() {
      const self = this;
      const {
        value
      } = self.props;
      const domValue = self.domValue();
      return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
    },

    validateInput(inputEl) {
      const self = this;
      const f7 = self.$f7;
      if (!f7 || !inputEl) return;
      const validity = inputEl.validity;
      if (!validity) return;

      if (!validity.valid) {
        if (self.state.inputInvalid !== true) {
          self.setState({
            inputInvalid: true
          });
        }
      } else if (self.state.inputInvalid !== false) {
        self.setState({
          inputInvalid: false
        });
      }
    },

    onTextareaResize(event) {
      this.dispatchEvent('textarea:resize textareaResize', event);
    },

    onInputNotEmpty(event) {
      this.dispatchEvent('input:notempty inputNotEmpty', event);
    },

    onInputEmpty(event) {
      this.dispatchEvent('input:empty inputEmpty', event);
    },

    onInputClear(event) {
      this.dispatchEvent('input:clear inputClear', event);
    },

    onInput(event) {
      const self = this;
      const {
        validate
      } = self.props;
      self.dispatchEvent('input', event);

      if ((validate || validate === '') && self.$refs && self.$refs.inputEl) {
        self.validateInput(self.$refs.inputEl);
      }
    },

    onFocus(event) {
      this.dispatchEvent('focus', event);
      this.setState({
        inputFocused: true
      });
    },

    onBlur(event) {
      const self = this;
      const {
        validate
      } = self.props;
      self.dispatchEvent('blur', event);

      if ((validate || validate === '') && self.$refs && self.$refs.inputEl) {
        self.validateInput(self.$refs.inputEl);
      }

      self.setState({
        inputFocused: false
      });
    },

    onChange(event) {
      this.dispatchEvent('change', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    },

    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};