#!/bin/zsh
rm -rf ./build && 
python setup.py sdist bdist_wheel &&
cp -r dist ../public/bin