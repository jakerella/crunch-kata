
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    browsers: ['Chrome'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/js/kata.module.js',
      'src/js/**/*.js',
      'test/specs/**/*.spec.js'
    ],
    singleRun: true
  });
};
