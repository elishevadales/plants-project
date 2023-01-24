import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initValue = {
    user: {


    }


}


const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: initValue,
    reducers: {
        updateUserInfo: (state, actions) => {
            state.user = { ...actions.payload.update }
        }
    }
})
export const { updateUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
