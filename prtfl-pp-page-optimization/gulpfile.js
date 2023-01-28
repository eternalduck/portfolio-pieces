"use strict"
const { src, dest, watch, series, parallel } = require('gulp')
const sass         = require("gulp-sass")
const postcss      = require("gulp-postcss")
const pcmq         = require("postcss-combine-media-query")
const cssnano = require("gulp-cssnano")
const prefixer     = require("gulp-autoprefixer")
const twig         = require("gulp-twig")
const data = require("gulp-data")
const babel        = require("gulp-babel")
const plumber      = require("gulp-plumber")
const notify       = require("gulp-notify")
const browsersync  = require("browser-sync")
const del          = require("del")
const changed      = require("gulp-changed")
const fs           = require("fs")

let path = {
	src: {
		html: ["src/**/*.twig", "src/**/*.html", "!src/includes/**"],
		data: "src/data/data.json",//just one common file for simplicity
		js: "src/js/main.js",
		css: "src/scss/**/*",
		img: "src/images/**/*",
		static: "src/static/**",//non-optimized assets from the live site
		//for watching
		allHtml: ["src/**/*.twig", "src/**/*.html"],
		allJs: "src/**/**.js",
		allCss: ["src/**/*.scss", "src/**/*.css", ],
	},
	build: {
		html: "build/",
		js: "build/js/",
		css: "build/css/",
		img: "build/images/",
		static: "build/static/"
	}
}//path

function server(done) {
	browsersync.init({
		server: {
			baseDir: './build/'
		},
		host: 'localhost',
		port: 1100,
		open: false,
		notify: false,
	})
	done()
}

function serverReload(done) {
	browsersync.reload()
	done()
}

function buildHtml() {
	return src(path.src.html)
		.pipe(plumber())
		.pipe(twig({
			// data: JSON.parse(fs.readFileSync(path.src.data)),
			errorLogToConsole: true
		}))
		.on('error', function (err) {
			process.stderr.write(err.message + '\n');
			this.emit('end');
		})
		.pipe(dest(path.build.html))
		.pipe(plumber.stop())
		.pipe(browsersync.stream())
		.pipe(notify({ message: 'Processed <%= file.relative %>' }))
}

function buildCss() {
	return src(path.src.css)
		.pipe(plumber())
		.pipe(sass().on("error", sass.logError))
		// .pipe(postcss([
		// 	pcmq()//combines media, but their order fails sometimes
		// ]))
		.pipe(prefixer())
		.pipe(cssnano())
		.pipe(plumber.stop())
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
		.pipe(notify({ message: 'Processed <%= file.relative %>' }))
}

function buildJs() {
	return src(path.src.js)
		.pipe(plumber())
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		// .pipe(plumber.stop())
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
		.pipe(notify({ message: 'Processed <%= file.relative %>' }))
}

//hangs?
function copyImg() {
	return src(path.src.img)
		.pipe(changed(path.build.img))
		.pipe(dest(path.build.img))
		.pipe(notify({ message: 'Processed <%= file.relative %>' }))
}

function copyStatic() {
	return src(path.src.static)
		.pipe(changed(path.build.static))
		.pipe(dest(path.build.static))
		.pipe(notify({ message: 'Processed <%= file.relative %>' }))
}

// function buildLibs() {
// 	return src(path.src.libs)
// 		.pipe(changed(path.build.libs))
// 		.pipe(dest(path.build.libs))
// 		.pipe(notify({ message: 'Processed <%= file.relative %>' }))
// }

function clear() {
	return del('./build/')
}

function watchAll() {
	watch(path.src.allHtml, buildHtml)
	watch(path.src.allJs, serverReload)
	watch(path.src.allCss, serverReload)
	watch(path.src.css, buildCss)
	watch(path.src.js, buildJs)
	watch(path.src.img, copyImg)
	watch(path.src.data, buildHtml)
}

const justStart = parallel(watchAll, server, serverReload)
const build = series(buildHtml, buildCss, buildJs, copyImg, copyStatic)
const clearAndBuild = series(clear, build)
const buildAndStart = series(buildHtml, buildCss, copyImg, buildJs, copyStatic, justStart)

exports.default = buildAndStart
exports.build = build
exports.clearAndBuild = clearAndBuild
