generator-pg-cloud(云端前端环境生成器)
========================

###本机运行环境准备(仅一次)
    1.安装nodejs环境
    2.安装yeoman: $npm install -g yo
    3.下载本生成器并放入nodejs 全局root
    4.进入generator-pg-cloud 文件夹,执行 $npm install
    5.也可忽略3，4步骤，直接运行$npm install -g generator-pg-cloud(取决于是否将generator-pg-cloud发布到npm)
  
###工程环境生成向导
        1.新建项目文件夹如proj
        2.进入proj执行$npm link generator-pg-cloud(一般只需执行一次，yo便会缓存生成器)
        3.执行$yo pg-cloud,根据提示生成工程环境
        
###使用API
        1.$gulp serve 启动本机9000端口服务
        2.$gulp (default) 清除以前的构建之后再进行构建（建议使用）
        3.$gulp build 进行构建
        4.$gulp dist 启动构建目录服务9001端口
        5.$gulp wiredep 根据bower.json对HTML文件进行依赖注入
        6.$gulp jshint JS语法检查
        
###使用bower
        1.$bower install --save jquery
        2.$bower uninstall --save jquery
        

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)


