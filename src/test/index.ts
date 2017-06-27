#!/usr/bin/env node
"use strict";

import {IOptions, LuxaforWebpackPlugin} from "../main";

const luxafor = new LuxaforWebpackPlugin({colors: {compile: "#ffffff"}} as IOptions);
