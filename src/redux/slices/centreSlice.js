import { createSlice } from "@reduxjs/toolkit";

const centreSlice = createSlice({
  name: "centre",
  initialState: {
    centres: [],
    centre: null,
    error: null,
    loading: {
      loadingCreate: false,
      loadingGet: false,
      loadingGetById: false,
    },
    errorValidation: null,
  },
  reducers: {
    setCentres(state, action) {
      state.centres = action.payload;
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
    addCentre(state, action) {
      state.centres = [action.payload, ...state.centres];
    },
    setCentre(state, action) {
      state.centre = action.payload;
    },
    setGetLoadingById(state, action) {
      state.loading.loadingGetById = action.payload;
    },
    updateCentres(state, action) {
      state.centres = state.centres.map((c) =>
        c.id === action.payload.id ? action.payload.centre : c
      );
    },
    removeCentre(state,action){
      state.centres = state.centres.filter(c=>c.id !==action.payload)
    },  },
});

export const centreActions = centreSlice.actions;
export const centreReducer = centreSlice.reducer;
