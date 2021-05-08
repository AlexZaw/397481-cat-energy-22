const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const csso = require('postcss-csso');
const postcssUrl = require('postcss-url');
const autoprefixer = require('autoprefixer');
const svgsprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const sync = require('browser-sync').create();
const del = require('del');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const concat = require('gulp-concat');

//Clean

const clean = () => {
  return del('build');
}

// Svg stack

const svgstack = () => {
  del('build/img/stack.svg');
  return gulp.src('source/img/icons/**/*.svg')
    .pipe(plumber())
    .pipe(svgsprite({
      mode: {
        stack: {}
      }
    }))
    .pipe(rename('stack.svg'))
    .pipe(gulp.dest('build/img'));
}
exports.svgstack = svgstack;

// Copy

const copy = () => {
  return gulp.src([
    'source/fonts/*.{woff,woff2}',
    'source/*.ico',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  }).pipe(gulp.dest('build'));
}
exports.copy = copy;

//Copy images

const copyImages = () => {
  return gulp.src([
    'source/img/**/*.{jpg,png,svg}',
    '!source/img/icons/*'
  ])
    .pipe(gulp.dest('build/img'));
}
exports.copyImages = copyImages;

// Opimize images

const optimizeImages = () => {
  return gulp.src([
    'source/img/**/*.{jpg,png,svg}',
    '!source/img/icons/*'
  ])
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest('build/img'));
}
exports.optimizeImages = optimizeImages;

// Create WebP

const createWebp = () => {
  return gulp.src([
    'source/img/**/*.{jpg,png}',
    '!source/img/favicons/*',
    '!source/img/common/map-pin.png'

  ])
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('build/img'));
}
exports.createWebp = createWebp;

// HTML minify

const html = () => {
  return gulp.src('source/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Styles

const styles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      postcssUrl({
        assetsPath: '../'
      }),
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}
exports.styles = styles;

// JS minify

const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('build/js'))

}
exports.scripts = scripts;
const concatJs = () => {
  return gulp.src('source/js/concat/*.js')
  .pipe(concat('app.min.js'))
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
}

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

//Reload

const reload = (done) => {
  sync.reload();
  done();
}
// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/img/icons/**/*.svg', gulp.series(svgstack, reload));
  gulp.watch('source/*.html', gulp.series(html, reload));
  gulp.watch('source/js/**/*.js', gulp.series(scripts, reload));
}

// Build

const build = gulp.series(
  clean,
  svgstack,
  gulp.parallel(
    copy,
    optimizeImages,
    createWebp,
    html,
    styles,
    scripts,
    concatJs
  )
);
exports.build = build;

//Default

exports.default = gulp.series(
  clean,
  svgstack,
  gulp.parallel(
    copy,
    copyImages,
    createWebp,
    html,
    styles,
    scripts,
    concatJs
  ),
  gulp.series(
    server,
    watcher
  )
);
