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

router.post('/generate', (req, res) =>{
  // Open premade test features
  //
  let premadeTests = JSON.parse(fs.readFileSync('./premade-features.json'));
  let outputTests = "Feature: Test Apigee Proxy for security implementations\n";
  
  let input =  req.body;

  // Gherkin-Tests.json provides the Gherkin Syntax 
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
})


module.exports = router;