var env = require("../environment.json");
var newman = require("newman");
// require newman in your project

// call newman.run to pass `options` object and wait for callback
newman
  .run({
    collection: `${env.postman_api_url}/collections/${env.collection_id}?apikey=${env.api_key}`,
    environment: `${env.postman_api_url}/environments/${env.environment_id}?apikey=${env.api_key}`,
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
