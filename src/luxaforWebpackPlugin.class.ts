"use strict";

import Luxafor from "luxafor-api";
import webpack from "webpack";

const
    DEFAULTS = Object.freeze({
        WARNING_COLOR: "#ff6f00",
        COMPILE_COLOR: "#5071ce",
        BUILDING_COLOR: "#4a148c",
        ERROR_COLOR: "#b71c1c",
        SUCCESS_COLOR: "#1b5e20",
        LED_AUTO_OFF_TIMEOUT: 5000
    });

export default class LuxaforWebpackPlugin {

    private _device: any;
    private _timeOut: number;

    constructor() {
        this._timeOut = null;
        this._device = new Luxafor({});
        off(this._device);
    }

    apply(compiler: webpack.Compiler) {
        compiler.plugin("compile", () => {
            if (this._timeOut) {
                clearTimeout(this._timeOut);
            }
            setColor(this._device, DEFAULTS.COMPILE_COLOR);
        });

        compiler.plugin("run", (cb) => {
            if (this._timeOut) {
                clearTimeout(this._timeOut);
            }
            setColor(this._device, DEFAULTS.BUILDING_COLOR);
            cb();
        });

        compiler.plugin("done", (results) => {
            this._onCompilationDone(results);
        });

    }

    _onCompilationDone(result) {
        if (result.hasErrors()) {
            setColor(this._device, DEFAULTS.ERROR_COLOR);
        } else if (result.hasWarnings()) {
            setColor(this._device, DEFAULTS.WARNING_COLOR);
        } else {
            setColor(this._device, DEFAULTS.SUCCESS_COLOR);
        }
        this._timeOut = setTimeout(() => {
            off(this._device);
        }, DEFAULTS.LED_AUTO_OFF_TIMEOUT);
    }
};

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