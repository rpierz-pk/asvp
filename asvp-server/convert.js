var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: `output/${process.argv[2]}/report.json`,
    output: `output/${process.argv[2]}/report.html`,
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