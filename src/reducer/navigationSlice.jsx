import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initValue = {
    navigate: {

    }


}
const navigationSlice = createSlice({
    name: "navigation",
    initialState: initValue,
    reducers: {
        updateNavigate: (state, actions) => {
            state.navigate = { ...actions.payload.update }
        }

    }
})
export const { updateNavigate } = navigationSlice.actions;
export default navigationSlice.reducer;