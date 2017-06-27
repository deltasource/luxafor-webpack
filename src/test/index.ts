#!/usr/bin/env node
"use strict";

import {LuxaforWebpackPlugin, Options} from "../main";

let luxafor = new LuxaforWebpackPlugin(<Options>{colors: {compile: "#ffffff"}});
