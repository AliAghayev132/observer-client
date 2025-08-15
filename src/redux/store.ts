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

export const store = configureStore({
  reducer: {
    [miscApi.reducerPath]: miscApi.reducer,

    //!
    adminAuth: adminAuthReducer,

    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [adminUsersApi.reducerPath]: adminUsersApi.reducer,
    [adminSystemApi.reducerPath]: adminSystemApi.reducer,
    [adminLeadersApi.reducerPath]: adminLeadersApi.reducer,
    [adminCategoriesApi.reducerPath]: adminCategoriesApi.reducer,

    //? User
    userAuth: userAuthReducer,
    userAccount: userAccountReducer,

    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [userAccountApi.reducerPath]: userAccountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      //* Misc
      miscApi.middleware,

      //? User
      userAuthApi.middleware,
      userAccountApi.middleware,

      //! Admin
      adminAuthApi.middleware,
      adminUsersApi.middleware,
      adminSystemApi.middleware,
      adminLeadersApi.middleware,
      adminCategoriesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
