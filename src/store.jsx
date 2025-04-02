import { configureStore } from "@reduxjs/toolkit";
import chatboxReducer from "./Slices/ChatBoxSlices"

export const store = configureStore({
      reducer:{
            chat:chatboxReducer
      }
  });
  