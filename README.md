# @ebay/jquery-keyboard-trap

<p>
    <a href="https://travis-ci.org/ianmcburnie/jquery-keyboard-trap"><img src="https://api.travis-ci.org/ianmcburnie/jquery-keyboard-trap.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/ianmcburnie/jquery-keyboard-trap?branch=master'><img src='https://coveralls.io/repos/ianmcburnie/jquery-keyboard-trap/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
</p>

Prevents keyboard focus from leaving the confines of an element.

```js
$.trapKeyboard(el, [options]);
$.untrapKeyboard();
```

For best results, app developer should ensure a descendant of the element
already has keyboard focus before activating this plugin.

## Experimental

This plugin is still in an experimental state, until it reaches v1.0.0 you must
consider all minor releases as breaking changes. Patch releases may introduce
new features, but will be backwards compatible.

Please use the tilde range specifier in your package.json to pin to a fixed
major and minor version.

## Install

```js
npm install @ebay/jquery-keyboard-trap --save
```

## Options

* `deactivateOnFocusExit`: deactivate the keyboard trap when clicking outside of
keyboard trap with pointer. Default: `false`.

## Notes

Keyboard-trap is a singleton as there can only ever be one active keyboard-trap
on a page. Creating a new keyboard-trap will disable the current trap.

## Development

Run `npm start` for test driven development. All tests are located in `test.js`.

Execute `npm run` to view all available CLI scripts:

* `npm start` test driven development: watches code and re-tests after any change
* `npm test` runs tests & generates reports (see reports section below)
* `npm run lint` lints code and reports to jshint.txt
* `npm run minify` builds minified version of code
* `npm run build` cleans, lints, tests and minifies (called on `npm prepublish` hook)
* `npm run clean` deletes all generated test reports and coverage files

## Reports

Each test run will generate the following reports:

* `/test_reports/coverage` contains Istanbul code coverage report
* `/test_reports/html` contains HTML test report
* `/test_reports/junit` contains JUnit test report

## CI Build

https://travis-ci.org/ianmcburnie/jquery-keyboard-trap

## Code Coverage

https://coveralls.io/github/ianmcburnie/jquery-keyboard-trap?branch=master
