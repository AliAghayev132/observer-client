import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useUser = () => {
  return useSelector((state: RootState) => state.userAccount.user);
};
