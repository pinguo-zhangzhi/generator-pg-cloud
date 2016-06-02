/*global -$ */
'use strict';
// generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
browserSync = require('browser-sync'),
    // imagemin = require('gulp-imagemin'),
    // pngquant = require('imagemin-pngquant'),
    reload = browserSync.reload;
    var combo = require('seajs-pg-cloud');

    <%if(includeBrowserify || includeReactJS || supportECMA6){%>

      /*暂不支持seajs,请勿运行*/
// gulp.task('compressSeaJS', function(){
//     gulp.src('dist/**/*.html') 
//     .pipe(combo.compressSeaJS({
//         pwdPath:process.env.PWD
//     }))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('compileBrowserify', function(){
  gulp.src('app/**/*.html')  
  .pipe(combo.compileBrowserify({
    <%if(supportECMA6){%>
      pwdPath:process.env.PWD || process.env.INIT_CWD,
      supportECMA6:true
    <%}else{%>
      pwdPath:process.env.PWD || process.env.INIT_CWD
    <%}%>
    
  }, function(){
    reload();
  }))
  .pipe(gulp.dest('app'));
});

<%}%>


gulp.task('parsePath', function(){
  gulp.src('dist/**/*.html')
  .pipe(combo.parsePath({
    pwdPath:process.cwd()
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('changePath',function(){
   combo.changePath();
});

/*JS语法检查*/
gulp.task('jshint', function () {
  return gulp.src('app/**/*.js')
  .pipe(reload({stream: true, once: true}))
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish'))
  .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

/*解析html文件并进行标签build*/
gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/**/*.html')
  .pipe(assets)
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.css', $.csso()))
  .pipe(assets.restore())
  .pipe($.useref())
  .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
  .pipe(gulp.dest('dist'));
});

/*压缩图片*/
// gulp.task('compressImage', function () {
//     return gulp.src('app/resource/images/**/*.*')
//         .pipe(imagemin({
//             progressive: true,
//             optimizationLevel:3,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()]
//         }))
//         .pipe(gulp.dest('app/resource/images'));
// });

// gulp.task('images', ['compressImage'], function () {
//   return gulp.src('app/resource/**/*')
//     .pipe(gulp.dest('dist/resource'));
// });

gulp.task('images', function () {
  return gulp.src('app/resource/**/*')
  .pipe(gulp.dest('dist/resource'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
    ], {
      dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['dist']));

/*启动开发环境服务*/
gulp.task('serve', function () {
  browserSync({
    notify: false,
    port: 9090,
    startPath:'/',
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components',
        '/node_modules':'node_modules',
        '/.tmp':'.tmp'
      }
    }
  });

  <%if(includeBrowserify){%>
    gulp.start('compileBrowserify');
  <%}%>

  /*监听文件改变*/
  gulp.watch([
    'app/**/*.js'
    ]).on('change', function(){
      <%if(includeBrowserify || includeReactJS){%>
        gulp.start('compileBrowserify');
        <%}else{%>
          reload();
          <%}%>
        });

    gulp.watch(['app/**/*.css','app/**/*.html','app/resource/**/*']).on('change', reload);
    gulp.watch('bower.json', ['wiredep']);
  });

/*启动构建环境服务*/
gulp.task('dist', function () {
  browserSync({
    notify: false,
    port: 9001,
    startPath:'/views',
    server: {
      baseDir: 'dist',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
});

/*注入bower依赖*/
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  gulp.src('app/**/*.html')
  .pipe(wiredep({
    ignorePath: /^(\.\.\/)*\.\./
  }))
  .pipe(gulp.dest('app'));
});

/*构建备用方法*/
gulp.task('build', ['html', 'images', 'extras'], function () {
  <%if(includeSeajs){%>gulp.start('seajs');<%}%>
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/*构建建议方法*/
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});



gulp.task('debug', function(){

  var  http = require('http'), 
  socketio = require('socket.io'),
  url = require("url"),
  ioClient = null;


  var server = http.createServer(function(req, res) {
    var params = url.parse(req.url, true).query;
    res.writeHead(200, {
      'Content-Type': 'text/plain;charset=utf-8'
    });

    res.write(new Buffer(JSON.stringify(params)));
    res.end();

    console.log(JSON.stringify(params));

    if (ioClient){
      ioClient.emit('message', params);
    } 
  });

  server.listen(3000);

  socketio.listen(server).on('connection', function (client) {
    ioClient = client;
  });

});
