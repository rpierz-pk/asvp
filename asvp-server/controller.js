const express = require("express");
const router = express.Router();
const exec = require("child_process").exec;
const fs = require("fs");
const Ajv = require("ajv");

router.post("/test", (req, res) => {
  return res.status(200).json(req.body);
});

router.get("/index", (req, res) => {
  return res.sendFile("index.html", { root: "../frontend/html" });
});

router.get("/init", (req, res) => {
  return res.sendFile("init.js", { root: "./features/support" });
});

// Convert a json report file to html output
router.get("/report", (req, res) => {
  if (req.query.id != null) {
    var id = req.query.id;
  } else {
    return res.status(400).json({
      "Status Code": "400 BAD REQUEST",
      Error:
        "No ID was included in the request. Please refer to the documentation for more help.",
      Reference: "https://www.github.com/rpierz-pk/asv"
    });
  }
  try {
    if (fs.existsSync(`${__dirname}/output/${id}/report.json`)) {
      // Convert the json report file to HTML document
      let generateScript = exec(
        `cd ${__dirname} && node convert.js ${id}`,
        (error, stdout, stderr) => {
          return res.sendFile(`${__dirname}/output/${id}/report.html`);
        }
      );
    } else {
      // No json report file was found, so send back error
      return res.status(400).json({
        "Status Code": "400 BAD REQUEST",
        Error: `No report file could be found for ID ${id}. Cucumber tests must be run first.`,
        Reference: "https://www.github.com/rpierz-pk/asvp"
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// retrieve the feature file
router.get("/feature", (req, res) => {
  return res.sendFile("test.feature", { root: "./features" });
});

//  run the cucumber tests (should fail if test not configured)
router.get("/run", (req, res) => {
  // Check for ID
  if (req.query.id != null) {
    var id = req.query.id;
  } else {
    // No request was included
    return res.status(400).json({
      "Status Code": "400 BAD REQUEST",
      Error:
        "No ID was included in the request. Please refer to the documentation for more help.",
      Reference: "https://www.github.com/rpierz-pk/asvp"
    });
  }

  // Run Cucumber-js on the feature file in the folder per given ID
  let featureFilePath = `output/${id}/features/test.feature`;

  // Check if feature file exists in folder of requested user
  if (fs.existsSync(`${__dirname}/${featureFilePath}`)) {
    try {
      console.log(`Executing --> tests for ID ${id} @ ${featureFilePath}`);
      var script = exec(
        `cd ${__dirname} && npx cucumber-js ${featureFilePath} -f json:output/${id}/report.json`,
        (error, stdout, stderr) => {
          return res.sendFile(`${__dirname}/output/${id}/report.json`);
          console.log(stderr);
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    // No feature file was found
    return res.status(400).json({
      "Status Code": "400 BAD REQUEST",
      Error: `No feature file was found for the given ID (${id}). Please generate the test file first and receive your ID. Please refer to the documentation for more help`,
      Reference: "https://www.github.com/rpierz-pk/asvp"
    });
  }
});

//  return the Jenkinsfile's text
router.get("/jenkins", (req, res) => {
  console.log(" GET /jenkins");
  fs.readFile("./default/Jenkinsfile", "utf8", function(err, file) {
    if (err) {
      console.log(err);
    }
    if (req.query.location == "") {
      return res.send(
        "Please include the folder path for the test.feature file and init.js file"
      );
      return -1;
    }
    let inputData = file.replace(/<FOLDER_LOCATION>/g, req.query.location);
    return res.send(inputData);
  });
});

// Generate the Feature file and Init.js file
router.post("/generate", (req, res) => {
  let input = req.body;

  // Validate the Request object against a JSON schema
  var ajv = new Ajv();
  var validate = ajv.compile(
    JSON.parse(fs.readFileSync(__dirname + "/request.schema.json"))
  );
  var valid = validate(input);
  if (!valid) {
    console.log(validate.errors);
    return res.status(400).json({
      "Status Code": "400",
      Error: "JSON Validation Failed",
      Message: validate.errors
    });
  }
  console.log("Request --> Passed JSON Validation");

  // OutputTests will be the variable holding the final text to be output
  let outputTests = "Feature: Test Apigee Proxy for security implementations\n";

  // Destructure the Given, When, and Then sections of the premade Gherkin lines from a file on the server
  let { Given, When, Then } = JSON.parse(
    fs.readFileSync(__dirname + "/gherkin-tests.json")
  );

  // The config class is used to store all test configuration data
  class Config {
    constructor() {
      this.proxyURL = "";
      this.method = "";
      this.endpoint;
      this.parameters = {
        queryParams: {},
        headers: {},
        formParams: {},
        basicAuth: {},
        body: ""
      };
      this.output = {
        code: "",
        headers: {},
        body: ""
      };
    }
    //Define Getters and Setters
    //Define Metadata
    setProxyURL(value) {
      this.proxyURL = value;
    }
    getProxyURL() {
      return this.proxyURL;
    }
    setMethod(value) {
      this.method = value;
    }
    getMethod() {
      return this.method;
    }
    setEndpoint(value) {
      this.endpoint = value;
    }
    getEndpoint() {
      return this.endpoint;
    }
    //Define Parameters
    setBasicAuth(value) {
      this.parameters.basicAuth = value;
    }
    getBasicAuth() {
      return this.parameters.basicAuth;
    }
    hasBasicAuth() {
      return !(Object.entries(this.parameters.basicAuth).length === 0);
    }
    setBody(value) {
      this.parameters.body = value;
    }
    getBody() {
      return this.parameters.body;
    }
    hasBody() {
      return this.parameters.body != "";
    }
    addQueryParam(key, value) {
      this.parameters.queryParams[key] = value;
    }
    setQueryParams(config) {
      for (var queryParam in config) {
        this.addQueryParam(queryParam, config[queryParam]);
      }
    }
    getQueryParams() {
      return this.parameters.queryParams;
    }
    hasQueryParam() {
      return !(Object.entries(this.parameters.queryParams).length === 0);
    }
    addHeader(key, value) {
      this.parameters.headers[key] = value;
    }
    getHeaders() {
      return this.parameters.headers;
    }
    setHeaders(config) {
      for (var header in config) {
        this.addHeader(header, config[header]);
      }
    }
    hasHeader() {
      return !(Object.entries(this.parameters.headers).length === 0);
    }
    addFormParam(key, value) {
      this.parameters.formParams[key] = value;
    }
    getFormParams() {
      return this.parameters.formParams;
    }
    setFormParams(config) {
      for (var formParam in config) {
        this.addFormParam(formParam, config[formParam]);
      }
    }
    hasFormParam() {
      return !(Object.entries(this.parameters.formParams).length === 0);
    }
    //Define Expected Output
    setOutputCode(value) {
      this.output.code = value;
    }
    getOutputCode() {
      return this.output.code;
    }
    hasOutputCode() {
      return this.output.code != "";
    }
    addOutputHeader(key, value) {
      this.output.headers[key] = value;
    }
    getOutputHeader() {
      return this.output.headers;
    }
    setOutputHeader(value) {
      this.output.headers = value;
    }
    hasOutputHeader() {
      return !(Object.entries(this.output.headers).length === 0);
    }
    setOutputBody(value) {
      this.output.body = value;
    }
    getOutputBody() {
      return this.body;
    }
    hasOutputBody() {
      return !(Object.entries(this.output.body).length === 0);
    }
    // setConfig allows for each test to copy the Global Configuration
    setConfig(config) {
      this.setMetadata(config.getMetadata());
      this.addParameters(config.getParameters());
      this.setExpectedOutput(config.getExpectedOutput());
    }
    // Set the ProxyURL, HTTP Verb, and Proxy Endpoint
    setMetadata(metadata) {
      if (metadata) {
        if (metadata.ProxyURL) {
          this.setProxyURL(metadata.ProxyURL);
        }
        if (metadata.Method) {
          this.setMethod(metadata.Method);
        }
        if (metadata.Endpoint) {
          this.setEndpoint(metadata.Endpoint);
        }
      }
    }
    getMetadata() {
      return {
        ProxyURL: this.getProxyURL(),
        Endpoint: this.getEndpoint(),
        Method: this.getMethod()
      };
    }
    // Add any queryParameters, Headers, form Params, Basic Authentication, and Payload to the test
    addParameters(parameters) {
      if (parameters) {
        if (parameters.BasicAuth) {
          this.setBasicAuth(parameters.BasicAuth);
        }
        if (parameters.QueryParams) {
          for (var queryParam in parameters.QueryParams) {
            this.addQueryParam(queryParam, parameters.QueryParams[queryParam]);
          }
        }
        if (parameters.Headers) {
          for (var header in parameters.Headers) {
            this.addHeader(header, parameters.Headers[header]);
          }
        }
        if (parameters.FormParams) {
          for (var formParam in parameters.FormParams) {
            this.addFormParam(formParam, parameters.FormParams[formParam]);
          }
        }
        if (parameters.Body) {
          this.setBody(parameters.Body);
        }
      }
    }
    getParameters() {
      return {
        QueryParams: this.getQueryParams(),
        Headers: this.getHeaders(),
        FormParams: this.getFormParams(),
        BasicAuth: this.getBasicAuth(),
        Body: this.getBody()
      };
    }
    // Set the expected Response Code, Headers, or Payload to the test
    setExpectedOutput(output) {
      if (output) {
        if (output.ResponseCode) {
          this.setOutputCode(output.ResponseCode);
        }
        if (output.ResponseHeader) {
          this.setOutputHeader(output.ResponseHeader);
        }
        if (output.ResponseBody) {
          this.setOutputBody(output.ResponseBody);
        }
      }
    }
    getExpectedOutput() {
      return {
        ResponseCode: this.getOutputCode(),
        ResponseHeader: this.getOutputHeader(),
        ResponseBody: this.getOutputBody()
      };
    }
  }

  // Set the global Configuration that all tests will inherit
  var globalConfig = new Config();
  console.log("Server --> Setting global configuration");
  if (input.global != null) {
    globalConfig.setMetadata(input.global);
    globalConfig.addParameters(input.global.Parameters);
    globalConfig.setExpectedOutput(input.global.ExpectedOutput);
  }
  console.log(`Server --> Global configuration complete`);

  // Iterate through all tests, parse the parameters included and write them to the test feature file
  for (var test in input.tests) {
    console.log("Server --> Creating test object");
    var currentTest = new Config();
    currentTest.setConfig(globalConfig);
    currentTest.setMetadata(input.tests[test]);
    currentTest.addParameters(input.tests[test].Parameters);
    currentTest.setExpectedOutput(input.tests[test].ExpectedOutput);
    console.log(`Server --> Test object created`);

    // isFirstLineOfSection marks whether this is the first line of the section (i.e. append "Given/When/Then") or not (i.e. append "And")
    var isFirstLineOfSection = true;
    outputTests += `Scenario: Run Test  ${test}\n`;

    // Append all requirements for the req as GIVEN statements
    // Begin GIVEN lines -----------------------------------------------------------------------------------------v
    var { parameters } = currentTest;

    // Remove all empty sections from the test object so that empty sections are not written to the document
    for (var parameterType in parameters) {
      if (Object.entries(parameters[parameterType]).length === 0) {
        delete parameters[parameterType];
      }
    }

    // Reject requests if no Parameters exist in global and for test-specific
    if (Object.entries(parameters).length === 0) {
      return res.status(400).json({
        "Status Code": "400 BAD REQUEST",
        Error: `No Parameters were found to apply to test ${test}. Please refer to the documentation for more information`,
        Reference: "https://www.github.com/rpierz-pk/asvp"
      });
    }

    console.log(`Server --> Create Feature File output`);
    for (var parameterType in parameters) {
      // Write the GIVEN lines for each test
      outputTests += isFirstLineOfSection ? "Given " : "And ";

      // Write Query Parameters to Given lines
      if (parameterType == "queryParams") {
        outputTests += Given.QueryParamStart; // Append the intro line for Query Parameters
        for (var queryParam in currentTest.parameters.queryParams) {
          outputTests += Given.QueryParamUnit.replace(
            /<QUERY_KEY>/,
            queryParam
          ).replace(
            /<QUERY_VALUE>/,
            currentTest.parameters.queryParams[queryParam]
          );
        }
      }

      // Write Headers to Given lines
      else if (parameterType == "headers") {
        outputTests += Given.HeaderStart; // Append the intro line for Headers
        for (var header in currentTest.parameters.headers) {
          outputTests += Given.HeaderUnit.replace(
            /<HEADER_KEY>/,
            header
          ).replace(/<HEADER_VALUE>/, currentTest.parameters.headers[header]);
        }
      }

      // Write Form Parameters to Given lines
      else if (parameterType == "formParams") {
        outputTests += Given.FormParamStart; // Append the intro line for Form Parameters
        for (var formParam in currentTest.parameters.formParams) {
          outputTests += Given.FormParamUnit.replace(
            /<FORM_KEY>/,
            formParam
          ).replace(
            /<FORM_VALUE>/,
            currentTest.parameters.formParams[formParam]
          );
        }
      }

      // Write Basic Authentication to Given lines
      else if (parameterType == "basicAuth") {
        outputTests += Given.BasicAuth.replace(
          /<BASIC_USR>/,
          currentTest.parameters.basicAuth.username
        ).replace(/<BASIC_PSW>/, currentTest.parameters.basicAuth.password);
      }

      // Write the Payload to Given lines
      else if (parameterType == "body") {
        outputTests += Given.Body.replace(
          /<BODY>/,
          currentTest.parameters.body
        );
      }
      // At least one parameter was found, so if any more are found, their lines should start with "And" instead of "Given"
      isFirstLineOfSection = false;
    } // END GIVEN LINES --------------------------------------------------------------------------------------^

    // Begin WHEN lines --------------------------------------------------------------------------------------v

    // Reject requests if no Method/Endpoint exist in global and for test-specific
    if (!currentTest.method || !currentTest.endpoint) {
      return res.status(400).json({
        "Status Code": "400 BAD REQUEST",
        Error: `No Method/Endpoint could be applied to test ${test}. Please refer to the documentation for more information`,
        Reference: "https://www.github.com/rpierz-pk/asvp"
      });
    }
    outputTests +=
      "When " +
      When.RequestEndpoint.replace(
        /<REQUEST_METHOD>/,
        currentTest.method
      ).replace(/<REQUEST_URL>/, currentTest.endpoint);
    // End WHEN lines -----------------------------------------------------------------------------------------^

    // Begin THEN lines --------------------------------------------------------------------------------------v
    isFirstLineOfSection = true;
    var { output } = currentTest;
    for (var expectedResponseType in output) {
      if (Object.entries(output[expectedResponseType]).length === 0)
        delete output[expectedResponseType];
    }

    // Reject requests if no Expected Output exist in global and for test-specific
    if (Object.entries(output).length === 0) {
      return res.status(400).json({
        "Status Code": "400 BAD REQUEST",
        Error: `No Expected output were found to apply to test ${test}. Please refer to the documentation for more information`,
        Reference: "https://www.github.com/rpierz-pk/asvp"
      });
    }

    for (var expectedResponseType in output) {
      // Append "Then" for the first line and "And" for all others
      outputTests += isFirstLineOfSection ? "Then " : "And ";

      if (expectedResponseType == "code") {
        outputTests += Then.ResponseCode.replace(
          /<RESPONSE_CODE>/,
          output.code
        );
      } else if (expectedResponseType == "headers") {
        for (var header in output.headers) {
          outputTests += Then.ResponseHeader.replace(
            /<HEADER_KEY>/,
            header
          ).replace(/<HEADER_VALUE>/, output.headers[header]);
        }
      } else if (expectedResponseType == "body") {
        for (var bodyKey in output.body) {
          outputTests += Then.ResponseBody.replace(
            /<BODY_PATH>/,
            bodyKey
          ).replace(/<BODY_VALUE>/, output.body[bodyKey]);
        }
      }
      isFirstLineOfSection = false;
    }
    // End THEN lines --------------------------------------------------------------------------------------^
  }

  // Bootstrap the folder structure required for each user
  console.log(`Server --> Bootstrapping folder structure`);
  var id =
    req.query.id != null
      ? req.query.id
      : `user${Math.floor(Math.random() * 100000)}`;
  console.log(`The user ID is ${id}`);
  var bootstrap = async () => {
    await new Promise((resolve, reject) => {
      if (
        !fs.existsSync(
          `${__dirname}/output/${id}/features/step_definitions/apickli-gherkin.js`
        )
      ) {
        var script = exec(
          `cd ${__dirname}/output && mkdir ${id} && cd ${id} && mkdir features && cd features && mkdir support && mkdir step_definitions && cd step_definitions`,
          (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
              console.log(`exec errors: ${error}`);
              reject(
                res.status(500).json({
                  "Status Code": "500 SERVER ERROR",
                  Error: "The server was unable to bootstrap the correct file"
                })
              );
            }
            fs.writeFileSync(
              `${__dirname}/output/${id}/features/step_definitions/apickli-gherkin.js`,
              "module.exports = require('apickli/apickli-gherkin');"
            );
            resolve();
          }
        );
      }
      resolve();
    });
    console.log(`Server --> Folder structure bootstrapped`);

    // Generate the feature file from the parameters desired by the user
    //
    console.log(
      `Generating --> feature file @ ./output/${id}/features/test.feature`
    );
    fs.writeFileSync(
      `${__dirname}/output/${id}/features/test.feature`,
      outputTests,
      function(err, file) {
        if (err) {
          console.log(err);
        }
      }
    );

    // Change the placeholder variables in init.js with data from the request
    //
    console.log(
      `Writing --> Proxy URL @ ./output/${id}/features/support/init.js`
    );
    fs.readFile(__dirname + "/default/default_init.js", "utf8", function(
      err,
      file
    ) {
      if (err) {
        console.log(err);
      }

      let inputData = file.replace(
        /INPUT_URL/g,
        "'" + input.global.ProxyURL + "'"
      );
      fs.writeFileSync(
        `${__dirname}/output/${id}/features/support/init.js`,
        inputData,
        function(err) {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  };
  bootstrap();

  return res.json({
    id: id,
    feature: outputTests
  });
});

module.exports = router;
