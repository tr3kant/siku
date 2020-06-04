function getName(name, prefix) {
  const noPrefix = name.replace(`${prefix}-`, '').split('-');
  return noPrefix.length === 1 ? 'base' : noPrefix.pop();
}

function getCategory(name, prefix) {
  return name.replace(`${prefix}-`, '').split('-').shift();
}

function groupByCategory(props, prefix) {
  const withCategory =  props.map((prop) => ({
      ...prop,
      category: getCategory(prop.name, prefix)
    }
  ));

  const groupByCategory = withCategory.reduce((acc, prop) => {
    if (!acc[prop.category]) {
      acc[prop.category] = [prop];
    } else {
      acc[prop.category].push(prop);
    }

    return acc;
  }, {});

  return groupByCategory;
}

function kebabToCamel(str) {
  return str.replace(/-([a-z|0-9])/g, (g) => g[1].toUpperCase() );
}

function kebabToFriendly(str) {
  let r = str.replace(/-([a-z|0-9])/g, (g) => ` ${g[1].toUpperCase()}` );
  return r.charAt(0).toUpperCase() + r.slice(1);
}

module.exports = {
  getCategory,
  getName,
  groupByCategory,
  kebabToCamel,
  kebabToFriendly
};
