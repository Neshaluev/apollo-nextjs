import moment from 'moment';

export const errorMessage = (error) => {
  return (error.graphQLErrors && error.graphQLErrors[0].message) || 'Error...';
};

export const formatDate = (date) =>
  moment.unix(date / 1000).format('DD/MM/YYYY');
export const formFormatDate = (date) =>
  moment.unix(date / 1000).format('YYYY-MM-DD');
export const fromNow = (date) => moment.unix(date / 1000).fromNow();

export const shortify = (text, maxLength = 50) => {
  if (!text) {
    return '';
  }
  if (text.length <= maxLength) {
    return text;
  }

  return text.substr(0, maxLength) + '...';
};
