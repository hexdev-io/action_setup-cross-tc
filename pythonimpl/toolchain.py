#!/usr/bin/env python3

import os, sys
import json
from pathlib import Path
import requests
from time import time

from tempfile import gettempdir
import tarfile

import concurrent
from concurrent.futures import ThreadPoolExecutor

import pkg_resources


## Just perform a sanity check on hit caches:




toolchains_file = Path("./toolchains.yaml")
toolchains = None

toolchains_dir = Path.home() / "toolchains"


if os.getenv("CACHED_SETUP_TOOLCHAINS") == 'true' :
    sys.exit(0)

# Check if we are running in a development version
#
if toolchains_file.exists():
    from ruamel.yaml import YAML

    yaml = YAML(typ="safe")
    toolchains = yaml.load(toolchains_file)
else:
    toolchains_str = pkg_resources.resource_string(__name__, "toolchains.json")
    toolchains = json.loads(toolchains_str)


def download_chunks(tc):
    url = tc.get("url")
    tarfile = f"{tc.get('release')}.tgz"
    local_filename = Path(gettempdir()) / tarfile

    print(url)

    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(local_filename, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)

    return local_filename


"""
This assumes the resulting tar file already has a top level directory for now.

"""
def extract_as_tar(tc, tar):
    to_path = toolchains_dir
    tc_dir = Path(to_path) / tc.get("release")
    with tarfile.open(tar, "r:*") as tar:
        tar.extractall(path=to_path)
    return tc_dir


def main():

    with ThreadPoolExecutor(max_workers=len(toolchains) + 1) as executor:

        tasks = {executor.submit(download_chunks, tc): tc for tc in toolchains}
        print(tasks)
        files = []
        for future in concurrent.futures.as_completed(tasks):
            tc = tasks[future]
            try:
                dl = future.result()
                files.append(dl)

            except Exception as exc:
                print("%r generated an exception: %s" % (tc, exc))

    tc_paths = []
    with ThreadPoolExecutor(max_workers=len(toolchains) + 1) as executor:
        tasks = {
            executor.submit(extract_as_tar, tc, file): tc
            for (tc, file) in zip(toolchains, files)
        }
        for future in concurrent.futures.as_completed(tasks):
            try:
                tc_paths.append(future.result())
            except Exception as exc:
                print("Uh oh %s" % exc )

    ## Add PATHS to the envrionment
    expand_path = os.pathsep.join(str(p) for p in tc_paths)
    GHAction.addPath(expand_path)
    os.environ["PATH"] = f"{expand_path}{os.pathsep}{os.environ['PATH']}"

    print(os.environ["PATH"])

class GHAction:
    def __init__ (self):
        self.GITHUB_ = ''

    @staticmethod
    def addPath(pathstr):
        """
        A string on a new line prepends to PATH

        echo "::add-path::BAR"
        """
        lout=f"::add-path::{pathstr}"
        
        # Print an extra new line incase of missing from previous flush
        print("\n", lout)

    @staticmethod
    def exportVariable(env, val):
        """
        A string on a new line with exports a environment variable

        echo "::set-env name=FOO::BAR"
        """
        lout=f"::set-env name={env}::{val}"
        
        # Print an extra new line incase of missing from previous flush
        print("\n", lout )


if __name__ == "__main__":
    main()
