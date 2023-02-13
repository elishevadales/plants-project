import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initValue = {
    navigation: {


    }


}

const navigationSlice = createSlice({
    name: "navigation",
    initialState: initValue,
    reducers: {
        updateNavigation: (state, actions) => {
            state.navigation = { ...actions.payload.update }
        }
    }
})

export const { updateNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;