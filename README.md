# API Security Validation Platform (ASVP)

## Goal:
Automate the verification of security features implemented in Apigee proxies.
Problem Statement:
Currently, developers create Apigee Test Cases manually. Manual creation is especially predominant in the realm of security testing. However, by virtue of being created manually, these tests predetermine a multitude of problems. Some of these problems include the high probability of human error in the design and the possibility of accidental or malicious malfeasance.

### Overview
This document details how we can leverage Cucumber and Apickli to validate and verify the many different security implementations of Apigee.

Apigee is a gateway focused on API Management. As such, it helps to manage and create APIs to interface with other developers and increase API engagement. Apigee speeds up development with its out-of-the-box policies that expedite the addition of security, traffic management, data conversions, and much more.

Cucumber is a Behavior-Driven Development (BDD) framework that helps to bridge the gap between customers and developers. BDD allows non-technical individuals to define business requirements in an easy-to-read documented format called Gherkin. Developers can use Gherkin documents to automate the generation of tests, allowing developers to spend more time iterating and improving the product

Apickli builds upon the JavaScript version of Cucumber (CucumberJS) to make API testing more accessible and less time-consuming. Apickli adds extra functionality to the baseline Cucumber framework by maintaining a list of pre-defined step definitions containing frequent API interactions. Apickli also allows you to call web services directly. With only the baseline Cucumber you can not do calls to web services.
By utilizing Apickli to test our Apigee proxies in an automated fashion, we can begin to construct the API Security Validation Platform.
 
## Prerequisite Items
For this framework to function properly, it requires the following input from the user for each specific test.
API Key Validation	API Key Authorization	API Key Logging (For Validation checks)	API Key Logging (For Authorization Checks)	Inbound 1 Way SSL Authentication  	Outbound 1 Way SSL Authentication  				
API Key	API Key	API Key	API Key		Certificate				
	API Secret		API Secret						

		1 Way SSL Authentication
			Keystore (for inbound SSL)
			Truststore(for outbound SSL)
		2 Way SSL Authentication
			KeyStore
			Truststore
		VPN
		IP Whitelisting
		List of Ips whitelisted or blacklisted
		OAuth Access Token Verification
			Valid OAuth Token or a Valid Generate Endpoint
		OAuth Scopes Check
			Valid OAuth Token with a valid scope
		User Logging
			Logging Service Set Up
		Protection Against Bots
		SQL Injection Protection
			Regular Expression Threat Protection policy set up
		Virus Protection
		Compromised Users
		Compromised API Keys
		Confidential Data Screening
		PII Data screening
		Data Masking
SSL Storage Encryption

		

 

## Architecture
First, the ASVP provides a user interface (UI) to the end-user. The UI provides different options and configurations for the generation of tests. The UI also allows the user to import custom tests. Next, NodeJS creates a .feature file based on selection information and any imported tests from the UI. NodeJS also configures the supporting JavaScript. Finally, NodeJS executes Apickli, which runs the tests and reports the success and failure rates of each step. Apickli then sends the results to Cucumber Reports and also the raw results in JSON format back to the user.
Below is a diagram that illustrates the overall flow amongst the components in the ASVP. 
                   
We are exploring these steps in more detail below.

- Step 1
The user interacts with the UI to select from the pre-built tests or import custom-made Cucumber tests.
- Step 2
The user interface sends configuration information and custom tests to Apickli.                       
- Step 3
The backend generates Cucumber tests based on input configuration and user-imported custom tests.
- Step 4
Apickli executes the Cucumber tests, which call the Apigee proxy.
- Step 5
Apigee returns the response information, such as status code and response message.
- Step 6
Cucumber gathers the results and assigns a Pass or Fail state. Apickli then generates a JSON report based on the Cucumber results.
- Step 7
Return the results in an easy-to-read format with the results of the tests.

As can be seen, by the flow diagram, this program expedites the test creation process by narrowing down to the necessary information required for the cucumber tests.
 
## Setup
Here are the different setups that we used to verify the framework.
|	|Think Pad	|Raspberry Pi 3 B+|
|-------|---------------|-----------------|
|Operating Systems	|Windows 10 Pro	|Raspbian (Linux) September 2019 Version|
|ISA	X86 64 Bit	|ARM V8 64 Bit|
|Kernel Version	N.A	|4.19|
|Ram Memory	16 GB	|1 GB|
|Node JS Version	|11.15	|10.15|
|NPM Version	6.7.0	|6.10.3|
|Cucumber Version	|6.0.2	6.0.2|
|Apickli Version	|2.3.3	|2.3.3|

## Installation
	Dependencies
To run the ASVP framework on a local machine, you must have the following programs installed and properly configured.
		NodeJS
			You can use any modern version of Node JS
	Prerequisite Items
You have to generate certain items for each use case. Here are some of the prerequisite items to make sure you have.
		- API Key Validation
			- API Key
		- API Key Authorization
			- API Key
			- API Secret
		- API Key logging
			- API Key
			- API Secret
			- Logging Services Set Up
		- 1 Way SSL Authentication
			- Keystore (for inbound SSL)
			- Truststore(for outbound SSL)
		- 2 Way SSL Authentication
			- KeyStore
			- Truststore
		- VPN
		- IP Whitelisting
		- List of Ips whitelisted or blacklisted
		- OAuth Access Token Verification
			- Valid OAuth Token or a Valid Generate Endpoint
		- OAuth Scopes Check
			- Valid OAuth Token with a valid scope
		- User Logging
			- Logging Service Set Up
		- Protection Against Bots
		- SQL Injection Protection
			- Regular Expression Threat Protection policy set up
		- Virus Protection
		- Compromised Users
		 -Compromised API Keys
		- Confidential Data Screening
		- PII Data screening
		- Data Masking
		- SSL Storage Encryption

		

## Expected Output
Here is an example of what the output from our framework looks like. Running the demo test should give matching information if it does not something is misconfigured.

Apickli provides us with test results and errors in a JSON based response. Cucumber reports allow us to return the results in a more beautiful format, as can be seen in the picture. The JSON object is passed back for easier integration.
 
## Uses Cases
Testing and Verification is a crucial step in any software’s lifecycle. With Security, this is no less true as misconfigured security can lead to data breaches. While Apigee expedites the security process, it cannot fully configure proper security by itself, so this is in the hands of the developer. Developers can make mistakes or be malicious actors themselves. Preventing both cases from causing security breaches is extremely important.

Testing is repeatable and reusable, so forcing the developer to rewrite similar tests repeatedly is wasting development time. That is why creating a testing framework covering all the most commonly occurring use cases is essential. Our framework allows the user to test for these most common security tests that an Apigee proxy will most likely implement. Down below, you can see the list of the most common security features apart of Apigee that need testing.

 

Each one of these requires a different strategy, and therefore each one requires a different test to be generated. These tests are mostly static, meaning the test is not going to change. There are small parts of the test that change from API to API. We can extract these specific parts out and allow the developer to configure these parts. While they do have to configure our framework, they do not have to regenerate test cases for the above use cases. We now are going to describe and discuss the importance of the different tests.


## API Key & Secret

API Keys provide the ability to check and gather information about developer applications and are a measure of authorization of external applications. API secrets add in a layer of security that, alongside an API Key, helps to verify and validate the requesting party. To ensure outside developers, trying to interface with your app, face no issues when incorporating your API into their products, you need to verify the API Key generation and verification.

Verifying the API Key alongside the API Secret tests that the security functionality is appropriately functioning and configured.
It also protects your Proxy from unauthorized use by verifying API Keys alongside their linked secret, to make sure that applications have an API Keys to access the proxy. 

Our security framework verifies that API Key and Secrets generate and verify with your Apigee proxy accurately.

## OAuth (Scopes and Grant Types)

OAuth is a security framework that provides the developer the tools to share protected resources and information with untrusted parties. OAuth can provide this functionality by utilizing several different technological techniques. Some of these techniques include scopes, grant types, and several different forms of tokens. 

OAuth utilizes access tokens that help applications make verified API calls instead of users. These access tokens have expiration time and represent the authorization of a specific application to access specific parts of user’s data. In this use case access token validation is to ensure user is authenticated to access information and to establish scope of the user. 

### SQL Injection
A SQL injection is a computer attack where a malicious code is embedded into a poorly built application. The malicious code then interacts with database and performs data manipulation.


### Data masking/ confidential data screening
Data masking is basically creating a similar data structure as organization’s data in order to use it for testing and performance purposes. The major reason for implementing this method is to protect the original data from attacks and use it only when absolutely necessary. It also helps to protect sensitive data from being exposed to other systems all the time. 

### Data encryption 
Data encryption translates data into another form, or code, to prevent it from being accessed by any user. Only people with access to a secret key or password will be the ones able to access the data. Once the data is encrypted into a code, a valid user with decryption key will be able decode and modify or read particular data. Once user modifies any information, the data is encrypted before sending it to database, in this way no malicious attackers will be able to get access to the information during data transmission. 
 
## In-Depth Security Validation
Now that we have looked at the use cases, we are now going to look at how we built and tested test cases for each use case. Before we dive into each test case, this part of the document examines some critical information needed to understand the need for different tests.

Our framework works around the fact that you are testing a single URL. With this in mind, we can ask for this information upfront rather than for each test the user wants to run. We also require the user to tell us about any traffic mediation that they have set up to prevent traffic mediation from giving us a bad result. There is no other shared information that we can only ask for once. This knowledge means that each test requires input from the user. Now to jump into the different input required of the user and what happens with said information.

### API Key Validation
This test verifies that the API Key check is correctly formed and does not allow the wrong keys to send requests to the proxy. The input for this test includes the endpoints to call, all the valid API Keys alongside if the user wants to test them, Invalid API Keys, the choice for autogenerated Invalid API Keys, and the number of autogenerated Invalid API Keys they want. We are now going to go into detail behind what each of the input data provides.
Endpoint(s) gives us the exact Endpoints to test when verifying that the API Validation is working correctly. If there are multiple endpoints to verify, they can add a list of endpoints to check. If all endpoints have the check API key, then the user should have the policy only applied to the base endpoint.
Valid API Key(s) tells the framework which API we should use to test for valid uses, but also tells the framework to make sure not to use the Valid API Keys when randomly generating invalid API Keys. When inputting valid keys, there is an option to select specific keys to test with when adding them into the framework. The Selected API Keys are validated to run and return the accepted response.
Invalid API Key(s) tells the framework a set of specific API Key(s) to test against and makes sure that they return the failure status. There are also two sub-choices. One choice is on whether or not to generate invalid API key(s), and the second choice is on the number to generate. These together make the number of random invalid API Keys to run against the proxy.
Now to go into more detail behind the security validation checking API Keys involves doing the following. First, we set the expected outcome of the test. During the first step the framework changes the feature file with JavaScript to reflect the response checked for to verify.  Next, we then set 


## Requirements for Proxy Creation
We are exploring the proxy  
                    

## Pipeline CICD Integration
Modern enterprise coding solutions require CICD integration. As such, we have built our framework with
 this in mind. For this project, we have built a Jenkins pipeline to automate testing and delivery for changes to our framework. This integration allows us to add to and modify existing tests




 
## Cucumber Test Generation
### UI 
When the user is at the User Interface, they are presented with the option to add various parameters to the request that will be made to their proxy/proxies. These parameters include global parameters such as:
- URL
- ID
- Client Secret
As well as test-specific information such as:
- Proxy Endpoint
- Query Parameters
- Headers
- Payload

Additionally, the user is presented with a list of tests to include in their testing suite. The user should select all security tests for which they expect to provide implementations. By marking the test as included, the test will be added to the automatically-generated .feature file. 

### File Creation
#### Initialization File Generation
The global parameters are sent to the Javascript-based server where the URL, Client ID, and Client Secret are injected into Apickli’s initialization file. The initialization file, which modifies a @Before step for the Cucumber tests, will run prior to each test to create a new HTTP request object with a target URL. 
Additionally, the Javascript-based server will take the configuration that is input by the user and inject the data into the initialization file in the form of variables. These variables are referenced in the individual tests to provide the appropriate information in order to make the request succeed. By providing all the correct information, the developer will be able to identify whether the security implementation is working as expected.
#### Feature File Generation
When the user marks a test as included in the UI and initiates the test generation, the Javascript server will build the desired .feature file. The premade tests are stored in a JSON file with the GIVEN-WHEN-THEN syntax that is expected with Cucumber tests. Below is an example of a very simple test against a proxy with the specific (only) requirement of an API Key passed as a query parameter.
 
 
VerifyAPIKey:
Scenario: Verify API Key
Given I set query parameters to
    |  parameter 	  |    value    |
    |      apikey    	  | `clientId` |
When I GET /verifyapikey
Then response code should be 200


A test is created for each security implementation that the user wishes to test. Additionally, we provide “Expected Failure” tests for some tests which will test the proxy with invalid data. For example: testing with an Invalid API Key will provide a static API Key value to the test with the expectation that the test will fail






## Test Output
For a simple test such as Verify API Key, when a response code of 200 is received from the Expected Success test and a response code of 401 is received from the Expected Failure test, then the two pieces of data can, by combination, be used to declare that the security implementation itself is properly configured and applied. 

However, when a test provides an error (whether desired or not), it can be difficult to ascertain the source of error generation. For example, if a proxy is tested for “Verify API Key” but the proxy responds with an error of 400 for both the “Expected Success” and the “Expected Failure” tests, then the problem lies not with the security implementation but with the request that was made to the proxy. The developer is urged to explore the required parameters for the request and to include the required parameters or payload in the UI for proper request creation.

If the outcome of an Expected Success is a 401 and the outcome of the Expected Failure is a 401 as well, with the Reason Phrase of “Invalid API Key” then we can definitively state that there is an error in the configuration of the VerifyAPIKey policy in the proxy. 
The preceding logic may be applied to the outcome of all tests. The tests are not able to account for the configuration of all proxies. Therefore, duty falls upon the developer to correctly interpret the results of the tests in order to identify whether the error lies in the request being made or the implementation of the security policy.
 
To clarify: the developer should look at the cross-section of test results in order to determine whether the security policy is correctly implemented. Below
	|	||||Valid API Key|
	|--|--|--|--|--|
|	|	|200	|Invalid API Key Error	|Other Error|
|Invalid API Key	|200	|Policy not correctly configured	|Fatal Error	|Policy not correctly configured|
|	|Invalid API Key Error	|Success	|API Key is not correct	|Possibly working, interference by other policy|
|	|Other Error	|Possibly working, interference by other Policy 	|Policy not correctly configured	|Error lies in other policy|

