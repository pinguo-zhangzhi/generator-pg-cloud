#!/bin/bash

function includeString(){
	echo "$1" | grep -q "$2" && return 0 || return 1
}

#判断shell环境
if includeString "$SHELL" "/bin/zsh"; then
	RC_FILE="$HOME/.zshrc"
elif includeString "$SHELL" "/bin/bash"; then
	RC_FILE="$HOME/.bashrc"
fi

function addStringToFile(){
	ret=$(cat $2 | grep "$1")
	if [ "$ret" = "" ] ;then
		echo "
$1
	">>$2

	echo "[source] \"$1\" ---> \"$2\"."
	fi
}

generatorPgCloudRoot=`PWD`

addStringToFile "zsh -f "${generatorPgCloudRoot}"/shell/checkUpdate.sh ${generatorPgCloudRoot}" $RC_FILE



