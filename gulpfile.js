"use strict";

const gulp = require("gulp");
const jscs = require("gulp-jscs");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const tsc = require("gulp-typescript");

gulp.task("default", ["javascript", "typescript"]);

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
		.pipe(tsc()) // Using .jscsrc
		.pipe(babel()) // Using .babelrc
		.pipe(uglify())
		.pipe(gulp.dest("lib"));
});
