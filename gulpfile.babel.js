"use strict";

// Importing in ES6
import tslint from "gulp-tslint";

const gulp = require("gulp");
const jscs = require("gulp-jscs");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const tsc = require("gulp-typescript");
const rimraf = require("gulp-rimraf");

gulp.task("default", ["clean", "build"]);

gulp.task("build", ["javascript", "typescript"]);

gulp.task("javascript", () => {
	return gulp
		.src("src/**/*.js")
		.pipe(jscs())
		.pipe(babel()) // Using .babelrc
		.pipe(uglify())
		.pipe(gulp.dest("lib"));
});

gulp.task("typescript", () => {
	return gulp.src("src/**/*.ts")
		.pipe(tslint()) // Lint files
		.pipe(tsc()) // Using .jscsrc
		.pipe(babel()) // Using .babelrc
		.pipe(uglify())
		.pipe(gulp.dest("lib"));
});

gulp.task("clean", (done) => {
	return gulp
		.src("./lib/**/*.*", {read: false})
		.pipe(rimraf());
});
