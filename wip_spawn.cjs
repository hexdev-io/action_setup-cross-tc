
const pyaction = spawn('python3',  ['toolchain.py']);
const { spawn } = require('child_process');

listen(pyaction)

function listen(proc) {
proc.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

proc.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

proc.on('close',(data) => {
    console.log(`stdout: ${data}`);
  });

proc.on('error', (err) => {
    console.error('Failed to start subprocess, with error');
    console.error(err);
});

}