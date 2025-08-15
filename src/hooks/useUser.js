import { useSelector } from "react-redux";
export var useUser = function () {
    return useSelector(function (state) { return state.userAccount.user; });
};
