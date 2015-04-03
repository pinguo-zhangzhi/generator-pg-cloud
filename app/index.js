'use strict';
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var wiredep = require('wiredep');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.option('test-framework', {
      desc: 'Test framework to be invoked',
      type: String,
      defaults: 'mocha'
    });

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });
  },

  initializing: function () {
    this.pkg = require('../package.json');
    this.includeBootstrap = null;
    this.includeModernizr = null;
  },

  prompting: function () {
    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('\'Allo \'allo! Out of the box I include HTML5 Boilerplate, jQuery, and a gulpfile.js to build your app.'));
    }

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name:'jQuery',
        value:'includeJquery',
        checked:true
      },{
        name:'Backbone',
        value:'includeBackbone',
        checked:true
      },{
        name:'Seajs',
        value:'includeSeajs',
        checked:true
      }]
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      var hasFeature = function (feat) {
        return features.indexOf(feat) !== -1;
      };

      //this.includeSass = hasFeature('includeSass');
      this.includeJquery = hasFeature('includeJquery');
      this.includeBackbone = hasFeature('includeBackbone');
      this.includeSeajs = hasFeature('includeSeajs');

      done();
    }.bind(this));
  },

  writing: {
    gulpfile: function() {
      this.template('gulpfile.js');
    },

    packageJSON: function() {
      this.template('_package.json', 'package.json');
    },

    git: function() {
      this.copy('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
    },

    bower: function() {
      var bower = {
        name: this._.slugify(this.appname),
        private: true,
        dependencies: {}
      };

      if (this.includeJquery) bower.dependencies.jquery = '~2.1.1';
      if (this.includeBackbone) bower.dependencies.backbone = '*';
      if (this.includeSeajs) bower.dependencies.seajs = '*';

      this.copy('bowerrc', '.bowerrc');
      this.write('bower.json', JSON.stringify(bower, null, 2));
    },

    jshint: function () {
      this.copy('jshintrc', '.jshintrc');
    },

    editorConfig: function () {
      this.copy('editorconfig', '.editorconfig');
    },

    h5bp: function () {
      this.copy('favicon.ico', 'app/favicon.ico');
      this.copy('robots.txt', 'app/robots.txt');
    },

    mainStylesheet: function () {
      var css = 'index.css';

      // if (this.includeSass) {
      //   css += '.scss';
      // } else {
      //   css += '.css';
      // }

      this.copy(css, 'app/views/' + css);
    },

    writeIndex: function () {
      this.indexFile = this.src.read('index.html');
      this.indexFile = this.engine(this.indexFile, this);

      this.indexFile = this.appendFiles({
        html: this.indexFile,
        fileType: 'js',
        optimizedPath: '/scripts/index/index.js',
        sourceFileList: ['/views/index.js']
      });
  

      this.write('app/views/index.html', this.indexFile);
    },

    app: function () {
      this.mkdir('app');
      this.mkdir('app/components');
      this.mkdir('app/common');
      this.mkdir('app/views');
      this.mkdir('app/resource');
      this.mkdir('app/resource/images');
      this.copy('index.js', 'app/views/index.js');
    }
  },

  install: function () {
    
    var howToInstall =
      '\nAfter running ' +
      chalk.yellow.bold('npm install & bower install') +
      ', inject your' +
      '\nfront end dependencies by running ' +
      chalk.yellow.bold('gulp wiredep') +
      '.';

    if (this.options['skip-install']) {
      this.log(howToInstall);
      return;
    }

    this.installDependencies({
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install']
    });

    this.on('end', function () {
      var bowerJson = this.dest.readJSON('bower.json');

      //将bower_components里的依赖注入index.html
      wiredep({
        bowerJson: bowerJson,
        directory: 'bower_components',
        //排除列表
        exclude: [],
        ignorePath: /^(\.\.\/)*\.\./,
        src: 'app/views/index.html'
      });

      // if (this.includeSass) {
      //   // wire Bower packages to .scss
      //   wiredep({
      //     bowerJson: bowerJson,
      //     directory: 'bower_components',
      //     ignorePath: /^(\.\.\/)+/,
      //     src: 'app/views/*.scss'
      //   });
      // }

      // ideally we should use composeWith, but we're invoking it here
      // because generator-mocha is changing the working directory
      // https://github.com/yeoman/generator-mocha/issues/28
      this.invoke(this.options['test-framework'], {
        options: {
          'skip-message': this.options['skip-install-message'],
          'skip-install': this.options['skip-install']
        }
      });
    }.bind(this));
  }
});
