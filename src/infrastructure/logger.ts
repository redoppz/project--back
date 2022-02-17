import pino from 'pino';
import { config } from 'src/config/config';
import { inspect } from 'util';

const INSPECT_DEPTH = 5;

export const logger = pino({
	level: config.logLevel,
	formatters: {
		level: (label: string): { level: string } => ({ level: label }),
	},
	serializers: {
		data(data: { [key: string]: unknown }): object {
			Object.keys(data).forEach((k) => {
				if (typeof data[k] !== 'string') {
					data[k] = inspect(data[k], { depth: INSPECT_DEPTH });
				}
			});
			return data;
		},
		error(error: Error) {
			return { name: error.name, message: error.message, stack: error.stack };
		},
		err(error: Error) {
			return { name: error.name, message: error.message, stack: error.stack };
		},
	},
});
