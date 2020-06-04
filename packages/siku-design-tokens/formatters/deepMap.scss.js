const { deepMapGet } = require('./templates');
const { groupByCategory, getName } = require('./utils');
const sortTokens = require('./sort-tokens');

function deepMap(result) {
  const { props, options } = sortTokens(result.toJS());

  const basename = options.prefix;
  const categories = groupByCategory(props, options.prefix);


  const renderCategories = category => {
    return `${category}: (
      ${props.filter((props) => props.name.includes(category)).map((prop) =>
        `${getName(prop.name, options.prefix)}: ${prop.value}`)
      }
    )`
  }

  return `
    $${options.prefix}-map: (
      ${Object.keys(categories).map(renderCategories)}
    ) !default;
    ${deepMapGet(basename)}
  `;
};

module.exports = deepMap;
