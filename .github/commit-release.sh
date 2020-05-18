#!/bin/bash

DIST_BRANCH="$1"

git config --local user.email "actions@github.com"
git config --local user.name "CI: hex-dev"

printf "ENV: \n"

pwd
ls -l .

printf -v res %20s
printf '%s\n' "${res// /-}"

printf "> Parent: \n"
ls -l ..

if git checkout -b "${DIST_BRANCH}" origin/"${DIST_BRANCH}" 2>/dev/null; then
	printf "Pre: State \n"
	git status
else
	git checkout --orphan "${DIST_BRANCH}"
	git rm --staged -rf 
fi
echo "node_modules" >.gitignore
git add .gitignore dist/
printf "New: State \n"
git status
git commit -m "CI: Build. Action triggered and reviewed by Czwl Cd" -a
