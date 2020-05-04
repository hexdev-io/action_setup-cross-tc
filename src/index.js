
import {join as pathJoin} from 'path';
import {homedir} from 'os';

import * as core from '@actions/core';
import * as runcache from '@actions/tool-cache';

import logger from 'node-color-log';

import tree from 'tree-node-cli';

import toolchains from './toolchains';

const runnerHome = homedir();
const basePath = pathJoin(runnerHome, 'toolchains');

if (process.env.LOG_DEBUG) {
	logger.setLevel('debug');
} else {
	logger.setLevel('info');
}

async function run() {
	try {
		logger.debug(`Running for ${toolchains}`);
		await Promise.all(toolchains.map((t, i) => setupTc(t, i)));
	} catch (error) {
		core.setFailed(error.message);
	}
}

async function setupTc(tc, idx) {
	const [cachedTc] = runcache.findAllVersions(tc.name);
	if (cachedTc) {
		logger.debug(`Found cache at ${cachedTc}`);
		const binPath = pathJoin(cachedTc, 'bin');
		core.addPath(binPath);
		return binPath;
	}

	logger.log(`Downloading #${idx} ........... `);
	const tcTarPath = await runcache.downloadTool(tc.url);
	logger.log(`Exrtacting #${idx} to: ${basePath}`);
	const extrPath = await runcache.extractTar(tcTarPath, basePath, tc.extract);

	logger.debug(`Setting up #${idx} ${tc.name}`);
	const treeList = tree(extrPath, {maxDepth: 3});
	const tcPath = pathJoin(extrPath, tc.release);

	logger.debug(treeList);
	await runcache.cacheDir(tcPath, tc.name, tc.version);

	const binPath = pathJoin(tcPath, 'bin');
	return core.addPath(binPath);
}

run();
