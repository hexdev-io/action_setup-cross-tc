import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export function read(filename) {
	return new Promise((resolve, reject) => {
		readFile(filename, 'utf8').done(data => {
			try {
				resolve(JSON.parse(data));
			} catch (error) {
				reject(error);
			}
		}, reject);
	});
}

export function write(filename, object, options = {spaces: 0}) {
	const jsonString = JSON.stringify(object, null, options.spaces);

	return writeFile(filename, jsonString, 'utf8');
}
