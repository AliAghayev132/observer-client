import messages from "@/constants/messages.json";
export var getMessageByCode = function (code) {
    var msg = messages[code];
    return msg ? msg.message : "Unknown error.";
};
