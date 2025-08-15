import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Css
import "./App.css";
// AppRouter
import { AppRouter } from "./routes/AppRouter";
// Redux && RTK
import { store } from "./redux/store";
import { Provider } from "react-redux";
// Packages
import { Toaster } from "react-hot-toast";
export var App = function () { return (_jsxs(Provider, { store: store, children: [_jsx(Toaster, {}), _jsx(AppRouter, {})] })); };
