const path = require('path');
const gulp = require('gulp');

gulp.task('build:icons', function () {
	return gulp.src(['nodes/**/*.png', 'nodes/**/*.svg'])
		.pipe(gulp.dest('dist/nodes'));
});
