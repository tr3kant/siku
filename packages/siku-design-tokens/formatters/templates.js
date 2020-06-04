const mapGet = (basename) => `
  @function siku--${basename}($variant) {
    @if map-has-key($${basename}-map, '${basename}-#{$variant}') {
      @return map-get($${basename}-map, '${basename}-#{$variant}');
    }

    @error '${basename} #{$variant} not found.';
  }

  @mixin siku--${basename}($variant) {
    ${basename}: siku--${basename}($variant);
  }
`;


const deepMapGet = (basename) => `
  @function siku--${basename}($parent, $variant) {
    @if map-has-key($${basename}-map, $parent) {
      $parent-map: map-get($${basename}-map, $parent);
      @if map-has-key($parent-map, $variant) {
        @return map-get($parent-map, $variant);
      }
    }
    @error '${basename} '#{$parent} - #{$variant}' not found.';
  }
`;

module.exports = {
  mapGet,
  deepMapGet
};
