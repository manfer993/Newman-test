var newman = require("newman");
// require newman in your project

// call newman.run to pass `options` object and wait for callback
newman
  .run({
    collection: require("../collections/Strapi_POC.postman_collection.json"),
    environment: require("../environments/Local_PoC.postman_environment.json"),
    globals: require("../data/workspace.postman_globals.json"),
    reporters: ["cli", "htmlextra", "json"],
    reporter: {
      htmlextra: {
        export: "./testResults/html/htmlReport.html",
        template: "./templates/customTemplate.hbs",
        testPaging: true,
        browserTitle: "My Newman report",
        title: "My Newman Report",
        titleSize: 4,
        omitHeaders: true,
        skipHeaders: "Authorization",
        timezone: "Colombia/Bogota",
      },
      json: {
        export: "./testResults/json/jsonReport.json",
      },
    },
    iterationCount: 1,
    insecure: true, // allow self-signed certs, required in postman too
    delayRequest: 0,
    timeout: 18000, // set time out
  })
  .on("start", function () {
    // on start of run, log to console
    console.log("running a collection...");
  })
  .on("done", function (err, summary) {
    if (err || summary.error) {
      console.error("collection run encountered an error.");
    } else {
      console.log("collection run completed.");
    }
  });
