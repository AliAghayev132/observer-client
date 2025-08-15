import messages from "@/constants/messages.json";

export const getMessageByCode = (code: string): string => {
  const msg = messages[code];
  return msg ? msg.message : "Unknown error.";
};
