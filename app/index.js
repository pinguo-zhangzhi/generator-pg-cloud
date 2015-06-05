'use strict';
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var wiredep = require('wiredep');

var deleteFolderRecursive = function(path) {
            var files = [];
            if( fs.existsSync(path) ) {
                files = fs.readdirSync(path);
                files.forEach(function(file,index){
                    var curPath = path + "/" + file;
                    if(fs.statSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            }
          };

var appPath = process.cwd(); 

var appExist = fs.existsSync(appPath+"/app");
if (appExist) {

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
      this.allowUpdate = false;
      this.includeSeajs = false;
      this.includeBrowserify = false;
      this.includeReactJS = false;
      if(fs.existsSync(process.env.PWD+"/node_modules/browserify")) this.includeBrowserify = true;
      if(fs.existsSync(process.env.PWD+"/node_modules/react")) this.includeReactJS = true;
    },

    prompting: function () {

      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [{
          name:'是否进行环境升级？',
          value:'allowUpdate',
          checked:false
        },{
          name:'Browserify',
          value:'includeBrowserify',
          checked:false
        },{
          name:'ReactJS',
          value:'includeReactJS',
          checked:false
        }]
      }];

      this.prompt(prompts, function (answers) {
        var features = answers.features;

        var hasFeature = function (feat) {
          return features.indexOf(feat) !== -1;
        };

        this.allowUpdate = hasFeature('allowUpdate');
        this.includeBrowserify = hasFeature('includeBrowserify');
        this.includeReactJS = hasFeature('includeReactJS');

        if (!this.allowUpdate){
          this.log('==========升级已终止。==========');
          process.exit();
        }else{
          deleteFolderRecursive(process.env.PWD+'/node_modules');
          if(fs.existsSync(process.env.PWD+"/gulpfile.js")) fs.unlinkSync(process.env.PWD+'/gulpfile.js');
          if(fs.existsSync(process.env.PWD+"/package.json")) fs.unlinkSync(process.env.PWD+'/package.json');
          if(fs.existsSync(process.env.PWD+"/.gitignore")) fs.unlinkSync(process.env.PWD+'/.gitignore');
          if(fs.existsSync(process.env.PWD+"/.gitattributes")) fs.unlinkSync(process.env.PWD+'/.gitattributes');
          if(fs.existsSync(process.env.PWD+"/.jshintrc")) fs.unlinkSync(process.env.PWD+'/.jshintrc');
          if(fs.existsSync(process.env.PWD+"/.editorconfig")) fs.unlinkSync(process.env.PWD+'/.editorconfig');
        }

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

      jshint: function () {
        this.copy('jshintrc', '.jshintrc');
      },

      editorConfig: function () {
        this.copy('editorconfig', '.editorconfig');
      }
    },

    install: function () {
    
      this.mkdir('.tmp');
    
      this.installDependencies({
        skipMessage: this.options['skip-install-message'],
        skipInstall: this.options['skip-install']
      });

      this.on('end', function () {
        this.log('==========构建环境升级成功==========');
      }.bind(this));
    }

  });

}else{

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
        this.log('==========\'Allo \'allo! Out of the box I include HTML5 Boilerplate, jQuery, and a gulpfile.js to build your app.==========');
      }

      var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [{
          name:'jQuery',
          value:'includeJquery',
          checked:false
        },{
          name:'Backbone',
          value:'includeBackbone',
          checked:false
        },{
          name:'ReactJS',
          value:'includeReactJS',
          checked:true
        },{
          name:'Browserify',
          value:'includeBrowserify',
          checked:true
        }
        ]
      }];

      this.prompt(prompts, function (answers) {
        var features = answers.features;

        var hasFeature = function (feat) {
          return features.indexOf(feat) !== -1;
        };

        //this.includeSass = hasFeature('includeSass');
        this.includeBrowserify = hasFeature('includeBrowserify');
        this.includeReactJS = hasFeature('includeReactJS');
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
        //if (this.includeSeajs) bower.dependencies.seajs = '*';

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
    

        this.write('app/index.html', this.indexFile);
      },

      app: function () {
        if (this.includeBrowserify || this.includeReactJS) this.mkdir('.tmp');
        this.mkdir('app');
        this.mkdir('app/components');
        this.mkdir('app/common');
        this.mkdir('app/views');
        this.mkdir('app/resource');
        this.mkdir('app/resource/images');
        this.copy('index.js', 'app/views/index.js');
        this.copy('debug.html', 'app/views/debug.html');
      }
    },

    install: function () {
      
      var howToInstall =
        '\nAfter running ' +
        'npm install & bower install' +
        ', inject your' +
        '\nfront end dependencies by running ' +
        'gulp wiredep.';

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
          src: 'app/index.html'
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

}
