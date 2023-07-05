// validation
export const composeValidators =
    (...validators) =>
    value =>
        validators.reduce((error, validator) => error || validator(value), undefined);

export const required = value => (value ? undefined : 'Required');

export const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
export const match_email = value =>
    value.match(emailRegexp) ? undefined : 'Email does not match validation scheme "my@mail.com"';

export const instRegexp = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;
export const match_inst = value => (!value || value.match(instRegexp) ? undefined : 'Your name Instagram is incorrect');

export const phoneRegexp = /\(?([0-9]{3})\)?([ .-])?([0-9]{3})([ .-])?([0-9]{4})/g;
export const match_phone = value =>
    value.match(phoneRegexp) ? undefined : 'Phone does not match validation scheme (999) 999-9999';

// parse
export const normalizePhone = value => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7) return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`;
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
};

// formatter
//
