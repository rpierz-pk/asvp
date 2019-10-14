const express = require('express');
const router = express.Router();
const fs = require('fs');


router.post('/generate', (req, res) =>{
  //Open premade test features
  let premadeTests = JSON.parse(fs.readFileSync('./premade-features.json'));
  let outputTests = "";
  
  console.log('Generating Feature File');
  let input =  req.body;
  console.log(input.tests.AuthenticateAPIKey);
  if (input.tests.AuthenticateAPIKey){
    console.log('Saving Verify API Key Tests');
    outputTests = outputTests.concat(premadeTests.VerifyAPIKey,'\n',premadeTests.VerifyInvalidAPIKey);
  }

  fs.writeFileSync('test.feature', JSON.stringify(outputTests), function(err, file) {
     
  });
  res.send(input);
})


module.exports = router;
