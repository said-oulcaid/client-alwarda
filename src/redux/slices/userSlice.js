import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: null,
    error: null,
    loading: {
      loadingCreate: false,
      loadingGet: false,
      loadingGetById: false,
    },
    errorValidation: null,
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setGetLoading(state, action) {
      state.loading.loadingGet = action.payload;
    },
    setCreateLoading(state, action) {
      state.loading.loadingCreate = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setErrorValidation(state, action) {
      state.errorValidation = action.payload;
    },
    addUser(state, action) {
      state.users = [action.payload, ...state.users.map(u=>u.centreId === action.payload.centreId ? {...u,centreId:null,centre:null}:u)];
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setGetLoadingById(state, action) {
      state.loading.loadingGetById = action.payload;
    },
    updateUsers(state, action) {
      // Extract the updated user and its centreId from the action payload
      const updatedUser = action.payload.user;
      const updatedCentreId = updatedUser.centreId;
    
      // Map over the users to update them accordingly
      state.users = state.users.map((u) => {
        // If the current user is the one being updated
        if (u.id === action.payload.id) {
          // Update the user with new values
          return { ...u, ...updatedUser };
        }
        
        // If the current user's centreId matches the updated user's centreId
        // and the updated user's centreId is not null or empty
        if (u.centreId === updatedCentreId && updatedCentreId !== null && updatedCentreId !== '') {
          // Set centreId and centre to null for this user
          return { ...u, centreId: null, centre: null };
        }
    
        // Return the user unchanged if none of the conditions are met
        return u;
      });
    }
,    
    removeUser(state,action){
      state.users = state.users.filter(c=>c.id !==action.payload)
    },  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
