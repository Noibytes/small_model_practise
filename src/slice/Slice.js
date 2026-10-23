import { createSlice } from "@reduxjs/toolkit";


const slice=createSlice({
    name:"user",
    initialState:{
        students:[]
    },
    reducers:{
        setStudents:(state,action)=>{
            state.students=action.payload
        }

    }
})

export default slice.reducer
export const{setStudents}=slice.actions