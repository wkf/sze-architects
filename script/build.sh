#!/usr/bin/env bash

######################################################################
# java
######################################################################

curl -L -C - -b "oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u60-b27/jdk-8u60-linux-x64.tar.gz | tar zxvf -

export JAVA_HOME="$(pwd)/jdk1.8.0_60"
export PATH="$JAVA_HOME/bin:$PATH"

######################################################################
# leiningen
######################################################################

curl -L https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein > lein
chmod +x lein

./lein export
