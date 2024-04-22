export const valid = {
  required: {
    value: true,
    message: 'This field is required'
  },
  namesPattern: {
    value:
      /^[a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u0148\u014a-\u017f]{1}[a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u0148\u014a-\u017f ,.'-]{0,28}[a-zA-Z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u0148\u014a-\u017f.]{1}$/,
    message: 'Incorrect format'
  },
  eventNamePattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: 'Name must contain only letters and numbers'
  },
  minLength: (length: number) => {
    return {
      value: length,
      message: `The minimum number of character for this field is: ${length}`
    }
  },
  maxLength: (length: number) => {
    return {
      value: length,
      message: `The maximum number of character for this field is: ${length}`
    }
  }
}
