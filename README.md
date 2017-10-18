# jquery-keyboard-trap

<p>
    <a href="https://travis-ci.org/makeup-jquery/jquery-keyboard-trap"><img src="https://api.travis-ci.org/makeup-jquery/jquery-keyboard-trap.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/makeup-jquery/jquery-keyboard-trap?branch=master'><img src='https://coveralls.io/repos/makeup-jquery/jquery-keyboard-trap/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
    <a href="https://david-dm.org/makeup-jquery/jquery-keyboard-trap"><img src="https://david-dm.org/makeup-jquery/jquery-keyboard-trap.svg" alt="Dependency status" /></a>
    <a href="https://david-dm.org/makeup-jquery/jquery-keyboard-trap#info=devDependencies"><img src="https://david-dm.org/makeup-jquery/jquery-keyboard-trap/dev-status.svg" alt="devDependency status" /></a>
</p>

**ATTENTION:** A non-jQuery version is now available at [makeup-keyboard-trap](https://github.com/makeup-js/makeup-keyboard-trap).

Establishes a keyboard tab-loop using the interactive descendants of given container element. Or, in other words, it traps keyboard focus inside the given container element.

```js
$.trapKeyboard(containerEl, options);
$.untrapKeyboard();
```

For best results, app developer should ensure a descendant of the container element
already has keyboard focus before activating this plugin.

## Install

```js
npm install jquery-keyboard-trap
```

## Example

HTML structure for a typical dialog, in visible state, with close, cancel & okay focusable elements:

```html
<div role="dialog" class="dialog" aria-labelledby="dialog-0-title" aria-hidden="false">
    <div role="document">
        <header>
            <h2 id="dialog-0-title">Notifications</h2>
            <button aria-label="Close Dialog" id="dialog_close" type="button"></button>
        </header>
        <div>
            <!-- dialog body content would go here -->            
        </div>
        <footer>
            <button type="button">Cancel</button><button type="button">Ok</button>
        </footer>
    </div>
</div>
```

Focus on an element then execute plugin:

```js
$('#dialog_close').focus();
$.trapKeyboard('[role=dialog]');
```

The plugin has now created a tab loop using all focusable elements inside the dialog; keyboard focus is now trapped inside the dialog.

## Events

* `keyboardTrap` - keyboard has been trapped
* `keyboardUntrap` - keyboard has been untrapped

## Options

None.

## Dependencies

* [jquery](https://jquery.com/)
* [jquery-focusable](https://github.com/makeup-jquery/jquery-focusable)

## Notes

Keyboard-trap is a singleton as there can only ever be one active keyboard-trap
on a page. Creating a new keyboard-trap will disable the current trap.

## Development

Run `npm start` for test driven development. All tests are located in `test.js`.

Execute `npm run` to view all available CLI scripts:

* `npm start` test driven development: watches code and re-tests after any change
* `npm test` runs tests & generates reports (see reports section below)
* `npm run lint` lints code for syntax and style using eslint
* `npm run fixstyle` attempts to auto fix style errors using eslint
* `npm run minify` builds minified version of code
* `npm run jsdoc` generates jsdocs
* `npm run build` minifies code and generates jsdocs
* `npm run clean` deletes all generated files

The following hooks exist, and do not need to be invoked manually:

* `npm prepublish` cleans, lints, tests and builds on every `npm publish` command
* `pre-commit` cleans, lints, tests and builds on every `git commit` command

## Test Reports

Each test run will generate the following reports:

* `/test_reports/coverage` contains Istanbul code coverage report
* `/test_reports/html` contains HTML test report
* `/test_reports/junit` contains JUnit test report

## JSDocs

JSDocs are generated under `./jsdoc` folder.

## CI Build

https://travis-ci.org/makeup-jquery/jquery-keyboard-trap

## Code Coverage

https://coveralls.io/github/makeup-jquery/jquery-keyboard-trap?branch=master
