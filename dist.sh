#!/bin/bash 

set -xe
export PYTHONDONTWRITEBYTECODE=""

if [[ "$1" == "clean" ]] ; then
rm -rf out/
rm -rf setup_tc.pyz
exit 0;
fi

pip3 install -r requirements.txt --target out/ 
cp -f toolchain.py out/toolchain.py 
yq . toolchains.yaml > out/toolchains.json
python3 -m zipapp out/ -m "toolchain:main" -o dist/setup_tc.pyz