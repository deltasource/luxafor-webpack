# Luxafor Webpack Plugin

## About

I wrote this plugin in order to be able to monitor my background webpack watch & build process. It connects to a Luxafor USB LED Flag, and will light the flag during the build using different colors to indicate the build progress & status.

## Installation & use

Install per project using npm:

`npm install —save-dev luxafor-webpack`

Then, add it to the plugins section of your webpack configuration file, preferably as one of the first plugins:

```javascript
module.exports = {
	...,
	plugins: [
  		require("luxafor-webpack"),
	  	...
	]  
}
```

The plugin will automatically detect and use the Luxafor USB device if present.

### Options

It is not yet possible to specify additional options. To be added soon (colors...)

# Copyright & License

The plugin is released under the BSD 2.0 license. If you include this library as a part of your own binaries, please respect the attribution clause.