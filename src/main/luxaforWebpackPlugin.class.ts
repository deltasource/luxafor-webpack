"use strict";

import * as Luxafor from "luxafor-api";
import webpack from "webpack";

const
	DEFAULTS = Object.freeze(<Options> {
		colors: {
			warning: "#f4511e",
			compile: "#ffb300",
			optimize: "#1e88e5",
			error: "#e53935",
			success: "#43a047"
		},
		timeout: 5000
	});

interface Options {
	colors: {
		compile?: string,
		warning?: string,
		optimize?: string,
		error?: string,
		success?: string
	},
	timeout?: number
}

class LuxaforWebpackPlugin {

	private _device: any;
	private _timeOut: number;
	private _options: Options;

	constructor(options?: Options) {
		this._timeOut = null;
		this._device = new Luxafor({});
		this._options = options || <Options>{};
		(Object).assign(this._options, DEFAULTS);
		off(this._device);
	}

	apply(compiler: webpack.Compiler) {
		compiler.plugin("compile", () => {
			if (this._timeOut) {
				clearTimeout(this._timeOut);
			}
			setColor(this._device, this._options.colors.compile);
		});

		compiler.plugin("after-compile", (done) => {
			if (this._timeOut) {
				clearTimeout(this._timeOut);
			}
			setColor(this._device, this._options.colors.optimize);
			done();
		});

		compiler.plugin("run", (done) => {
			if (this._timeOut) {
				clearTimeout(this._timeOut);
			}
			setColor(this._device, this._options.colors.compile);
			done();
		});

		compiler.plugin("done", (results) => {
			this._onCompilationDone(results);
		});

	}

	_onCompilationDone(result) {
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

export {LuxaforWebpackPlugin, Options};

function off(device) {
	try {
		device.off();
	} catch (error) {
	}
}

function setColor(device, color) {
	try {
		device.setColor(color, 0xff);
	} catch (error) {
	}
}
