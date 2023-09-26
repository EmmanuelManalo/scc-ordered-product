import React from "react";
import { StoreReducer } from "./StoreReducer";

const initVal = {
  error: false,
  info: false,
  success: false,
  validate: false,
  isSave: false,
  isShow: false,
  isConfirm: false,
  isDelete: false,
  isArchive: false,
  isRestore: false,
  isEdit: false,
  isAdd: false,
  isView: false,
  isFeedback: false,
  isSearch: false,
  startIndex: 0,
  isCreatePassSuccess: false,
  isForgotPassSuccess: false,
  isLogin: false,
  isLogout: false,
  isAccountUpdated: false,
  credentials: {},
  personalInfo: {},
  academicInfo: {},
  isRefresh: false,
  isToolsOpen: false,
  isSettingsOpen: false,
  isMenuOpen: false,
  isAvatar: false,
  navHeight: 0,
};

const StoreContext = React.createContext();

const StoreProvider = (props) => {
  const [store, dispatch] = React.useReducer(StoreReducer, initVal);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
