// A no external depedencies process spawner

const util = require("util")
const execFile = util.promisify(require("child_process").execFile)
const path = require("path")
const fs = require("fs")
const join_path = require("path").join
const mkdir = fs.promises.mkdir

let copyFile = util.promisify(fs.copyFile)

const homedir = require("os").homedir()

if (typeof process.env.LOG_DEBUG !== "undefined") {
  //console.debug = function(){};
}

async function run() {
  console.debug("Runner Info")
  console.debug(process.env)

  const cwd = process.cwd()

  // This works because our wrapper is not in any subdirectory
  action_dir = path.resolve(__dirname)

  console.debug(`Current directory: ${cwd}`)
  console.debug(`Action directory:  ${action_dir}`)

  const ls_cwd = await fs.promises.readdir(cwd)
  console.debug(`Current directory contents: ${ls_cwd}`)

  const ls_awd = await fs.promises.readdir(action_dir)
  console.debug(`Action directory contents: ${ls_awd}`)

  const ENV_DIRS = ["RUNNER_TOOL_CACHE", "GITHUB_WORKSPACE", "RUNNER_WORKSPACE"]

  const env_tasks = ENV_DIRS.filter((d) => process.env.hasOwnProperty(d)).map(
    (d) => {
      return fs.promises.readdir(process.env[d])
    }
  )

  env_dirs = await Promise.all(env_tasks)

  env_tasks.forEach((d) => console.debug(d))

  await next_action_call(action_dir)
}

async function next_action_call(action_dir) {
  pip_reqs = join_path(action_dir, "requirements.txt")
  const { stdout, stderr } = await execFile("pip3", ["install", "-r", pip_reqs])

  console.log("stdout:", stdout)
  console.log("stderr:", stderr)
  tc_dir = join_path(homedir, "toolchains")
  await fs.promises.mkdir(tc_dir, { recursive: true })

  const copyList = {
    [join_path(action_dir, "toolchain.py")]: join_path(
      tc_dir,
      "._toolchain.py"
    ),
    [join_path(action_dir, "toolchains.yaml")]: join_path(
      tc_dir,
      "toolchains.yaml"
    ),
  }

  const copyTasks = Object.entries(copyList).map(([src, dest]) =>
    copyFile(src, dest)
  )

  console.log(copyTasks)

  await Promise.all(copyTasks)

  ls_tcdir = await fs.promises.readdir(tc_dir)
  console.debug(tc_dir, ls_tcdir)
}
run()
