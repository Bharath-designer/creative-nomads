import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data1: [60, 95, 70, 65, 100, 75, 105],
    data2: [5, 35, 20, 35, 15, 25, 5]
}

const graphData = createSlice({
    name: 'graph',
    initialState,
    reducers: {
      setGraphData1: (state, action) => {
        state.data1 = action.payload
      },
      setGraphData2: (state, action) => {
        state.data2 = action.payload
      },
    }
})


export const {setGraphData1, setGraphData2} = graphData.actions

export default graphData.reducer