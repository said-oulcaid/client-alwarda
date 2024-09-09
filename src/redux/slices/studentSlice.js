import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    student: null,
    error: null,
    loading: {
      loadingCreate: false,
      loadingGet: false,
      loadingGetById: false,
    },
    errorValidation: null,
  },
  reducers: {
    setStudents(state, action) {
      state.students = action.payload;
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
    addStudent(state, action) {
      state.students = [action.payload, ...state.students];
    },
    setStudent(state, action) {
      state.student = action.payload;
    },
    setGetLoadingById(state, action) {
      state.loading.loadingGetById = action.payload;
    },
    updateStudents(state, action) {
      state.students = state.students.map((c) =>
        c.id === action.payload.id ? action.payload.student : c
      );
    },
    updateStudentPayment(state, action) {
      state.students = state.students.map((s) =>
      ({...s,payments:s.payments.map(p=> p.id === action.payload.id ? action.payload.payment : p)})
      );
    },
    removeStudent(state,action){
      state.students = state.students.filter(c=>c.id !==action.payload)
    },  },
});

export const studentActions = studentSlice.actions;
export const studentReducer = studentSlice.reducer;
