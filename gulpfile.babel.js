"use strict";

// Importing in ES6
import tslint from "gulp-tslint";

const gulp = require("gulp");
const jscs = require("gulp-jscs");
const uglify = require("gulp-uglify");
// const babel = require("gulp-babel");
const tsc = require("gulp-typescript");
const rimraf = require("gulp-rimraf");

gulp.task("default", ["clean", "build"]);

gulp.task("build", ["typescript"]);

gulp.task("typescript", () => {
	let tsProject = tsc.createProject("tsconfig.json");
	return gulp.src("src/**/*.ts")
		.pipe(tslint()) // Lint files
		.pipe(tsProject()) // Using .jscsrc
		// .pipe(babel()) // Using .babelrc
		// .pipe(uglify())
		.pipe(gulp.dest("lib"));
});

gulp.task("clean", (done) => {
	return gulp
		.src("lib/**/*.*", {read: false})
		.pipe(rimraf());
});
