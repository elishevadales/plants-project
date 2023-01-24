import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initValue = {
    img_url: {}

}

const avatarSlice = createSlice({
    name:"img_url",
    initialState: initValue,
    reducers:{
        updateImgUrl: (state, actions) => {
            state.img_url = { ...actions.payload.update }
        }
    }
})