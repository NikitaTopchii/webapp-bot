const gulp = require('gulp');
const nodemonLib = require('gulp-nodemon');
const shell = require('gulp-shell');

let nodemon;

gulp.task('rebuild', shell.task([
  'ng build --localize'
]));

gulp.task('serve', function (done) {
  nodemon = nodemonLib({ script: 'server.js' }).on('start', done);
});

gulp.task('stop_server', function (done) {
  if (nodemon) {
    nodemon.emit('quit');
  }
  done();
});

// Create a separate watch task for rebuilding on file changes
gulp.task('watch:rebuild', function () {
  gulp.watch('src/**/*.{ts,html,scss}', gulp.series('rebuild'));
});

// Initial task that starts the server and watches for file changes
gulp.task('watch', gulp.series('serve', 'watch:rebuild'));
