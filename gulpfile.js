'use strict';

const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const mergeJSON = require('gulp-merge-json');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const moment = require('moment');


// helper functions

function addDate(jsonContent) {
  jsonContent.lastUpdatedDate = moment().format("MMMM Do YYYY");
  jsonContent.lastUpdatedTimestamp = moment().format();
  return jsonContent;
}

function getContent() {
  let content = fs.readFileSync("./dist/resume.json", { encoding: "utf8" });
  if(!content) {
    throw new Error("Could not read resume.json!");
  }

  content = JSON.parse(content);
  if(!content) {
    throw new Error("resume.json is not valid JSON!");
  }

  content = addDate(content);

  return content;
}


// tasks

gulp.task('default', ['html', 'css']);

gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('content', function() {
	const stream = gulp.src('src/content/*.json')
		.pipe(mergeJSON('resume.json'))
		.pipe(gulp.dest('./dist'));
  return stream;
});

gulp.task('html', ['content'], function() {
	const stream = gulp.src('src/templates/*.pug')
		.pipe(pug({
			pretty: '  ',
      locals: getContent()
		}))
		.pipe(gulp.dest('./dist'));
  return stream;
});

gulp.task('css', function() {
	const stream = gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist'));
  return stream;
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['default']);
});
