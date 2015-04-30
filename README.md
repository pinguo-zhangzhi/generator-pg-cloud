generator-pg-cloud(云端前端环境生成器)
========================

###why do it?

随着当前前端人员的逐渐增多，开发环境和工具各不相同，影响了开发效率，增加了管理成本，急需要一套完整的统一开发和部署环境来解决
生产力和管理问题，在多人协作，性能优化，效率提升，规范化等方面大幅提升。

###本机运行环境准备(仅一次)
    1.安装nodejs环境
    2.安装yeoman: $npm install -g yo
    3.下载本生成器并放入nodejs 全局root
    4.进入generator-pg-cloud 文件夹,执行 $npm install
    5.也可忽略3，4步骤，直接运行$npm install -g generator-pg-cloud(取决于是否将generator-pg-cloud发布到npm)
    PS:对于此流程不熟悉的同学，可单独下载oneKeyInstall.sh并将其放入workspace目录，运行sh oneKeyInstall.sh XXX(工程名)自动生成。
  
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
        在gulp serve开启的情况下，运行以上命令，将会自动注入或移除依赖 <!--bower:js--> 标签
        
###使用seajs
        1.因为新版的seajs于老版本的区别，请使用script标签当作use入口文件，并添加seajs属性，如此seajs-pg-cloud可进行自动搜寻
        后合并压缩。
        
###如何升级当前工程环境
        当有新的生成器环境时，老的工程如果需要更新到最新的环境，在工程内运行yo pg-cloud, 这时生成器会检测是否已经存在工程，
        如已存在工程，则提示是否升级工程，选择是则升级工程，否则退出当前进程。
        
###工程是别人初始化的，那么在你第一次从git上拉下代码之后，应该做什么？
    若工程非本人创建，则在第一次拉取到代码之后，需要手动运行npm install安装环境需要的插件和工具。
## License

[BSD license](http://opensource.org/licenses/bsd-license.php)


