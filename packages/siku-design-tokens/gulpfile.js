const gulp = require('gulp');
const gulpTheo = require('gulp-theo');
const theo = require('theo');

const deepMap = require('./formatters/deepMap.scss');
const map = require('./formatters/map.scss');
const metaJson = require('./formatters/meta.json');

// Custom formats
theo.registerFormat('deep-map.scss', deepMap);
theo.registerFormat('map.scss', map);
theo.registerFormat('meta.json', metaJson);

// Format sources
const deepMapSources = [
  { src: './tokens/global/color-base.yml', prefix: 'color' },
  { src: './tokens/global/breakpoints.yml', prefix: 'breakpoints' },
];

const scssMapSources = [
  { src: './tokens/global/font-family.yml' },
  { src: './tokens/global/font-weight.yml' },
  { src: './tokens/global/spacing.yml' },
  { src: './tokens/global/spacing-layout.yml' }
];

const tokenFormats = ['common.js', 'scss', 'meta.json'];

gulp.task('deep-map', (done) => {
  deepMapSources.map(({ src, ...options }) => {
    gulp.src(src)
      .pipe(gulpTheo({
        transform: { type: 'web', includeMeta: true },
        format: { type: 'deep-map.scss', options }
      }))
      .on('error', (err) => {
          throw new Error(err);
      })
      .pipe(gulp.dest('dist'))
  });
  done();
});

gulp.task('map', (done) => {
  scssMapSources.map(({ src }) => {
    gulp.src(src)
      .pipe(gulpTheo({
        transform: { type: 'web' },
        format: { type: 'map.scss' }
      }))
      .on('error', (err) => {
          throw new Error(err);
        })
      .pipe(gulp.dest('dist'))
  });
  done();
});


gulp.task('token', (done) => {
  tokenFormats.map((type) => {
    gulp.src('tokens/global/token.yml')
      .pipe(gulpTheo({
        transform: { type: 'web' },
        format: { type }
      }))
      .pipe(gulp.dest('dist'))
  });
  done();
});

exports.default = gulp.series('deep-map', 'map', 'token');
