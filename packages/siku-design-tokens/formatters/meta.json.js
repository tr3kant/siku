const path = require('path');
const { getCategory, getName, kebabToCamel, kebabToFriendly } = require('./utils');

function map(result) {
  const { props } = result.toJS();

  function renderProp(prop) {
    const scssMapGet = prop.type === 'color'
      ? `color(${getCategory(prop.name, 'color')}, ${getName(prop.name)})`
      : `${prop.type}(${getName(prop.name)})`;

    return (`{
      "category": "${prop.category}",
      "css": "--${prop.name}",
      "friendly": "${kebabToFriendly(prop.name)}",
      "javascript": "${kebabToCamel(prop.name)}",
      "name": "${prop.name}",
      "scss": "${scssMapGet}",
      "type": "${prop.type}",
      "value": "${prop.value}"
    }`);
  };

  return `[${props.map(renderProp)}]`;
};

module.exports = map;
