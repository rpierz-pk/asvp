# API Security Validation Platform (ASVP)

## Goal
Automate the verification of security features implemented in Apigee proxies.

## Problem Statement
Currently, developers create Apigee Test Cases manually. Manual creation is especially predominant in the realm of security testing. However, by virtue of being created manually, these tests predetermine a multitude of problems. Some of these problems include the high probability of human error in the design and the possibility of accidental or malicious malfeasance.

## Overview
This document details how we can leverage Cucumber and Apickli to validate and verify the many different security implementations of Apigee. This document also covers how we use NodeJS to generate the many different tests

Apigee is a gateway focused on API Management. As such, it helps to manage and create APIs to interface with other developers and increase API engagement. Apigee speeds up development with its out-of-the-box policies that expedite the addition of security, traffic management, data conversions, and much more.

Cucumber is a Behavior-Driven Development (BDD) framework that helps to bridge the gap between customers and developers. BDD allows non-technical individuals to define business requirements in an easy-to-read documented format called Gherkin. Developers can use Gherkin documents to automate the generation of tests, allowing developers to spend more time iterating and improving the product

Apickli builds upon the JavaScript version of Cucumber (CucumberJS) to make API testing more accessible and less time-consuming. Apickli adds extra functionality to the baseline Cucumber framework by maintaining a list of pre-defined step definitions containing frequent API interactions. Some of these pre-defined step definitions include request information, response information, and direct HTTP verb calls.  Apickli allows you to call web services directly.

NodeJS allows for Javascript code to execute outside of the browser. NodeJS is easy to incorporate into the back end and allows for the smooth accomplishment of necessary tasks. NodeJS is crucial since Cucumber and Apickli build off of it to accomplish their tasks.

Jenkins
By utilizing Apickli to test our Apigee proxies in an automated fashion, we can begin to construct the API Security Validation Platform (ASVP).
 
## Unknown Tests
- VPN
- Virus Protection
- Compromised Users
- Compromised API Keys
- Confidential Data Screening
- PII Data screening
- Data Masking
- SSL Storage Encryption

## Prerequisite Inputs

For this framework to function correctly, it requires the following input from the user for each specific test. We will cover the tests in more detail further along in this document.
API Key Tests
API Key Validation	API Key Authorization	API Key Logging (For Validation checks)	API Key Logging (For Authorization Checks)
API Key	API Key	API Key	API Key
	API Secret		API Secret

SSL Authentication Tests
Inbound 1 Way SSL Authentication  	Outbound 1 Way SSL Authentication  	2 Way SSL Authentication
	SSL Certificate	SSL Certificate

OAuth Tests
OAuth Access Token Verification	OAuth Scopes Verification
OAuth Token	OAuth Token (With added Scopes)

IP Whitelisting / Blacklisting Tests	
IP Whitelisting / Blacklisting	
Whitelisted IP addresses or Blacklisted IP Addresses

SQL Injection Tests
SQL Injection
Injectable SQL Code 

Bot Protection Tests
Bot Protection
Rate Limit Set (Spike Arrest)
Spike Arrest Policy Set-Up (Distributed, Synchronous)


## Minimum and Recommended Program Dependencies
|					|Minimum Version	|Recommended Version|
|-------------------|-------------------|-------------------|
|Ram Memory			|1 GB				|-					|
|Node JS Version	|10					|12					|
|NPM Version		|6.7.0				|6.10.3				|
|Cucumber Version	|4.2.1				|4.2.1				|
|Apickli Version	|2.3.3				|2.3.3				|
|Jenkins Version	|2.190.1			|2.190.1			|

## High-Level ASVP Architecture Design
The ASVP framework is a tool that integrates Apigee proxies alongside Cucumber, Apickli, and NodeJS to validate Apigee proxies. The ASVP framework works with Apigee proxies to validate that they are set up and configured correctly. The ASVP framework workflow depends on the software design philosophy, and this flexibility is one of the many benefits provided by the ASVP framework. You can use the ASVP framework before, during, or after you have generated the Apigee proxy. The ASVP framework also integrates seamlessly into pre-built Jenkins pipelines and provides the user with all configuration files necessary to execute correctly. The ASVP framework takes in request with the required information from the user (Prerequisites)

First, the ASVP provides a user interface (UI) to the end-user. The UI provides different options to configure the generation of test cases. The UI also allows the user to import custom-built tests into the framework. Next, NodeJS creates the .feature file, supporting JavaScript init.js file, and Jenkins pipeline stage code. After this, the ASVP passes back all support files for Jenkins incorporation along with generated tests. The user then takes these files and import them into their Jenkins pipeline. By following the flow of logic, this allows them to generate the ASVP frameworks test once and run them repeatedly. 
Below is a diagram that illustrates two main steps in the overall flow amongst the components in the ASVP. After each diagram, there is a more in-depth explanation for each step marked in the flow diagram.

## Test Generation Stage
 <p align="center">
 <img src="https://github.com/rpierz-pk/asvp/blob/master/asvp-server/images/test-generation-stage-uml.png?raw=true">
 </p>
- Step 1:
The user enters in information into a provided UI. This narrows down the users choice to only necessary information.
- Step 2: 
	The UI makes a POST request containing the information provided by the user to the NodeJS server to be furthered processed.
- Step 3:
	The NodeJS server generates the init.js file based on information provided by the end users.
- Step 4:
	The NodeJS server parses the data contained in the request and collates the necessary lines of Gherkin text from a JSON file to create a feature file.
- Step 5:
	This step may not be implemented.


## Execution Stage
 <p align="center">
 <img src="https://github.com/rpierz-pk/asvp/blob/master/asvp-server/images/execution-stage-uml.png?raw=true">
 </p>
- Step 1
The user begins by interacting with the UI to select a suite of pre-built tests. They are required to enter general information about the proxy, such as the Proxy URL. These tests require the user to input specific data that is specific for each test about the proxy and the policy itself. (To find specific data go to prerequisite items section above)
- Step 2
The UI sends off this information to NodeJS to be processed.
- Step 3
NodeJS modifies existing pre-built files to generate the Jenkins Test Section, Apickli configuration files, and Feature file, which contains the test.
- Step 4
The UI returns the Jenkin section for Jenkins Integration, the Apickli configuration file for Apickli Set up, and finally, the Generated Feature File that has the Apickli/Cucumber test to run.
- Step 5
The user imports the file and configures the Jenkins Pipeline to run the generated tests. The user needs to make sure to configure their Pipeline correctly by placing the stage provided by the ASVP Framework after the proxy deployment stage. Once the user imports the test, they can generate the testing file structure by running the Pipeline once. The Pipeline then grabs the file location, which is imported by the UI, from the configuration file.
- Step 6
The tests run via automation in the Jenkins pipeline and return the results to the end-user. This step can be re-run repeatedly 


## Use Cases
Testing and Verification is a crucial step in any software’s lifecycle. With Security, this is no less true as misconfigured security can lead to data breaches. While Apigee expedites the security process, it cannot fully configure proper security by itself, so this is in the hands of the developer. Developers can make mistakes or be malicious actors themselves. Preventing both cases from causing security breaches is extremely important.

Testing is repeatable and reusable, so forcing the developer to rewrite similar tests repeatedly is wasting development time. That is why creating a testing framework covering all the most commonly occurring use cases is essential. Our framework allows the user to test for these most common security tests that an Apigee proxy will most likely implement. Down below, you can see the list of the most common security features apart of Apigee that need testing.

<p align="center">
<img src="https://github.com/rpierz-pk/asvp/blob/master/asvp-server/images/use-cases.png?raw=true">
</p>

Each one of these requires a different strategy and generated test. These tests are mostly static, meaning they do not change. There are small parts of the test that can change from API call to API call. The ASVP framework extracts these changes out and provides an easy way to configure them in the UI. This document now describes and discusses the importance of each use case alongside their security concerns and how the ASVP framework addresses them. 

### Mutual Authentication (SSL/TLS)
Network attacks are one of the most significant attack vectors when dealing with security. One of the most common network attacks is man in the middle (MITM) attack. A MITM attack is where a bad actor comprises a web service and gathers network traffic data. This data can include sensitive data such as a user’s login credentials, personal information, or financial information.  One way to resolve MITM attacks is by using SSL/TLS, which not only encrypts the package content but also verifies whom you are transmitting to. Testing that your SSL/TLS configuration is correct is critical. The ASVP framework accomplishes this by verifying invalid certifications are not allowed to communicate with the server, and that valid credentials are allowed to set up secure communication with the user's Apigee proxy.

### API Key Validation and Authorization
API Keys provide the ability to check and gather information about developer applications and are a measure of authorization of external applications. API secrets add in a layer of API security that, alongside an API Key, helps to verify and validate the requesting party. You need to ensure outside developers, trying to interface with your app, face no issues when incorporating your API into their products. The ASVP framework accomplishes this by validating that valid API key-secret pairs get back valid responses, and invalid API key-secret pairs get denied access.

### OAuth (Scopes and Grant Types)
OAuth is a security framework that provides the developer with the tools to share protected resources and information with untrusted parties. OAuth can provide this functionality by utilizing several different technological techniques. Some of these techniques include scopes, grant types, and several forms of tokens. Grant Types in OAuth provides the security details about how users, third-party applications, authorization servers, and resource servers all can and should interact with one another. 

OAuth utilizes access tokens that help applications make verified API calls instead of users. These access tokens have expiration time and represent the authorization of a specific application to access specific parts of user’s data. In this use case access token validation is to ensure user is authenticated to access information and to establish scope of the user. 

### SQL Injection
A SQL injection is a computer attack where malicious code is embedded into a poorly built application. The malicious code then interacts with database and performs data manipulation. 

### Data masking/ confidential data screening
Data masking is basically creating a similar data structure as organization’s data in order to use it for testing and performance purposes. The major reason for implementing this method is to protect the original data from attacks and use it only when absolutely necessary. It also helps to protect sensitive data from being exposed to other systems all the time. 

### Data encryption 
Data encryption translates data into another form, or code, to prevent it from being accessed by any user. Only people with access to a secret key or password will be the ones able to access the data. Once the data is encrypted into a code, a valid user with decryption key will be able decode and modify or read particular data. Once user modifies any information, the data is encrypted before sending it to database, in this way no malicious attackers will be able to get access to the information during data transmission. 

## Jenkins CICD Integration
CICD solutions are essential in today's modern, rapidly changing software solutions. They allow the developers to quickly find and fix bugs that occur during the design and implementation of said software solutions. As such, we have designed the ASVP framework with the ability to integrate seamlessly into the sleek modern CICD  tool known as Jenkins.
We now are going to approach the overview of the ASVP framework. The ASVP framework generates the crucial pipeline step definition for the ASVP framework to function correctly. We do this with input from the user and the UI, which makes it easy on the user and for the ASVP framework to handle. Because the framework generates the necessary files for the user, the user can integrate with pre-existing tools, frameworks, or pipelines.
<p align="center">
<img src="https://raw.githubusercontent.com/rpierz-pk/asvp/master/asvp-server/images/apigee_pipeline.png">
</p>

## Setup
Here are the different setups that we used to verify the framework.

|					|Think Pad		|Raspberry Pi 3 B+						|
|-------------------|---------------|---------------------------------------|
|Operating Systems	|Windows 10 Pro	|Raspbian (Linux) September 2019 Version|
|ISA				|X86 64 Bit		|ARM V8 64 Bit							|
|Kernel Version		|N.A			|4.19									|
|Ram Memory			|16 GB			|1 GB									|
|Node JS Version	|11.15			|10.15									|
|NPM Version		|6.7.0			|6.10.3									|
|Cucumber Version	|4.2.1			|4.2.1									|
|Apickli Version	|2.3.3			|2.3.3									|
|Jenkins Version	|				|										|

## Installation
#### Dependencies
To run the ASVP framework on a local machine, you must have the following programs installed and properly configured.

##### NodeJS
You can use any modern version of Node JS from version x.x.x and onward 


## Expected Output
Here is an example of what the output from our framework looks like. Running the demo test should give matching information if it does not something is misconfigured.

Apickli provides us with test results and errors in a JSON based response. Cucumber reports allow us to return the results in a more beautiful format, as can be seen in the picture. The JSON object is passed back for easier integration.

<p align="center">
<img src="https://github.com/rpierz-pk/asvp/blob/master/asvp-server/images/cucumber-report-html.png?raw=true">
</p>

## Understanding Test Output
Example: API Key Validation 
For a simple test such as Verify API Key, when there is a response code of 200 received from the Expected Success test, and the expected failure test returns a response code of 401, then the two pieces of data can, by combination, be used to declare that the security implementation itself is appropriately configured and applied. 

However, when a test provides an error (whether desired or not), it can be challenging to ascertain the source of error generation. For example, if the proxy we test for “Verify API Key” responds with an error of 400 for both the “Expected Success” and the “Expected Failure” tests, then the problem lies not with the security implementation but with the request sent to the proxy. The user is urged to explore the required parameters for the request and also make sure to include the required parameters or payload in the UI for proper request creation.

If the outcome of an Expected Success is a 401 and the outcome of the Expected Failure is a 401 as well, with the Reason-Phrase of “Invalid API Key,” then we can definitively state that there is an error in the configuration of the VerifyAPIKey policy in the proxy.

This logic may apply to the outcome of all tests. The tests are not able to account for the configuration of all proxies. Therefore, duty falls upon the developer to correctly interpret the results of the tests to identify whether the error lies in the request being made or the implementation of the security policy.

To clarify: the developer should look at the cross-section of test results to determine whether the security policy is correctly implemented. Below




||Valid API Key||
||200 (valid key)	|Validate API Key Policy Error (valid key)	|Other Policy Error (valid key)|
|-|-|-|-|
|200 (invalid key)	|Validate API Policy Error: Validates Invalid API Key|	Validate API Policy Error: Invalidates Proper API Key, Validates Invalid API Key	|Validate API Policy Error: Validates Invalid API Key|
|Validate API Key Policy Error	(invalid key)|SUCCESS	|Validate API Policy Error: Invalidates Everything	|Inconclusive: Interference by another policy|
|Other Policy Error (invalid key)	|Inconclusive: Interference by another policy	|Validate API Policy Error: Invalidates Proper API Key	|Inconclusive: Interference by another policy|

## Apigee Proxy Generation
An essential aspect that our framework builds around is Apigee. Apigee allows developers to expedite proxy creation process. Proxies allow developers to create a well-formed experience for outside developers and helps with the growth of APIs. With this in mind this document is going into a deeper dive into what exactly all this means. Please note that there is extensive documentation online if you have any specific questions about proxies we recommended that you look up In their documentation.
Proxies cover two main topics flows and policies, basically flows are composed of multiple policies. The flow contains the state of execution for a specifc request and will map out what happens to the incoming information. Now to get into policies they are pre-built code that help expidite the proxy creation process. Apigee provides the developer with these policies and then they on require the programmer to input miniumal information about the configuration. 
We will now show some general information on creting and configuring a policy when it comes to Apigee. 


  

## Example Walk Through
This section walks through a generated Apigee proxy and how we use the ASVP framework to verify that it is working correctly. You can use the demo proxy provide for testing the ASVP framework. 


## Cucumber Test Generation
### UI 
The User Interface presents the user with a centralized environment in which to identify the tests that they wish to use on their proxy as well as define the parameters which are required to make a successful request to that proxy. Each Cucumber test is meant to verify the efficacy of security implementations inside the Apigee proxies. Therefore, the user is required to identify the necessary elements (outside of security features) which are required for their requests to succeed. The user is additionally required to know what the expected output of the test should be. For example, when developing a test for a proxy which takes a POST request, it is important to know whether a successful response code is 200 or 201. 

If all proxies utilize one or more identical parameters (query parameters, headers, etc), then they can be applied as global configuration. Each parameter that is included in global configuration is applied to every test environment. While parameters which are not utilized by a proxy should not cause errors, the user is advised to be wary of including any global configuration which will produce adverse responses from tests for which those parameters do not apply. Any global parameter that is later re-specified in a test will be overwritten.
The parameters and configuration that can be added globally and test-specifically using the UI include:

- Metadata
	- Proxy URL and Base Path (global only)
	- Proxy Endpoint
	- Request Verb
- Parameters
	- Query Parameters
	- Headers
	- Form Parameters
	- Basic Authentication
	- Payload
- Expected Response
	- Status Code
	- Header
	- Payload

## In-Depth Security Validation
Now that we have looked at the use cases, we are now going to look at how we built and tested test cases for each use case. Before we dive into each test case, this part of the document examines some critical information needed to understand the need for different tests.
Our framework works around the fact that you are testing a single URL. With this in mind, we can ask for this information upfront rather than for each test the user wants to run. We also require the user to tell us about any traffic mediation that they have set up to prevent traffic mediation from giving us a bad result. There is no other shared information that we can only ask for once. This knowledge means that each test requires input from the user.

### API Key Validation
 	Inputs
	- Endpoint
	- Valid API Key(s)
	- Invalid API Key(s)
	- Generate Invalid API Key(s) Option
	- Number of Invalid API Key(s) Option

This test verifies that the API Key check is correctly formed and does not allow the wrong keys to send requests to the proxy. The input for this test includes the endpoints to call, all the valid API Keys alongside if the user wants to test them, Invalid API Keys, the choice for autogenerated Invalid API Keys, and the number of autogenerated Invalid API Keys they want. We are now going to go into detail behind what each of the input data provides.

Endpoint gives us the exact Endpoints to test when verifying that the API Validation is working correctly. If there are multiple endpoints to verify, they can add a list of endpoints to check. If all endpoints have the check API key, then the user should have the policy only applied to the base endpoint.

Valid API Key(s) tells the framework which API we should use to test for valid uses, but also tells the framework to make sure not to use the Valid API Keys when randomly generating invalid API Keys. When inputting valid keys, there is an option to select specific keys to test with when adding them into the framework. The Selected API Keys are validated to run and return the accepted response.

Invalid API Key(s) tells the framework a set of specific API Key(s) to test against and makes sure that they return the failure status. There are also two sub-choices. One choice is on whether or not to generate invalid API key(s), and the second choice is on the number to generate. These together make the number of random invalid API Keys to run against the proxy.

Now to go into more detail behind the security validation checking API Keys involves doing the following. First, we set the expected outcome of the test. During the first step, the framework changes the feature file with JavaScript to reflect the response checked to verify.  Next, we then set
 
## Concept of Feature File and Init File:

The initialization file (init.js) contains the information that is required for Apickli to create a request object and assign it to a target URL. When each Cucumber test runs, the init.js file declares the URL that all requests get sent to. 

Cucumber .feature files are files that contain "features" which represent the desired functionality that a developer wishes to test. With ASVP, the feature that is being tested is Security implementations. Features are composed of scenarios. Scenarios are individual tests that have static inputs with an expected, idempotent outcome. Each scenario is a unique grouping of Given-When-Then statements. An example would be 

	Scenario: Allow requests from Apickli
	Given I set User-Agent header to Apickli
	When I GET /apickli
	Then response code should be 200


The Given statement describes the situation before the test. For Apickli, the Given statements refer to the inclusion of parameters such as Query Parameters, Headers, Basic Authentication credentials, and Payloads. 

The When statement refers to the event that is executed. This event is what the user wishes to test. For Apickli, the event defines the HTTP method as well as the endpoint that Apickli will send the request to. In the example test above, the When statement identifies that the “event” is a GET request being sent to the /apickli endpoint

Finally, the Then statement refers to the outcome of the test. Verifying that the outcome of the test event is correct ensures that the event causes the desired change/output when it occurs. For Apickli, the outcome of the requests is the HTTP response. The server will respond with a status code and could also include headers or a payload. Apickli verifies that the metadata or content of the HTTP response (i.e. status codes, headers, or payload) match the asserted values included in the test

At least one Given and Then statement must be included in the scenario, but more may be included. Only one When statement is permitted in the scope of each test. By verifying that (e.g.) the status code is what the user expects from the proxy when including the appropriate parameters and sending the request to the included endpoint, then the test will verify that the proxy is functioning as intended.






## File Creation
When the server receives a request, the server parses out the various configuration data that is present in the request body and generates both an initialization file (init.js) as well as a feature file (test.feature). Both of these files are required for Cucumber tests to run.
The backend Javascript server takes in a request object with a precisely structured payload. The payload must have the following structure, but not all elements are required. The elements in braces in all caps (e.g. {GLOBALQUERYKEY} ) are variable data that need replacing when sending the request to the server. All other values, if included, must be written as shown. 

The required elements are the following: 
- global.ProxyURL
- tests.{TESTNAME}.Endpoint
- tests.{TESTNAME}.Method
- (at least one element under) tests.{TESTNAME}.Parameters
- (at least one element under) tests.{TESTNAME}.ExpectedOutput

Full Request Object:

    "global": {
        "ProxyURL":"{ORG}-{ENV}.apigee.net",
        "Parameters": {
            "QueryParams": {
                "{GLOBALQUERYKEY}":"{GLOBALQUERYVALUE}"
            },
            "Headers": {
                "{GLOBALHEADERKEY}":"{GLOBALHEADERVALUE}"
            },
            "FormParams": {
                "{GLOBALFORMKEY}":"{GLOBALFORMVALUE}"
            },
            "BasicAuth": {
                "username":"{GLOBALUSERNAME}",
                "password":"{GLOBALPASSWORD}"
            },
            "Body": "{GLOBALBODYVALUE}" 
        }
    },
    "tests": {
        "{TESTNAME}": {
            "Endpoint":"/{PROXYENDPOINT}",
            "Method":"{HTTPVERB}",
            "Parameters": {
                "QueryParams": {
                    "{TESTQUERYKEY}":"{TESTQUERYVALUE}",
                },
                "Headers": {
                    "{TESTQUERYKEY}":"{TESTQUERYVALUE}",
                },
                "FormParams": {
                    "{TESTFORMKEY}":"{TESTFORMVALUE}",
                },
                "BasicAuth": {
                    "username":"{TESTUSERNAMEVALUE}",
                    "password":"{TESTPASSWORDVALUE}"
                },
                "Body": "{TESTBODYVALUE}"
            },
            "ExpectedOutput": {
                "ResponseCode":"{TESTRESPONSECODE}",
                "ResponseHeader": {
                    "{TESTRESPONSEHEADERKEY}":"{TESTRESPONSEHEADERVALUE}"
                },
                "ResponseBody": {
                    "{TESTRESPONSEBODYPATH":"{TESTRESPONSEBODYVALUE}"
                }
            }
        }
    }


However, a request could be as simple as the following:


    "global":{
        "ProxyURL":"org-env.apigee.net/basepath"
    },
    "tests":{
        "VerifyAPIKey":{
            "Endpoint":"/verifyapikey",
            "Method":"GET",
            "Parameters":{
                "QueryParams":{
                    "apikey":"{CLIENT_ID}"
                }
            },
            "ExpectedOutput":{
                "ResponseCode":"200"
            }
        }
    }



The payload of the AVSP request parses into Test objects. First, if present, the global elements are established as configuration for all Test objects. The global configuration allows the user to set elements that Apickli applies to every test in the feature file. Next, the parameters, method, endpoint, and expected output of each individual test are appended to the test object. The server then writes the Test objects to a feature file by replacing the placeholder values in pre-written Apickli text, such as "I have basic authentication credentials <BASIC_AUTH_USR> and <BASIC_AUTH_PSW>," with the values inside the Test object.

## Running the Tests
The server creates the initialization file (init.js) and is run prior to each test. The file is configured based upon user input with the Proxy URL that all the Apickli test requests will be sent to. A request that is sent by the UI to the backend configures the Proxy URL element. When the Cucumber tests run, Apickli runs the init.js file to create a request object and assign that request object a Proxy URL location to send the request to.

Next, Cucumber runs the test found in the test.feature file. These tests are sorted into Scenarios. Each scenario represents one test unit that contains its own endpoint, HTTP method, as well as custom parameters that are included by the end-user. Additionally, global configurations may be added to the tests. When global configuration is established, the parameters that are included therin will be included on all subsequent tests that the user creates. Each scenario unit is run, causing Cucumber to send the configured request to the desired proxy endpoint. Once the response from the proxy is received, Cucumber evaluates the HTTP response and compares it to the expected output that the user included. For example, if the expected output was a Status Code of 200, but the response from the proxy was 401, then the test is considered a failure. 

NOTE: It is entirely likely (and probable) to include tests where the expected output is, for example, a 403 Status Code. We urge users to include tests with expected error responses to ensure that their proxies' security implementations are correctly prohibiting access for invalid requests.
