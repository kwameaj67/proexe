import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { api } from '../../utils/api'

export const fetchUsersAsync = createAsyncThunk(
    'users/fetchUsersAsync',
    async () => {
        const res = await axios.get(api)
        // if (res.status ===  200){
            return res.data
        // }
    }
)
// slices controls, defines reducers
const userSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addUserAction: (state, action) => {
            const newUser = {
                id: uuidv4(),
                name: action.payload.name,
                email: action.payload.email
            }
            state.push(newUser);
            // stores data in memory
            localStorage.setItem('userData', JSON.stringify(state));
        },
        deleteUserAction: (state, action) => {
            const removeItem = state.filter((item) => item.id !== action.payload.id)
            return removeItem
        },
        editUserAction: (state, action) => {
            // finds a particular item index in entire state
            const index = state.findIndex((item) => item.id === action.payload.id)
            state[index].name = action.payload.name  //sets whatever value a componenet passed to update the name item in state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersAsync.pending, (state,action)=>{
            console.log("Fetching data pending...")
        })
        builder.addCase(fetchUsersAsync.fulfilled,(state,action)=>{
            console.log("Fetching data successfully...")
            return action.payload
        })
        builder.addCase(fetchUsersAsync.rejected,(state,action)=>{
            console.log("Fetching data failed...")
        })
    }
})
// we export slices as actions so we can access its logic
export const { addUserAction, deleteUserAction, editUserAction } = userSlice.actions
// we do this to add to the store
export default userSlice.reducer