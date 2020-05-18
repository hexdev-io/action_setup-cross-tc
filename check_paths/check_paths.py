

import subprocess
import json
import os
from pathlib import Path, PurePath

def main():

    
    toolchains_basedir=Path.home()  / 'toolchains'
    
    toolchains = read_toolchain_data('src/toolchains.json')
    print(toolchains)
    toolchains_path = filter_toolchain_path(os.environ.get('PATH'), str(toolchains_basedir))

    if not toolchains_path :
        raise ValueError("No toolchains in PATH")

    for binPath in toolchains_path:
        print (binPath)



def read_toolchain_data(fpath) :
    try:
        with open(fpath) as f:
            toolchains = json.load(f)
        return toolchains
    except Exception as exc:
        print("Invalid or non- existent toolchains.json")

"""
Filters the PATH environment variable with a base directory
"""
def filter_toolchain_path(env_var_path, basedir):
    base_glob=f"{basedir}/*"
    env_path = [ Path(path) for path in env_var_path.split(os.pathsep) ]
    tc_path = [ path for path in env_path if path.match(base_glob) ]  
    return tc_path

if __name__ == '__main__' :
    main()