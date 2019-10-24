const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const fs = require('fs');

router.get('/index', (req, res) => {
  res.sendFile('index.html', {root:'../frontend/html'});
});

router.get('/init', (req,res) => {
  res.sendFile('init.js', {root:'./features/support'});
});

// Convert a json report file to html output
router.get('/report', (req, res) => {
  let jsonReportFilePath = __dirname + '/report.json';
  let htmlReportFilePath = __dirname + '/report.html';

  try {
    if (fs.existsSync(jsonReportFilePath)){
      // Convert the json report file to HTML document
      let generateScript = exec('cd '+__dirname+' && node convert.js',
        (error, stdout, stderr) => {
          res.sendFile(htmlReportFilePath)
        }
      );
    } else{
      // No json report file was found, so send back error
      res.status(400).json({
        "Status Code": "400 BAD REQUEST",
        "Error": "No report file could be found. Cucumber tests must be run first.",
        "Reference":"https://www.github.com/rpierz-pk/asvp"
      })
    }
  } catch(err){
    console.log(err);
  }
});

// retrieve the feature file
router.get('/feature', (req,res) => {
  res.sendFile('test.feature', {root:'./features'});
});

//  run the cucumber tests (should fail if test not configured)
router.get('/run', (req, res) =>{
  let featureFilePath = __dirname + '/features/test.feature';
  try {
    if (fs.existsSync(featureFilePath)) {
      var script = exec('cd '+__dirname+' && npm test',
        (error, stdout, stderr) =>{
          res.sendFile(__dirname+'/report.json');
          console.log(stderr);
          if(error !== null) {
            console.log(`exec error: ${error}`);
          }
        });
    } else {
      // no feature file was found
      res.status(400).json({
        "Status Code": "400 BAD REQUEST",
        "Error":"No valid feature file found. Please generate test file first at the /generate endpoint. Please see the documentation for more help",
        "Reference":"https://www.github.com/rpierz-pk/asvp"
      })
    }
  } catch(err) {
    console.log(err)
  }
});

//  return the Jenkinsfile's text
router.get('/jenkins', (req, res) => {
  console.log(' GET /jenkins');
  fs.readFile('./default/Jenkinsfile', 'utf8', function(err, file) {
    if (err){
      console.log(err);
    }
    if (req.query.location == "") {
      res.send("Please include the folder path for the test.feature file and init.js file");
      return -1;
    };
    let inputData = file.replace(/<FOLDER_LOCATION>/g, req.query.location);
    res.send(inputData);
  });
});

// Generate the Feature file and Init.js file
router.post('/generate', (req, res) =>{  
  // OutputTests will be the variable holding the final text to be output
  let outputTests = "Feature: Test Apigee Proxy for security implementations\n";
  
  let input =  req.body;

  // gherkin-tests.json provides the premade Gherkin Syntax with modifiable text
  let gherkinTests = JSON.parse(fs.readFileSync(__dirname+'/gherkin-tests.json'));
  var Config = function() {
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

    //Define Getters and Setters

    //Define Metadata
    this.setProxyURL = function(value){
      this.proxyURL = value;
    };
    this.getProxyURL = function(){
      return this.proxyURL;
    };

    this.setMethod = function(value){
      this.method = value;
    };
    this.getMethod = function() {
      return this.method;
    };

    this.setEndpoint = function(value){
      this.endpoint = value;
    };
    this.getEndpoint = function(){
      return this.endpoint;
    };

    //Define Parameters
    this.setBasicAuth = function(value){
      this.parameters.basicAuth = value;
    };
    this.getBasicAuth = function() {
      return this.parameters.basicAuth;
    };
    this.hasBasicAuth = function() {
      return (!(Object.entries(this.parameters.basicAuth).length === 0));
    };

    this.setBody = function(value){
      this.parameters.body = value;
    };
    this.getBody = function() {
      return this.parameters.body;
    };
    this.hasBody = function() {
      if (this.parameters.body != "")
        return true;
      return false;
    };

    this.addQueryParam = function(key, value){
      this.parameters.queryParams[key] = value;
    };
    this.setQueryParams = function(config){
      for (var queryParam in config){
        this.addQueryParam(queryParam,config[queryParam]);
      };
    };
    this.getQueryParams = function() {
      return this.parameters.queryParams;
    };
    this.hasQueryParam = function() {
      return (!(Object.entries(this.parameters.queryParams).length === 0));
    };

    this.addHeader = function(key, value){
      this.parameters.headers[key] = value;
    };
    this.getHeaders = function() {
      return this.parameters.headers;
    };
    this.setHeaders = function(config){
      for (var header in config){
        this.addHeader(header,config[header]);
      };
    };
    this.hasHeader = function() {
      return (!(Object.entries(this.parameters.headers).length === 0));
    };

    this.addFormParam = function(key, value){
      this.parameters.formParams[key] = value;
    };
    this.getFormParams = function() {
      return this.parameters.formParams;
    };
    this.setFormParams = function(config){
      for (var formParam in config){
        this.addFormParam(formParam,config[formParam]);
      };
    };
    this.hasFormParam = function() {
      return (!(Object.entries(this.parameters.formParams).length === 0));
    };

    //Define Expected Output
    this.setOutputCode = function(value){
      this.output.code = value;
    };
    this.getOutputCode = function() {
      return this.output.code;
    };
    this.hasOutputCode = function() {
      if (this.output.code != "")
        return true;
      return false;
    };

    this.addOutputHeader = function(key, value){
      this.output.headers[key] = value;
    };
    this.getOutputHeader = function() {
      return this.output.headers;
    };
    this.setOutputHeader = function(value) {
      this.output.headers = value;
    }
    this.hasOutputHeader = function() {
      return (!(Object.entries(this.output.headers).length === 0));
    };

    this.setOutputBody = function(value) {
      this.output.body = value;
    };
    this.getOutputBody = function() {
      return this.body;
    }
    this.hasOutputBody = function() {
      return (!(Object.entries(this.output.body).length === 0));
    };


    // setConfig allows for each test to copy the Global Configuration
    this.setConfig = function(config) {
      this.setProxyURL(config.getProxyURL());
      this.setMethod(config.getMethod());
      this.setBasicAuth(config.getBasicAuth());
      this.setQueryParams(config.getQueryParams());
      this.setHeaders(config.getHeaders());
      this.setFormParams(config.getFormParams());
      this.setBody(config.getBody());
    };

    // Set the ProxyURL, HTTP Verb, and Proxy Endpoint
    this.setMetadata = function(metadata){
      if (metadata != null){
        if (metadata.ProxyURL != null){
          this.setProxyURL(metadata.ProxyURL);
        };
        if (metadata.Method != null){
          this.setMethod(metadata.Method);
        };
        if (metadata.Endpoint != null){
          this.setEndpoint(metadata.Endpoint);
        };
      }
    };

    // Add any queryParameters, Headers, form Params, Basic Authentication, and Payload to the test
    this.addParameters = function(parameters) {
      if (parameters != null){
        if (parameters.BasicAuth != null){
          this.setBasicAuth(parameters.BasicAuth);
        };
        if (parameters.QueryParams != null) {
          for (var queryParam in parameters.QueryParams){
            this.addQueryParam(queryParam,parameters.QueryParams[queryParam])
          };
        };
        if (parameters.Headers != null){
          for (var header in parameters.Headers){
            this.addHeader(header,parameters.Headers[header]);
          };
        };
        if (parameters.FormParams != null){
          for(var formParam in parameters.FormParams){
            this.addFormParam(formParam,parameters.FormParams[formParam]);
          };
        };
        if (parameters.Body != null){
          this.setBody(parameters.Body);
        };
      };
    };

    // Set the expected Response Code, Headers, or Payload to the test
    this.setExpectedOutput = function(output){
      if (output != null) {
        if (output.ResponseCode != null){
          this.setOutputCode(output.ResponseCode);
        };
        if (output.ResponseHeader != null){
          this.setOutputHeader(output.ResponseHeader);
        };
        if (output.ResponseBody != null){
          this.setOutputBody(output.ResponseBody);
        };
      }
    }
  };

  // Set the global Configuration that all tests will inherit
  var globalConfig = new Config();	
  if (input.global != null){	
    globalConfig.setMetadata(input.global);	
    globalConfig.addParameters(input.global.Parameters);	
    globalConfig.setExpectedOutput(input.global.ExpectedOutput);	
  }	

  // Iterate through all tests, parse the parameters included and write them to the test feature file
  for (var test in input.tests){	
    var currentTest = new Config()	
    currentTest.setConfig(globalConfig);	
    currentTest.setMetadata(input.tests[test]);	
    currentTest.addParameters(input.tests[test].Parameters);	
    currentTest.setExpectedOutput(input.tests[test].ExpectedOutput);	


    // first marks whether this is the first line of the section (i.e. append "Given/When/Then") or not (i.e. append "And")
    var first = true;	
    outputTests = outputTests.concat("Scenario: Run Test ",test,"\n");	

    // Append all requirements for the req as GIVEN statements	
    // Begin GIVEN lines -v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v	
    var parameters = currentTest.parameters;	
    for (var parameterType in parameters) {	
      if (Object.entries(parameters[parameterType]).length === 0){	
        delete parameters[parameterType];	
      }	
    };	
    for (var parameterType in parameters){	

      // Write the GIVEN lines for each test	
      if (first) outputTests = outputTests.concat("Given ");	
      else outputTests = outputTests.concat("And ");	

      // Write Query Parameters to Given lines	
      if (parameterType == "queryParams") {	
        outputTests = outputTests.concat(gherkinTests.Given.QueryParamStart);         // Append the intro line for Query Parameters	
        for (var queryParam in currentTest.parameters.queryParams) {	
          outputTests = outputTests.concat(gherkinTests.Given.QueryParamUnit	
            .replace(/<QUERY_KEY>/,queryParam)	
            .replace(/<QUERY_VALUE>/,currentTest.parameters.queryParams[queryParam]));	
        }	
      }	

      // Write Headers to Given lines	
      else if (parameterType == "headers") {	
        outputTests = outputTests.concat(gherkinTests.Given.HeaderStart);         // Append the intro line for Headers	
        for (var header in currentTest.parameters.headers) {	
          outputTests = outputTests.concat(gherkinTests.Given.HeaderUnit	
            .replace(/<HEADER_KEY>/,header)	
            .replace(/<HEADER_VALUE>/,currentTest.parameters.headers[header]));	
        }	
      }	

      // Write Form Parameters to Given lines	
      else if (parameterType == "formParams") {	
        outputTests = outputTests.concat(gherkinTests.Given.FormParamStart);         // Append the intro line for Form Parameters	
        for (var formParam in currentTest.parameters.formParams) {	
          outputTests = outputTests.concat(gherkinTests.Given.FormParamUnit	
            .replace(/<FORM_KEY>/,formParam)	
            .replace(/<FORM_VALUE>/,currentTest.parameters.formParams[formParam]));	
        }	
      }	

      // Write Basic Authentication to Given lines	
      else if (parameterType == "basicAuth") {	
        outputTests = outputTests.concat(gherkinTests.Given.BasicAuth	
          .replace(/<BASIC_USR>/,currentTest.parameters.basicAuth.username)	
          .replace(/<BASIC_PSW>/,currentTest.parameters.basicAuth.password));	
      }	

      // Write the Payload to Given lines	
      else if (parameterType == "body") {	
        outputTests = outputTests.concat(gherkinTests.Given.Body.	
          replace(/<BODY>/,currentTest.parameters.body));	
      }	
      // At least one parameter was found, so if any more are found, their lines should start with "And" instead of "Given"
      first = false;	
    } // END GIVEN LINES -^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^	

    // Begin WHEN lines -v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v	
    outputTests = outputTests.concat("When ",gherkinTests.When.RequestEndpoint	
      .replace(/<REQUEST_METHOD>/,currentTest.method)	
      .replace(/<REQUEST_URL>/,currentTest.endpoint));	
    // End WHEN lines -^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^	


    // Begin THEN lines -v-v-v--v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v	
    // Append "Then" for the first line and "And" for all others
    first = true;	
    var expectedOutput = currentTest.output;	
    for (var expectedResponseType in expectedOutput){	
      if (Object.entries(expectedOutput[expectedResponseType]).length === 0)	
        delete expectedOutput[expectedResponseType];	
    }	
    for (var expectedResponseType in expectedOutput){	
      if (first) outputTests = outputTests.concat("Then ");	
      else outputTests = outputTests.concat("And ");	

      if (expectedResponseType == "code"){	
        outputTests = outputTests.concat(gherkinTests.Then.ResponseCode	
          .replace(/<RESPONSE_CODE>/,expectedOutput.code));	
      }	

      else if (expectedResponseType == "headers"){	
        for (var header in expectedOutput.headers){	
          outputTests = outputTests.concat(gherkinTests.Then.ResponseHeader	
            .replace(/<HEADER_KEY>/,header)	
            .replace(/<HEADER_VALUE>/,expectedOutput.headers[header]));	
        }	
      }	

      else if (expectedResponseType == "body") {	
        for (var bodyKey in expectedOutput.body){	
          outputTests = outputTests.concat(gherkinTests.Then.ResponseBody	
            .replace(/<BODY_PATH>/,bodyKey)	
            .replace(/<BODY_VALUE>/,expectedOutput.body[bodyKey]));	

        }	
      }	
      first = false;	
    }	

  // End THEN lines -^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^
  }

  // Generate the feature file from the parameters desired by the user
  //
  console.log('Generating --> feature file @ ./features/test.feature');     
  fs.writeFileSync(__dirname+'/features/test.feature', (outputTests), function(err, file) {
     if (err){
       console.log(err)
     }
  });


  // Change the placeholder variables in init.js with data from the request
  //
  console.log('Writing --> Proxy URL @ ./features/support/init.js');
  fs.readFile(__dirname+'/default/default_init.js', 'utf8', function(err, file) {
    if (err) {
      console.log(err);
    };

    let inputData = file
      .replace(/INPUT_URL/g,'\''+input.global.ProxyURL+'\'')
    fs.writeFileSync(__dirname+'/features/support/init.js', inputData, function(err){
      if (err){
        console.log(err);
      }
    });
  });
  res.send(outputTests);
  }
)

module.exports = router;