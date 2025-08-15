var _a;
// Redux
import { configureStore } from "@reduxjs/toolkit";
// Reducers
//! Admin
import adminAuthReducer from "./admin/auth/adminAuthSlice";
//? User
import userAuthReducer from "./user/auth/userAuthSlice";
import userAccountReducer from "./user/account/userAccountSlice";
// Api
//! Admin
import { adminAuthApi } from "./admin/auth/adminAuthApi";
import { adminUsersApi } from "./admin/users/adminUsersApi";
import { adminSystemApi } from "./admin/system/adminSystemApi";
import { adminLeadersApi } from "./admin/leaders/adminLeadersApi";
import { adminCategoriesApi } from "./admin/categories/adminCategoriesApi";
//? User
import { userAuthApi } from "./user/auth/userAuthApi";
import { userAccountApi } from "./user/account/userAccountApi";
//* Misc
import { miscApi } from "./misc/miscApi";
export var store = configureStore({
    reducer: (_a = {},
        _a[miscApi.reducerPath] = miscApi.reducer,
        //!
        _a.adminAuth = adminAuthReducer,
        _a[adminAuthApi.reducerPath] = adminAuthApi.reducer,
        _a[adminUsersApi.reducerPath] = adminUsersApi.reducer,
        _a[adminSystemApi.reducerPath] = adminSystemApi.reducer,
        _a[adminLeadersApi.reducerPath] = adminLeadersApi.reducer,
        _a[adminCategoriesApi.reducerPath] = adminCategoriesApi.reducer,
        //? User
        _a.userAuth = userAuthReducer,
        _a.userAccount = userAccountReducer,
        _a[userAuthApi.reducerPath] = userAuthApi.reducer,
        _a[userAccountApi.reducerPath] = userAccountApi.reducer,
        _a),
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware().concat(
        //* Misc
        miscApi.middleware, 
        //? User
        userAuthApi.middleware, userAccountApi.middleware, 
        //! Admin
        adminAuthApi.middleware, adminUsersApi.middleware, adminSystemApi.middleware, adminLeadersApi.middleware, adminCategoriesApi.middleware);
    },
});
