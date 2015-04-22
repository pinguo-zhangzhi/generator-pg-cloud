#!/bin/sh

dir=`PWD`
curUser=`whoami`

if [[ $# -lt 1 ]]
then
    printf "\nUsage: sh $0 projectName"
    printf "\nSample: sh $0 Demo"
    printf "\n"
    exit 1
fi
projectName=$1
projectPath=${dir}/${projectName}

echo "check npm"
which -s npm
if [[ $? -ne 0 ]]
then
    echo "Error: Need install nodejs!"
    exit 1
fi

sudo chown -R ${curUser} ~/.npm

echo "check yo"
which -s yo
if [[ $? -ne 0 ]]
then
    sudo npm install -g yo
    exit 1
fi

echo "check bower"
which -s bower
if [[ $? -ne 0 ]]
then
    sudo npm install -g bower
    exit 1
fi

echo "check gulp"
which -s gulp
if [[ $? -ne 0 ]]
then
    sudo npm install -g gulp
    exit 1
fi

echo "check mocha"
which -s mocha
if [[ $? -ne 0 ]]
then
    sudo npm install -g mocha
    exit 1
fi

if [[ -f "${projectPath}" ]] || [[ -d "${projectPath}" ]]
then
    echo "Error: ${projectPath} already exists!"
    exit 1
fi
mkdir ${projectPath}
if [[ ! -d "${projectPath}" ]]
then
    echo "Error: mkdir ${projectPath} fail!"
    exit 1
fi

cd ${projectPath}
echo "init project: ${projectName}"

echo "check generator-pg-cloud"
pgcloud=`npm link generator-pg-cloud`
if [[ $? -ne 0 ]] 
then
    echo "generator-pg-cloud installing."
    sudo npm install -g generator-pg-cloud
    #npm link generator-pg-cloud
fi

sudo yo pg-cloud
if [[ $? -ne 0 ]]
then
    echo "Error: init project ${projectName} fail"
    exit 1
fi
echo "project path: ${projectPath}"
cd ${dir}

echo "初始化完成"
echo "gulp serve 启动本机9000端口服务"
echo "gulp (default) 清除以前的构建之后再进行构建（建议使用）"
echo "gulp build 进行构建"
echo "gulp dist 启动构建目录服务9001端口"
echo "gulp wiredep 根据bower.json对HTML文件进行依赖注入"
echo "gulp jshint JS语法检查"

