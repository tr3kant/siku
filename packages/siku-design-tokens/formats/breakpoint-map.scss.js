const path = require('path');

const groupBy = require('lodash/groupBy');

const {getBreakpoint, getBreakpointName} = require('./utils');

class CustomMap {
  constructor({props, meta}) {
    this.meta = meta;
    const propsWithPalette = props.map((prop) => {
      prop.key = getBreakpoint(prop.name);
      return prop;
    });
    this.keys = groupBy(propsWithPalette, 'key');
  }

  renderPalette(key) {
    const props = this.keys[key];
    if (!props) {
      return '';
    }
    return `
    '${key}': (
      ${props
        .filter((prop) => prop.name.includes(key))
        .map((prop) =>
          `${prop.comment ? `/* ${prop.comment} */` : ''}
            '${getBreakpointName(prop.name)}': ${prop.value}
          `.trim(),
        )
        .join(',\n')}
    )`;
  }

  render() {
    return `
    $${path.basename(this.meta.file, '.yml')}: (
      ${Object.keys(this.keys)
        .map((key) => this.renderPalette(key))
        .join(',\n')}
    );`;
  }
}

module.exports = (result) => {
  const customMap = new CustomMap(result.toJS());
  return customMap.render();
};
