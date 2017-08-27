const gulp = require('gulp'),
			autoprefixer = require('gulp-autoprefixer'),
			cleanCSS = require('gulp-clean-css'),
			browserSync = require('browser-sync').create();

const config = {
	src: './res',
	css: {
		src: '/precss/**/*.css',
		dest: '/css'
	}
}

gulp.task('build', function() {
	gulp.src(config.src + config.css.src)
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(cleanCSS())
			.pipe(gulp.dest(config.src + config.css.dest))
});

gulp.task('watch', ['browserSync'], function() {
	gulp.watch(config.src + config.css.src, ['build'])
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: config.src
		},
		tunnel: true,
	});
});