const testWebpackConfig = require('./webpack.test.js')({env: 'test'});

const ChromiumRevision = require('puppeteer/package.json').puppeteer.chromium_revision;
const Downloader = require('puppeteer/utils/ChromiumDownloader');
const revisionInfo = Downloader.revisionInfo(Downloader.currentPlatform(), ChromiumRevision);

process.env.CHROME_BIN = revisionInfo.executablePath;
module.exports = function (config) {
    config.set({
        frameworks: ["mocha"],
        files: [
            "test/**/*.spec.ts",
            "test/**/*.spec.tsx"
        ],
        preprocessors: {
            "lib/**/*.ts": ["sourcemap"],
            "lib/**/*.tsx": ["sourcemap"],
            "test/**/*.ts": ["webpack", "sourcemap"],
            "test/**/*.tsx": ["webpack", "sourcemap"]
        },
        webpack: testWebpackConfig,
        coverageReporter: {
            reporters:[
                //{type: 'html', dir:'coverage/'},  // https://github.com/karma-runner/karma-coverage/issues/123
                {type: 'text'},
                {type: 'text-summary'}
            ],
        },
        // Webpack please don't spam the console when running in karma!
        webpackMiddleware: {
            quiet: false,
            stats: {
                colors: true
            }
        },
        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-sourcemap-writer',
            'karma-sourcemap-loader',
            'karma-coverage',
            'karma-remap-istanbul',
            'karma-spec-reporter',
            'karma-chrome-launcher',
        ],
        reporters: ["progress", "coverage"],
        singleRun: true,
        port: 9876,
        colors: true,
        browsers: ["ChromeHeadless"],
        logLevel: config.LOG_INFO, //config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        autoWatch: false,
        concurrency: Infinity
    });
};