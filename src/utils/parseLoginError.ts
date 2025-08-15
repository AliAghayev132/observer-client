// utils/parseLoginError.ts
import { getMessageByCode } from "@/utils/getMessageByCode";

export function parseLoginError(err) {
  let errorCode = "";
  let errorTitle = "Login Failed";

  if (err?.data?.code) {
    errorCode = err.data.code;
  } else if (err?.data?.messages?.code) {
    errorCode = err.data.messages.code;
  } else {
    switch (err?.status) {
      case 401:
        errorCode = "E401";
        break;
      case 403:
        errorCode = "E403";
        break;
      case 404:
        errorCode = "E404";
        break;
      case 422:
        errorCode = "V400";
        break;
      case 500:
        errorCode = "E500";
        break;
      default:
        errorCode = "E400";
    }
  }

  const errorMessage = getMessageByCode(errorCode);

  switch (errorCode) {
    case "E401":
    case "A400":
    case "A401":
    case "E407":
      errorTitle = "Invalid Credentials";
      break;
    case "E403":
    case "A403":
      errorTitle = "Access Forbidden";
      break;
    case "E404":
    case "DB404":
      errorTitle = "Account Not Found";
      break;
    case "E406":
      errorTitle = "Account Not Confirmed";
      break;
    case "V101":
    case "V402":
      errorTitle = "Invalid Email";
      break;
    case "V103":
    case "V403":
      errorTitle = "Password Issue";
      break;
    case "E500":
    case "DB400":
    case "DB500":
      errorTitle = "Server Error";
      break;
    case "V400":
    case "V100":
      errorTitle = "Validation Error";
      break;
  }

  return { errorCode, errorTitle, errorMessage };
}
