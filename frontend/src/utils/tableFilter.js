import _ from 'lodash';

export const matches = (options) => {
  const { source = [], target = [], ignoreCase = true } = options;
  if (_.isEmpty(target)) return true;
  if (_.isEmpty(source) && !_.isEmpty(target)) return false;

  return _.chain(source)
    .compact()
    .map((item) => (ignoreCase ? _.toLower(item) : item))
    .some((s) => {
      return _.chain(target)
        .map((item) => (ignoreCase ? _.toLower(item) : item))
        .some((t) => _.includes(s, t))
        .value();
    })
    .value();
};
export const splitLowerCase = (str, separator = ' ') => (_.isEmpty(str) ? [] : _.split(_.toLower(str), separator));
