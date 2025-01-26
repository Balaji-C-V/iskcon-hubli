import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const api = "https://razor.ygntechstartup.workers.dev";

// const token = 'iskonhublicampaign'

export const fetchUser = createAsyncThunk("getUserList",async(_,{rejectWithValue})=>{
      try {
        
        const response = await fetch(`${api}/showcampaigns`);
        const data = await response.json();

         if(!response.ok){
            throw new Error("Network call is not ok")
         }

         return data

      } catch (error) {
        return rejectWithValue(error.message)
      }
});

export const fetchSingleUser = createAsyncThunk("getSingleUser",async(id,{rejectWithValue})=>{
     try {
          
          const response = await fetch(`${api}/campaign/${id}`,{
                method:'GET'
          });
          const data = await response.json();

          if(!response.ok){
               throw new Error("Network call is not ok")
            }

            return data

     } catch (error) {
          return rejectWithValue(error.message)
     }
})


const initialState = {
     isLoading:false,
     isError:null,
     getUsers:[],
     getSingleUser : {}
}

const getUsersSlice = createSlice({
      name:"getUsers",
      initialState,
      reducers:{},
      extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.pending,(state)=>{
             state.isLoading = true;
             state.isError = null
        })
        .addCase(fetchUser.fulfilled,(state,{payload})=>{
             state.isLoading = false;
             state.isError = null;
             state.getUsers = payload
        })
        .addCase(fetchUser.rejected,(state,{payload})=>{
             state.isLoading = false;
             state.isError = payload;
             state.getUsers  =[]
        })

     //    Handle Single Users
        .addCase(fetchSingleUser.pending,(state)=>{
            state.isLoading = true;
            state.isError = null
        })
        .addCase(fetchSingleUser.fulfilled,(state,{payload})=>{
           state.isLoading = false;
           state.isError = null;
           state.getSingleUser = payload
        })
        .addCase(fetchSingleUser.rejected,(state,{payload})=>{
            state.isLoading = false;
            state.isError = payload;
            state.getSingleUser = {}
        })
      }
});

export default getUsersSlice.reducer