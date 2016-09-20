var gulp = require('gulp');
var child_process = require('child_process');
var browserSync = require('browser-sync').create();

gulp.task('default', function () {
    // Start the browserSync server
    browserSync.init({server: {baseDir: "./docs"}});
    // Watch JS source file
    gulp.watch("jquery.*.js", function() {
        // Run lasso NPM script on change and reload browser when done
        return child_process.spawn('npm', ['run', 'lasso'], {stdio: 'inherit'}).on('close', browserSync.reload);
    });
});
