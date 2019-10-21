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

  var tests = input.tests;

  // Create the tests using the data in the request
  for (var test in tests){
    var first = true;
    outputTests = outputTests.concat("Scenario: Run Test ",test,"\n");

    // Append all requirements for the request as GIVEN statements
    // Begin GIVEN lines -v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v
    var parameters = tests[test].Parameters;
    for (var parameterType in parameters){
      
      // Write the GIVEN lines for each test
      if (first) outputTests = outputTests.concat("Given ");
      else outputTests = outputTests.concat("And ");
        
      // Write Query Parameters to Given lines
      if (parameterType == "QueryParams") {
        outputTests = outputTests.concat(gherkinTests.Given.QueryParamStart);         // Append the intro line for Query Parameters
        for (var queryParam in tests[test].Parameters.QueryParams) {
          outputTests = outputTests.concat(gherkinTests.Given.QueryParamUnit
            .replace(/<QUERY_KEY>/,queryParam)
            .replace(/<QUERY_VALUE>/,tests[test].Parameters.QueryParams[queryParam]));
        }
      }

      // Write Headers to Given lines
      else if (parameterType == "Headers") {
        outputTests = outputTests.concat(gherkinTests.Given.HeaderStart);         // Append the intro line for Headers
        for (var header in tests[test].Parameters.Headers) {
          outputTests = outputTests.concat(gherkinTests.Given.HeaderUnit
            .replace(/<HEADER_KEY>/,header)
            .replace(/<HEADER_VALUE>/,tests[test].Parameters.Headers[header]));
        }
      }

      // Write Form Parameters to Given lines
      else if (parameterType == "FormParams") {
        outputTests = outputTests.concat(gherkinTests.Given.FormParamStart);         // Append the intro line for Form Parameters
        for (var formParam in tests[test].Parameters.FormParams) {
          outputTests = outputTests.concat(gherkinTests.Given.FormParamUnit
            .replace(/<FORM_KEY>/,formParam)
            .replace(/<FORM_VALUE>/,tests[test].Parameters.FormParams[formParam]));
        }
      }

      // Write Basic Authentication to Given lines
      else if (parameterType == "BasicAuth") {
        outputTests = outputTests.concat(gherkinTests.Given.BasicAuth
          .replace(/<BASIC_USR>/,tests[test].Parameters.BasicAuth.username)
          .replace(/<BASIC_PSW>/,tests[test].Parameters.BasicAuth.password));
      }

      // Write the Payload to Given lines
      else if (parameterType == "Body") {
        outputTests = outputTests.concat(gherkinTests.Given.Body.
          replace(/<BODY>/,tests[test].Parameters.Body));
      }
    
      
      first = false;
    } // END GIVEN LINES -^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^
    

    // Begin WHEN lines -v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v
    outputTests = outputTests.concat("When ",gherkinTests.When.RequestEndpoint
      .replace(/<REQUEST_METHOD>/,tests[test].Method)
      .replace(/<REQUEST_URL>/,tests[test].Endpoint));
    // End WHEN lines -^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^-^


    // Begin THEN lines -v-v-v--v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v-v
    first = true;
    var expectedOutput = tests[test].ExpectedOutput
    for (var expectedResponseType in expectedOutput){
      if (first) outputTests = outputTests.concat("Then ");
      else outputTests = outputTests.concat("And ");

      if (expectedResponseType == "ResponseCode"){
        outputTests = outputTests.concat(gherkinTests.Then.ResponseCode
          .replace(/<RESPONSE_CODE>/,tests[test].ExpectedOutput.ResponseCode));
      }

      else if (expectedResponseType == "ResponseHeader"){

        for (var header in tests[test].ExpectedOutput.ResponseHeader){
          outputTests = outputTests.concat(gherkinTests.Then.ResponseHeader
            .replace(/<HEADER_KEY>/,header)
            .replace(/<HEADER_VALUE>/,tests[test].ExpectedOutput.ResponseHeader[header]));
        }
      }

      else if (expectedResponseType == "ResponseBody") {
        for (var body in tests[test].ExpectedOutput.ResponseBody){
          outputTests = outputTests.concat(gherkinTests.Then.ResponseBody
            .replace(/<BODY_PATH>/,body)
            .replace(/<BODY_VALUE>/,tests[test].ExpectedOutput.ResponseBody[body]));
      
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
       outputTests = outputTests.concat(err)
     }
  });


  // Change the placeholder variables in init.js with data from the request
  //
  console.log('Writing -->  URL, ClientID, ClientSecret @ ./features/support/init.js');
  fs.readFile('./default/default_init.js', 'utf8', function(err, file) {
    if (err) {
      console.log(err);
    };

    let inputData = file
      // .replace(/INPUT_URL/g,'\''+input.url+'\'')
      // .replace(/INPUT_CLIENTID/g,'\''+input.client.id+'\'')
      // .replace(/INPUT_CLIENTSECRET/g,'\''+input.client.secret+'\'');
    
    fs.writeFileSync('./features/support/init.js', inputData, function(err){
      if (err){
        outputTests = outputTests.concat(err);
      }
    });
  });

  res.send(input);
})

module.exports = router;
