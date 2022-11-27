'use strict';

// import module
const gulp = require('gulp');
const sass = require('gulp-sass') (require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

//gulp task
const { series,task,src,dest,watch } = gulp;

/*
in-out dir settings
*/

const cssSrcPath = './sass';
const cssDestPath = './css';

//run task sass
task('sass',(done)=>{
    console.log('///// sassのタスク実行 /////');
    src(cssSrcPath + '/*.scss')
    .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass({
        outputStyle: 'expanded'    // or compressed
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(autoprefixer())
    .pipe(dest(cssDestPath));
    done();
});

task('watch',(done)=>{
    console.log('+++++ watchの実行 +++++');
    watch(`${cssSrcPath}/*.scss`,task('sass'));
    done();
});

task('default',series('sass'));