import { createSlice } from "@reduxjs/toolkit";

const levelSlice = createSlice({
    name: 'level',
    initialState: {
        levels: [],
        level: null,
        error: null,
        loading: {
            loadingCreate: false,
            loadingGet: false,
            loadingGetById: false,
        },
        errorValidation: null,
    },
    reducers: {
        setLevels(state, action) {
            state.levels = action.payload; 
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
        addLevel(state, action) {
            state.levels = [action.payload, ...state.levels];
        },
        setLevel(state, action) {
            state.level = action.payload;
        },
        setGetLoadingById(state, action) {
            state.loading.loadingGetById = action.payload;
        },
        updateLevels(state, action) {
            state.levels = state.levels.map((l) =>
                l.id === action.payload.id ? action.payload.level : l
            );
        },
        removeLevel(state, action) {
            state.levels = state.levels.filter(l => l.id !== action.payload);
        },
    },
});

export const levelActions = levelSlice.actions;
export const levelReducer = levelSlice.reducer;
