const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');


gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "docs"
        }
    });

    gulp.watch("docs/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
        return gulp.src("docs/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("docs/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("docs/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("docs/*.html").on('change', gulp.parallel('html'));
    gulp.watch("docs/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("docs/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("docs/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("docs/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("docs/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("docs/"));
});

gulp.task('scripts', function () {
    return gulp.src("docs/js/**/*.js")
        .pipe(gulp.dest("docs/js"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src("docs/fonts/**/*")
        .pipe(gulp.dest("docs/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src("docs/icons/**/*")
        .pipe(gulp.dest("docs/icons"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("docs/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("docs/img"))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'html', 'images'));