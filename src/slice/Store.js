import slice from './Slice'
import { configureStore } from '@reduxjs/toolkit'

export const store=configureStore({
    reducer:{
         StudentReducer:slice

    }
   

})