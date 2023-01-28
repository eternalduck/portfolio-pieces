const gulp = require("gulp")
const sass = require("gulp-sass")
const autoprefixer = require("autoprefixer")
const postcss = require("gulp-postcss")
const babel = require("gulp-babel")
const browsersync = require("browser-sync")
const eslint = require("gulp-eslint")

let path = {
	src: {
		php: "./**/*.php", //just for watching&reload
		css: "./src/scss/**/*.scss",
		js: "./src/js/**/*.js",
	},
	build: {
		css: "./",
		js: "./js/",
	}
}

function css() {
	return gulp
	.src(path.src.css)
	.pipe(sass({ outputStyle: "expanded" }))
	.pipe(postcss([
		autoprefixer({
			grid: "autoplace"
		}),
	]))
	.pipe(gulp.dest(path.build.css))
	.pipe(browsersync.stream())
}

function js() {
	return gulp
	.src(path.src.js)
	.pipe(eslint({}))
	// Output the results in the console
	.pipe(eslint.format())
	.pipe(babel({
		presets: ["@babel/env"],
		// "comments": false
	}))
	.pipe(gulp.dest(path.build.js))
	.pipe(browsersync.stream())
}

function php() {
	return gulp
	.src(path.src.php)
	.pipe(browsersync.stream())
}

function serve(done) {
	browsersync.init({
		port: 8800,
		watch: true,
		proxy: "ppls-wp:88",
		open: false,
		notify: false,
		reloadOnRestart: true
	})
	gulp.watch(path.src.css, css)
	gulp.watch(path.src.js, js).on('change', browsersync.reload)
	gulp.watch(path.src.php, php).on('change', browsersync.reload)
	done()
}

const build = gulp.series(css, js)
const buildAndStart = gulp.series(css, js, serve)

exports.css = css
exports.js = js
exports.build = build
exports.default = buildAndStart
