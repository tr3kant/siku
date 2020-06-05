const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const theo = require('theo');
const gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();

theo.registerFormat(
  'breakpoint-map.scss',
  require('./formats/breakpoint-map.scss'),
);

theo.registerFormat('color-map.scss', require('./formats/color-map.scss.js'));
theo.registerFormat('map.scss', require('./formats/map.scss'));
theo.registerFormat('common.js', require('./formats/common.js'));

theo.registerTransform('web', ['color/hex']);
theo.registerTransform('docs', ['color/hex']);

const colorFormats = [{transformType: 'web', formatType: 'color-map.scss'}];
const breakpointFormats = [{transformType: 'web', formatType: 'breakpoint-map.scss'}];
const mapFormatsSources = [
  { src: './tokens/global/border-radius.yml' },
  { src: './tokens/global/box-shadow.yml' },
  { src: './tokens/global/colors.yml' },
  { src: './tokens/global/font-families.yml' },
  { src: './tokens/global/font-weight.yml' },
  { src: './tokens/global/spacing.yml' },
  { src: './tokens/global/spacing-layout.yml' },
  { src: './tokens/global/z-index.yml' }

];

const indexFormats = ['scss', 'common.js'];

// Hack to ensure Sass maps are prefixed with `polaris-`
// (Theo relies on the filename to name all Sass maps)
const addPrefix = {prefix: 'siku--'};

const removePrefix = (gulpRenameOptions) => {
  gulpRenameOptions.basename = gulpRenameOptions.basename.replace(
    'siku--',
    '',
  );
  return gulpRenameOptions;
};

gulp.task('color-formats', (done) => {
  colorFormats.map(({transformType, formatType}) =>
    gulp
      .src('tokens/global/base-colors.yml')
      .pipe($.rename(addPrefix))
      .pipe(
        $.theo({
          transform: {type: transformType, includeMeta: true},
          format: {type: formatType},
        }),
      )
      .pipe($.rename(removePrefix))
      .on('error', (err) => {
        throw new Error(err);
      })
      .pipe(gulp.dest('dist')),
  );
  done();
});

gulp.task('breakpoint-formats', (done) => {
  breakpointFormats.map(({transformType, formatType}) =>
    gulp
      .src('tokens/global/grid-breakpoints.yml')
      .pipe($.rename(addPrefix))
      .pipe(
        $.theo({
          transform: {type: transformType, includeMeta: true},
          format: {type: formatType},
        }),
      )
      .pipe($.rename(removePrefix))
      .on('error', (err) => {
        throw new Error(err);
      })
      .pipe(gulp.dest('dist')),
  );
  done();
});

gulp.task('map-formats', (done) => {
  mapFormatsSources.map(({ src }) => {
    gulp.src(src)
      .pipe($.rename(addPrefix))
      .pipe(
        $.theo({
          transform: {type: 'web', includeMeta: true},
          format: { type: 'map.scss' }
        }),
      )
      .pipe($.rename(removePrefix))
      .on('error', (err) => {
        throw new Error(err);
      })
      .pipe(gulp.dest('dist'))
  });
  done();
});


gulp.task('index', (done) => {
  indexFormats.map((type) => {
    gulp.src('tokens/global/index.yml')
      .pipe(
        $.theo({
          transform: { type: 'web' },
          format: { type }
        })
      )
      .on('error', (err) => {
        throw new Error(err);
      })
      .pipe(gulp.dest('dist'))
  });
  done();
});

// gulp.task('docs', () => {
//   return gulp.src('tokens/global/index.yml')
//     .pipe(
//       $.theo({
//         transform: { type: 'docs' },
//         format: {
//           type: 'html',
//           options: { transformPropName: (a) => a }
//         }
//       })
//     )
//     .pipe(gulp.dest('docs'))
// });


// gulp.task('serve', () => {
//   browserSync.init({ server: { baseDir: 'docs' }});
//   gulp.watch('tokens/global/*.yml', gulp.task('docs')).on('change', browserSync.reload);
// });


exports.default = gulp.series('color-formats', 'breakpoint-formats', 'map-formats', 'index');
