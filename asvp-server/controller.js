const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/index', (req, res) => {
  res.sendFile('index.html', {root:'../frontend/html'});
});

router.get('/init', (req,res) => {
  res.sendFile('init.js', {root:'./features/support'});
});

router.get('/feature', (req,res) => {
  res.sendFile('test.feature', {root:'./features'});
});

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

router.post('/generate', (req, res) =>{
  // Open premade test features
  //
  let outputTests = "Feature: Test Apigee Proxy for security implementations\n";
  
  let input =  req.body;

  // Gherkin-Tests.json provides the Gherkin Syntax 
  let gherkinTests = JSON.parse(fs.readFileSync("./gherkin-tests.json"));

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

    this.setBasicAuth = function(value){
      this.parameters.basicAuth = value;
    };
    this.getBasicAuth = function() {
      return this.parameters.basicAuth;
    };
    this.hasBasicAuth = function() {
      return (!(Object.entries(this.parameters.basicAuth).length === 0));
    };

    this.setEndpoint = function(value){
      this.endpoint = value;
    };
    this.getEndpoint = function(){
      return this.endpoint;
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


    this.setConfig = function(config) {
      this.setProxyURL(config.getProxyURL());
      this.setMethod(config.getMethod());
      this.setBasicAuth(config.getBasicAuth());
      this.setQueryParams(config.getQueryParams());
      this.setHeaders(config.getHeaders());
      this.setFormParams(config.getFormParams());
      this.setBody(config.getBody());
    };

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

  var globalConfig = new Config();
  if (input.global != null){
    globalConfig.setMetadata(input.global);
    globalConfig.addParameters(input.global.Parameters);
    globalConfig.setExpectedOutput(input.global.ExpectedOutput);
  }

  for (var test in input.tests){
    var currentTest = new Config()
    currentTest.setConfig(globalConfig);
    currentTest.setMetadata(input.tests[test]);
    currentTest.addParameters(input.tests[test].Parameters);
    currentTest.setExpectedOutput(input.tests[test].ExpectedOutput);



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
    
      
      first = false;
    } // END GIVEN LINES -^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^
    

    // Begin WHEN lines -v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v
    outputTests = outputTests.concat("When ",gherkinTests.When.RequestEndpoint
      .replace(/<REQUEST_METHOD>/,currentTest.method)
      .replace(/<REQUEST_URL>/,currentTest.endpoint));
    // End WHEN lines -^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^


    // Begin THEN lines -v-v-v--v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v
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
  fs.writeFileSync('./features/test.feature', (outputTests), function(err, file) {
     if (err){
       console.log(err)
     }
  });


  // Change the placeholder variables in init.js with data from the req
  //
  console.log('Writing --> Proxy URL @ ./features/support/init.js');
  fs.readFile('./default/default_init.js', 'utf8', function(err, file) {
    if (err) {
      console.log(err);
    };

    let inputData = file
      .replace(/INPUT_URL/g,'\''+input.global.ProxyURL+'\'')
    fs.writeFileSync('./features/support/init.js', inputData, function(err){
      if (err){
        console.log(err);
      }
    });
  });
  console.log(outputTests);
  res.send(outputTests);
})

module.exports = router;
