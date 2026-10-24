const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    retries: 2,
    viewportWidth: 390,
    viewportHeight: 844,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});