import React, { Component } from "react";
import Test from "./test";
import AddElementButton from "./addElementButton";
import InputText from "./inputText";
import axios from "axios";
import GlobalTest from "./globalTest";
import Sidebar from "./sidebar";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Tests extends Component {
  url = "http://localhost:8000";

  state = {
    httpStatus: {
      error: false,
      code: "",
      message: "Server Response"
    },
    UserID: "",
    ProxyURL: "(org)-(env).apigee.net/(basepath)",
    tests: [
      {
        id: 0,
        metadata: {
          name: "Global",
          endpoint: "",
          method: ""
        },
        parameters: [],
        outputs: []
      },
      {
        id: 1,
        metadata: {
          name: "New Test",
          endpoint: "",
          method: ""
        },
        parameters: [
          {
            id: 1,
            type: "Query",
            key: "key",
            value: "value"
          }
        ],
        outputs: [
          {
            id: 1,
            type: "Status Code",
            key: "Status Code",
            value: "200"
          }
        ]
      }
    ]
  };

  getMaxId = function(array) {
    let max = 0;
    for (var element in array) {
      if (array[element].id > max) max = array[element].id;
    }
    return max;
  };

  handleAddTest = () => {
    const { tests } = this.state;

    const newTest = {
      id: this.getMaxId(tests) + 1,
      metadata: {
        name: "New Test",
        endpoint: "",
        method: ""
      },
      parameters: [
        {
          id: 1,
          type: "Query",
          key: "key",
          value: "value"
        }
      ],
      outputs: [
        {
          id: 1,
          type: "Status Code",
          key: "Status Code",
          value: "200"
        }
      ]
    };
    this.setState({ tests: [...this.state.tests, newTest] });
  };

  handleAddParameter = testId => {
    const { tests } = this.state;

    this.setState({
      tests: tests.map(test => {
        if (test.id === testId) {
          const newParam = {
            id: this.getMaxId(test.parameters) + 1,
            type: "Query",
            key: "key",
            value: "value"
          };

          test.parameters = [...test.parameters, newParam];
        }
        return test;
      })
    });
  };

  handleAddOutput = testId => {
    const { tests } = this.state;

    this.setState({
      tests: tests.map(test => {
        if (test.id === testId) {
          const newParam = {
            id: this.getMaxId(test.outputs) + 1,
            type: "Status Code",
            key: "Status Code",
            value: "200"
          };

          test.outputs = [...test.outputs, newParam];
        }
        return test;
      })
    });
  };

  handleRemoveElement = (event, testId, elementId) => {
    if (event.target.name === "test") {
      this.setState({
        tests: [...this.state.tests].filter(test => test.id !== testId)
      });
    } else {
      this.setState({
        tests: this.state.tests.map(test => {
          if (test.id === testId) {
            test[event.target.name] = test[event.target.name].filter(
              element => element.id !== elementId
            );
          }
          return test;
        })
      });
    }
  };

  handleInputChange = (event, testId, elementType, elementId) => {
    if (elementType === "UserID") {
      this.setState({ UserID: event.target.value });
    } else if (elementType === "ProxyURL") {
      this.setState({ ProxyURL: event.target.value });
    } else {
      this.setState(
        this.state.tests.map(test => {
          if (test.id === testId) {
            // InputChange can refer to a subelement that requires ID (param/output) or one which does not require ID (metadata)
            if (elementType !== "metadata") {
              test[elementType].map(element => {
                if (element.id === elementId)
                  element[event.target.name] = event.target.value;
                return element;
              });
            } else test[elementType][event.target.name] = event.target.value;
          }
          return test;
        })
      );
    }
  };

  handleChangeType = (event, testId, elementId, type) => {
    this.setState(
      this.state.tests.map(test => {
        if (test.id === testId) {
          test[event.target.name].map(element => {
            if (element.id === elementId) {
              element.type = type;
            }
            return element;
          });
        }
        return test;
      })
    );
  };

  setPendingServerResponse = message => {
    this.setState({
      httpStatus: {
        code: message,
        message: "Request is processing",
        error: false
      }
    });
  };

  handleServerResponseChange = (code, message, error) => {
    this.setState({
      httpStatus: {
        code: code,
        message: message,
        error: error
      }
    });
  };

  parseParameters = test => {
    let QueryParams = {};
    let Headers = {};
    let FormParams = {};
    let BasicAuth = {};
    let Body = {};
    for (var param in test.parameters) {
      const { type, key, value } = test.parameters[param];
      if (type === "Query") {
        QueryParams[key] = value;
      } else if (type === "Header") {
        Headers[key] = value;
      } else if (type === "Form") {
        FormParams[key] = value;
      } else if (type === "BasicAuth") {
        BasicAuth.username = key;
        BasicAuth.password = value;
      } else if (type === "Body") {
        Body.body = value;
      }
    }
    return {
      QueryParams,
      Headers,
      FormParams,
      BasicAuth,
      Body
    };
  };

  parseOutputs = test => {
    let ResponseCode = {};
    let Headers = {};
    let BodyPath = {};
    for (var output in test.outputs) {
      const { type, key, value } = test.outputs[output];
      if (type === "Status Code") {
        ResponseCode = value;
      } else if (type === "Header") {
        Headers[key] = value;
      } else if (type === "Body-Path") {
        BodyPath[key] = value;
      }
    }
    return {
      ResponseCode,
      Headers,
      BodyPath
    };
  };

  handleSubmitRequest = () => {
    this.setPendingServerResponse("Submit Request");
    const { tests } = this.state;
    let req = { global: { ProxyURL: this.state.ProxyURL }, tests: {} };
    for (var test in tests) {
      const params = this.parseParameters(tests[test]);
      for (var param in params)
        if (Object.entries(params[param]).length === 0) delete params[param];
      const outputs = this.parseOutputs(tests[test]);
      for (var output in outputs)
        if (Object.entries(outputs[output]).length === 0)
          delete outputs[output];
      if (tests[test].id === 0) {
        req.global = {
          ProxyURL: this.state.ProxyURL,
          Endpoint: tests[test].metadata.endpoint,
          Method: tests[test].metadata.method,
          Parameters: params,
          ExpectedOutput: outputs
        };
        if (Object.entries(req.global.Parameters).length === 0)
          delete req.global.Parameters;
        if (Object.entries(req.global.ExpectedOutput).length === 0)
          delete req.global.ExpectedOutput;
      } else {
        req.tests[tests[test].metadata.name] = {
          Endpoint: tests[test].metadata.endpoint,
          Method: tests[test].metadata.method,
          Parameters: params,
          ExpectedOutput: outputs
        };
        if (
          Object.entries(req.tests[tests[test].metadata.name].Parameters)
            .length === 0
        )
          delete req.tests[tests[test].metadata.name].Parameters;
        if (
          Object.entries(req.tests[tests[test].metadata.name].ExpectedOutput)
            .length === 0
        )
          delete req.tests[tests[test].metadata.name].ExpectedOutput;
      }
    }
    console.log(req);
    axios
      .post(`${this.url}/generate?id=${this.state.UserID}`, req)
      .then(res => {
        console.log(res);
        this.handleServerResponseChange(
          res.status,
          `Tests generated.\nUserID: ${res.data.id}`,
          false
        );
        this.setState({ UserID: res.data.id });
      })
      .catch(err => {
        console.log(err);
        if (!err.status)
          this.handleServerResponseChange(
            500,
            "The server appears to be down",
            true
          );
        if (err.response)
          this.handleServerResponseChange(
            err.response.status,
            err.response.data.Error,
            true
          );
      });
  };

  handleHttpGetRequest = endpoint => {
    this.setPendingServerResponse("--");
    axios
      .get(`${this.url}/${endpoint}?id=${this.state.UserID}`)
      .then(res => {
        console.log(res);
        this.handleServerResponseChange(
          `${res.status} ${res.statusText}`,
          "Success",
          false
        );
      })
      .catch(err => {
        if (!err.status)
          this.handleServerResponseChange(
            500,
            "The server appears to be down",
            true
          );
        if (err.response)
          this.handleServerResponseChange(
            err.response.status,
            err.response.data.Error,
            true
          );
      });
  };

  render() {
    return (
      <div>
        <div>
          <Sidebar
            httpStatus={this.state.httpStatus}
            onHttpGetRequest={this.handleHttpGetRequest}
            onSubmitRequest={this.handleSubmitRequest}
          />
        </div>
        <div className="main-content">
          <div className="GeneralDiv">
            <div>
              ProxyURL<text style={{ color: "red" }}>*</text>:
              <InputText
                type="text"
                targetElement="ProxyURL"
                placeholder={this.state.ProxyURL}
                onChange={this.handleInputChange}
              />
              {" UserID: "}
              <InputText
                type="text"
                targetElement="UserID"
                placeholder={this.state.UserID}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="GlobalTestDiv">
            <GlobalTest
              key="0"
              test={this.state.tests.filter(test => test.id === 0)[0]}
              onRemoveElement={this.handleRemoveElement}
              onInputChange={this.handleInputChange}
              onAddParameterElement={this.handleAddParameter}
              onAddOutputElement={this.handleAddOutput}
              onChangeType={this.handleChangeType}
            />
          </div>
          <div className="TestDiv">
            <TransitionGroup>
              {this.state.tests
                .filter(test => test.id !== 0)
                .map(test => (
                  <CSSTransition
                    timeout={500}
                    classNames="testTransition"
                    key={test.id}
                  >
                    <Test
                      key={test.id}
                      test={test}
                      onRemoveElement={this.handleRemoveElement}
                      onInputChange={this.handleInputChange}
                      onAddParameterElement={this.handleAddParameter}
                      onAddOutputElement={this.handleAddOutput}
                      onChangeType={this.handleChangeType}
                    />
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </div>
          <AddElementButton
            type="AddElementButton-Test"
            onAddElement={this.handleAddTest}
            label="Test"
            testId={null}
          />
        </div>
      </div>
    );
  }
}

export default Tests;
