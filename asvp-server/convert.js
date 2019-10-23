var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: 'report.json',
    output: 'report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "CucumberVersion":"4.2.1",
        "Input": "report.json",
        "Parallel": "Scenarios",
        "Output": "report.html",
        "Executed": "Remote"
    }
};

reporter.generate(options);