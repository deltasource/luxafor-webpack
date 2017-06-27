"use strict";
// Import the luxafor API, and the webpack API.
import * as Luxafor from "luxafor-api";
import webpack from "webpack";

// Constants for the default options.
const
	DEFAULTS = Object.freeze({
		colors: {
			compile: "#ffb300",
			error: "#e53935",
			optimize: "#1e88e5",
			success: "#43a047",
			warning: "#f4511e"
		},
		timeout: 5000
	} as IOptions);

// Interface for the options.
interface IOptions {
	colors?: {
		compile?: string,
		warning?: string,
		optimize?: string,
		error?: string,
		success?: string
	};

	timeout?: number;
}

// The main class doing all the work ;-)
class LuxaforWebpackPlugin {

	private _device: any;
	private _timeOut: number;
	private _options: IOptions;

	constructor(options?: IOptions) {
		this._timeOut = null;
		this._device = new Luxafor({});
		this._options = options || {} as IOptions;
		(Object).assign(this._options, DEFAULTS);
		off(this._device);
	}

	public apply(compiler: webpack.Compiler) {
		compiler.plugin("compile", (compilationParams) => {
			if (this._timeOut) {
				clearTimeout(this._timeOut);
			}
			setColor(this._device, this._options.colors.compile);
		});

		compiler.plugin("after-compile", (compilation, done) => {
			if (this._timeOut) {
				clearTimeout(this._timeOut);
			}
			setColor(this._device, this._options.colors.optimize);
			done();
		});

		compiler.plugin("run", (compilation, done) => {
			if (this._timeOut) {
				clearTimeout(this._timeOut);
			}
			setColor(this._device, this._options.colors.compile);
			done();
		});

		compiler.plugin("done", (stats) => {
			this._onCompilationDone(stats);
		});

	}

	private _onCompilationDone(result) {
		if (result.hasErrors()) {
			setColor(this._device, this._options.colors.error);
		} else if (result.hasWarnings()) {
			setColor(this._device, this._options.colors.warning);
		} else {
			setColor(this._device, this._options.colors.success);
		}
		if (this._options.timeout && this._options.timeout > 0) {
			this._timeOut = setTimeout(() => {
				off(this._device);
			}, this._options.timeout);
		}
	}
}

// Export the main class and the options.
export {IOptions, LuxaforWebpackPlugin};

// Switch a Luxafor off.
function off(device) {
	try {
		device.off();
	} catch (error) {
		// No need to do anything.
	}
}

// Set Luxafor color on all channels.
function setColor(device, color) {
	try {
		device.setColor(color, 0xff);
	} catch (error) {
		// No need to do anything.
	}
}
