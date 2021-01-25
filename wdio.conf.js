require("@babel/register")({
  presets: [["@babel/preset-env"]],
  plugins: ["@babel/plugin-transform-runtime"],
});

const { ElementActions } = require("./tests/helpers/elementActions.js");
const elementActions = new ElementActions();
const { TimeOuts } = require("./tests/helpers/timeOuts");
const timeOuts = new TimeOuts();

exports.config = {
  runner: "local",

  suites: {
    loginFail: ["./tests/specs/loginToPersonalAccount/login.failure.spec.js"],
    loginPass: ["./tests/specs/loginToPersonalAccount/login.success.spec.js"],
  },

  maxInstances: 10,

  capabilities: [
    {
      maxInstances: 5,
      browserName: "chrome",
      acceptInsecureCerts: true,
    },
  ],

  logLevel: "info",
  bail: 0,
  baseUrl: "https://rozetka.com.ua/ua/",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["chromedriver"],
  framework: "mocha",
  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  beforeSession: () => {
    elementActions.elementActions();
    timeOuts.timeOuts();
  },
};
