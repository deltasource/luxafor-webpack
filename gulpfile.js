"use strict";

const gulp = require("gulp");
const jscs = require("gulp-jscs");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");

gulp.task("default", () => {
	return gulp
		.src("src/**/*.js")
		.pipe(jscs()) // Using .jscsrc
		.pipe(babel()) // Using .babelrc
		.pipe(uglify())
		.pipe(gulp.dest("lib"));
});
