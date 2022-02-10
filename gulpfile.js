const {src, dest, parallel, watch, series} = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");

let scssFiles = "./scss/**/*.scss";
// let jsFiles = "./js/**/*.js";
let jsFiles = [
	"./js/**/*.js",
	"./node_modules/bootstrap/dist/js/bootstrap.bundle.js",
	"./node_modules/swiper/swiper-bundle.js",
];

let dist = "./dist/";

function buildCss() {
	return src(scssFiles)
		.pipe(sass().on("error", sass.logError))
		.pipe(cleanCSS([{level: {1: {specialComments: 0}}}, {compatibility: "ie8"}]))
		.pipe(dest(dist));
}

function buildCssDev() {
	return src(scssFiles)
		.pipe(sass().on("error", sass.logError))
		.pipe(dest(dist));
}

function buildJs() {
	return src(jsFiles)
		.pipe(uglify())
		.pipe(dest(dist));
}

function buildJsDev() {
	return src(jsFiles)
		.pipe(dest(dist));
}

function watchCss() {
	return watch(scssFiles, series(buildCssDev));
}

function watchJs() {
	return watch(jsFiles, series(buildJsDev));
}

module.exports = {
	watchDev: parallel(watchCss, watchJs),
	buildProd: parallel(buildCss, buildJs)
};
