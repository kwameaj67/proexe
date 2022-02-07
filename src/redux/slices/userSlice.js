import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { api } from '../../utils/api'
import { loadState, saveArrayState, saveObjectState } from '../../utils/helpers'
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
                id: Date.now(),
                name: action.payload.name,
                email: action.payload.email,
                username: "",
                address: {
                    city: ""
                },
            }
            // check if local storage key exists
            if (loadState() === null) {
                saveObjectState(newUser, state)  // save new user
            } else {
                // get existing objects locally
                const existing = loadState()
                existing.push(newUser)
                // save object again
                localStorage.setItem("userData", JSON.stringify(existing)); //update storage
                loadState()
            }

        },
        deleteUserAction: (state, action) => {
            if (loadState() != null) { // check if data already exists locally
                let existing = loadState();
                const index = existing.findIndex((item) => item.id === action.payload.id)
                existing.splice(index,1);
                saveArrayState(existing) //update storage
                loadState()
                return existing
            }
        },
        editUserAction: (state, action) => {
            if (loadState() != null) {
                let existing = loadState();
                // console.log(existing)
                const index = existing.findIndex((item) => item.id === parseInt(action.payload.id))

                // console.log(index)
                // console.log(existing[index])
                existing[index].id = Date.now()
                existing[index].name = action.payload.name
                existing[index].email = action.payload.email

                saveArrayState(existing) //update storage
                loadState()
                // return existing
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersAsync.pending, (state, action) => {
            console.log("Fetching data pending...")
        })
        builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
            console.log("Fetching data successfully...",)
            const existing = loadState()
            if (existing === null) {
                saveArrayState(action.payload)
            } else if (existing.length === 0) {
                saveArrayState(action.payload)
                // loadState()
            }
            const data = loadState()
            return data
        })
        builder.addCase(fetchUsersAsync.rejected, (state, action) => {
            console.log("Fetching data failed...")
        })
    }
})
// we export slices as actions so we can access its logic
export const { addUserAction, deleteUserAction, editUserAction } = userSlice.actions
// we do this to add to the store
export default userSlice.reducer