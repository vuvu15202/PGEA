export const WIDGETS = {
  string: [
    'Text',
    'TextArea',
    'Enum',
    'EnumButton',
    'EnumMultipleSelect',
    'RichText',
    'SingleModel',
    'ArrayModel',
    'Password',
    'Captcha',
    'JSONViewer',
    'HTML'
  ],
  boolean: ['Checkbox'],
  number: ['Text', 'Date', 'Time', 'Enum', 'EnumButton', 'EnumMultipleSelect', 'SingleModel', 'ArrayModel', 'Upload']

  // json: ['FormViewer', 'ArrayFormViewer']
}

export const BUTTON_COLORS = {
  DEFAULT: 'default',
  ERROR: 'error',
  INFO: 'info',
  INHERIT: 'inherit',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning'
}

export const BUTTON_TYPES = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  SWITCH: 'switch'
}

export const BUTTON_ACTIONS = {
  NONE: 'none',
  API: 'api',
  URL: 'url',

  // REPORT: 'report',
  FORM_MODAL: 'formModal',
  LIST_MODAL: 'listModal',
  DISABLE: 'disable'
}

export const URL_TARGETS = {
  _self: '_self',
  _blank: '_blank',
  _parent: '_parent',
  _top: '_top'
}
