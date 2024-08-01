"use strict";

const scanner = require("sonarqube-scanner");

const analyse = (url, token, projectKey) => {
  scanner(
    {
      serverUrl: url,
      token,
      options: {
        "sonar.projectKey": projectKey,
        "sonar.tests": "coverage/lcov.info",
        "sonar.sources": ".",
        "sonar.exclusions":
          "file:**/*.test.js,**/runSonarQube.js, api/integration/templates/**/**.*,**/report.html",
        "sonar.dependencyCheck.htmlReportPath": "report.html",
        "sonar.coverage.exclusions":
          "file:**/runSonarQube.js,**/app.js,**/server.js,**/cron.js,**/api/swagger/**/*.js,**/api/integration/testing/*.js,**/report.html"
      }
    },
    (_err, _data) => {
      //nothing much to see here
    }
  );
};

const [url, token, projectKey] = process.argv.slice(2);
if (!url || !token || !projectKey) {
  // eslint-disable-next-line no-console
  console.log(
    "Please supply a SonarQube url, token and project key as arguments"
  );
}
analyse(url, token, projectKey);
