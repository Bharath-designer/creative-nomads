import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data1: [45, 90, 50, 55, 100, 75, 105],
    data2: [15, 10, 35, 5, 25, 40, 30]
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