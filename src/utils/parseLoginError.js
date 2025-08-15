// utils/parseLoginError.ts
import { getMessageByCode } from "@/utils/getMessageByCode";
export function parseLoginError(err) {
    var _a, _b, _c;
    var errorCode = "";
    var errorTitle = "Login Failed";
    if ((_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.code) {
        errorCode = err.data.code;
    }
    else if ((_c = (_b = err === null || err === void 0 ? void 0 : err.data) === null || _b === void 0 ? void 0 : _b.messages) === null || _c === void 0 ? void 0 : _c.code) {
        errorCode = err.data.messages.code;
    }
    else {
        switch (err === null || err === void 0 ? void 0 : err.status) {
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
    var errorMessage = getMessageByCode(errorCode);
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
    return { errorCode: errorCode, errorTitle: errorTitle, errorMessage: errorMessage };
}
