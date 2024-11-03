import { configureStore } from '@reduxjs/toolkit';
import graphData from "./GraphSlice"
import optionData from "./OptionsSlice"

const store = configureStore({
  reducer: {
    graphData,
    optionData
  },  
});

export default store;