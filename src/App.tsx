// Css
import "./App.css";
// AppRouter
import { AppRouter } from "./routes/AppRouter"
// Redux && RTK
import { store } from "./redux/store";
import { Provider } from "react-redux";
// Packages
import { Toaster } from "react-hot-toast";

export const App = () => (

    <Provider store={store}>
        <Toaster />
        <AppRouter />
    </Provider>
);