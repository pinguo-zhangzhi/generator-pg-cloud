#!/bin/bash

oldBasePath=`PWD`
cd ~
documentsBasePath=`PWD`
cd $oldBasePath

if [ -s "$documentsBasePath/Documents/latestVersion.txt" ]; then
	if [ -s "$documentsBasePath/Documents/currentVersion.txt" ]; then
		latestVersion=`cat ~/Documents/latestVersion.txt`
		currentVersion=`cat ~/Documents/currentVersion.txt`
		currentVersion=${currentVersion#*@}
		currentVersion=${currentVersion%""}
		if [ $latestVersion != $currentVersion ] ; then
			echo "----------------------------"
		    echo "[generator-pg-cloud] has a new version:"
		    echo "----------------------------"
		    echo "Would you like to update for generator-pg-cloud?"
		    echo "Type Y to update: \c"
		    read line
		    if [ "$line" = Y ] || [ "$line" = y ]; then
		      sudo npm install generator-pg-cloud -g
		    fi
		fi
	fi
fi 

basePath=$1
shellPatgh=$basePath"/shell"
env ZSH=$ZSH /bin/sh $shellPatgh/checkVersion.sh $shellPatgh &








