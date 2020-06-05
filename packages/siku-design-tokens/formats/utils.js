// getPalette('color-ink-lightest') -> 'ink'
const getPalette = (name) =>
  name
    .replace('color-', '')
    .split('-')
    .shift();

// getShade('color-ink-lightest') -> 'lightest'
// getShade('color-ink') -> 'base'
const getShade = (name) => {
  const nameWithoutPrefix = name.replace('color-', '');
  const shade = nameWithoutPrefix.split('-').pop();
  if (shade === nameWithoutPrefix) {
    return 'base';
  } else {
    return shade;
  }
};

const getBreakpoint = (name) =>
  name
    .replace('breakpoint-', '')
    .split('-')
    .shift();

// getShade('color-ink-lightest') -> 'lightest'
// getShade('color-ink') -> 'base'
const getBreakpointName = (name) => {
  const nameWithoutPrefix = name.replace('breakpoint-', '');
  const value = nameWithoutPrefix.split('-').pop();

  return value;
};


const kebabToCamel = (str) => {
  return str.replace(/-([a-z|0-9])/g, (g) => g[1].toUpperCase() );
}

const kebabToFriendly = (str) => {
  let r = str.replace(/-([a-z|0-9])/g, (g) => ` ${g[1].toUpperCase()}` );
  return r.charAt(0).toUpperCase() + r.slice(1);
}
/**
 * Returns a camel cased name from a kebab cased string,
 * with a period(.) before token variant
 * @example
 *   getCommonJsName('font-size-500', 'font-size')
 *   // 'fontsize_500'
 */
const getCommonJsName = (str, type) => {
  const variantOrPalette = str.replace(`${type}-`, '');
  const parts = variantOrPalette.split('-');

  const prefix = kebabToCamel(type);
  const getVariant = (str) => str === 'base' ? '' : `_${str}`

  if (parts.length === 1) {
    return `${prefix}${getVariant(parts.pop())}`
  }

  return `${prefix}_${parts[0]}${getVariant(parts.pop())}`
}

module.exports = {
  getPalette,
  getShade,
  getBreakpoint,
  getBreakpointName,
  getCommonJsName,
  kebabToCamel,
  kebabToFriendly
};
