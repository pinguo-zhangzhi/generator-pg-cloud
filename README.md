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

## License



<!----------------------------------------2015-06-10文档更新 by luozhong------------------------------------------------------------>

###标签解释
        1. <!-- build:js /scripts/base.min.js -->
             <script src="/common/jweixin-1.0.0.js "></script>
           <!-- endbuild -->

           表示将build标签之间的所有js资源文件合并到scripts文件夹下的base.min.js文件里（scripts文件夹和base.min.js文件会自动生成）
           特别注意：如果此处的html文件路径为/views/myfiles/index.html,则build标签中为<!-- build:js /scripts/myfile/base.min.js -->
                    千万注意父文件夹个数
                    css同理

###使用注意事项
        1.html文件：html文件中的资源文件全使用绝对路径（css、js以及img路径等）
        2.js/css文件：除html以外的文件（js、css）中资源路径使用相对路径（推荐）

###使用browserify引入入口文件
        1.在<script>标签中加入"browserify "字段 ，标示入口文件的 绝对路径，路径不需要引号
            <script type="text/javascript" browserify=/views/backBone/index.js></script>

###使用require引入依赖
        1.在js中引入依赖(使用相对路径) 如 require("../../common/server.js");
        2.依赖文件一定要正确，否则会出现无法打包情况

###使用parsePath命令发布上线代码
        1.命令：gulp parsePath
        2.作用：将html中的绝对路径转换成相对路径，以配合后端服务上线
        3.背景：后端php服务网站跟路径指向public 并没有指向我们的dist目录，故不能使用我们的绝对路径
        4.注意：转换后必须亲测一次

###启用图片压缩功能
        1.在项目目录下安装资源：npm install --save-dev gulp-imagemin
                              npm install --save-dev imagemin-pngquant
        2.修改gulpfile.js文件：解注释相关图片压缩代码

###使用gulp debug调试微信或native
        1.运行gulp debug
        2.在项目中任何需要debug的地方，发送get请求到http://localhost:3000,会在debug.html控制台显示cansole 信息

###  @1.3.9  更新说明
        1.版本：@1.3.9
        2.时间：2015/06/08
        3.作者：luozhong@camera360.com
        4.变更：修改代码时html文件偶尔被删掉的问题

###  @1.4.3  更新说明
        1.版本：@1.4.3
        2.时间：2015/06/09
        3.作者：zhangzhi@camera360.com
        4.变更：优化部分流程
                支持ECMAScript 6语法(通过browserify插件编译)
                当选择安装react或ECMA6时，将强制安装browserify
                Reflux将替代flux

###  @1.4.4  更新说明
        1.版本：@1.4.4
        2.时间：2015/06/17
        3.作者：zhangzhi@camera360.com
        4.变更：修复拉取别人已构建的项目后不会自动生成.tmp文件夹bug

###  @1.5.0  更新说明
        1.版本：@1.5.0
        2.时间：2015/07/19
        3.作者：zhangzhi@camera360.com
        4.变更：做一些方便的修改，包括生成环境后，根据选择项是否需要编译自动加入browserify属性。
		根据是否需要React和Reflux自动引入文件。修复生成器一些bug。

[BSD license](http://opensource.org/licenses/bsd-license.php)


