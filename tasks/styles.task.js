module.exports = function(dirs, config, app, tasks) {

	var 
	    gulp       	 = require('gulp'),
    	autoprefixer = require('autoprefixer'),
			extend       = require('extend'),
	    plumber      = require('gulp-plumber'),
	    sourcemaps   = require('gulp-sourcemaps'),
	    postcss      = require('gulp-postcss'),
	    sass         = require('gulp-sass');


	tasks.styles = {
		run: function(isDev) {
			var configStyles = extend(true, config.styles.common, config.styles[isDev ? 'dev': 'prod']);

			var ret = gulp.src(dirs.src.styles.main + '*.scss')
			  .pipe(plumber({
			    errorHandler: function (error) {
			      console.log(error.message);
			      this.emit('end');
			    }
			  }));

			if (configStyles.sourceMaps) {
			  ret = ret
			    .pipe(sourcemaps.init());
			}

			var ret = ret
			      .pipe(sass(configStyles.sass).on('error', sass.logError));

			ret = ret
			  .pipe(postcss([ autoprefixer({ browsers: configStyles.autoprefixer.browsers }) ]));

			if (configStyles.sourceMaps) {
			  ret = ret
			    .pipe(sourcemaps.write({ sourceRoot: configStyles.sourceMapsRoot }));
			}

			ret = ret
			  .pipe(gulp.dest(dirs.dist.styles));

		  return ret;
		}
	}
}