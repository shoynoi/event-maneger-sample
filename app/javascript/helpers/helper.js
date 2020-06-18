// メソッド内部でthisを参照していないメソッドをヘルパーとして切り出した
// https://eslint.org/docs/rules/class-methods-use-this
export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const validateEvent = (event) => {
  const errors = {};

  if (event.event_type === '') {
    errors.event_type = 'You must enter an event type';
  }

  if (event.event_date === '') {
    errors.event_date = 'You must enter a valid date';
  }

  if (event.title === '') {
    errors.event_title = 'You must enter a title';
  }

  if (event.speaker === '') {
    errors.event_speaker = 'You must enter at least one speaker';
  }

  if (event.host === '') {
    errors.event_host = 'You must enter at least one host';
  }

  return errors;
};

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};