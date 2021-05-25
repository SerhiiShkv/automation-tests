import { BasePage } from './tests/pageobjects/base.page';

require('@babel/register')({
	presets: [['@babel/preset-env']],
	plugins: ['@babel/plugin-transform-runtime'],
});

require('dotenv').config();
const { ElementActions } = require('./tests/helpers/elementActions.js');
const elementActions = new ElementActions();
const elementCommands = require('./tests/helpers/element-commands');
const { timeouts } = require('./tests/helpers/timeouts');
const basePage = new BasePage();

exports.config = {
	runner: 'local',

	suites: {
		loginFail: ['./tests/specs/loginToPersonalAccount/login.failure.spec.js'],
		loginPass: ['./tests/specs/loginToPersonalAccount/login.success.spec.js'],
		loginFacebook: ['./tests/specs/loginViaFacebook/login.facebook.spec.js'],
		findPhone: ['./tests/specs/search/search.for.iphone.spec.js'],
		wishList: ['./tests/specs/wishList/add.wishList.items.spec.js'],
		shoppingBag: ['./tests/specs/shoppingBag/add.to.shopping.bag.spec.js'],
		filterChairs: ['./tests/specs/filterProduct/filter.product.spec.js'],
	},

	capabilities: [
		{
			maxInstances: 5,
			browserName: 'chrome',
			// 'goog:chromeOptions': {
			// 	args: [
			// 		'--disable-web-security',
			// 		'--user-data-dir=~/Library/Application Support/Google/Chrome/Profile 1',
			// 		'--allow-running-insecure-content',
			// 	],
			// },
			acceptInsecureCerts: true,
		},
	],

	logLevel: 'error',
	bail: 0,
	baseUrl: 'https://rozetka.com.ua/ua/',
	waitforTimeout: 15000,
	connectionRetryTimeout: 120000,
	connectionRetryCount: 3,
	services: ['chromedriver'],
	framework: 'jasmine',
	reporters: ['spec'],

	jasmineOpts: {
		defaultTimeoutInterval: 20000,
	},
	// mochaOpts: {
	//   ui: "bdd",
	//   timeout: 60000,
	// },

	before: function (capabilities, specs) {
		Object.keys(elementCommands).forEach((key) => {
			browser.addCommand(key, elementCommands[key], true);
		});
	},

	beforeSession: () => {
		elementActions.elementActions();
		global.timeouts = timeouts;
	},

	beforeSuite: function (suite) {
		basePage.openRozetkaHomePage({});
	},
};
