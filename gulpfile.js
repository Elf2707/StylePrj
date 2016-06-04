var gulp = require('gulp'),
    path = require('path'),
    stylus = require('gulp-stylus'),
    ts = require('gulp-typescript'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    superTest = require('supertest'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    webpack = require('gulp-webpack'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify');

var paths = {
    backend: {
        base: './'
    },
    frontend: {
        base: './frontend',
        js: './frontend/app/**/*.js',
        ts: './frontend/app/**/*.ts',
        stylus: './frontend/public/css/**/*.styl',
        innerCss: './frontend/app/**/*.css',
        innerHtml: './frontend/app/**/*.html',
        html: './frontend/*.html'
    }
}

//Full app + vendor bundle
gulp.task('my-app-bundle', function () {
    return gulp.src('frontend/app/main.js')
        .pipe(webpack(require('./frontend/webpack.config.js')))
        .pipe(gulp.dest('frontend/public/js'))
        .pipe(livereload());
});

//webpack vendor bundle
gulp.task('vend-pol-bundle', function () {
    return gulp.src(['frontend/app/shared/vendor.ts', 'frontend/app/shared/polyfills.ts'])
        .pipe(webpack(require('./frontend/config/webpack.vendor.js')))
        .pipe(gulp.dest('frontend/public/js'))
        .pipe(livereload());
});

//Stylus
gulp.task('stylus', function () {
    return gulp.src(paths.frontend.stylus)
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('frontend/public/css'))
        .pipe(livereload());
});

//Node.js nodemone
gulp.task('server', ['my-app-bundle'], function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        watch: [paths.backend.base],
        ignore: ['./node_modules/**', './config/**', './frontend/**', './gulpfile.js']
    }).on('restart', function () {
        console.log('Server restarting');
    });
});

gulp.task('test', ()=> {
    env({vars: {ENV: 'test'}});
    gulp.src('tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}));
});

gulp.task('watch', ['stylus', 'my-app-bundle'], function () {
    livereload({ start: true });

    //index.html
    gulp.watch(paths.frontend.html, function(){
        livereload();
    });

    //js ts html css in my app
    console.log(paths.frontend.ts);
    gulp.watch([paths.frontend.innerHtml, paths.frontend.innerCss, paths.frontend.js,
                paths.frontend.ts], ['my-app-bundle']);

    //stylus
    gulp.watch(paths.frontend.stylus, ['stylus']);
});

gulp.task('default', ['stylus', 'my-app-bundle', 'watch', 'server']);