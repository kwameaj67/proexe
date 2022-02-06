import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'

const allReducers = {
    users: userReducer,
}


const reduxStore = configureStore({
    reducer: allReducers,
    devTools: true
})

export default reduxStore;