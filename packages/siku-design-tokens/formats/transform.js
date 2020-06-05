const theo = require("theo");
const Color = require("color");

module.exports = theo => {
  theo.registerValueTransform(
    "color/hsl",
    prop => prop.get("type") === "color",
    prop => {
      const color = Color(prop.get("value"));
      return color.hsl().string(0);
    },
  );

  theo.registerValueTransform(
    "emValue/web",
    prop => prop.get("type") === "media-query",
    prop => (prop.get("value") / 16) + "rem",
  );

  theo.registerValueTransform(
    "timing/web",
    prop => prop.get("type") === "timing",
    prop => prop.get("value") + "ms",
  );

  theo.registerTransform("web", ['emValue/web", "pxValue/web", "timing/web"]);
}
