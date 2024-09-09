import { createSlice } from "@reduxjs/toolkit";

const subjectSlice = createSlice({
    name: 'subject',
    initialState: {
        subjects: [],
        subject: null,
        error: null,
        loading: {
            loadingCreate: false,
            loadingGet: false,
            loadingGetById: false,
        },
        errorValidation: null,
    },
    reducers: {
        setSubjects(state, action) {
            state.subjects = action.payload;
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
        addSubject(state, action) {
            state.subjects = [action.payload, ...state.subjects];
        },
        setSubject(state, action) {
            state.subject = action.payload;
        },
        setGetLoadingById(state, action) {
            state.loading.loadingGetById = action.payload;
        },
        updateSubjects(state, action) {
            state.subjects = state.subjects.map((s) =>
                s.id === action.payload.id ? action.payload.subject : s
            );
        },
        removeSubject(state, action) {
            state.subjects = state.subjects.filter(s => s.id !== action.payload);
        },
    },
});

export const subjectActions = subjectSlice.actions;
export const subjectReducer = subjectSlice.reducer;
