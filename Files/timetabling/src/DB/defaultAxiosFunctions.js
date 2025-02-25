import axios from "axios";
import configInfo from "../config/configInfo";
import { toast } from "react-toastify";
import { getId } from "../helpers/auxCRUD";

// const url = configInfo.AWS.fullEndpoint + "/";
const url = configInfo.local.fullEndpoint + "/";
const debuggingLocal = "newAxios.js>";
const isDebugging = false;

function getAxios() {
  function testing(itemToSend = null, itemName = null, action = "test") {
    const message = `Axios>testing>${action}ing>${itemName}>`;
    isDebugging && console.log(message, itemToSend);
  }

  async function createTest(itemName = null, itemToSend = null) {
    testing(itemToSend, itemName, "creat");
    const localUrl = url + itemName; // I may need to change this slash
    const dataToSend = { newItem: itemToSend };
    isDebugging && console.log("dataToSend", dataToSend);
    isDebugging && console.log("localUrl", localUrl);
    return await axios.post(localUrl, dataToSend);
  }
  async function readTest(itemName = null, itemToSend = null) {
    testing(itemToSend, itemName, "read");
    const localUrl = url + itemName; // I may need to change this slash
    return await axios.get(localUrl, itemToSend);
  }
  async function updateTest(itemName = null, itemToSend = null) {
    testing(itemToSend, itemName, "updat");
    const localUrl = url + itemName; // I may need to change this slash
    const dataToSend = { newItem: itemToSend };
    return await axios.put(localUrl, dataToSend);
  }
  async function deleteTest(itemName = null, itemToSend = null) {
    testing(itemToSend, itemName, "delet");
    const localUrl = url + itemName + "/" + itemToSend?.id; // I may need to change this slash
    return await axios.delete(localUrl);
  }

  const myAxios = {
    create: createTest,
    read: readTest,
    update: updateTest,
    delete: deleteTest,
  };
  return myAxios;
}

const myAxios = getAxios();

/* Create a function for default debugging messages? */

function defaultHandleError(error) {
  isDebugging && console.error("Default error handling", error);
}

function debugPayload(payload) {
  const local = debuggingLocal + "debugPayload>";
  console.log(`${local}payload: \n\n{\n\n`, payload, "\n\n}\n\n");
}

async function defaultDBCreate(itemName, itemToSend) {
  const action = "creat";
  const localMessage = `defaultDB${action}e> ${itemName}`;
  const toastMessages = {
    debug: [localMessage],
    pretty: `Ready for a ${itemName} ${action}ing journey?`,
  };
  let toastToUse = toast;
  let returnedData = null;
  let localError = null;
  isDebugging && console.log(toastMessages.pretty);
  if (!itemToSend) {
    const debugMessage = `${localMessage}> The ${itemName} "${itemToSend}" is invalid. The request didn't even left the app.`;
    const prettyMessage = `The ${itemName} is invalid. It couldn't be ${action}ed.`;
    toastMessages.debug.push(debugMessage);
    toastMessages.pretty = prettyMessage;
    toastToUse = toast.warning;
    localError = new Error(toastMessages.debug);
    isDebugging && console.error(toastMessages);
  } else {
    try {
      const response = await myAxios.create(itemName, itemToSend);
      isDebugging && debugPayload(response); // Only Executes if isDebugging is true
      const statusCode = response.status;
      if (statusCode === 201) {
        returnedData = response.data.queryResult.insertId;
        const debugMessage = `${localMessage}>The ${itemName} was ${action}ed with id ${returnedData}. The data is: ${itemToSend}`;
        const prettyMessage = `The ${itemName} was successfully ${action}ed! with id ${returnedData}.`;
        toastMessages.debug.push(debugMessage);
        toastMessages.pretty = prettyMessage;
        toastToUse = toast.success;
      } else {
        const debugMessage = `${localMessage}>ServerError ${statusCode}, ${response.status} while ${action}ing the ${itemName}.\nThe error message: ${response.data.body?.error}`;
        const prettyMessage = `Error while ${action}ing the ${itemName}.`;
        toastMessages.debug.push(debugMessage);
        toastMessages.pretty = prettyMessage;
        toastToUse = toast.error;
        localError = new Error(toastMessages.debug);
      }
    } catch (error) {
      const debugMessage = `${localMessage}>CatchedServerError> ${error}}`;
      const prettyMessage = `Error while ${action}ing the ${itemName}.`;
      toastMessages.debug.push(debugMessage);
      toastMessages.pretty = prettyMessage;
      toastToUse = toast.error;
      localError = new Error(toastMessages.debug);
    }
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    isDebugging && console.error(toastMessages.debug);
    throw localError;
  }
  return returnedData;
}

async function defaultDBRead(itemName) {
  const action = "read";
  const localMessage = `defaultDB${action}_${itemName}>`;
  const toastMessages = {
    debug: [localMessage],
    pretty: `Ready for a ${itemName} ${action}ing journey?`,
  };
  let toastToUse = toast;
  let returnedData = null;
  let localError = null;
  isDebugging && console.log(toastMessages.pretty);
  // console.log("itemName", itemName);
  if (false) {
  } else {
    try {
      // console.log("preRead", itemName);
      const response = await myAxios.read(itemName);
      // console.log("response", response);
      isDebugging && debugPayload(response); // Only Executes if isDebugging is true
      returnedData = response.data.queryResult;
      const statusCode = response.status;
      if (statusCode === 200) {
        //Everything is OK
        // const currentId = response.data.queryResult.insertId;
        const debugMessage = `${localMessage}>The ${itemName} was ${action}ed The data is: ${returnedData}`;
        const prettyMessage = `The ${itemName} was successfully ${action}ed!`;
        toastMessages.debug.push(debugMessage);
        toastMessages.pretty = prettyMessage;
        toastToUse = toast.success;
      } else {
        const debugMessage = `${localMessage}>ServerError ${statusCode}, ${response.status} while ${action}ing the ${itemName}.\nThe error message: ${response.data.body.error}`;
        const prettyMessage = `Error while ${action}ing the ${itemName}.`;
        toastMessages.debug.push(debugMessage);
        toastMessages.pretty = prettyMessage;
        toastToUse = toast.error;
        localError = new Error(toastMessages.debug);
      }
    } catch (error) {
      const debugMessage = `${localMessage}>CatchedServerError> ${error}}`;
      const prettyMessage = `Error while ${action}ing the ${itemName}.`;
      toastMessages.debug.push(debugMessage);
      toastMessages.pretty = prettyMessage;
      toastToUse = toast.error;
      localError = new Error(toastMessages.debug);
    }
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    isDebugging && console.error(toastMessages.debug);
    throw localError;
  }
  return returnedData;
}

async function defaultDBUpdate(itemName, itemToSend) {
  const action = "updat";
  const localMessage = `defaultDB${action}e> ${itemName}`;
  const toastMessages = {
    debug: [localMessage],
    pretty: `Ready for a ${itemName} ${action}ing journey?`,
  };
  let toastToUse = toast;
  let returnedData = null;
  let localError = null;
  isDebugging && console.log(toastMessages.pretty);
  if (!itemToSend) {
    const debugMessage = `${localMessage}> The ${itemName} "${itemToSend}" is invalid. The request didn't even left the app.`;
    const prettyMessage = `The ${itemName} is invalid. It couldn't be ${action}ed.`;
    toastMessages.debug.push(debugMessage);
    toastMessages.pretty = prettyMessage;
    toastToUse = toast.warning;
    localError = new Error(toastMessages.debug);
    isDebugging && console.error(toastMessages);
  } else {
    try {
      const response = await myAxios.update(itemName, itemToSend);
      isDebugging && debugPayload(response); // Only Executes if isDebugging is true
      const statusCode = response.status;
      if (statusCode === 200) {
        // Everything is OK
        returnedData = itemToSend;
        const debugMessage = `${localMessage}>The ${itemName} was ${action}ed with values ${JSON.stringify(
          itemToSend
        )}. The data is: ${itemToSend}`;
        const prettyMessage = `The ${itemName} was successfully ${action}ed!`;
        toastMessages.debug.push(debugMessage);
        toastMessages.pretty = prettyMessage;
        toastToUse = toast.success;
      } else if (statusCode === 404) {
        // Not found
        const debugMessage = `${localMessage}>ServerError ${statusCode}, ${response.status} while ${action}ing the ${itemName}.\nThe error message: ${response.data.body.error}`;
        const prettyMessage = `Error while ${action}ing the ${itemName}.`;
        toastMessages.debug.push(debugMessage);
        toastMessages.pretty = prettyMessage;
        toastToUse = toast.warning;
        localError = new Error(toastMessages.debug);
      } else {
        // Other cases
        const debugMessage = `${localMessage}>ServerError ${statusCode}, ${response.status} while ${action}ing the ${itemName}.\nThe error message: ${response.data.body.error}`;
        const prettyMessage = `Error while ${action}ing the ${itemName}.`;
        toastMessages.debug.push(debugMessage);
        toastMessages.pretty = prettyMessage;
        toastToUse = toast.error;
        localError = new Error(toastMessages.debug);
      }
    } catch (error) {
      const debugMessage = `${localMessage}>CatchedServerError> ${error}}`;
      const prettyMessage = `Error while ${action}ing the ${itemName}.`;
      toastMessages.debug.push(debugMessage);
      toastMessages.pretty = prettyMessage;
      toastToUse = toast.error;
      localError = new Error(toastMessages.debug);
    }
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    isDebugging && console.error(toastMessages.debug);
    throw localError;
  }
  return returnedData;
}

async function defaultDBDelete(itemName, itemToSend) {
  const action = "delet";
  const localMessage = `defaultDB${action}e> ${itemName}`;
  const toastMessages = {
    debug: [localMessage],
    pretty: `Ready for a ${itemName} ${action}ing journey?`,
  };
  let toastToUse = toast;
  let returnedData = null;
  let localError = null;
  isDebugging && console.log(toastMessages.pretty);
  if (!(itemToSend && itemToSend.id)) {
    const debugMessage = `${localMessage}> The ${itemName} "${itemToSend}" is invalid. The request didn't even left the app.`;
    const prettyMessage = `The ${itemName} is invalid. It couldn't be ${action}ed.`;
    toastMessages.debug.push(debugMessage);
    toastMessages.pretty = prettyMessage;
    toastToUse = toast.warning;
    localError = new Error(toastMessages.debug);
    isDebugging && console.error(toastMessages);
  } else {
    try {
      const response = await myAxios.delete(itemName, itemToSend);
      isDebugging && debugPayload(response); // Only Executes if isDebugging is true
      const statusCode = response.status;
      const body = response.data.body;
      if (statusCode === 200) {
        // Everything is OK
        returnedData = itemToSend;
        const debugMessage = `${localMessage}>The ${itemName} was ${action}ed with values ${JSON.stringify(
          itemToSend
        )}. The data is: ${itemToSend}. The response body is: ${JSON.stringify(
          body
        )}`;
        const prettyMessage = `The ${itemName} (id: ${getId(
          itemToSend
        )}) was successfully ${action}ed!`;
        toastMessages.debug.push(debugMessage);
        toastMessages.pretty = prettyMessage;
        toastToUse = toast.success;
      } else if (statusCode === 404) {
        // Not found
        const debugMessage = `${localMessage}>ServerError ${statusCode}, ${response.status} while ${action}ing the ${itemName}.\nThe error message: ${response.data.body.error}`;
        const prettyMessage = `Error while ${action}ing the ${itemName}.`;
        toastMessages.debug.push(debugMessage);
        toastMessages.pretty = prettyMessage;
        toastToUse = toast.warning;
        localError = new Error(toastMessages.debug);
      } else {
        // Other cases
        const debugMessage = `${localMessage}>ServerError ${statusCode}, ${
          response.status
        } while ${action}ing the ${itemName}.\nThe error message: ${
          response.data.body.error
        }. The response body is: ${JSON.stringify(body)}`;
        const prettyMessage = `Error while ${action}ing the ${itemName}.`;
        toastMessages.debug.push(debugMessage);
        toastMessages.pretty = prettyMessage;
        toastToUse = toast.error;
        localError = new Error(toastMessages.debug);
      }
    } catch (error) {
      const debugMessage = `${localMessage}>CatchedServerError> ${error}}`;
      const prettyMessage = `Error while ${action}ing the ${itemName}.`;
      toastMessages.debug.push(debugMessage);
      toastMessages.pretty = prettyMessage;
      toastToUse = toast.error;
      localError = new Error(toastMessages.debug);
    }
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    isDebugging && console.error(toastMessages.debug);
    throw localError;
  }
  return returnedData;
}

export {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
};
