'use strict';

var gulp                = require("gulp"),
    autoprefixer        = require('autoprefixer-stylus'),
    concat              = require('gulp-concat'),
    cssbeautify         = require('gulp-cssbeautify'),
    csscomb             = require('gulp-csscomb'),
    csso                = require('gulp-csso'),
    browserSync         = require("browser-sync").create(),
    buffer              = require('vinyl-buffer'),
    combinemq           = require('gulp-combine-mq'),
    del                 = require('del'),
    gulpif              = require('gulp-if'),
    gutil               = require('gulp-util'),
    htmlPrettify        = require('gulp-html-prettify'),
    imagemin            = require('gulp-imagemin'),
    imageminPngquant    = require('imagemin-pngquant'),
    jade                = require('gulp-jade'),
    notify              = require('gulp-notify'),
    plumber             = require('gulp-plumber'),
    rename              = require('gulp-rename'),
    rev                 = require('gulp-rev-append'),
    rigger              = require('gulp-rigger'),
    runSequence         = require('run-sequence'),
    sourcemaps          = require('gulp-sourcemaps'),
    spritesmith         = require('gulp.spritesmith'),
    stripCssComments    = require('gulp-strip-css-comments'),
    stylus              = require('gulp-stylus'),
    uglify              = require('gulp-uglify'),
    urlAdjuster         = require('gulp-css-url-adjuster'),
    watch               = require('gulp-watch');

var path = {
    dist: {
        html:           'dist/',
        assets:         'dist/assets/',
        css:            'dist/assets/css/',
        js:             'dist/assets/js/',
        img:            'dist/assets/img/',
        favicons:       'dist/assets/img/favicons/',
        fonts:          'dist/assets/fonts/',
        php:            'dist/assets/'
    },
    src: {
        blocksjade:     'src/blocks/**/{*,!_*}.jade',
        blocksstyl:    'src/blocks/**/{*,!_*}.styl',
        pages:          'src/pages/{*,!_*}.jade',
        style:          'src/styles/style.styl',
        fsstyle:        'src/styles/fs-style.styl',
        fsstyleinc:     ['src/blocks/header/header.styl', 'src/styles/inc/{*,!_*}.styl'],
        fsfonts:        'src/styles/inc/fonts.styl',
        jsapp:          ['src/js/common.js','src/blocks/**/{*,!_*}.js'],
        jsplugins:      'src/js/plugins.js',
        jsjquery:       'src/bower/jquery/dist/jquery.min.js',
        img:            'src/img/**/{*,!_*}.{jpg,gif,svg,png}',
        favicons:       'src/favicons/{*,!_*}.*',
        sprite:         'src/sprite/**/{*,!_*}.png',
        fonts:          'src/fonts/**/{*,!_*}.*',
        php:            'src/php/**/{*,!_*}.php',
        stylesinc:      'src/styles/inc/',
        tmp:            'src/tmp/'
    },
    clean:              ['dist', 'src/tmp']
};

// Error handler for gulp-plumber
var errorHandler = function (err) {
    gutil.log([(err.name + ' in ' + err.plugin).bold.red, '', err.message, ''].join('\n'));
    if (gutil.env.beep) {
        gutil.beep();
    }
    this.emit('end');
};

// Plugins options
var options = {
    browserSync: {
        server: {
            baseDir: path.dist.html
        },
        tunnel: false,
        host: 'localhost',
        port: 9004
    },
    plumber: {
        errorHandler: errorHandler
    },
    stylus: {
        'include css': true,
        use: [
            autoprefixer({
                cascade: false
            })
        ]
    },
    cssbeautify: {
        indent: '\t',
        autosemicolon: true
    },
    htmlPrettify: {
        indent_char: ' ',
        indent_size: 4
    },
    spritesmith: {
        // retinaSrcFilter: '**/*@2x.png',
        // retinaImgName: 'sprite@2x.png',
        // retinaImgPath: 'img/sprite@2x.png',
        imgName: 'sprite.png',
        imgPath: 'img/sprite.png',
        cssName: 'sprite.styl',
        algorithm: 'binary-tree',
        padding: 10,
        cssTemplate: 'src/styles/templates/sprite-template.mustache'
    },
    imagemin: {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [imageminPngquant()]
    }
};

gulp.task('browser-sync', function() {
    return browserSync.init(options.browserSync);
});

gulp.task('clean', function (cb) {
    return del(path.clean, cb)
});


// JADE, HTML PAGES

gulp.task('pages', function(){
    return gulp.src(path.src.pages)
        .pipe(plumber(options.plumber))
        .pipe(jade({pretty: true}))
        .pipe(htmlPrettify(options.htmlPrettify))
        .pipe(gulp.dest(path.dist.html))
});

gulp.task('rev', function() {
  gulp.src(path.dist.html + "*.html")
    .pipe(rev())
    .pipe(gulp.dest(path.dist.html));
});


// STYLUS, CSS STYLES

gulp.task('style', function(){
    return gulp.src(path.src.style)
        .pipe(plumber(options.plumber))
        .pipe(stylus(options.stylus))
        .pipe(urlAdjuster({prepend: '../'}))
        .pipe(combinemq({beautify: false}))
        .pipe(cssbeautify(options.cssbeautify))
        .pipe(csscomb())
        .pipe(gulp.dest(path.src.tmp))
        .pipe(stripCssComments({preserve:false}))
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.css))
});

gulp.task('fs:style', function(){
    return gulp.src(path.src.fsstyle)
        .pipe(plumber(options.plumber))
        .pipe(stylus(options.stylus))
        .pipe(urlAdjuster({prepend: 'assets/'}))
        .pipe(combinemq({beautify: false}))
        .pipe(cssbeautify(options.cssbeautify))
        .pipe(csscomb())
        .pipe(gulp.dest(path.src.tmp))
        .pipe(stripCssComments({preserve:false}))
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.src.tmp))
});

gulp.task('fs:fonts', function(){
    return gulp.src(path.src.fsfonts)
        .pipe(plumber(options.plumber))
        .pipe(stylus(options.stylus))
        .pipe(urlAdjuster({prepend: 'assets/'}))
        .pipe(combinemq({beautify: false}))
        .pipe(cssbeautify(options.cssbeautify))
        .pipe(csscomb())
        .pipe(rename('fonts.css'))
        .pipe(gulp.dest(path.src.tmp))
        .pipe(stripCssComments({preserve:false}))
        .pipe(csso())
        .pipe(rename('fonts.min.css'))
        .pipe(gulp.dest(path.dist.css))
});

// JAVASCRIPT

gulp.task('js:app', function () {
    return gulp.src(path.src.jsapp)
        .pipe(plumber(options.plumber))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.src.tmp))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserSync.stream())
});

gulp.task('js:plugins', function () {
    return gulp.src(path.src.jsplugins)
        .pipe(plumber(options.plumber))
        .pipe(rigger())
        .pipe(rename('plugins.js'))
        .pipe(gulp.dest(path.src.tmp))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.js))
});

gulp.task('js:jquery', function() {
    return gulp.src(path.src.jsjquery)
        .pipe(plumber(options.plumber))
        .pipe(gulp.dest(path.dist.js))
});

// IMAGES, PNG SPRITE, Favicons

gulp.task('img', function () {
    return gulp.src(path.src.img)
        .pipe(plumber(options.plumber))
        .pipe(imagemin(options.imagemin))
        .pipe(gulp.dest(path.dist.img))
});

gulp.task('favicons', function() {
    return gulp.src(path.src.favicons)
        .pipe(plumber(options.plumber))
        .pipe(gulp.dest(path.dist.favicons))
});

gulp.task('sprite', function (cb) {
    var spriteData = gulp.src(path.src.sprite)
        .pipe(spritesmith(options.spritesmith));

    spriteData.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist.img));

    spriteData.css
        .pipe(buffer())
        .pipe(gulp.dest(path.src.stylesinc));

    return spriteData.img.pipe(buffer());
});

// OTHER TASKS

gulp.task('fonts', function() {
    return gulp.src(path.src.fonts)
        .pipe(plumber(options.plumber))
        .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('php', function() {
    return gulp.src(path.src.php)
        .pipe(plumber(options.plumber))
        .pipe(gulp.dest(path.dist.php))
});

// COMPLEX TASKS

gulp.task('html', function (cb) {
    return runSequence('pages', 'rev', cb);
});

gulp.task('fs', function (cb) {
    return runSequence('fs:style', 'pages', 'rev', cb);
});

gulp.task('js', ['js:jquery','js:plugins','js:app']);

gulp.task('build', function (cb) {
    return runSequence(
        'clean',
        ['sprite', 'img', 'favicons', 'fonts', 'php', 'js'],
        ['style', 'fs:style', 'fs:fonts'],
        'html', cb);
});

gulp.task('watch', function (cb) {
    global.isWatching = true;

    watch(path.src.blocksjade, function(event, cb) {
        return runSequence('html', browserSync.reload);
    });

    watch(path.src.pages, function(event, cb) {
        return runSequence('html', browserSync.reload);
    });

    watch(path.src.blocksstyl, function(event, cb) {
        return runSequence('style', browserSync.reload);
    });

    watch(path.src.style, function(event, cb) {
        return runSequence('style', browserSync.reload);
    });

    watch(path.src.fsstyle, function(event, cb) {
        return runSequence('fs:style', 'html', browserSync.reload);
    });

    watch(path.src.fsstyleinc, function(event, cb) {
        return runSequence('fs:style', 'html', browserSync.reload);
    });

    watch(path.src.fsfonts, function(event, cb) {
        return runSequence('fs:fonts', browserSync.reload);
    });

    watch(path.src.jsapp, function(event, cb) {
        return runSequence('js:app', browserSync.reload);
    });

    watch(path.src.jsplugins, function(event, cb) {
        return runSequence('js:plugins', browserSync.reload);
    });

    watch(path.src.img, function(event, cb) {
        return runSequence('img', browserSync.reload);
    });

    watch(path.src.favicons, function(event, cb) {
        return runSequence('favicons', browserSync.reload);
    });

    watch(path.src.sprite, function(event, cb) {
        return runSequence('sprite', browserSync.reload);
    });

    watch(path.src.fonts, function(event, cb) {
        return runSequence('fonts', browserSync.reload);
    });

    watch(path.src.php, function(event, cb) {
        return runSequence('php', browserSync.reload);
    });

});

gulp.task('default', function (cb) {
    return runSequence('build', ['browser-sync', 'watch'], cb);
});
