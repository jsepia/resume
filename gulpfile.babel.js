import del from 'del'
import fs from 'fs'
import gulp from 'gulp'
import mergeJSON from 'gulp-merge-json'
import mocha from 'gulp-mocha'
import pug from 'gulp-pug'
import gulpSass from 'gulp-sass'
import moment from 'moment'
import dartSass from 'dart-sass'

const sass = gulpSass(dartSass)

// helper functions

function addDate(jsonContent) {
  jsonContent.lastUpdatedDate = moment().format('MMMM Do YYYY')
  jsonContent.lastUpdatedYear = moment().format('YYYY')
  jsonContent.lastUpdatedTimestamp = moment().format()
  return jsonContent
}

function getContent() {
  let content = fs.readFileSync('./dist/resume.json', { encoding: 'utf8' })
  if(!content) {
    throw new Error('Could not read resume.json!')
  }

  content = JSON.parse(content)
  if(!content) {
    throw new Error('resume.json is not valid JSON!')
  }

  content = addDate(content)

  return content
}


// tasks

export const content = () => {
    const stream = gulp.src('src/content/*.json')
	    .pipe(mergeJSON({
	        fileName: 'resume.json',
	    }))
	    .pipe(gulp.dest('./dist'))
    return stream
}

export const html = gulp.series(
    content,
    () => {
	    const stream = gulp.src('src/templates/*.pug')
		    .pipe(pug({
			    pretty: '  ',
                locals: getContent(),
		    }))
		    .pipe(gulp.dest('./dist'))
		return stream
    }
)

export const css = () => {
    const stream = gulp.src('src/scss/*.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('./dist'))
    return stream
}

export const build = gulp.series(html, css)

export const clean = () => (
	del(['dist', '.publish'])
)

export const test = gulp.series(
    build,
    () => {
        const stream = gulp.src('test/specs/*.js', {read: false})
            .pipe(mocha({reporter: 'nyan'}))
        return stream
    }
)

export const watch = () => gulp.watch('src/**/*.*', ['build', 'test'])

export default build

