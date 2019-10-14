const express = require('express');
const router = express.Router();
const fs = require('fs');


router.post('/generate', (req, res) =>{
  //Open premade test features
  let premadeTests = JSON.parse(fs.readFileSync('./premade-features.json'));
  let outputTests = "Feature: Test Apigee Proxy for security implementations\n";
  
  let input =  req.body;
  
  //Append all tests that are requested from the premade JSON file
  if (input.tests.AuthenticateAPIKey){
    console.log('WRITING --> Verify API Key Tests');
    outputTests = outputTests.concat(premadeTests.VerifyAPIKey,'\n',premadeTests.VerifyInvalidAPIKey,'\n');
  };
  if (input.tests.AuthorizeAPIKey){
    console.log('WRITING --> Authorize API Key Tests');
    outputTests = outputTests.concat(premadeTests.AuthorizeAPIKey,'\n',premadeTests.AuthorizeInvalidAPIKey,'\n');
  };
  if (input.tests.VerifyAccessToken){
    console.log('WRITING --> Verify Access Token Tests');
    outputTests = outputTests.concat(premadeTests.VerifyAccessToken,'\n', premadeTests.VerifyInvalidAccessToken,'\n');
  };
  if (input.tests.VerifyOAuthScope){
    console.log('WRITING --> Verify OAuthScope Tests');
    outputTests = outputTests.concat(premadeTests.VerifyOAuthScope,'\n', premadeTests.VerifyInvalidOAuthScope,'\n');
  };
  if (input.tests.VerifySQLProtection){
    console.log('WRITING --> Verify SQL Protection Tests');
    outputTests = outputTests.concat(premadeTests.VerifySQLProtection,'\n');
  };
  if (input.tests.VerifyAPIKeyLogging){
    console.log('WRITING --> Verify API Key Logging Tests');
    outputTests = outputTests.concat(premadeTests.VerifyAPIKeyLogging,'\n');
  };
  

  outputString = JSON.stringify(outputTests);

  console.log('Generating feature file at ./features/test.feature');     
  fs.writeFileSync('./features/test.feature', (outputTests), function(err, file) {
     if (err){
       console.log(err)
     }
  });
  res.send(input);
})


module.exports = router;
