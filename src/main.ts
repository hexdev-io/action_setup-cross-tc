
import {join as pathJoin} from 'path';
import {homedir} from 'os';

import * as core from '@actions/core';

import  logger from 'node-color-log';

import tree from 'tree-node-cli';
import * as fs from 'fs';

import * as runcache from '@actions/tool-cache';


import toolchains from './toolchains.json';

 

const runnerHome = homedir();
const basePath = pathJoin(runnerHome, 'toolchains');

if (process.env.LOG_DEBUG) {
	logger.setLevel('debug');
} else {
	logger.setLevel('info');
}
 

export const getInputToolchains = ()=>  core.getInput("toolchains")
.split(",")
.filter(t => t !== "");

async function run() {
	try {
		logger.debug(`Running for ${toolchains}`);
		await fs.promises.mkdir(basePath, {recursive: true});



		const tasks = toolchains.map((t, i) => setupTc(t, i));

		const tcPaths = await Promise.all(tasks);

		const pathString = tcPaths.map( (p : string)  => pathJoin(p, 'bin')).join(':');

		const treeList = tree(basePath, {maxDepth: 3});
		logger.debug(treeList);

		core.addPath(pathString);
	} catch (error) {
		core.setFailed(error.message);
	}
}

async function setupTc(tc, idx) {
	logger.log(`Downloading #${idx} ........... `);
	const tcTarPath = await runcache.downloadTool(tc.url);
	logger.log(`Exrtacting #${idx} to: ${basePath}`);
	const extrPath = await runcache.extractTar(tcTarPath, basePath, tc.extract);

	logger.debug(`Setting up #${idx} ${tc.name}`);
	const tcPath = pathJoin(extrPath, tc.release);

	return tcPath;
}

export default run