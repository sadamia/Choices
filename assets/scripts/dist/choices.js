/*! choices.js v1.1.7 | (c) 2016 Josh Johnson | https://github.com/jshjohnson/Choices#readme */ 
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/scripts/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fuse = __webpack_require__(2);

	var _fuse2 = _interopRequireDefault(_fuse);

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(22);

	var _utils = __webpack_require__(23);

	__webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Choices
	 */
	var Choices = function () {
	    function Choices() {
	        var _this = this;

	        var element = arguments.length <= 0 || arguments[0] === undefined ? '[data-choice]' : arguments[0];
	        var userConfig = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, Choices);

	        // If there are multiple elements, create a new instance
	        // for each element besides the first one (as that already has an instance)
	        if ((0, _utils.isType)('String', element)) {
	            var elements = document.querySelectorAll(element);
	            if (elements.length > 1) {
	                for (var i = 1; i < elements.length; i++) {
	                    var el = elements[i];
	                    new Choices(el, userConfig);
	                }
	            }
	        }

	        var defaultConfig = {
	            items: [],
	            choices: [],
	            maxItemCount: -1,
	            addItems: true,
	            removeItems: true,
	            removeItemButton: false,
	            editItems: false,
	            duplicateItems: true,
	            delimiter: ',',
	            paste: true,
	            search: true,
	            flip: true,
	            regexFilter: null,
	            sortFilter: _utils.sortByAlpha,
	            sortFields: ['label', 'value'],
	            placeholder: true,
	            placeholderValue: null,
	            prependValue: null,
	            appendValue: null,
	            loadingText: 'Loading...',
	            noResultsText: 'No results round',
	            noChoicesText: 'No choices to choose from',
	            classNames: {
	                containerOuter: 'choices',
	                containerInner: 'choices__inner',
	                input: 'choices__input',
	                inputCloned: 'choices__input--cloned',
	                list: 'choices__list',
	                listItems: 'choices__list--multiple',
	                listSingle: 'choices__list--single',
	                listDropdown: 'choices__list--dropdown',
	                item: 'choices__item',
	                itemSelectable: 'choices__item--selectable',
	                itemDisabled: 'choices__item--disabled',
	                itemChoice: 'choices__item--choice',
	                placeholder: 'choices__placeholder',
	                group: 'choices__group',
	                groupHeading: 'choices__heading',
	                button: 'choices__button',
	                activeState: 'is-active',
	                focusState: 'is-focused',
	                openState: 'is-open',
	                disabledState: 'is-disabled',
	                highlightedState: 'is-highlighted',
	                hiddenState: 'is-hidden',
	                flippedState: 'is-flipped',
	                loadingState: 'is-loading'
	            },
	            callbackOnInit: function callbackOnInit() {},
	            callbackOnAddItem: function callbackOnAddItem(id, value, passedInput) {},
	            callbackOnRemoveItem: function callbackOnRemoveItem(id, value, passedInput) {},
	            callbackOnHighlightItem: function callbackOnHighlightItem(id, value, passedInput) {},
	            callbackOnUnhighlightItem: function callbackOnUnhighlightItem(id, value, passedInput) {},
	            callbackOnChange: function callbackOnChange(value, passedInput) {}
	        };

	        // Merge options with user options
	        this.config = (0, _utils.extend)(defaultConfig, userConfig);

	        // Create data store
	        this.store = new _index2.default(this.render);

	        // State tracking
	        this.initialised = false;
	        this.currentState = {};
	        this.prevState = {};
	        this.currentValue = '';

	        // Retrieve triggering element (i.e. element with 'data-choice' trigger)
	        this.passedElement = (0, _utils.isType)('String', element) ? document.querySelector(element) : element;

	        this.highlightPosition = 0;
	        this.canSearch = this.config.search;

	        // Assing preset choices from passed object
	        this.presetChoices = this.config.choices;

	        // Assign preset items from passed object first
	        this.presetItems = this.config.items;

	        // Then add any values passed from attribute
	        if (this.passedElement.value) {
	            this.presetItems = this.presetItems.concat(this.passedElement.value.split(this.config.delimiter));
	        }

	        // Bind methods
	        this.init = this.init.bind(this);
	        this.render = this.render.bind(this);
	        this.destroy = this.destroy.bind(this);
	        this.disable = this.disable.bind(this);

	        // Bind event handlers
	        this._onFocus = this._onFocus.bind(this);
	        this._onBlur = this._onBlur.bind(this);
	        this._onKeyUp = this._onKeyUp.bind(this);
	        this._onKeyDown = this._onKeyDown.bind(this);
	        this._onClick = this._onClick.bind(this);
	        this._onTouchMove = this._onTouchMove.bind(this);
	        this._onTouchEnd = this._onTouchEnd.bind(this);
	        this._onMouseDown = this._onMouseDown.bind(this);
	        this._onMouseOver = this._onMouseOver.bind(this);
	        this._onPaste = this._onPaste.bind(this);
	        this._onInput = this._onInput.bind(this);

	        // Focus containerOuter but not show dropdown if true
	        this.focusAndHideDropdown = false;

	        // Monitor touch taps/scrolls
	        this.wasTap = true;

	        // Cutting the mustard
	        var cuttingTheMustard = 'querySelector' in document && 'addEventListener' in document && 'classList' in document.createElement('div');
	        if (!cuttingTheMustard) console.error('Choices: Your browser doesn\'t support Choices');

	        // Input type check
	        var canInit = this.passedElement && (0, _utils.isElement)(this.passedElement) && ['select-one', 'select-multiple', 'text'].some(function (type) {
	            return type === _this.passedElement.type;
	        });

	        if (canInit) {
	            // If element has already been initalised with Choices
	            if (this.passedElement.getAttribute('data-choice') === 'active') return;

	            // Let's go
	            this.init();
	        } else {
	            console.error('Incompatible input passed');
	        }
	    }

	    /**
	     * Initialise Choices
	     * @return
	     * @public
	     */


	    _createClass(Choices, [{
	        key: 'init',
	        value: function init() {
	            var callback = arguments.length <= 0 || arguments[0] === undefined ? this.config.callbackOnInit : arguments[0];

	            if (this.initialised !== true) {
	                // Set initialise flag
	                this.initialised = true;

	                // Create required elements
	                this._createTemplates();

	                // Generate input markup
	                this._createInput();

	                this.store.subscribe(this.render);

	                // Render any items
	                this.render();

	                // Trigger event listeners
	                this._addEventListeners();

	                // Run callback if it is a function
	                if (callback) {
	                    if ((0, _utils.isType)('Function', callback)) {
	                        callback();
	                    } else {
	                        console.error('callbackOnInit: Callback is not a function');
	                    }
	                }
	            }
	        }

	        /**
	         * Destroy Choices and nullify values
	         * @return
	         * @public
	         */

	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this._removeEventListeners();

	            this.passedElement.classList.remove(this.config.classNames.input, this.config.classNames.hiddenState);
	            this.passedElement.tabIndex = '';
	            this.passedElement.removeAttribute('style', 'display:none;');
	            this.passedElement.removeAttribute('aria-hidden');

	            this.containerOuter.outerHTML = this.passedElement.outerHTML;

	            this.passedElement = null;
	            this.userConfig = null;
	            this.config = null;
	            this.store = null;
	        }

	        /**
	         * Select item (a selected item can be deleted)
	         * @param  {Element} item Element to select
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'highlightItem',
	        value: function highlightItem(item) {
	            if (!item) return;
	            var id = item.id;
	            this.store.dispatch((0, _index3.highlightItem)(id, true));

	            // Run callback if it is a function
	            if (this.config.callbackOnHighlightItem) {
	                var callback = this.config.callbackOnHighlightItem;
	                if ((0, _utils.isType)('Function', callback)) {
	                    callback(id, item.value, this.passedElement);
	                } else {
	                    console.error('callbackOnHighlightItem: Callback is not a function');
	                }
	            }

	            return this;
	        }

	        /**
	         * Deselect item
	         * @param  {Element} item Element to de-select
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'unhighlightItem',
	        value: function unhighlightItem(item) {
	            if (!item) return;
	            var id = item.id;
	            this.store.dispatch((0, _index3.highlightItem)(id, false));

	            // Run callback if it is a function
	            if (this.config.callbackOnUnhighlightItem) {
	                var callback = this.config.callbackOnUnhighlightItem;
	                if ((0, _utils.isType)('Function', callback)) {
	                    callback(id, item.value, this.passedElement);
	                } else {
	                    console.error('callbackOnUnhighlightItem: Callback is not a function');
	                }
	            }

	            return this;
	        }

	        /**
	         * Highlight items within store
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'highlightAll',
	        value: function highlightAll() {
	            var _this2 = this;

	            var items = this.store.getItems();
	            items.forEach(function (item) {
	                _this2.highlightItem(item);
	            });

	            return this;
	        }

	        /**
	         * Deselect items within store
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'unhighlightAll',
	        value: function unhighlightAll() {
	            var _this3 = this;

	            var items = this.store.getItems();
	            items.forEach(function (item) {
	                _this3.unhighlightItem(item);
	            });

	            return this;
	        }

	        /**
	         * Remove an item from the store by its value
	         * @param  {String} value Value to search for
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'removeItemsByValue',
	        value: function removeItemsByValue(value) {
	            var _this4 = this;

	            if (!value || !(0, _utils.isType)('String', value)) {
	                console.error('removeItemsByValue: No value was passed to be removed');
	                return;
	            }

	            var items = this.store.getItemsFilteredByActive();

	            items.forEach(function (item) {
	                if (item.value === value) {
	                    _this4._removeItem(item);
	                }
	            });

	            return this;
	        }

	        /**
	         * Remove all items from store array
	         * @note Removed items are soft deleted
	         * @param  {Number} excludedId Optionally exclude item by ID
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'removeActiveItems',
	        value: function removeActiveItems(excludedId) {
	            var _this5 = this;

	            var items = this.store.getItemsFilteredByActive();

	            items.forEach(function (item) {
	                if (item.active && excludedId !== item.id) {
	                    _this5._removeItem(item);
	                }
	            });

	            return this;
	        }

	        /**
	         * Remove all selected items from store
	         * @note Removed items are soft deleted
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'removeHighlightedItems',
	        value: function removeHighlightedItems() {
	            var _this6 = this;

	            var items = this.store.getItemsFilteredByActive();

	            items.forEach(function (item) {
	                if (item.highlighted && item.active) {
	                    _this6._removeItem(item);
	                }
	            });

	            return this;
	        }

	        /**
	         * Show dropdown to user by adding active state class
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'showDropdown',
	        value: function showDropdown() {
	            var focusInput = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	            var body = document.body;
	            var html = document.documentElement;
	            var winHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

	            this.containerOuter.classList.add(this.config.classNames.openState);
	            this.containerOuter.setAttribute('aria-expanded', 'true');
	            this.dropdown.classList.add(this.config.classNames.activeState);

	            var dimensions = this.dropdown.getBoundingClientRect();
	            var dropdownPos = Math.ceil(dimensions.top + window.scrollY + dimensions.height);
	            // If flip is enabled and the dropdown bottom position is greater than the window height flip the dropdown.
	            var shouldFlip = this.config.flip ? dropdownPos >= winHeight : false;

	            if (shouldFlip) {
	                this.containerOuter.classList.add(this.config.classNames.flippedState);
	            } else {
	                this.containerOuter.classList.remove(this.config.classNames.flippedState);
	            }

	            // Optionally focus the input if we have a search input
	            if (focusInput && this.canSearch && document.activeElement !== this.input) {
	                this.input.focus();
	            }

	            return this;
	        }

	        /**
	         * Hide dropdown from user
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'hideDropdown',
	        value: function hideDropdown() {
	            var blurInput = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	            // A dropdown flips if it does not have space within the page
	            var isFlipped = this.containerOuter.classList.contains(this.config.classNames.flippedState);

	            this.containerOuter.classList.remove(this.config.classNames.openState);
	            this.containerOuter.setAttribute('aria-expanded', 'false');

	            this.dropdown.classList.remove(this.config.classNames.activeState);

	            if (isFlipped) {
	                this.containerOuter.classList.remove(this.config.classNames.flippedState);
	            }

	            // Optionally blur the input if we have a search input
	            if (blurInput && this.canSearch && document.activeElement === this.input) {
	                this.input.blur();
	            }

	            return this;
	        }

	        /**
	         * Determine whether to hide or show dropdown based on its current state
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'toggleDropdown',
	        value: function toggleDropdown() {
	            var hasActiveDropdown = this.dropdown.classList.contains(this.config.classNames.activeState);
	            if (hasActiveDropdown) {
	                this.hideDropdown();
	            } else {
	                this.showDropdown(true);
	            }

	            return this;
	        }

	        /**
	         * Get value(s) of input (i.e. inputted items (text) or selected choices (select))
	         * @param {Boolean} valueOnly Get only values of selected items, otherwise return selected items
	         * @return {Array/String} selected value (select-one) or array of selected items (inputs & select-multiple)
	         * @public
	         */

	    }, {
	        key: 'getValue',
	        value: function getValue() {
	            var _this7 = this;

	            var valueOnly = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	            var items = this.store.getItemsFilteredByActive();
	            var selectedItems = [];

	            items.forEach(function (item) {
	                if (_this7.passedElement.type === 'text') {
	                    selectedItems.push(valueOnly ? item.value : item);
	                } else if (item.active) {
	                    selectedItems.push(valueOnly ? item.value : item);
	                }
	            });

	            if (this.passedElement.type === 'select-one') {
	                return selectedItems[0];
	            }

	            return selectedItems;
	        }

	        /**
	         * Set value of input. If the input is a select box, a choice will be created and selected otherwise
	         * an item will created directly.
	         * @param {Array} args Array of value objects or value strings
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'setValue',
	        value: function setValue(args) {
	            var _this8 = this;

	            if (this.initialised === true) {
	                // Convert args to an itterable array
	                var values = [].concat(_toConsumableArray(args));

	                values.forEach(function (item) {
	                    if ((0, _utils.isType)('Object', item)) {
	                        if (!item.value) return;
	                        // If we are dealing with a select input, we need to create an option first
	                        // that is then selected. For text inputs we can just add items normally.
	                        if (_this8.passedElement.type !== 'text') {
	                            _this8._addChoice(true, false, item.value, item.label, -1);
	                        } else {
	                            _this8._addItem(item.value, item.label, item.id);
	                        }
	                    } else if ((0, _utils.isType)('String', item)) {
	                        if (_this8.passedElement.type !== 'text') {
	                            _this8._addChoice(true, false, item, item, -1);
	                        } else {
	                            _this8._addItem(item);
	                        }
	                    }
	                });
	            }

	            return this;
	        }

	        /**
	         * Select value of select box via the value of an existing choice
	         * @param {Array/String} value An array of strings of a single string
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'setValueByChoice',
	        value: function setValueByChoice(value) {
	            var _this9 = this;

	            if (this.passedElement.type !== 'text') {
	                (function () {
	                    var choices = _this9.store.getChoices();
	                    // If only one value has been passed, convert to array
	                    var choiceValue = (0, _utils.isType)('Array', value) ? value : [value];

	                    // Loop through each value and
	                    choiceValue.forEach(function (val) {
	                        var foundChoice = choices.find(function (choice) {
	                            // Check 'value' property exists and the choice isn't already selected
	                            return choice.value === val;
	                        });

	                        if (foundChoice) {
	                            if (!foundChoice.selected) {
	                                _this9._addItem(foundChoice.value, foundChoice.label, foundChoice.id);
	                            } else {
	                                console.warn('Attempting to select choice already selected');
	                            }
	                        } else {
	                            console.warn('Attempting to select choice that does not exist');
	                        }
	                    });
	                })();
	            }
	            return this;
	        }

	        /**
	        * Direct populate choices
	        * @param  {Array} choices - Choices to insert
	        * @param  {String} value - Name of 'value' property
	        * @param  {String} label - Name of 'label' property
	        * @return {Object} Class instance
	        * @public
	        */

	    }, {
	        key: 'setChoices',
	        value: function setChoices(choices, value, label) {
	            var _this10 = this;

	            if (this.initialised === true) {
	                if (this.passedElement.type === 'select-one' || this.passedElement.type === 'select-multiple') {
	                    if (!(0, _utils.isType)('Array', choices) || !value) return;

	                    if (choices && choices.length) {
	                        this.containerOuter.classList.remove(this.config.classNames.loadingState);
	                        choices.forEach(function (result, index) {
	                            if (result.choices) {
	                                _this10._addGroup(result, index);
	                            } else {
	                                _this10._addChoice(result.selected ? result.selected : false, result.disabled ? result.disabled : false, result[value], result[label]);
	                            }
	                        });
	                    }
	                }
	            }
	            return this;
	        }

	        /**
	         * Clear items,choices and groups
	         * @note Hard delete
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'clearStore',
	        value: function clearStore() {
	            this.store.dispatch((0, _index3.clearAll)());
	            return this;
	        }

	        /**
	         * Set value of input to blank
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'clearInput',
	        value: function clearInput() {
	            if (this.input.value) this.input.value = '';
	            if (this.passedElement.type !== 'select-one') {
	                this.input.style.width = (0, _utils.getWidthOfInput)(this.input);
	            }
	            return this;
	        }

	        /**
	         * Disable interaction with Choices
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'disable',
	        value: function disable() {
	            this.passedElement.disabled = true;
	            if (this.initialised) {
	                if (!this.containerOuter.classList.contains(this.config.classNames.disabledState)) {
	                    this._removeEventListeners();
	                    this.passedElement.setAttribute('disabled', '');
	                    this.input.setAttribute('disabled', '');
	                    this.containerOuter.classList.add(this.config.classNames.disabledState);
	                    this.containerOuter.setAttribute('aria-disabled', 'true');
	                }
	            }
	            return this;
	        }

	        /**
	         * Enable interaction with Choices
	         * @return {Object} Class instance
	         */

	    }, {
	        key: 'enable',
	        value: function enable() {
	            this.passedElement.disabled = false;
	            if (this.initialised) {
	                if (this.containerOuter.classList.contains(this.config.classNames.disabledState)) {
	                    this._addEventListeners();
	                    this.passedElement.removeAttribute('disabled');
	                    this.input.removeAttribute('disabled');
	                    this.containerOuter.classList.remove(this.config.classNames.disabledState);
	                    this.containerOuter.removeAttribute('aria-disabled');
	                }
	            }
	            return this;
	        }

	        /**
	         * Populate options via ajax callback
	         * @param  {Function} fn Passed
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: 'ajax',
	        value: function ajax(fn) {
	            var _this11 = this;

	            if (this.initialised === true) {
	                if (this.passedElement.type === 'select-one' || this.passedElement.type === 'select-multiple') {
	                    this.containerOuter.classList.add(this.config.classNames.loadingState);
	                    this.containerOuter.setAttribute('aria-busy', 'true');
	                    if (this.passedElement.type === 'select-one') {
	                        var placeholderItem = this._getTemplate('placeholder', this.config.loadingText);
	                        this.itemList.appendChild(placeholderItem);
	                    } else {
	                        this.input.placeholder = this.config.loadingText;
	                    }

	                    var callback = function callback(results, value, label) {
	                        if (!(0, _utils.isType)('Array', results) || !value) return;
	                        if (results && results.length) {
	                            // Remove loading states/text
	                            _this11.containerOuter.classList.remove(_this11.config.classNames.loadingState);
	                            if (_this11.passedElement.type === 'select-multiple') {
	                                var placeholder = _this11.config.placeholder ? _this11.config.placeholderValue || _this11.passedElement.getAttribute('placeholder') : false;
	                                if (placeholder) {
	                                    _this11.input.placeholder = placeholder;
	                                }
	                            }

	                            // Add each result as a choice
	                            results.forEach(function (result, index) {
	                                // Select first choice in list if single select input
	                                if (index === 0 && _this11.passedElement.type === 'select-one') {
	                                    _this11._addChoice(true, false, result[value], result[label]);
	                                } else {
	                                    _this11._addChoice(false, false, result[value], result[label]);
	                                }
	                            });
	                        }
	                        _this11.containerOuter.removeAttribute('aria-busy');
	                    };
	                    fn(callback);
	                }
	            }
	            return this;
	        }

	        /**
	         * Call change callback
	         * @param  {String} value - last added/deleted/selected value
	         * @return
	         * @private
	         */

	    }, {
	        key: '_triggerChange',
	        value: function _triggerChange(value) {
	            if (!value) return;

	            // Run callback if it is a function
	            if (this.config.callbackOnChange) {
	                var callback = this.config.callbackOnChange;
	                if ((0, _utils.isType)('Function', callback)) {
	                    callback(value, this.passedElement);
	                } else {
	                    console.error('callbackOnChange: Callback is not a function');
	                }
	            }

	            // Keep focus on select-one element
	            if (this.passedElement.type === 'select-one') {
	                this.focusAndHideDropdown = true;
	                this.containerOuter.focus();
	            }
	        }

	        /**
	         * Process enter/click of an item button
	         * @param {Array} activeItems The currently active items
	         * @param  {Element} element Button being interacted with
	         * @return
	         * @private
	         */

	    }, {
	        key: '_handleButtonAction',
	        value: function _handleButtonAction(activeItems, element) {
	            var _this12 = this;

	            if (!activeItems || !element) return;

	            // If we are clicking on a button
	            if (this.config.removeItems && this.config.removeItemButton) {
	                (function () {
	                    var itemId = element.parentNode.getAttribute('data-id');
	                    var itemToRemove = activeItems.find(function (item) {
	                        return item.id === parseInt(itemId, 10);
	                    });

	                    // Remove item associated with button
	                    _this12._removeItem(itemToRemove);
	                    _this12._triggerChange(itemToRemove.value);

	                    if (_this12.passedElement.type === 'select-one') {
	                        var placeholder = _this12.config.placeholder ? _this12.config.placeholderValue || _this12.passedElement.getAttribute('placeholder') : false;
	                        if (placeholder) {
	                            var placeholderItem = _this12._getTemplate('placeholder', placeholder);
	                            _this12.itemList.appendChild(placeholderItem);
	                        }
	                    }
	                })();
	            }
	        }

	        /**
	         * Process click of an item
	         * @param {Array} activeItems The currently active items
	         * @param  {Element} element Item being interacted with
	         * @param  {Boolean} hasShiftKey Whether the user has the shift key active
	         * @return
	         * @private
	         */

	    }, {
	        key: '_handleItemAction',
	        value: function _handleItemAction(activeItems, element) {
	            var _this13 = this;

	            var hasShiftKey = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	            if (!activeItems || !element) return;

	            // If we are clicking on an item
	            if (this.config.removeItems && this.passedElement.type !== 'select-one') {
	                (function () {
	                    var passedId = element.getAttribute('data-id');

	                    // We only want to select one item with a click
	                    // so we deselect any items that aren't the target
	                    // unless shift is being pressed
	                    activeItems.forEach(function (item) {
	                        if (item.id === parseInt(passedId, 10) && !item.highlighted) {
	                            _this13.highlightItem(item);
	                        } else if (!hasShiftKey) {
	                            if (item.highlighted) {
	                                _this13.unhighlightItem(item);
	                            }
	                        }
	                    });

	                    // Focus input as without focus, a user cannot do anything with a
	                    // highlighted item
	                    if (document.activeElement !== _this13.input) _this13.input.focus();
	                })();
	            }
	        }

	        /**
	         * Process click of a choice
	         * @param {Array} activeItems The currently active items
	         * @param  {Element} element Choice being interacted with
	         * @return {[type]}             [description]
	         */

	    }, {
	        key: '_handleChoiceAction',
	        value: function _handleChoiceAction(activeItems, element) {
	            if (!activeItems || !element) return;

	            // If we are clicking on an option
	            var id = element.getAttribute('data-id');
	            var choice = this.store.getChoiceById(id);
	            var hasActiveDropdown = this.dropdown.classList.contains(this.config.classNames.activeState);

	            if (choice && !choice.selected && !choice.disabled) {
	                var canAddItem = this._canAddItem(activeItems, choice.value);

	                if (canAddItem.response) {
	                    this._addItem(choice.value, choice.label, choice.id);
	                    this._triggerChange(choice.value);
	                    this.clearInput(this.passedElement);
	                    this.isSearching = false;
	                    this.store.dispatch((0, _index3.activateChoices)(true));

	                    // We only hide the dropdown on a choice selection for single select boxes
	                    if (this.passedElement.type === 'select-one' && hasActiveDropdown) {
	                        this.hideDropdown();
	                    }
	                }
	            }
	        }

	        /**
	         * Process back space event
	         * @param  {Array} Active items
	         * @return
	         * @private
	         */

	    }, {
	        key: '_handleBackspace',
	        value: function _handleBackspace(activeItems) {
	            if (this.config.removeItems && activeItems) {
	                var lastItem = activeItems[activeItems.length - 1];
	                var hasHighlightedItems = activeItems.some(function (item) {
	                    return item.highlighted === true;
	                });

	                // If editing the last item is allowed and there are not other selected items,
	                // we can edit the item value. Otherwise if we can remove items, remove all selected items
	                if (this.config.editItems && !hasHighlightedItems && lastItem) {
	                    this.input.value = lastItem.value;
	                    this._removeItem(lastItem);
	                    this._triggerChange(lastItem.value);
	                } else {
	                    if (!hasHighlightedItems) {
	                        this.highlightItem(lastItem);
	                    }
	                    this.removeHighlightedItems();
	                }
	            }
	        }

	        /**
	         * Validates whether an item can be added by a user
	         * @param {Array} activeItems The currently active items
	         * @param  {String} value     Value of item to add
	         * @return {Object}           Response: Whether user can add item
	         *                            Notice: Notice show in dropdown
	         */

	    }, {
	        key: '_canAddItem',
	        value: function _canAddItem(activeItems, value) {
	            var canAddItem = true;
	            var notice = 'Press Enter to add "' + value + '"';

	            if (this.passedElement.type === 'select-multiple' || this.passedElement.type === 'text') {
	                if (this.config.maxItemCount > 0 && this.config.maxItemCount <= this.itemList.children.length) {
	                    // If there is a max entry limit and we have reached that limit
	                    // don't update
	                    canAddItem = false;
	                    notice = 'Only ' + this.config.maxItemCount + ' values can be added.';
	                }
	            }

	            if (this.passedElement.type === 'text' && this.config.addItems) {
	                var isUnique = !activeItems.some(function (item) {
	                    return item.value === value;
	                });

	                // If a user has supplied a regular expression filter
	                if (this.config.regexFilter) {
	                    // Determine whether we can update based on whether
	                    // our regular expression passes
	                    canAddItem = this._regexFilter(value);
	                }

	                // If no duplicates are allowed, and the value already exists
	                // in the array
	                if (this.config.duplicateItems === false && !isUnique) {
	                    canAddItem = false;
	                    notice = 'Only unique values can be added.';
	                }
	            }

	            return {
	                response: canAddItem,
	                notice: notice
	            };
	        }

	        /**
	         * Filter choices based on search value
	         * @param  {String} value Value to filter by
	         * @return
	         * @private
	         */

	    }, {
	        key: '_searchChoices',
	        value: function _searchChoices(value) {
	            var _this14 = this;

	            if (!value) return;
	            if (this.input === document.activeElement) {
	                var choices = this.store.getChoices();
	                var hasUnactiveChoices = choices.some(function (option) {
	                    return option.active !== true;
	                });

	                // Check that we have a value to search and the input was an alphanumeric character
	                if (value && value.length > 1) {
	                    var handleFilter = function handleFilter() {
	                        var newValue = (0, _utils.isType)('String', value) ? value.trim() : value;
	                        var currentValue = (0, _utils.isType)('String', _this14.currentValue) ? _this14.currentValue.trim() : _this14.currentValue;

	                        if (newValue.length >= 1 && newValue !== currentValue + ' ') {
	                            var haystack = _this14.store.getChoicesFilteredBySelectable();
	                            var needle = newValue;
	                            var keys = (0, _utils.isType)('Array', _this14.config.sortFields) ? _this14.config.sortFields : [_this14.config.sortFields];
	                            var fuse = new _fuse2.default(haystack, {
	                                keys: keys,
	                                shouldSort: true,
	                                include: 'score'
	                            });
	                            var results = fuse.search(needle);

	                            _this14.currentValue = newValue;
	                            _this14.highlightPosition = 0;
	                            _this14.isSearching = true;
	                            _this14.store.dispatch((0, _index3.filterChoices)(results));
	                        }
	                    };

	                    handleFilter();
	                } else if (hasUnactiveChoices) {
	                    // Otherwise reset choices to active
	                    this.isSearching = false;
	                    this.store.dispatch((0, _index3.activateChoices)(true));
	                }
	            }
	        }

	        /**
	         * Trigger event listeners
	         * @return
	         * @private
	         */

	    }, {
	        key: '_addEventListeners',
	        value: function _addEventListeners() {
	            document.addEventListener('keyup', this._onKeyUp);
	            document.addEventListener('keydown', this._onKeyDown);
	            document.addEventListener('click', this._onClick);
	            document.addEventListener('touchmove', this._onTouchMove);
	            document.addEventListener('touchend', this._onTouchEnd);
	            document.addEventListener('mousedown', this._onMouseDown);
	            document.addEventListener('mouseover', this._onMouseOver);

	            if (this.passedElement.type && this.passedElement.type === 'select-one') {
	                this.containerOuter.addEventListener('focus', this._onFocus);
	                this.containerOuter.addEventListener('blur', this._onBlur);
	            }

	            this.input.addEventListener('input', this._onInput);
	            this.input.addEventListener('paste', this._onPaste);
	            this.input.addEventListener('focus', this._onFocus);
	            this.input.addEventListener('blur', this._onBlur);
	        }

	        /**
	         * Destroy event listeners
	         * @return
	         * @private
	         */

	    }, {
	        key: '_removeEventListeners',
	        value: function _removeEventListeners() {
	            document.removeEventListener('keyup', this._onKeyUp);
	            document.removeEventListener('keydown', this._onKeyDown);
	            document.removeEventListener('click', this._onClick);
	            document.removeEventListener('touchmove', this._onTouchMove);
	            document.removeEventListener('touchend', this._onTouchEnd);
	            document.removeEventListener('mousedown', this._onMouseDown);
	            document.removeEventListener('mouseover', this._onMouseOver);

	            if (this.passedElement.type && this.passedElement.type === 'select-one') {
	                this.containerOuter.removeEventListener('focus', this._onFocus);
	                this.containerOuter.removeEventListener('blur', this._onBlur);
	            }

	            this.input.removeEventListener('input', this._onInput);
	            this.input.removeEventListener('paste', this._onPaste);
	            this.input.removeEventListener('focus', this._onFocus);
	            this.input.removeEventListener('blur', this._onBlur);
	        }

	        /**
	         * Key down event
	         * @param  {Object} e Event
	         * @return
	         */

	    }, {
	        key: '_onKeyDown',
	        value: function _onKeyDown(e) {
	            if (e.target !== this.input && !this.containerOuter.contains(e.target)) return;

	            var target = e.target;

	            var ctrlDownKey = e.ctrlKey || e.metaKey;
	            var backKey = 46;
	            var deleteKey = 8;
	            var enterKey = 13;
	            var aKey = 65;
	            var escapeKey = 27;
	            var upKey = 38;
	            var downKey = 40;

	            var activeItems = this.store.getItemsFilteredByActive();
	            var hasFocusedInput = this.input === document.activeElement;
	            var hasActiveDropdown = this.dropdown.classList.contains(this.config.classNames.activeState);
	            var hasItems = this.itemList && this.itemList.children;
	            var keyString = String.fromCharCode(e.keyCode);

	            // If a user is typing and the dropdown is not active
	            if (this.passedElement.type !== 'text' && /[a-zA-Z0-9-_ ]/.test(keyString) && !hasActiveDropdown) {
	                this.showDropdown();
	            }

	            this.canSearch = this.config.search;

	            switch (e.keyCode) {
	                case aKey:
	                    // If CTRL + A or CMD + A have been pressed and there are items to select
	                    if (ctrlDownKey && hasItems) {
	                        this.canSearch = false;
	                        if (this.config.removeItems && !this.input.value && this.input === document.activeElement) {
	                            // Highlight items
	                            this.highlightAll(this.itemList.children);
	                        }
	                    }
	                    break;

	                case enterKey:
	                    // If enter key is pressed and the input has a value
	                    if (this.passedElement.type === 'text' && target.value) {
	                        var value = this.input.value;
	                        var canAddItem = this._canAddItem(activeItems, value);

	                        // All is good, add
	                        if (canAddItem.response) {
	                            if (hasActiveDropdown) {
	                                this.hideDropdown();
	                            }
	                            this._addItem(value);
	                            this._triggerChange(value);
	                            this.clearInput(this.passedElement);
	                        }
	                    }

	                    if (target.hasAttribute('data-button')) {
	                        this._handleButtonAction(activeItems, target);
	                        e.preventDefault();
	                    }

	                    if (hasActiveDropdown) {
	                        var highlighted = this.dropdown.querySelector('.' + this.config.classNames.highlightedState);

	                        if (highlighted) {
	                            this._handleChoiceAction(activeItems, highlighted);
	                        }

	                        // We always want to hide the dropdown for single selects
	                        // regardless of whether an item was added
	                        if (hasActiveDropdown && this.passedElement.type === 'select-one') {
	                            this.hideDropdown();
	                        }
	                    } else if (this.passedElement.type === 'select-one') {
	                        // Open single select dropdown if it's not active
	                        if (!hasActiveDropdown) {
	                            this.showDropdown(true);
	                            e.preventDefault();
	                        }
	                    }

	                    break;

	                case escapeKey:
	                    if (hasActiveDropdown) this.toggleDropdown();
	                    break;

	                case downKey:
	                case upKey:
	                    // If up or down key is pressed, traverse through options
	                    if (hasActiveDropdown || this.passedElement.type === 'select-one') {
	                        // Show dropdown if focus
	                        if (!hasActiveDropdown) {
	                            this.showDropdown(true);
	                        }

	                        var currentEl = this.dropdown.querySelector('.' + this.config.classNames.highlightedState);
	                        var directionInt = e.keyCode === downKey ? 1 : -1;
	                        var nextEl = void 0;

	                        this.canSearch = false;

	                        if (currentEl) {
	                            nextEl = (0, _utils.getAdjacentEl)(currentEl, '[data-choice-selectable]', directionInt);
	                        } else {
	                            nextEl = this.dropdown.querySelector('[data-choice-selectable]');
	                        }

	                        if (nextEl) {
	                            // We prevent default to stop the cursor moving
	                            // when pressing the arrow
	                            if (!(0, _utils.isScrolledIntoView)(nextEl, this.choiceList, directionInt)) {
	                                this._scrollToChoice(nextEl, directionInt);
	                            }
	                            this._highlightChoice(nextEl);
	                        }

	                        // Prevent default to maintain cursor position whilst
	                        // traversing dropdown options
	                        e.preventDefault();
	                    }
	                    break;

	                case backKey:
	                case deleteKey:
	                    // If backspace or delete key is pressed and the input has no value
	                    if (hasFocusedInput && !e.target.value && this.passedElement.type !== 'select-one') {
	                        this._handleBackspace(activeItems);
	                        e.preventDefault();
	                    }

	                    break;

	                default:
	                    break;
	            }
	        }

	        /**
	         * Key up event
	         * @param  {Object} e Event
	         * @return
	         * @private
	         */

	    }, {
	        key: '_onKeyUp',
	        value: function _onKeyUp(e) {
	            if (e.target !== this.input) return;

	            // We are typing into a text input and have a value, we want to show a dropdown
	            // notice. Otherwise hide the dropdown
	            if (this.passedElement.type === 'text') {
	                var hasActiveDropdown = this.dropdown.classList.contains(this.config.classNames.activeState);
	                var value = this.input.value;

	                if (value) {
	                    var activeItems = this.store.getItemsFilteredByActive();
	                    var canAddItem = this._canAddItem(activeItems, value);

	                    if (canAddItem.notice) {
	                        var dropdownItem = this._getTemplate('notice', canAddItem.notice);
	                        this.dropdown.innerHTML = dropdownItem.outerHTML;
	                    }

	                    if (canAddItem.response === true) {
	                        if (!hasActiveDropdown) {
	                            this.showDropdown();
	                        }
	                    } else if (!canAddItem.notice && hasActiveDropdown) {
	                        this.hideDropdown();
	                    }
	                } else if (hasActiveDropdown) {
	                    this.hideDropdown();
	                }
	            } else {
	                var backKey = 46;
	                var deleteKey = 8;

	                // If user has removed value...
	                if ((e.keyCode === backKey || e.keyCode === deleteKey) && !e.target.value) {
	                    // ...and it is a multiple select input, activate choices (if searching)
	                    if (this.passedElement.type !== 'text' && this.isSearching) {
	                        this.isSearching = false;
	                        this.store.dispatch((0, _index3.activateChoices)(true));
	                    }
	                } else if (this.canSearch) {
	                    this._searchChoices(this.input.value);
	                }
	            }
	        }

	        /**
	         * Input event
	         * @param  {Object} e Event
	         * @return
	         * @private
	         */

	    }, {
	        key: '_onInput',
	        value: function _onInput() {
	            if (this.passedElement.type !== 'select-one') {
	                if (this.config.placeholder && (this.config.placeholderValue || this.passedElement.getAttribute('placeholder'))) {
	                    // If there is a placeholder, we only want to set the width of the input when it is a greater
	                    // length than 75% of the placeholder. This stops the input jumping around.
	                    var placeholder = this.config.placeholder ? this.config.placeholderValue || this.passedElement.getAttribute('placeholder') : false;
	                    if (this.input.value && this.input.value.length >= placeholder.length / 1.25) {
	                        this.input.style.width = (0, _utils.getWidthOfInput)(this.input);
	                    }
	                } else {
	                    // If there is no placeholder, resize input to contents
	                    this.input.style.width = (0, _utils.getWidthOfInput)(this.input);
	                }
	            }
	        }

	        /**
	         * Touch move event
	         * @param  {Object} e Event
	         * @return
	         * @private
	         */

	    }, {
	        key: '_onTouchMove',
	        value: function _onTouchMove() {
	            if (this.wasTap === true) {
	                this.wasTap = false;
	            }
	        }

	        /**
	         * Touch end event
	         * @param  {Object} e Event
	         * @return
	         * @private
	         */

	    }, {
	        key: '_onTouchEnd',
	        value: function _onTouchEnd(e) {
	            var target = e.target || e.touches[0].target;
	            var hasActiveDropdown = this.dropdown.classList.contains(this.config.classNames.activeState);

	            // If a user tapped within our container...
	            if (this.wasTap === true && this.containerOuter.contains(target)) {
	                // ...and we aren't dealing with a single select box, show dropdown/focus input
	                if ((target === this.containerOuter || target === this.containerInner) && this.passedElement.type !== 'select-one') {
	                    if (this.passedElement.type === 'text') {
	                        // If text element, we only want to focus the input (if it isn't already)
	                        if (document.activeElement !== this.input) {
	                            this.input.focus();
	                        }
	                    } else {
	                        if (!hasActiveDropdown) {
	                            // If a select box, we want to show the dropdown
	                            this.showDropdown(true);
	                        }
	                    }
	                }
	                // Prevents focus event firing
	                e.stopPropagation();
	            }

	            this.wasTap = true;
	        }

	        /**
	         * Mouse down event
	         * @param  {Object} e Event
	         * @return
	         * @private
	         */

	    }, {
	        key: '_onMouseDown',
	        value: function _onMouseDown(e) {
	            var target = e.target;

	            if (this.containerOuter.contains(target) && target !== this.input) {
	                var activeItems = this.store.getItemsFilteredByActive();
	                var hasShiftKey = e.shiftKey;

	                if (target.hasAttribute('data-item')) {
	                    this._handleItemAction(activeItems, target, hasShiftKey);
	                } else if (target.hasAttribute('data-choice')) {
	                    this._handleChoiceAction(activeItems, target);
	                }

	                e.preventDefault();
	            }
	        }

	        /**
	         * Click event
	         * @param  {Object} e Event
	         * @return
	         * @private
	         */

	    }, {
	        key: '_onClick',
	        value: function _onClick(e) {
	            var target = e.target;
	            var hasActiveDropdown = this.dropdown.classList.contains(this.config.classNames.activeState);
	            var activeItems = this.store.getItemsFilteredByActive();

	            // If target is something that concerns us
	            if (this.containerOuter.contains(target)) {
	                // Handle button delete
	                if (target.hasAttribute('data-button')) {
	                    this._handleButtonAction(activeItems, target);
	                }

	                if (!hasActiveDropdown) {
	                    if (this.passedElement.type === 'text') {
	                        if (document.activeElement !== this.input) {
	                            this.input.focus();
	                        }
	                    } else {
	                        if (this.canSearch) {
	                            this.showDropdown(true);
	                        } else {
	                            this.showDropdown();
	                            this.containerOuter.focus();
	                        }
	                    }
	                } else if (this.passedElement.type === 'select-one' && target !== this.input && !this.dropdown.contains(target)) {
	                    this.hideDropdown(true);
	                }
	            } else {
	                var hasHighlightedItems = activeItems.some(function (item) {
	                    return item.highlighted === true;
	                });

	                // De-select any highlighted items
	                if (hasHighlightedItems) {
	                    this.unhighlightAll();
	                }

	                // Remove focus state
	                this.containerOuter.classList.remove(this.config.classNames.focusState);

	                // Close all other dropdowns
	                if (hasActiveDropdown) {
	                    this.hideDropdown();
	                }
	            }
	        }

	        /**
	         * Mouse over (hover) event
	         * @param  {Object} e Event
	         * @return
	         * @private
	         */

	    }, {
	        key: '_onMouseOver',
	        value: function _onMouseOver(e) {
	            // If the dropdown is either the target or one of its children is the target
	            if (e.target === this.dropdown || this.dropdown.contains(e.target)) {
	                if (e.target.hasAttribute('data-choice')) this._highlightChoice(e.target);
	            }
	        }

	        /**
	         * Paste event
	         * @param  {Object} e Event
	         * @return
	         * @private
	         */

	    }, {
	        key: '_onPaste',
	        value: function _onPaste(e) {
	            // Disable pasting into the input if option has been set
	            if (e.target === this.input && !this.config.paste) {
	                e.preventDefault();
	            }
	        }

	        /**
	         * Focus event
	         * @param  {Object} e Event
	         * @return
	         * @private
	         */

	    }, {
	        key: '_onFocus',
	        value: function _onFocus(e) {
	            var target = e.target;
	            // If target is something that concerns us
	            if (this.containerOuter.contains(target)) {
	                var hasActiveDropdown = this.dropdown.classList.contains(this.config.classNames.activeState);

	                switch (this.passedElement.type) {
	                    case 'text':
	                        {
	                            if (target === this.input) {
	                                this.containerOuter.classList.add(this.config.classNames.focusState);
	                            }

	                            break;
	                        }
	                    case 'select-one':
	                        {
	                            if (target === this.containerOuter) {
	                                // If element is a select box, the focussed element is the container and the dropdown
	                                // isn't already open, focus and show dropdown
	                                this.containerOuter.classList.add(this.config.classNames.focusState);

	                                // Show dropdown if it isn't already showing
	                                if (!hasActiveDropdown) {
	                                    if (!this.focusAndHideDropdown && this.canSearch && document.activeElement !== this.input) {
	                                        this.showDropdown(true);
	                                    } else {
	                                        this.showDropdown();
	                                    }
	                                }

	                                this.focusAndHideDropdown = false;
	                            }

	                            if (target === this.input) {
	                                // If element is a select box, the focussed element is the container and the dropdown
	                                // isn't already open, focus and show dropdown
	                                this.containerOuter.classList.add(this.config.classNames.focusState);

	                                // Show dropdown if it isn't already showing
	                                if (!hasActiveDropdown) {
	                                    this.showDropdown();
	                                }
	                            }

	                            break;
	                        }
	                    case 'select-multiple':
	                        {
	                            if (target === this.input) {
	                                // If element is a select box, the focussed element is the container and the dropdown
	                                // isn't already open, focus and show dropdown
	                                this.containerOuter.classList.add(this.config.classNames.focusState);

	                                if (!hasActiveDropdown) {
	                                    this.showDropdown(true);
	                                }
	                            }

	                            break;
	                        }

	                    default:
	                        break;
	                }
	            }
	        }

	        /**
	         * Blur event
	         * @param  {Object} e Event
	         * @return
	         * @private
	         */

	    }, {
	        key: '_onBlur',
	        value: function _onBlur(e) {
	            var target = e.target;
	            // If target is something that concerns us
	            if (this.containerOuter.contains(target)) {
	                var activeItems = this.store.getItemsFilteredByActive();
	                var hasActiveDropdown = this.dropdown.classList.contains(this.config.classNames.activeState);
	                var hasHighlightedItems = activeItems.some(function (item) {
	                    return item.highlighted === true;
	                });

	                switch (this.passedElement.type) {
	                    case 'text':
	                        {
	                            if (target === this.input) {
	                                // Remove the focus state
	                                this.containerOuter.classList.remove(this.config.classNames.focusState);
	                                // De-select any highlighted items
	                                if (hasHighlightedItems) {
	                                    this.unhighlightAll();
	                                }
	                                // Hide dropdown if it is showing
	                                if (hasActiveDropdown) {
	                                    this.hideDropdown();
	                                }
	                            }

	                            break;
	                        }
	                    case 'select-one':
	                        {
	                            if (target === this.containerOuter) {
	                                this.containerOuter.classList.remove(this.config.classNames.focusState);

	                                // Hide dropdown if it is showing
	                                if (hasActiveDropdown && !this.canSearch) {
	                                    this.hideDropdown();
	                                }
	                            }

	                            if (target === this.input) {
	                                this.containerOuter.classList.remove(this.config.classNames.focusState);

	                                // Hide dropdown if it is showing
	                                if (hasActiveDropdown) {
	                                    this.hideDropdown();
	                                }
	                            }

	                            break;
	                        }
	                    case 'select-multiple':
	                        {
	                            if (target === this.input) {
	                                // Remove the focus state
	                                this.containerOuter.classList.remove(this.config.classNames.focusState);
	                                if (hasActiveDropdown) {
	                                    this.hideDropdown();
	                                }
	                                // De-select any highlighted items
	                                if (hasHighlightedItems) {
	                                    this.unhighlightAll();
	                                }
	                            }

	                            break;
	                        }

	                    default:
	                        break;
	                }
	            }
	        }

	        /**
	         * Tests value against a regular expression
	         * @param  {string} value   Value to test
	         * @return {Boolean}        Whether test passed/failed
	         * @private
	         */

	    }, {
	        key: '_regexFilter',
	        value: function _regexFilter(value) {
	            if (!value) return;
	            var regex = this.config.regexFilter;
	            var expression = new RegExp(regex.source, 'i');
	            return expression.test(value);
	        }

	        /**
	         * Scroll to an option element
	         * @param  {HTMLElement} option  Option to scroll to
	         * @param  {Number} direction  Whether option is above or below
	         * @return
	         * @private
	         */

	    }, {
	        key: '_scrollToChoice',
	        value: function _scrollToChoice(choice, direction) {
	            var _this15 = this;

	            if (!choice) return;

	            var dropdownHeight = this.choiceList.offsetHeight;
	            var choiceHeight = choice.offsetHeight;

	            // Distance from bottom of element to top of parent
	            var choicePos = choice.offsetTop + choiceHeight;

	            // Scroll position of dropdown
	            var containerScrollPos = this.choiceList.scrollTop + dropdownHeight;

	            // Difference between the choice and scroll position
	            var endPoint = direction > 0 ? this.choiceList.scrollTop + choicePos - containerScrollPos : choice.offsetTop;

	            var animateScroll = function animateScroll() {
	                var strength = 4;
	                var continueAnimation = false;
	                var easing = void 0;
	                var distance = void 0;

	                if (direction > 0) {
	                    easing = (endPoint - _this15.choiceList.scrollTop) / strength;
	                    distance = easing > 1 ? easing : 1;

	                    _this15.choiceList.scrollTop = _this15.choiceList.scrollTop + distance;
	                    if (_this15.choiceList.scrollTop < endPoint) {
	                        continueAnimation = true;
	                    }
	                } else {
	                    easing = (_this15.choiceList.scrollTop - endPoint) / strength;
	                    distance = easing > 1 ? easing : 1;

	                    _this15.choiceList.scrollTop = _this15.choiceList.scrollTop - distance;
	                    if (_this15.choiceList.scrollTop > endPoint) {
	                        continueAnimation = true;
	                    }
	                }

	                if (continueAnimation) {
	                    requestAnimationFrame(function (time) {
	                        animateScroll(time, endPoint, direction);
	                    });
	                }
	            };

	            requestAnimationFrame(function (time) {
	                animateScroll(time, endPoint, direction);
	            });
	        }

	        /**
	         * Highlight choice
	         * @param  {HTMLElement} el Element to highlight
	         * @return
	         * @private
	         */

	    }, {
	        key: '_highlightChoice',
	        value: function _highlightChoice(el) {
	            var _this16 = this;

	            // Highlight first element in dropdown
	            var choices = Array.from(this.dropdown.querySelectorAll('[data-choice-selectable]'));

	            if (choices && choices.length) {
	                var highlightedChoices = Array.from(this.dropdown.querySelectorAll('.' + this.config.classNames.highlightedState));

	                // Remove any highlighted choices
	                highlightedChoices.forEach(function (choice) {
	                    choice.classList.remove(_this16.config.classNames.highlightedState);
	                    choice.setAttribute('aria-selected', 'false');
	                });

	                if (el) {
	                    // Highlight given option
	                    el.classList.add(this.config.classNames.highlightedState);
	                    this.highlightPosition = choices.indexOf(el);
	                } else {
	                    // Highlight choice based on last known highlight location
	                    var choice = void 0;

	                    if (choices.length > this.highlightPosition) {
	                        // If we have an option to highlight
	                        choice = choices[this.highlightPosition];
	                    } else {
	                        // Otherwise highlight the option before
	                        choice = choices[choices.length - 1];
	                    }

	                    if (!choice) choice = choices[0];
	                    choice.classList.add(this.config.classNames.highlightedState);
	                    choice.setAttribute('aria-selected', 'true');
	                }
	            }
	        }

	        /**
	         * Add item to store with correct value
	         * @param {String} value Value to add to store
	         * @param {String} label Label to add to store
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: '_addItem',
	        value: function _addItem(value, label) {
	            var choiceId = arguments.length <= 2 || arguments[2] === undefined ? -1 : arguments[2];

	            var passedValue = (0, _utils.isType)('String', value) ? value.trim() : value;
	            var items = this.store.getItems();
	            var passedLabel = label || passedValue;
	            var passedOptionId = parseInt(choiceId, 10) || -1;

	            // If a prepended value has been passed, prepend it
	            if (this.config.prependValue) {
	                passedValue = this.config.prependValue + passedValue.toString();
	            }

	            // If an appended value has been passed, append it
	            if (this.config.appendValue) {
	                passedValue += this.config.appendValue.toString();
	            }

	            // Generate unique id
	            var id = items ? items.length + 1 : 1;

	            this.store.dispatch((0, _index3.addItem)(passedValue, passedLabel, id, passedOptionId));

	            if (this.passedElement.type === 'select-one') {
	                this.removeActiveItems(id);
	            }

	            // Run callback if it is a function
	            if (this.config.callbackOnAddItem) {
	                var callback = this.config.callbackOnAddItem;
	                if ((0, _utils.isType)('Function', callback)) {
	                    callback(id, passedValue, this.passedElement);
	                } else {
	                    console.error('callbackOnAddItem: Callback is not a function');
	                }
	            }

	            return this;
	        }

	        /**
	         * Remove item from store
	         * @param {Object} item Item to remove
	         * @param {Function} callback Callback to trigger
	         * @return {Object} Class instance
	         * @public
	         */

	    }, {
	        key: '_removeItem',
	        value: function _removeItem(item) {
	            var callback = arguments.length <= 1 || arguments[1] === undefined ? this.config.callbackOnRemoveItem : arguments[1];

	            if (!item || !(0, _utils.isType)('Object', item)) {
	                console.error('removeItem: No item object was passed to be removed');
	                return;
	            }

	            var id = item.id;
	            var value = item.value;
	            var choiceId = item.choiceId;

	            this.store.dispatch((0, _index3.removeItem)(id, choiceId));

	            // Run callback
	            if (callback) {
	                if (!(0, _utils.isType)('Function', callback)) {
	                    console.error('callbackOnRemoveItem: Callback is not a function');
	                    return;
	                }
	                callback(id, value, this.passedElement);
	            }

	            return this;
	        }

	        /**
	         * Add choice to dropdown
	         * @param {Boolean} isSelected Whether choice is selected
	         * @param {Boolean} isDisabled Whether choice is disabled
	         * @param {String} value Value of choice
	         * @param {String} Label Label of choice
	         * @param {Number} groupId ID of group choice is within. Negative number indicates no group
	         * @return
	         * @private
	         */

	    }, {
	        key: '_addChoice',
	        value: function _addChoice(isSelected, isDisabled, value, label) {
	            var groupId = arguments.length <= 4 || arguments[4] === undefined ? -1 : arguments[4];

	            if (!value) return;

	            // Generate unique id
	            var choices = this.store.getChoices();
	            var choiceLabel = label || value;
	            var choiceId = choices ? choices.length + 1 : 1;

	            this.store.dispatch((0, _index3.addChoice)(value, choiceLabel, choiceId, groupId, isDisabled));

	            if (isSelected && !isDisabled) {
	                this._addItem(value, choiceLabel, choiceId);
	            }
	        }

	        /**
	         * Add group to dropdown
	         * @param {Object} group Group to add
	         * @param {Number} id Group ID
	         * @return
	         * @private
	         */

	    }, {
	        key: '_addGroup',
	        value: function _addGroup(group, id) {
	            var _this17 = this;

	            var groupChoices = (0, _utils.isType)('Object', group) ? group.choices : Array.from(group.getElementsByTagName('OPTION'));
	            var groupId = id;
	            var isDisabled = group.disabled ? group.disabled : false;

	            if (groupChoices) {
	                this.store.dispatch((0, _index3.addGroup)(group.label, groupId, true, isDisabled));

	                groupChoices.forEach(function (option) {
	                    var isOptDisabled = option.disabled || option.parentNode && option.parentNode.disabled || false;
	                    var isOptSelected = option.selected ? option.selected : false;
	                    var label = void 0;

	                    if ((0, _utils.isType)('Object', option)) {
	                        label = option.label || option.value;
	                    } else {
	                        label = option.innerHTML;
	                    }

	                    _this17._addChoice(isOptSelected, isOptDisabled, option.value, label, groupId);
	                });
	            } else {
	                this.store.dispatch((0, _index3.addGroup)(group.label, group.id, false, group.disabled));
	            }
	        }

	        /**
	         * Get template from name
	         * @param  {String}    template Name of template to get
	         * @param  {...}       args     Data to pass to template
	         * @return {HTMLElement}        Template
	         * @private
	         */

	    }, {
	        key: '_getTemplate',
	        value: function _getTemplate(template) {
	            if (!template) return;
	            var templates = this.config.templates;

	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }

	            return templates[template].apply(templates, args);
	        }

	        /**
	         * Create HTML element based on type and arguments
	         * @return
	         * @private
	         */

	    }, {
	        key: '_createTemplates',
	        value: function _createTemplates() {
	            var _this18 = this;

	            var classNames = this.config.classNames;
	            var templates = {
	                containerOuter: function containerOuter() {
	                    return (0, _utils.strToEl)('\n                    <div class="' + classNames.containerOuter + '" data-type="' + _this18.passedElement.type + '" ' + (_this18.passedElement.type === 'select-one' ? 'tabindex="0"' : '') + ' aria-haspopup="true" aria-expanded="false"></div>\n                ');
	                },
	                containerInner: function containerInner() {
	                    return (0, _utils.strToEl)('\n                    <div class="' + classNames.containerInner + '"></div>\n                ');
	                },
	                itemList: function itemList() {
	                    return (0, _utils.strToEl)('\n                    <div class="' + classNames.list + ' ' + (_this18.passedElement.type === 'select-one' ? classNames.listSingle : classNames.listItems) + '"></div>\n                ');
	                },
	                placeholder: function placeholder(value) {
	                    return (0, _utils.strToEl)('\n                    <div class="' + classNames.placeholder + '">\n                        ' + value + '\n                    </div>\n                ');
	                },
	                item: function item(data) {
	                    if (_this18.config.removeItemButton) {
	                        return (0, _utils.strToEl)('\n                        <div class="' + classNames.item + ' ' + (data.highlighted ? classNames.highlightedState : '') + ' ' + (!data.disabled ? classNames.itemSelectable : '') + '" data-item data-id="' + data.id + '" data-value="' + data.value + '" ' + (data.active ? 'aria-selected="true"' : '') + ' ' + (data.disabled ? 'aria-disabled="true"' : '') + ' data-deletable>\n                            ' + data.label + '<button class="' + classNames.button + '" data-button>Remove item</button>\n                        </div>\n                    ');
	                    }
	                    return (0, _utils.strToEl)('\n                    <div class="' + classNames.item + ' ' + (data.highlighted ? classNames.highlightedState : classNames.itemSelectable) + '"  data-item data-id="' + data.id + '" data-value="' + data.value + '" ' + (data.active ? 'aria-selected="true"' : '') + ' ' + (data.disabled ? 'aria-disabled="true"' : '') + '>\n                        ' + data.label + '\n                    </div>\n                ');
	                },
	                choiceList: function choiceList() {
	                    return (0, _utils.strToEl)('\n                    <div class="' + classNames.list + '" dir="ltr" role="listbox" ' + (_this18.passedElement.type !== 'select-one' ? 'aria-multiselectable="true"' : '') + '></div>\n                ');
	                },
	                choiceGroup: function choiceGroup(data) {
	                    return (0, _utils.strToEl)('\n                    <div class="' + classNames.group + ' ' + (data.disabled ? classNames.itemDisabled : '') + '" data-group data-id="' + data.id + '" data-value="' + data.value + '" role="group" ' + (data.disabled ? 'aria-disabled="true"' : '') + '>\n                        <div class="' + classNames.groupHeading + '">' + data.value + '</div>\n                    </div>\n                ');
	                },
	                choice: function choice(data) {
	                    return (0, _utils.strToEl)('\n                    <div class="' + classNames.item + ' ' + classNames.itemChoice + ' ' + (data.disabled ? classNames.itemDisabled : classNames.itemSelectable) + '" data-choice ' + (data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable') + ' data-id="' + data.id + '" data-value="' + data.value + '" ' + (data.groupId > 0 ? 'role="treeitem"' : 'role="option"') + '>\n                        ' + data.label + '\n                    </div>\n                ');
	                },
	                input: function input() {
	                    return (0, _utils.strToEl)('\n                    <input type="text" class="' + classNames.input + ' ' + classNames.inputCloned + '" autocomplete="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list">\n                ');
	                },
	                dropdown: function dropdown() {
	                    return (0, _utils.strToEl)('\n                    <div class="' + classNames.list + ' ' + classNames.listDropdown + '" aria-expanded="false"></div>\n                ');
	                },
	                notice: function notice(label) {
	                    return (0, _utils.strToEl)('\n                    <div class="' + classNames.item + ' ' + classNames.itemChoice + '">' + label + '</div>\n                ');
	                },
	                option: function option(data) {
	                    return (0, _utils.strToEl)('\n                    <option value="' + data.value + '" selected>' + data.label + '</option>\n                ');
	                }
	            };

	            this.config.templates = templates;
	        }

	        /**
	         * Create DOM structure around passed select element
	         * @return
	         * @private
	         */

	    }, {
	        key: '_createInput',
	        value: function _createInput() {
	            var _this19 = this;

	            var containerOuter = this._getTemplate('containerOuter');
	            var containerInner = this._getTemplate('containerInner');
	            var itemList = this._getTemplate('itemList');
	            var choiceList = this._getTemplate('choiceList');
	            var input = this._getTemplate('input');
	            var dropdown = this._getTemplate('dropdown');

	            this.containerOuter = containerOuter;
	            this.containerInner = containerInner;
	            this.input = input;
	            this.choiceList = choiceList;
	            this.itemList = itemList;
	            this.dropdown = dropdown;

	            // Hide passed input
	            this.passedElement.classList.add(this.config.classNames.input, this.config.classNames.hiddenState);
	            this.passedElement.tabIndex = '-1';
	            this.passedElement.setAttribute('style', 'display:none;');
	            this.passedElement.setAttribute('aria-hidden', 'true');
	            this.passedElement.setAttribute('data-choice', 'active');

	            // Wrap input in container preserving DOM ordering
	            (0, _utils.wrap)(this.passedElement, containerInner);

	            // Wrapper inner container with outer container
	            (0, _utils.wrap)(containerInner, containerOuter);

	            // If placeholder has been enabled and we have a value
	            var placeholder = this.config.placeholder ? this.config.placeholderValue || this.passedElement.getAttribute('placeholder') : false;
	            if (placeholder) {
	                input.placeholder = placeholder;
	                if (this.passedElement.type !== 'select-one') {
	                    input.style.width = (0, _utils.getWidthOfInput)(input);
	                }
	            }

	            if (!this.config.addItems) this.disable();

	            containerOuter.appendChild(containerInner);
	            containerOuter.appendChild(dropdown);
	            containerInner.appendChild(itemList);

	            if (this.passedElement.type !== 'text') {
	                dropdown.appendChild(choiceList);
	            }

	            if (this.passedElement.type === 'select-multiple' || this.passedElement.type === 'text') {
	                containerInner.appendChild(input);
	            } else if (this.canSearch) {
	                dropdown.insertBefore(input, dropdown.firstChild);
	            }

	            if (this.passedElement.type === 'select-multiple' || this.passedElement.type === 'select-one') {
	                var passedGroups = Array.from(this.passedElement.getElementsByTagName('OPTGROUP'));

	                this.highlightPosition = 0;
	                this.isSearching = false;

	                if (passedGroups && passedGroups.length) {
	                    passedGroups.forEach(function (group, index) {
	                        _this19._addGroup(group, index);
	                    });
	                } else {
	                    (function () {
	                        var passedOptions = Array.from(_this19.passedElement.options);
	                        var allChoices = [];

	                        // Create array of options from option elements
	                        passedOptions.forEach(function (o) {
	                            allChoices.push({
	                                value: o.value,
	                                label: o.innerHTML,
	                                selected: o.selected,
	                                disabled: o.disabled || o.parentNode.disabled
	                            });
	                        });

	                        // Join choices with preset choices and add them
	                        allChoices.concat(_this19.presetChoices).forEach(function (o, index) {
	                            if (index === 0 && _this19.passedElement.type === 'select-one') {
	                                _this19._addChoice(true, o.disabled ? o.disabled : false, o.value, o.label);
	                            } else {
	                                _this19._addChoice(o.selected ? o.selected : false, o.disabled ? o.disabled : false, o.value, o.label);
	                            }
	                        });
	                    })();
	                }
	            } else if (this.passedElement.type === 'text') {
	                // Add any preset values seperated by delimiter
	                this.presetItems.forEach(function (item) {
	                    if ((0, _utils.isType)('Object', item)) {
	                        if (!item.value) return;
	                        _this19._addItem(item.value, item.label, item.id);
	                    } else if ((0, _utils.isType)('String', item)) {
	                        _this19._addItem(item);
	                    }
	                });
	            }
	        }

	        /**
	         * Render group choices into a DOM fragment and append to choice list
	         * @param  {Array} groups    Groups to add to list
	         * @param  {Array} choices   Choices to add to groups
	         * @param  {DocumentFragment} fragment Fragment to add groups and options to (optional)
	         * @return {DocumentFragment} Populated options fragment
	         * @private
	         */

	    }, {
	        key: 'renderGroups',
	        value: function renderGroups(groups, choices, fragment) {
	            var _this20 = this;

	            var groupFragment = fragment || document.createDocumentFragment();
	            var filter = this.config.sortFilter;

	            groups.sort(filter).forEach(function (group) {
	                // Grab options that are children of this group
	                var groupChoices = choices.filter(function (choice) {
	                    if (_this20.passedElement.type === 'select-one') {
	                        return choice.groupId === group.id;
	                    }

	                    return choice.groupId === group.id && !choice.selected;
	                });

	                if (groupChoices.length >= 1) {
	                    var dropdownGroup = _this20._getTemplate('choiceGroup', group);
	                    groupFragment.appendChild(dropdownGroup);

	                    _this20.renderChoices(groupChoices, groupFragment);
	                }
	            });

	            return groupFragment;
	        }

	        /**
	         * Render choices into a DOM fragment and append to choice list
	         * @param  {Array} choices    Choices to add to list
	         * @param  {DocumentFragment} fragment Fragment to add choices to (optional)
	         * @return {DocumentFragment} Populated choices fragment
	         * @private
	         */

	    }, {
	        key: 'renderChoices',
	        value: function renderChoices(choices, fragment) {
	            var _this21 = this;

	            // Create a fragment to store our list items (so we don't have to update the DOM for each item)
	            var choicesFragment = fragment || document.createDocumentFragment();
	            var filter = this.isSearching ? _utils.sortByScore : this.config.sortFilter;

	            choices.sort(filter).forEach(function (choice) {
	                var dropdownItem = _this21._getTemplate('choice', choice);
	                if (_this21.passedElement.type === 'select-one') {
	                    choicesFragment.appendChild(dropdownItem);
	                } else if (!choice.selected) {
	                    choicesFragment.appendChild(dropdownItem);
	                }
	            });

	            return choicesFragment;
	        }

	        /**
	         * Render items into a DOM fragment and append to items list
	         * @param  {Array} items    Items to add to list
	         * @param  {DocumentFragment} fragment Fragrment to add items to (optional)
	         * @return
	         * @private
	         */

	    }, {
	        key: 'renderItems',
	        value: function renderItems(items, fragment) {
	            var _this22 = this;

	            // Create fragment to add elements to
	            var itemListFragment = fragment || document.createDocumentFragment();
	            // Simplify store data to just values
	            var itemsFiltered = this.store.getItemsReducedToValues(items);

	            if (this.passedElement.type === 'text') {
	                // Assign hidden input array of values
	                this.passedElement.setAttribute('value', itemsFiltered.join(this.config.delimiter));
	            } else {
	                (function () {
	                    var selectedOptionsFragment = document.createDocumentFragment();

	                    // Add each list item to list
	                    items.forEach(function (item) {
	                        // Create a standard select option
	                        var option = _this22._getTemplate('option', item);

	                        // Append it to fragment
	                        selectedOptionsFragment.appendChild(option);
	                    });

	                    // Update selected choices
	                    _this22.passedElement.innerHTML = '';
	                    _this22.passedElement.appendChild(selectedOptionsFragment);
	                })();
	            }

	            // Add each list item to list
	            items.forEach(function (item) {
	                // Create new list element
	                var listItem = _this22._getTemplate('item', item);
	                // Append it to list
	                itemListFragment.appendChild(listItem);
	            });

	            return itemListFragment;
	        }

	        /**
	         * Render DOM with values
	         * @return
	         * @private
	         */

	    }, {
	        key: 'render',
	        value: function render() {
	            this.currentState = this.store.getState();

	            // Only render if our state has actually changed
	            if (this.currentState !== this.prevState) {
	                // Choices
	                if (this.currentState.choices !== this.prevState.choices || this.currentState.groups !== this.prevState.groups) {
	                    if (this.passedElement.type === 'select-multiple' || this.passedElement.type === 'select-one') {
	                        // Get active groups/choices
	                        var activeGroups = this.store.getGroupsFilteredByActive();
	                        var activeChoices = this.store.getChoicesFilteredByActive();

	                        var choiceListFragment = document.createDocumentFragment();

	                        // Clear choices
	                        this.choiceList.innerHTML = '';
	                        // Scroll back to top of choices list
	                        this.choiceList.scrollTop = 0;

	                        // If we have grouped options
	                        if (activeGroups.length >= 1 && this.isSearching !== true) {
	                            choiceListFragment = this.renderGroups(activeGroups, activeChoices, choiceListFragment);
	                        } else if (activeChoices.length >= 1) {
	                            choiceListFragment = this.renderChoices(activeChoices, choiceListFragment);
	                        }

	                        if (choiceListFragment.childNodes && choiceListFragment.childNodes.length > 0) {
	                            // If we actually have anything to add to our dropdown
	                            // append it and highlight the first choice
	                            this.choiceList.appendChild(choiceListFragment);
	                            this._highlightChoice();
	                        } else {
	                            // Otherwise show a notice
	                            var dropdownItem = this.isSearching ? this._getTemplate('notice', this.config.noResultsText) : this._getTemplate('notice', this.config.noChoicesText);
	                            this.choiceList.appendChild(dropdownItem);
	                        }
	                    }
	                }

	                // Items
	                if (this.currentState.items !== this.prevState.items) {
	                    var activeItems = this.store.getItemsFilteredByActive();
	                    if (activeItems) {
	                        // Create a fragment to store our list items
	                        // (so we don't have to update the DOM for each item)
	                        var itemListFragment = this.renderItems(activeItems);

	                        // Clear list
	                        this.itemList.innerHTML = '';

	                        // If we have items to add
	                        if (itemListFragment.childNodes) {
	                            // Update list
	                            this.itemList.appendChild(itemListFragment);
	                        }
	                    }
	                }

	                this.prevState = this.currentState;
	            }
	        }
	    }]);

	    return Choices;
	}();

	exports.default = Choices;


		window.Choices = module.exports = Choices;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Fuse - Lightweight fuzzy-search
	 *
	 * Copyright (c) 2012-2016 Kirollos Risk <kirollos@gmail.com>.
	 * All Rights Reserved. Apache Software License 2.0
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License")
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	;(function (global) {
	  'use strict'

	  function log () {
	    console.log.apply(console, arguments)
	  }

	  var defaultOptions = {
	    // The name of the identifier property. If specified, the returned result will be a list
	    // of the items' dentifiers, otherwise it will be a list of the items.
	    id: null,

	    // Indicates whether comparisons should be case sensitive.

	    caseSensitive: false,

	    // An array of values that should be included from the searcher's output. When this array
	    // contains elements, each result in the list will be of the form `{ item: ..., include1: ..., include2: ... }`.
	    // Values you can include are `score`, `matchedLocations`
	    include: [],

	    // Whether to sort the result list, by score
	    shouldSort: true,

	    // The search function to use
	    // Note that the default search function ([[Function]]) must conform to the following API:
	    //
	    //  @param pattern The pattern string to search
	    //  @param options The search option
	    //  [[Function]].constructor = function(pattern, options)
	    //
	    //  @param text: the string to search in for the pattern
	    //  @return Object in the form of:
	    //    - isMatch: boolean
	    //    - score: Int
	    //  [[Function]].prototype.search = function(text)
	    searchFn: BitapSearcher,

	    // Default sort function
	    sortFn: function (a, b) {
	      return a.score - b.score
	    },

	    // The get function to use when fetching an object's properties.
	    // The default will search nested paths *ie foo.bar.baz*
	    getFn: deepValue,

	    // List of properties that will be searched. This also supports nested properties.
	    keys: [],

	    // Will print to the console. Useful for debugging.
	    verbose: false,

	    // When true, the search algorithm will search individual words **and** the full string,
	    // computing the final score as a function of both. Note that when `tokenize` is `true`,
	    // the `threshold`, `distance`, and `location` are inconsequential for individual tokens.
	    tokenize: false,

	    // Regex used to separate words when searching. Only applicable when `tokenize` is `true`.
	    tokenSeparator: / +/g
	  }

	  function Fuse (list, options) {
	    var i
	    var len
	    var key
	    var keys

	    this.list = list
	    this.options = options = options || {}

	    // Add boolean type options
	    for (i = 0, keys = ['sort', 'shouldSort', 'verbose', 'tokenize'], len = keys.length; i < len; i++) {
	      key = keys[i]
	      this.options[key] = key in options ? options[key] : defaultOptions[key]
	    }
	    // Add all other options
	    for (i = 0, keys = ['searchFn', 'sortFn', 'keys', 'getFn', 'include', 'tokenSeparator'], len = keys.length; i < len; i++) {
	      key = keys[i]
	      this.options[key] = options[key] || defaultOptions[key]
	    }
	  }

	  Fuse.VERSION = '2.4.1'

	  /**
	   * Sets a new list for Fuse to match against.
	   * @param {Array} list
	   * @return {Array} The newly set list
	   * @public
	   */
	  Fuse.prototype.set = function (list) {
	    this.list = list
	    return list
	  }

	  Fuse.prototype.search = function (pattern) {
	    if (this.options.verbose) log('\nSearch term:', pattern, '\n')

	    this.pattern = pattern
	    this.results = []
	    this.resultMap = {}
	    this._keyMap = null

	    this._prepareSearchers()
	    this._startSearch()
	    this._computeScore()
	    this._sort()

	    var output = this._format()
	    return output
	  }

	  Fuse.prototype._prepareSearchers = function () {
	    var options = this.options
	    var pattern = this.pattern
	    var searchFn = options.searchFn
	    var tokens = pattern.split(options.tokenSeparator)
	    var i = 0
	    var len = tokens.length

	    if (this.options.tokenize) {
	      this.tokenSearchers = []
	      for (; i < len; i++) {
	        this.tokenSearchers.push(new searchFn(tokens[i], options))
	      }
	    }
	    this.fullSeacher = new searchFn(pattern, options)
	  }

	  Fuse.prototype._startSearch = function () {
	    var options = this.options
	    var getFn = options.getFn
	    var list = this.list
	    var listLen = list.length
	    var keys = this.options.keys
	    var keysLen = keys.length
	    var key
	    var weight
	    var item = null
	    var i
	    var j

	    // Check the first item in the list, if it's a string, then we assume
	    // that every item in the list is also a string, and thus it's a flattened array.
	    if (typeof list[0] === 'string') {
	      // Iterate over every item
	      for (i = 0; i < listLen; i++) {
	        this._analyze('', list[i], i, i)
	      }
	    } else {
	      this._keyMap = {}
	      // Otherwise, the first item is an Object (hopefully), and thus the searching
	      // is done on the values of the keys of each item.
	      // Iterate over every item
	      for (i = 0; i < listLen; i++) {
	        item = list[i]
	        // Iterate over every key
	        for (j = 0; j < keysLen; j++) {
	          key = keys[j]
	          if (typeof key !== 'string') {
	            weight = (1 - key.weight) || 1
	            this._keyMap[key.name] = {
	              weight: weight
	            }
	            if (key.weight <= 0 || key.weight > 1) {
	              throw new Error('Key weight has to be > 0 and <= 1')
	            }
	            key = key.name
	          } else {
	            this._keyMap[key] = {
	              weight: 1
	            }
	          }
	          this._analyze(key, getFn(item, key, []), item, i)
	        }
	      }
	    }
	  }

	  Fuse.prototype._analyze = function (key, text, entity, index) {
	    var options = this.options
	    var words
	    var scores
	    var exists = false
	    var existingResult
	    var averageScore
	    var finalScore
	    var scoresLen
	    var mainSearchResult
	    var tokenSearcher
	    var termScores
	    var word
	    var tokenSearchResult
	    var i
	    var j

	    // Check if the text can be searched
	    if (text === undefined || text === null) {
	      return
	    }

	    scores = []

	    if (typeof text === 'string') {
	      words = text.split(options.tokenSeparator)

	      if (options.verbose) log('---------\nKey:', key)

	      if (this.options.tokenize) {
	        for (i = 0; i < this.tokenSearchers.length; i++) {
	          tokenSearcher = this.tokenSearchers[i]

	          if (options.verbose) log('Pattern:', tokenSearcher.pattern)

	          termScores = []
	          for (j = 0; j < words.length; j++) {
	            word = words[j]
	            tokenSearchResult = tokenSearcher.search(word)
	            var obj = {}
	            if (tokenSearchResult.isMatch) {
	              obj[word] = tokenSearchResult.score
	              exists = true
	              scores.push(tokenSearchResult.score)
	            } else {
	              obj[word] = 1
	              scores.push(1)
	            }
	            termScores.push(obj)
	          }
	          if (options.verbose) log('Token scores:', termScores)
	        }

	        averageScore = scores[0]
	        scoresLen = scores.length
	        for (i = 1; i < scoresLen; i++) {
	          averageScore += scores[i]
	        }
	        averageScore = averageScore / scoresLen

	        if (options.verbose) log('Token score average:', averageScore)
	      }

	      mainSearchResult = this.fullSeacher.search(text)
	      if (options.verbose) log('Full text score:', mainSearchResult.score)

	      finalScore = mainSearchResult.score
	      if (averageScore !== undefined) {
	        finalScore = (finalScore + averageScore) / 2
	      }

	      if (options.verbose) log('Score average:', finalScore)

	      // If a match is found, add the item to <rawResults>, including its score
	      if (exists || mainSearchResult.isMatch) {
	        // Check if the item already exists in our results
	        existingResult = this.resultMap[index]

	        if (existingResult) {
	          // Use the lowest score
	          // existingResult.score, bitapResult.score
	          existingResult.output.push({
	            key: key,
	            score: finalScore,
	            matchedIndices: mainSearchResult.matchedIndices
	          })
	        } else {
	          // Add it to the raw result list
	          this.resultMap[index] = {
	            item: entity,
	            output: [{
	              key: key,
	              score: finalScore,
	              matchedIndices: mainSearchResult.matchedIndices
	            }]
	          }

	          this.results.push(this.resultMap[index])
	        }
	      }
	    } else if (isArray(text)) {
	      for (i = 0; i < text.length; i++) {
	        this._analyze(key, text[i], entity, index)
	      }
	    }
	  }

	  Fuse.prototype._computeScore = function () {
	    var i
	    var j
	    var keyMap = this._keyMap
	    var totalScore
	    var output
	    var scoreLen
	    var score
	    var weight
	    var results = this.results
	    var bestScore
	    var nScore

	    if (this.options.verbose) log('\n\nComputing score:\n')

	    for (i = 0; i < results.length; i++) {
	      totalScore = 0
	      output = results[i].output
	      scoreLen = output.length

	      bestScore = 1

	      for (j = 0; j < scoreLen; j++) {
	        score = output[j].score
	        weight = keyMap ? keyMap[output[j].key].weight : 1

	        nScore = score * weight

	        if (weight !== 1) {
	          bestScore = Math.min(bestScore, nScore)
	        } else {
	          totalScore += nScore
	          output[j].nScore = nScore
	        }
	      }

	      if (bestScore === 1) {
	        results[i].score = totalScore / scoreLen
	      } else {
	        results[i].score = bestScore
	      }

	      if (this.options.verbose) log(results[i])
	    }
	  }

	  Fuse.prototype._sort = function () {
	    var options = this.options
	    if (options.shouldSort) {
	      if (options.verbose) log('\n\nSorting....')
	      this.results.sort(options.sortFn)
	    }
	  }

	  Fuse.prototype._format = function () {
	    var options = this.options
	    var getFn = options.getFn
	    var finalOutput = []
	    var item
	    var i
	    var len
	    var results = this.results
	    var replaceValue
	    var getItemAtIndex
	    var include = options.include

	    if (options.verbose) log('\n\nOutput:\n\n', results)

	    // Helper function, here for speed-up, which replaces the item with its value,
	    // if the options specifies it,
	    replaceValue = options.id ? function (index) {
	      results[index].item = getFn(results[index].item, options.id, [])[0]
	    } : function () {}

	    getItemAtIndex = function (index) {
	      var record = results[index]
	      var data
	      var j
	      var output
	      var _item
	      var _result

	      // If `include` has values, put the item in the result
	      if (include.length > 0) {
	        data = {
	          item: record.item
	        }
	        if (include.indexOf('matches') !== -1) {
	          output = record.output
	          data.matches = []
	          for (j = 0; j < output.length; j++) {
	            _item = output[j]
	            _result = {
	              indices: _item.matchedIndices
	            }
	            if (_item.key) {
	              _result.key = _item.key
	            }
	            data.matches.push(_result)
	          }
	        }

	        if (include.indexOf('score') !== -1) {
	          data.score = results[index].score
	        }

	      } else {
	        data = record.item
	      }

	      return data
	    }

	    // From the results, push into a new array only the item identifier (if specified)
	    // of the entire item.  This is because we don't want to return the <results>,
	    // since it contains other metadata
	    for (i = 0, len = results.length; i < len; i++) {
	      replaceValue(i)
	      item = getItemAtIndex(i)
	      finalOutput.push(item)
	    }

	    return finalOutput
	  }

	  // Helpers

	  function deepValue (obj, path, list) {
	    var firstSegment
	    var remaining
	    var dotIndex
	    var value
	    var i
	    var len

	    if (!path) {
	      // If there's no path left, we've gotten to the object we care about.
	      list.push(obj)
	    } else {
	      dotIndex = path.indexOf('.')

	      if (dotIndex !== -1) {
	        firstSegment = path.slice(0, dotIndex)
	        remaining = path.slice(dotIndex + 1)
	      } else {
	        firstSegment = path
	      }

	      value = obj[firstSegment]
	      if (value !== null && value !== undefined) {
	        if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
	          list.push(value)
	        } else if (isArray(value)) {
	          // Search each item in the array.
	          for (i = 0, len = value.length; i < len; i++) {
	            deepValue(value[i], remaining, list)
	          }
	        } else if (remaining) {
	          // An object. Recurse further.
	          deepValue(value, remaining, list)
	        }
	      }
	    }

	    return list
	  }

	  function isArray (obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]'
	  }

	  /**
	   * Adapted from "Diff, Match and Patch", by Google
	   *
	   *   http://code.google.com/p/google-diff-match-patch/
	   *
	   * Modified by: Kirollos Risk <kirollos@gmail.com>
	   * -----------------------------------------------
	   * Details: the algorithm and structure was modified to allow the creation of
	   * <Searcher> instances with a <search> method which does the actual
	   * bitap search. The <pattern> (the string that is searched for) is only defined
	   * once per instance and thus it eliminates redundant re-creation when searching
	   * over a list of strings.
	   *
	   * Licensed under the Apache License, Version 2.0 (the "License")
	   * you may not use this file except in compliance with the License.
	   */
	  function BitapSearcher (pattern, options) {
	    options = options || {}
	    this.options = options
	    this.options.location = options.location || BitapSearcher.defaultOptions.location
	    this.options.distance = 'distance' in options ? options.distance : BitapSearcher.defaultOptions.distance
	    this.options.threshold = 'threshold' in options ? options.threshold : BitapSearcher.defaultOptions.threshold
	    this.options.maxPatternLength = options.maxPatternLength || BitapSearcher.defaultOptions.maxPatternLength

	    this.pattern = options.caseSensitive ? pattern : pattern.toLowerCase()
	    this.patternLen = pattern.length

	    if (this.patternLen <= this.options.maxPatternLength) {
	      this.matchmask = 1 << (this.patternLen - 1)
	      this.patternAlphabet = this._calculatePatternAlphabet()
	    }
	  }

	  BitapSearcher.defaultOptions = {
	    // Approximately where in the text is the pattern expected to be found?
	    location: 0,

	    // Determines how close the match must be to the fuzzy location (specified above).
	    // An exact letter match which is 'distance' characters away from the fuzzy location
	    // would score as a complete mismatch. A distance of '0' requires the match be at
	    // the exact location specified, a threshold of '1000' would require a perfect match
	    // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
	    distance: 100,

	    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
	    // (of both letters and location), a threshold of '1.0' would match anything.
	    threshold: 0.6,

	    // Machine word size
	    maxPatternLength: 32
	  }

	  /**
	   * Initialize the alphabet for the Bitap algorithm.
	   * @return {Object} Hash of character locations.
	   * @private
	   */
	  BitapSearcher.prototype._calculatePatternAlphabet = function () {
	    var mask = {},
	      i = 0

	    for (i = 0; i < this.patternLen; i++) {
	      mask[this.pattern.charAt(i)] = 0
	    }

	    for (i = 0; i < this.patternLen; i++) {
	      mask[this.pattern.charAt(i)] |= 1 << (this.pattern.length - i - 1)
	    }

	    return mask
	  }

	  /**
	   * Compute and return the score for a match with `e` errors and `x` location.
	   * @param {number} errors Number of errors in match.
	   * @param {number} location Location of match.
	   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
	   * @private
	   */
	  BitapSearcher.prototype._bitapScore = function (errors, location) {
	    var accuracy = errors / this.patternLen,
	      proximity = Math.abs(this.options.location - location)

	    if (!this.options.distance) {
	      // Dodge divide by zero error.
	      return proximity ? 1.0 : accuracy
	    }
	    return accuracy + (proximity / this.options.distance)
	  }

	  /**
	   * Compute and return the result of the search
	   * @param {String} text The text to search in
	   * @return {Object} Literal containing:
	   *                          {Boolean} isMatch Whether the text is a match or not
	   *                          {Decimal} score Overall score for the match
	   * @public
	   */
	  BitapSearcher.prototype.search = function (text) {
	    var options = this.options
	    var i
	    var j
	    var textLen
	    var location
	    var threshold
	    var bestLoc
	    var binMin
	    var binMid
	    var binMax
	    var start, finish
	    var bitArr
	    var lastBitArr
	    var charMatch
	    var score
	    var locations
	    var matches
	    var isMatched
	    var matchMask
	    var matchedIndices
	    var matchesLen
	    var match

	    text = options.caseSensitive ? text : text.toLowerCase()

	    if (this.pattern === text) {
	      // Exact match
	      return {
	        isMatch: true,
	        score: 0,
	        matchedIndices: [[0, text.length - 1]]
	      }
	    }

	    // When pattern length is greater than the machine word length, just do a a regex comparison
	    if (this.patternLen > options.maxPatternLength) {
	      matches = text.match(new RegExp(this.pattern.replace(options.tokenSeparator, '|')))
	      isMatched = !!matches

	      if (isMatched) {
	        matchedIndices = []
	        for (i = 0, matchesLen = matches.length; i < matchesLen; i++) {
	          match = matches[i]
	          matchedIndices.push([text.indexOf(match), match.length - 1])
	        }
	      }

	      return {
	        isMatch: isMatched,
	        // TODO: revisit this score
	        score: isMatched ? 0.5 : 1,
	        matchedIndices: matchedIndices
	      }
	    }

	    location = options.location
	    // Set starting location at beginning text and initialize the alphabet.
	    textLen = text.length
	    // Highest score beyond which we give up.
	    threshold = options.threshold
	    // Is there a nearby exact match? (speedup)
	    bestLoc = text.indexOf(this.pattern, location)

	    // a mask of the matches
	    matchMask = []
	    for (i = 0; i < textLen; i++) {
	      matchMask[i] = 0
	    }

	    if (bestLoc != -1) {
	      threshold = Math.min(this._bitapScore(0, bestLoc), threshold)
	      // What about in the other direction? (speed up)
	      bestLoc = text.lastIndexOf(this.pattern, location + this.patternLen)

	      if (bestLoc != -1) {
	        threshold = Math.min(this._bitapScore(0, bestLoc), threshold)
	      }
	    }

	    bestLoc = -1
	    score = 1
	    locations = []
	    binMax = this.patternLen + textLen

	    for (i = 0; i < this.patternLen; i++) {
	      // Scan for the best match; each iteration allows for one more error.
	      // Run a binary search to determine how far from the match location we can stray
	      // at this error level.
	      binMin = 0
	      binMid = binMax
	      while (binMin < binMid) {
	        if (this._bitapScore(i, location + binMid) <= threshold) {
	          binMin = binMid
	        } else {
	          binMax = binMid
	        }
	        binMid = Math.floor((binMax - binMin) / 2 + binMin)
	      }

	      // Use the result from this iteration as the maximum for the next.
	      binMax = binMid
	      start = Math.max(1, location - binMid + 1)
	      finish = Math.min(location + binMid, textLen) + this.patternLen

	      // Initialize the bit array
	      bitArr = Array(finish + 2)

	      bitArr[finish + 1] = (1 << i) - 1

	      for (j = finish; j >= start; j--) {
	        charMatch = this.patternAlphabet[text.charAt(j - 1)]

	        if (charMatch) {
	          matchMask[j - 1] = 1
	        }

	        if (i === 0) {
	          // First pass: exact match.
	          bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch
	        } else {
	          // Subsequent passes: fuzzy match.
	          bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch | (((lastBitArr[j + 1] | lastBitArr[j]) << 1) | 1) | lastBitArr[j + 1]
	        }
	        if (bitArr[j] & this.matchmask) {
	          score = this._bitapScore(i, j - 1)

	          // This match will almost certainly be better than any existing match.
	          // But check anyway.
	          if (score <= threshold) {
	            // Indeed it is
	            threshold = score
	            bestLoc = j - 1
	            locations.push(bestLoc)

	            if (bestLoc > location) {
	              // When passing loc, don't exceed our current distance from loc.
	              start = Math.max(1, 2 * location - bestLoc)
	            } else {
	              // Already passed loc, downhill from here on in.
	              break
	            }
	          }
	        }
	      }

	      // No hope for a (better) match at greater error levels.
	      if (this._bitapScore(i + 1, location) > threshold) {
	        break
	      }
	      lastBitArr = bitArr
	    }

	    matchedIndices = this._getMatchedIndices(matchMask)

	    // Count exact matches (those with a score of 0) to be "almost" exact
	    return {
	      isMatch: bestLoc >= 0,
	      score: score === 0 ? 0.001 : score,
	      matchedIndices: matchedIndices
	    }
	  }

	  BitapSearcher.prototype._getMatchedIndices = function (matchMask) {
	    var matchedIndices = []
	    var start = -1
	    var end = -1
	    var i = 0
	    var match
	    var len = matchMask.length
	    for (; i < len; i++) {
	      match = matchMask[i]
	      if (match && start === -1) {
	        start = i
	      } else if (!match && start !== -1) {
	        end = i - 1
	        matchedIndices.push([start, end])
	        start = -1
	      }
	    }
	    if (matchMask[i - 1]) {
	      matchedIndices.push([start, i - 1])
	    }
	    return matchedIndices
	  }

	  // Export to Common JS Loader
	  if (true) {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = Fuse
	  } else if (typeof define === 'function' && define.amd) {
	    // AMD. Register as an anonymous module.
	    define(function () {
	      return Fuse
	    })
	  } else {
	    // Browser globals (root is window)
	    global.Fuse = Fuse
	  }

	})(this)


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _redux = __webpack_require__(4);

	var _index = __webpack_require__(18);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Store = function () {
	    function Store() {
	        _classCallCheck(this, Store);

	        this.store = (0, _redux.createStore)(_index2.default, window.devToolsExtension ? window.devToolsExtension() : undefined);
	    }

	    /**
	     * Get store object (wrapping Redux method)
	     * @return {Object} State
	     */


	    _createClass(Store, [{
	        key: 'getState',
	        value: function getState() {
	            return this.store.getState();
	        }

	        /**
	         * Dispatch event to store (wrapped Redux method)
	         * @param  {Function} action Action function to trigger
	         * @return
	         */

	    }, {
	        key: 'dispatch',
	        value: function dispatch(action) {
	            this.store.dispatch(action);
	        }

	        /**
	         * Subscribe store to function call (wrapped Redux method)
	         * @param  {Function} onChange Function to trigger when state changes
	         * @return
	         */

	    }, {
	        key: 'subscribe',
	        value: function subscribe(onChange) {
	            this.store.subscribe(onChange);
	        }

	        /**
	         * Get items from store
	         * @return {Array} Item objects
	         */

	    }, {
	        key: 'getItems',
	        value: function getItems() {
	            var state = this.store.getState();
	            return state.items;
	        }

	        /**
	         * Get active items from store
	         * @return {Array} Item objects
	         */

	    }, {
	        key: 'getItemsFilteredByActive',
	        value: function getItemsFilteredByActive() {
	            var items = this.getItems();
	            var values = items.filter(function (item) {
	                return item.active === true;
	            }, []);

	            return values;
	        }

	        /**
	         * Get items from store reduced to just their values
	         * @return {Array} Item objects
	         */

	    }, {
	        key: 'getItemsReducedToValues',
	        value: function getItemsReducedToValues() {
	            var items = arguments.length <= 0 || arguments[0] === undefined ? this.getItems() : arguments[0];

	            var values = items.reduce(function (prev, current) {
	                prev.push(current.value);
	                return prev;
	            }, []);

	            return values;
	        }

	        /**
	         * Get choices from store
	         * @return {Array} Option objects
	         */

	    }, {
	        key: 'getChoices',
	        value: function getChoices() {
	            var state = this.store.getState();
	            return state.choices;
	        }

	        /**
	         * Get active choices from store
	         * @return {Array} Option objects
	         */

	    }, {
	        key: 'getChoicesFilteredByActive',
	        value: function getChoicesFilteredByActive() {
	            var choices = this.getChoices();
	            var values = choices.filter(function (choice) {
	                return choice.active === true;
	            }, []);

	            return values;
	        }

	        /**
	         * Get selectable choices from store
	         * @return {Array} Option objects
	         */

	    }, {
	        key: 'getChoicesFilteredBySelectable',
	        value: function getChoicesFilteredBySelectable() {
	            var choices = this.getChoices();
	            var values = choices.filter(function (choice) {
	                return choice.disabled !== true;
	            }, []);

	            return values;
	        }

	        /**
	         * Get single choice by it's ID
	         * @return {Object} Found choice
	         */

	    }, {
	        key: 'getChoiceById',
	        value: function getChoiceById(id) {
	            if (id) {
	                var choices = this.getChoicesFilteredByActive();
	                var foundChoice = choices.find(function (choice) {
	                    return choice.id === parseInt(id, 10);
	                });
	                return foundChoice;
	            }
	            return false;
	        }

	        /**
	         * Get groups from store
	         * @return {Array} Group objects
	         */

	    }, {
	        key: 'getGroups',
	        value: function getGroups() {
	            var state = this.store.getState();
	            return state.groups;
	        }

	        /**
	         * Get active groups from store
	         * @return {Array} Group objects
	         */

	    }, {
	        key: 'getGroupsFilteredByActive',
	        value: function getGroupsFilteredByActive() {
	            var groups = this.getGroups();
	            var choices = this.getChoices();

	            var values = groups.filter(function (group) {
	                var isActive = group.active === true && group.disabled === false;
	                var hasActiveOptions = choices.some(function (choice) {
	                    return choice.active === true && choice.disabled === false;
	                });
	                return isActive && hasActiveOptions;
	            }, []);

	            return values;
	        }
	    }]);

	    return Store;
	}();

	exports.default = Store;


		module.exports = Store;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(5);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(13);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(15);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(16);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(17);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(14);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (false) {
	  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2["default"];
	exports.combineReducers = _combineReducers2["default"];
	exports.bindActionCreators = _bindActionCreators2["default"];
	exports.applyMiddleware = _applyMiddleware2["default"];
	exports.compose = _compose2["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports["default"] = createStore;

	var _isPlainObject = __webpack_require__(6);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(11);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, initialState, enhancer) {
	  var _ref2;

	  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = initialState;
	    initialState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, initialState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2["default"])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */

	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2["default"]] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(7),
	    isHostObject = __webpack_require__(9),
	    isObjectLike = __webpack_require__(10);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(8);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	var getPrototype = overArg(nativeGetPrototype, Object);

	module.exports = getPrototype;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Creates a function that invokes `func` with its first argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	module.exports = __webpack_require__(12)(global || window || this);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = combineReducers;

	var _createStore = __webpack_require__(5);

	var _isPlainObject = __webpack_require__(6);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(14);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2["default"])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key);
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (false) {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
	      if (warningMessage) {
	        (0, _warning2["default"])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = applyMiddleware;

	var _compose = __webpack_require__(17);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var store = createStore(reducer, initialState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  } else {
	    var _ret = function () {
	      var last = funcs[funcs.length - 1];
	      var rest = funcs.slice(0, -1);
	      return {
	        v: function v() {
	          return rest.reduceRight(function (composed, f) {
	            return f(composed);
	          }, last.apply(undefined, arguments));
	        }
	      };
	    }();

	    if (typeof _ret === "object") return _ret.v;
	  }
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(4);

	var _items = __webpack_require__(19);

	var _items2 = _interopRequireDefault(_items);

	var _groups = __webpack_require__(20);

	var _groups2 = _interopRequireDefault(_groups);

	var _choices = __webpack_require__(21);

	var _choices2 = _interopRequireDefault(_choices);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var appReducer = (0, _redux.combineReducers)({
	    items: _items2.default,
	    groups: _groups2.default,
	    choices: _choices2.default
	});

	var rootReducer = function rootReducer(passedState, action) {
	    var state = passedState;
	    // If we are clearing all items, groups and options we reassign
	    // state and then pass that state to our proper reducer. This isn't
	    // mutating our actual state
	    // See: http://stackoverflow.com/a/35641992
	    if (action.type === 'CLEAR_ALL') {
	        state = undefined;
	    }

	    return appReducer(state, action);
	};

	exports.default = rootReducer;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var items = function items() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case 'ADD_ITEM':
	            {
	                // Add object to items array
	                var newState = [].concat(_toConsumableArray(state), [{
	                    id: action.id,
	                    choiceId: action.choiceId,
	                    value: action.value,
	                    label: action.label,
	                    active: true,
	                    highlighted: false
	                }]);

	                return newState.map(function (item) {
	                    if (item.highlighted) {
	                        item.highlighted = false;
	                    }
	                    return item;
	                });
	            }

	        case 'REMOVE_ITEM':
	            {
	                // Set item to inactive
	                return state.map(function (item) {
	                    if (item.id === action.id) {
	                        item.active = false;
	                    }
	                    return item;
	                });
	            }

	        case 'HIGHLIGHT_ITEM':
	            {
	                return state.map(function (item) {
	                    if (item.id === action.id) {
	                        item.highlighted = action.highlighted;
	                    }
	                    return item;
	                });
	            }

	        default:
	            {
	                return state;
	            }
	    }
	};

	exports.default = items;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var groups = function groups() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case 'ADD_GROUP':
	            {
	                return [].concat(_toConsumableArray(state), [{
	                    id: action.id,
	                    value: action.value,
	                    active: action.active,
	                    disabled: action.disabled
	                }]);
	            }

	        default:
	            {
	                return state;
	            }
	    }
	};

	exports.default = groups;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var choices = function choices() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case 'ADD_CHOICE':
	            {
	                /*
	                    A disabled choice appears in the choice dropdown but cannot be selected
	                    A selected choice has been added to the passed input's value (added as an item)
	                    An active choice appears within the choice dropdown
	                 */
	                return [].concat(_toConsumableArray(state), [{
	                    id: action.id,
	                    groupId: action.groupId,
	                    value: action.value,
	                    label: action.label,
	                    disabled: action.disabled,
	                    selected: false,
	                    active: true,
	                    score: 9999
	                }]);
	            }

	        case 'ADD_ITEM':
	            {
	                var newState = state;

	                // If all choices need to be activated
	                if (action.activateOptions) {
	                    newState = state.map(function (choice) {
	                        choice.active = action.active;
	                        return choice;
	                    });
	                }
	                // When an item is added and it has an associated choice,
	                // we want to disable it so it can't be chosen again
	                if (action.choiceId > -1) {
	                    newState = state.map(function (choice) {
	                        if (choice.id === parseInt(action.choiceId, 10)) {
	                            choice.selected = true;
	                        }
	                        return choice;
	                    });
	                }

	                return newState;
	            }

	        case 'REMOVE_ITEM':
	            {
	                // When an item is removed and it has an associated choice,
	                // we want to re-enable it so it can be chosen again
	                if (action.choiceId > -1) {
	                    return state.map(function (choice) {
	                        if (choice.id === parseInt(action.choiceId, 10)) {
	                            choice.selected = false;
	                        }
	                        return choice;
	                    });
	                }

	                return state;
	            }

	        case 'FILTER_CHOICES':
	            {
	                var _ret = function () {
	                    var filteredResults = action.results;
	                    var filteredState = state.map(function (choice) {
	                        // Set active state based on whether choice is
	                        // within filtered results

	                        choice.active = filteredResults.some(function (result) {
	                            if (result.item.id === choice.id) {
	                                choice.score = result.score;
	                                return true;
	                            }
	                            return false;
	                        });

	                        return choice;
	                    });

	                    return {
	                        v: filteredState
	                    };
	                }();

	                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	            }

	        case 'ACTIVATE_CHOICES':
	            {
	                return state.map(function (choice) {
	                    choice.active = action.active;
	                    return choice;
	                });
	            }

	        default:
	            {
	                return state;
	            }
	    }
	};

	exports.default = choices;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var addItem = exports.addItem = function addItem(value, label, id, choiceId, activateOptions) {
	    return {
	        type: 'ADD_ITEM',
	        value: value,
	        label: label,
	        id: id,
	        choiceId: choiceId,
	        activateOptions: activateOptions
	    };
	};

	var removeItem = exports.removeItem = function removeItem(id, choiceId) {
	    return {
	        type: 'REMOVE_ITEM',
	        id: id,
	        choiceId: choiceId
	    };
	};

	var highlightItem = exports.highlightItem = function highlightItem(id, highlighted) {
	    return {
	        type: 'HIGHLIGHT_ITEM',
	        id: id,
	        highlighted: highlighted
	    };
	};

	var addChoice = exports.addChoice = function addChoice(value, label, id, groupId, disabled) {
	    return {
	        type: 'ADD_CHOICE',
	        value: value,
	        label: label,
	        id: id,
	        groupId: groupId,
	        disabled: disabled
	    };
	};

	var filterChoices = exports.filterChoices = function filterChoices(results) {
	    return {
	        type: 'FILTER_CHOICES',
	        results: results
	    };
	};

	var activateChoices = exports.activateChoices = function activateChoices() {
	    var active = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	    return {
	        type: 'ACTIVATE_CHOICES',
	        active: active
	    };
	};

	var addGroup = exports.addGroup = function addGroup(value, id, active, disabled) {
	    return {
	        type: 'ADD_GROUP',
	        value: value,
	        id: id,
	        active: active,
	        disabled: disabled
	    };
	};

	var clearAll = exports.clearAll = function clearAll() {
	    return {
	        type: 'CLEAR_ALL'
	    };
		};

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/* eslint-disable */

	/**
	 * Capitalises the first letter of each word in a string
	 * @param  {String} str String to capitalise
	 * @return {String}     Capitalised string
	 */
	var capitalise = exports.capitalise = function capitalise(str) {
	    return str.replace(/\w\S*/g, function (txt) {
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    });
	};

	/**
	 * Tests the type of an object
	 * @param  {String}  type Type to test object against
	 * @param  {Object}  obj  Object to be tested
	 * @return {Boolean}
	 */
	var isType = exports.isType = function isType(type, obj) {
	    var clas = Object.prototype.toString.call(obj).slice(8, -1);
	    return obj !== undefined && obj !== null && clas === type;
	};

	/**
	 * Tests to see if a passed object is a node
	 * @param  {Object}  obj  Object to be tested
	 * @return {Boolean}
	 */
	var isNode = exports.isNode = function isNode(o) {
	    return (typeof Node === "undefined" ? "undefined" : _typeof(Node)) === "object" ? o instanceof Node : o && (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
	};

	/**
	 * Tests to see if a passed object is an element
	 * @param  {Object}  obj  Object to be tested
	 * @return {Boolean}
	 */
	var isElement = exports.isElement = function isElement(o) {
	    return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
	    o && (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
	};

	/**
	 * Merges unspecified amount of objects into new object
	 * @private
	 * @return {Object} Merged object of arguments
	 */
	var extend = exports.extend = function extend() {
	    var extended = {};
	    var deep = false;
	    var length = arguments.length;

	    /**
	     * Merge one object into another
	     * @param  {Object} obj  Object to merge into extended object
	     */
	    var merge = function merge(obj) {
	        for (var prop in obj) {
	            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	                // If deep merge and property is an object, merge properties
	                if (deep && isType('Object', obj[prop])) {
	                    extended[prop] = extend(true, extended[prop], obj[prop]);
	                } else {
	                    extended[prop] = obj[prop];
	                }
	            }
	        }
	    };

	    // Loop through each passed argument
	    for (var i = 0; i < length; i++) {
	        // store argument at position i
	        var obj = arguments[i];

	        // If we are in fact dealing with an object, merge it. Otherwise throw error
	        if (isType('Object', obj)) {
	            merge(obj);
	        } else {
	            console.error('Custom options must be an object');
	        }
	    }

	    return extended;
	};

	/**
	 * CSS transition end event listener
	 * @return
	 */
	var whichTransitionEvent = exports.whichTransitionEvent = function whichTransitionEvent() {
	    var t,
	        el = document.createElement("fakeelement");

	    var transitions = {
	        "transition": "transitionend",
	        "OTransition": "oTransitionEnd",
	        "MozTransition": "transitionend",
	        "WebkitTransition": "webkitTransitionEnd"
	    };

	    for (t in transitions) {
	        if (el.style[t] !== undefined) {
	            return transitions[t];
	        }
	    }
	};

	/**
	 * CSS animation end event listener
	 * @return
	 */
	var whichAnimationEvent = exports.whichAnimationEvent = function whichAnimationEvent() {
	    var t,
	        el = document.createElement('fakeelement');

	    var animations = {
	        'animation': 'animationend',
	        'OAnimation': 'oAnimationEnd',
	        'MozAnimation': 'animationend',
	        'WebkitAnimation': 'webkitAnimationEnd'
	    };

	    for (t in animations) {
	        if (el.style[t] !== undefined) {
	            return animations[t];
	        }
	    }
	};

	/**
	 *  Get the ancestors of each element in the current set of matched elements,
	 *  up to but not including the element matched by the selector
	 * @param  {NodeElement} elem     Element to begin search from
	 * @param  {NodeElement} parent   Parent to find
	 * @param  {String} selector Class to find
	 * @return {Array}          Array of parent elements
	 */
	var getParentsUntil = exports.getParentsUntil = function getParentsUntil(elem, parent, selector) {
	    var parents = [];
	    // Get matches
	    for (; elem && elem !== document; elem = elem.parentNode) {

	        // Check if parent has been reached
	        if (parent) {

	            var parentType = parent.charAt(0);

	            // If parent is a class
	            if (parentType === '.') {
	                if (elem.classList.contains(parent.substr(1))) {
	                    break;
	                }
	            }

	            // If parent is an ID
	            if (parentType === '#') {
	                if (elem.id === parent.substr(1)) {
	                    break;
	                }
	            }

	            // If parent is a data attribute
	            if (parentType === '[') {
	                if (elem.hasAttribute(parent.substr(1, parent.length - 1))) {
	                    break;
	                }
	            }

	            // If parent is a tag
	            if (elem.tagName.toLowerCase() === parent) {
	                break;
	            }
	        }
	        if (selector) {
	            var selectorType = selector.charAt(0);

	            // If selector is a class
	            if (selectorType === '.') {
	                if (elem.classList.contains(selector.substr(1))) {
	                    parents.push(elem);
	                }
	            }

	            // If selector is an ID
	            if (selectorType === '#') {
	                if (elem.id === selector.substr(1)) {
	                    parents.push(elem);
	                }
	            }

	            // If selector is a data attribute
	            if (selectorType === '[') {
	                if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
	                    parents.push(elem);
	                }
	            }

	            // If selector is a tag
	            if (elem.tagName.toLowerCase() === selector) {
	                parents.push(elem);
	            }
	        } else {
	            parents.push(elem);
	        }
	    }

	    // Return parents if any exist
	    if (parents.length === 0) {
	        return null;
	    } else {
	        return parents;
	    }
	};

	var wrap = exports.wrap = function wrap(element, wrapper) {
	    wrapper = wrapper || document.createElement('div');
	    if (element.nextSibling) {
	        element.parentNode.insertBefore(wrapper, element.nextSibling);
	    } else {
	        element.parentNode.appendChild(wrapper);
	    }
	    return wrapper.appendChild(element);
	};

	var getSiblings = exports.getSiblings = function getSiblings(elem) {
	    var siblings = [];
	    var sibling = elem.parentNode.firstChild;
	    for (; sibling; sibling = sibling.nextSibling) {
	        if (sibling.nodeType === 1 && sibling !== elem) {
	            siblings.push(sibling);
	        }
	    }
	    return siblings;
	};

	/**
	 * Find ancestor in DOM tree
	 * @param  {NodeElement} el  Element to start search from
	 * @param  {[type]} cls Class of parent
	 * @return {NodeElement}     Found parent element
	 */
	var findAncestor = exports.findAncestor = function findAncestor(el, cls) {
	    while ((el = el.parentElement) && !el.classList.contains(cls)) {}
	    return el;
	};

	/**
	 * Debounce an event handler.
	 * @param  {Function} func      Function to run after wait
	 * @param  {Number} wait      The delay before the function is executed
	 * @param  {Boolean} immediate  If  passed, trigger the function on the leading edge, instead of the trailing.
	 * @return {Function}           A function will be called after it stops being called for a given delay
	 */
	var debounce = exports.debounce = function debounce(func, wait, immediate) {
	    var timeout;
	    return function () {
	        var context = this,
	            args = arguments;
	        var later = function later() {
	            timeout = null;
	            if (!immediate) func.apply(context, args);
	        };
	        var callNow = immediate && !timeout;
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	        if (callNow) func.apply(context, args);
	    };
	};

	/**
	 * Get an element's distance from the top of the page
	 * @private
	 * @param  {NodeElement} el Element to test for
	 * @return {Number} Elements Distance from top of page
	 */
	var getElemDistance = exports.getElemDistance = function getElemDistance(el) {
	    var location = 0;
	    if (el.offsetParent) {
	        do {
	            location += el.offsetTop;
	            el = el.offsetParent;
	        } while (el);
	    }
	    return location >= 0 ? location : 0;
	};

	/**
	 * Determine element height multiplied by any offsets
	 * @private
	 * @param  {HTMLElement} el Element to test for
	 * @return {Number}    Height of element
	 */
	var getElementOffset = exports.getElementOffset = function getElementOffset(el, offset) {
	    var elOffset = offset;
	    if (elOffset > 1) elOffset = 1;
	    if (elOffset > 0) elOffset = 0;

	    return Math.max(el.offsetHeight * elOffset);
	};

	/**
	 * Get the next or previous element from a given start point
	 * @param  {HTMLElement} startEl    Element to start position from
	 * @param  {String}      className  The class we will look through
	 * @param  {Number}      direction  Positive next element, negative previous element
	 * @return {[HTMLElement}           Found element
	 */
	var getAdjacentEl = exports.getAdjacentEl = function getAdjacentEl(startEl, className) {
	    var direction = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	    if (!startEl || !className) return;

	    var parent = startEl.parentNode.parentNode;
	    var children = Array.from(parent.querySelectorAll(className));

	    var startPos = children.indexOf(startEl);
	    var operatorDirection = direction > 0 ? 1 : -1;

	    return children[startPos + operatorDirection];
	};

	/**
	 * Get scroll position based on top/bottom position
	 * @private
	 * @return {String} Position of scroll
	 */
	var getScrollPosition = exports.getScrollPosition = function getScrollPosition(position) {
	    if (position === 'bottom') {
	        // Scroll position from the bottom of the viewport
	        return Math.max((window.scrollY || window.pageYOffset) + (window.innerHeight || document.documentElement.clientHeight));
	    } else {
	        // Scroll position from the top of the viewport
	        return window.scrollY || window.pageYOffset;
	    }
	};

	/**
	 * Determine whether an element is within the viewport
	 * @param  {HTMLElement}  el Element to test
	 * @return {String} Position of scroll
	 * @return {Boolean}
	 */
	var isInView = exports.isInView = function isInView(el, position, offset) {
	    // If the user has scrolled further than the distance from the element to the top of its parent
	    return this.getScrollPosition(position) > this.getElemDistance(el) + this.getElementOffset(el, offset) ? true : false;
	};

	/**
	 * Determine whether an element is within
	 * @param  {HTMLElement} el        Element to test
	 * @param  {HTMLElement} parent    Scrolling parent
	 * @param  {Number} direction      Whether element is visible from above or below
	 * @return {Boolean}
	 */
	var isScrolledIntoView = exports.isScrolledIntoView = function isScrolledIntoView(el, parent) {
	    var direction = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	    if (!el) return;

	    var isVisible = void 0;

	    if (direction > 0) {
	        // In view from bottom
	        isVisible = parent.scrollTop + parent.offsetHeight >= el.offsetTop + el.offsetHeight;
	    } else {
	        // In view from top
	        isVisible = el.offsetTop >= parent.scrollTop;
	    }

	    return isVisible;
	};

	/**
	 * Remove html tags from a string
	 * @param  {String}  Initial string/html
	 * @return {String}  Sanitised string
	 */
	var stripHTML = exports.stripHTML = function stripHTML(html) {
	    var el = document.createElement("DIV");
	    el.innerHTML = html;
	    return el.textContent || el.innerText || "";
	};

	/**
	 * Adds animation to an element and removes it upon animation completion
	 * @param  {Element} el        Element to add animation to
	 * @param  {String} animation Animation class to add to element
	 * @return
	 */
	var addAnimation = exports.addAnimation = function addAnimation(el, animation) {
	    var animationEvent = whichAnimationEvent();

	    var removeAnimation = function removeAnimation() {
	        el.classList.remove(animation);
	        el.removeEventListener(animationEvent, removeAnimation, false);
	    };

	    el.classList.add(animation);
	    el.addEventListener(animationEvent, removeAnimation, false);
	};

	/**
	 * Get a random number between a range
	 * @param  {Number} min Minimum range
	 * @param  {Number} max Maximum range
	 * @return {Number}     Random number
	 */
	var getRandomNumber = exports.getRandomNumber = function getRandomNumber(min, max) {
	    return Math.floor(Math.random() * (max - min) + min);
	};

	/**
	 * Turn a string into a node
	 * @param  {String} String to convert
	 * @return {HTMLElement}   Converted node element
	 */
	var strToEl = exports.strToEl = function () {
	    var tmpEl = document.createElement('div');
	    return function (str) {
	        var r;
	        tmpEl.innerHTML = str;
	        r = tmpEl.children[0];

	        while (tmpEl.firstChild) {
	            tmpEl.removeChild(tmpEl.firstChild);
	        }

	        return r;
	    };
	}();

	/**
	 * Sets the width of a passed input based on its value
	 * @return {Number} Width of input
	 */
	var getWidthOfInput = exports.getWidthOfInput = function getWidthOfInput(input) {
	    var value = input.value || input.placeholder;
	    var width = input.offsetWidth;

	    if (value) {
	        var testEl = strToEl("<span>" + value + "</span>");
	        testEl.style.position = 'absolute';
	        testEl.style.padding = '0';
	        testEl.style.top = '-9999px';
	        testEl.style.left = '-9999px';
	        testEl.style.width = 'auto';
	        testEl.style.whiteSpace = 'pre';

	        document.body.appendChild(testEl);

	        if (value && testEl.offsetWidth !== input.offsetWidth) {
	            width = testEl.offsetWidth + 4;
	        }

	        document.body.removeChild(testEl);
	    }

	    return width + "px";
	};

	var sortByAlpha = exports.sortByAlpha = function sortByAlpha(a, b) {
	    var labelA = (a.label || a.value).toLowerCase();
	    var labelB = (b.label || b.value).toLowerCase();

	    if (labelA < labelB) return -1;
	    if (labelA > labelB) return 1;
	    return 0;
	};

	var sortByScore = exports.sortByScore = function sortByScore(a, b) {
	    return a.score - b.score;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	/* eslint-disable */

	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
	if (!Array.from) {
	    Array.from = function () {
	        var toStr = Object.prototype.toString;

	        var isCallable = function isCallable(fn) {
	            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
	        };

	        var toInteger = function toInteger(value) {
	            var number = Number(value);
	            if (isNaN(number)) {
	                return 0;
	            }
	            if (number === 0 || !isFinite(number)) {
	                return number;
	            }
	            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	        };

	        var maxSafeInteger = Math.pow(2, 53) - 1;

	        var toLength = function toLength(value) {
	            var len = toInteger(value);
	            return Math.min(Math.max(len, 0), maxSafeInteger);
	        };

	        // The length property of the from method is 1.
	        return function from(arrayLike /*, mapFn, thisArg */) {
	            // 1. Let C be the this value.
	            var C = this;

	            // 2. Let items be ToObject(arrayLike).
	            var items = Object(arrayLike);

	            // 3. ReturnIfAbrupt(items).
	            if (arrayLike == null) {
	                throw new TypeError("Array.from requires an array-like object - not null or undefined");
	            }

	            // 4. If mapfn is undefined, then let mapping be false.
	            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
	            var T;
	            if (typeof mapFn !== 'undefined') {
	                // 5. else
	                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
	                if (!isCallable(mapFn)) {
	                    throw new TypeError('Array.from: when provided, the second argument must be a function');
	                }

	                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
	                if (arguments.length > 2) {
	                    T = arguments[2];
	                }
	            }

	            // 10. Let lenValue be Get(items, "length").
	            // 11. Let len be ToLength(lenValue).
	            var len = toLength(items.length);

	            // 13. If IsConstructor(C) is true, then
	            // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
	            // 14. a. Else, Let A be ArrayCreate(len).
	            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

	            // 16. Let k be 0.
	            var k = 0;
	            // 17. Repeat, while k < len… (also steps a - h)
	            var kValue;
	            while (k < len) {
	                kValue = items[k];
	                if (mapFn) {
	                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
	                } else {
	                    A[k] = kValue;
	                }
	                k += 1;
	            }
	            // 18. Let putStatus be Put(A, "length", len, true).
	            A.length = len;
	            // 20. Return A.
	            return A;
	        };
	    }();
	}

	// Reference: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find
	if (!Array.prototype.find) {
	    Array.prototype.find = function (predicate) {
	        'use strict';

	        if (this == null) {
	            throw new TypeError('Array.prototype.find called on null or undefined');
	        }
	        if (typeof predicate !== 'function') {
	            throw new TypeError('predicate must be a function');
	        }
	        var list = Object(this);
	        var length = list.length >>> 0;
	        var thisArg = arguments[1];
	        var value;

	        for (var i = 0; i < length; i++) {
	            value = list[i];
	            if (predicate.call(thisArg, value, i, list)) {
	                return value;
	            }
	        }
	        return undefined;
	    };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=choices.js.map