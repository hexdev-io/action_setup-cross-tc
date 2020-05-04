#!/bin/bash

DIST_BRANCH="$1"

          git config --local user.email "hex-devci@github.com"
          git config --local user.name "CI: hex-dev Github Actions"
          git checkout -b ${DIST_BRANCH} origin/${DIST_BRANCH} 2> /dev/null || git checkout -b ${DIST_BRANCH}
	  echo "node_modules" > .gitignore
	  git add .gitignore dist/
          git commit -m "CI: Build. Action triggered and reviewed by Czwl Cd" -a


