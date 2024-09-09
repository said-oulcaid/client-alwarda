import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [],
    payment: null,
    error: null,
    loading: {
      loadingCreate: false,
      loadingGet: false,
      loadingGetById: false,
    },
    errorValidation: null,
  },
  reducers: {
    setPayments(state, action) {
      state.payments = action.payload;
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
    addpayment(state, action) {
      state.payments = [action.payload, ...state.payments];
    },
    setPayment(state, action) {
      state.payment = action.payload;
    },
    setGetLoadingById(state, action) {
      state.loading.loadingGetById = action.payload;
    },
    updatepayments(state, action) {
      state.payments = state.students.map((c) =>
        c.id === action.payload.id ? action.payload.payment : c
      );
    },
    removepayment(state,action){
      state.payments = state.payments.filter(c=>c.id !==action.payload)
    },  },
});

export const paymentActions = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
