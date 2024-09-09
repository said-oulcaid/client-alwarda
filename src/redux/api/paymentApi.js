import { toast } from "react-toastify";
import { request } from "../request";
import { paymentActions } from "../slices/paymentSlice";
import { studentActions } from "../slices/studentSlice";

export const getpayments = (cb) => async (dispatch) => {
  dispatch(paymentActions.setError(null));
  dispatch(paymentActions.setGetLoading(true));
  dispatch(paymentActions.setPayments(null));
  try {
    // 
    const response = await request.get(`/payments`);

    dispatch(paymentActions.setPayments(response.data));
    console.log(response);
  } catch (error) {
    dispatch(paymentActions.setPayments(null));
    if (error?.response) {
      error.response.status === 500 &&
        dispatch(paymentActions.setError(error.response.data.message));
    } else {
      dispatch(
        paymentActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    cb && cb();
  } finally {
    dispatch(paymentActions.setGetLoading(false));
  }
};
export const getpaymentsByPaymentsSchool = (school, cb) => async (dispatch) => {
  dispatch(paymentActions.setError(null));
  dispatch(paymentActions.setGetLoading(true));
  dispatch(paymentActions.setPayments(null));
  try {
    // 
    const response = await request.get(`/payments/payments/${school}`);

    dispatch(paymentActions.setPayments(response.data));
  } catch (error) {
    dispatch(paymentActions.setPayments(null));
    if (error?.response) {
      error.response.status === 500 &&
        dispatch(paymentActions.setError(error.response.data.message));
    } else {
      dispatch(
        paymentActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    cb && cb();
  } finally {
    dispatch(paymentActions.setGetLoading(false));
  }
};

export const createpayment = (payment, cb) => async (dispatch) => {
  dispatch(paymentActions.setError(null));
  dispatch(paymentActions.setCreateLoading(true));

  try {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await request.post("/payments", payment);
    dispatch(paymentActions.addpayment(response.data.payment));
    toast.success(response.data.message);
    cb && cb();
  } catch (error) {
    if (error?.response) {
      error.response.status === 500 &&
        toast.error(error.response.data.message, {
          autoClose: false,
          closeButton: true,
        });

      error.response.status === 400 &&
        toast.error("Ereure devalidation", {
          autoClose: 2000,
          closeButton: true,
        });
      dispatch(paymentActions.setErrorValidation(error.response.data));
    } else {
      toast.error(
        "Le serveur est en panne, vérifiez si votre serveur est démarré ?",
        {
          autoClose: 5000,
          closeButton: true,
        }
      );
    }
    // dispatch(paymentActions.setError(null))F;
  } finally {
    dispatch(paymentActions.setCreateLoading(false));
  }
};

export const getpaymentById = (id, cb) => async (dispatch) => {
  dispatch(paymentActions.setError(null));
  dispatch(paymentActions.setGetLoadingById(true));
  dispatch(paymentActions.setPayment(null));

  try {
    // 

    const response = await request.get(`/payments/${id}`);
    dispatch(paymentActions.setPayment(response.data));
  } catch (error) {
    if (error?.response) {
      if (error.response.status === 500 || error.response.status === 404) {
        dispatch(paymentActions.setError(error.response.data.message));
      } else {
        dispatch(
          paymentActions.setError("Erreur lors de la récupération du payment")
        );
      }
    } else {
      dispatch(
        paymentActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    dispatch(paymentActions.setPayment(null));
    cb && cb();
  } finally {
    dispatch(paymentActions.setGetLoadingById(false));
  }
};

export const updatepayment = (id, updatedPayment, cb) => async (dispatch) => {
  dispatch(paymentActions.setError(null));
  dispatch(paymentActions.setCreateLoading(true));
  dispatch(paymentActions.setPayment(null));

  const updatePaymentPromise = new Promise(async (resolve, reject) => {
    try {
      const response = await request.put(`/payments/${id}`, updatedPayment);
      console.log(response.data.payment);
      if (response.status === 200) {
        dispatch(
          studentActions.updateStudentPayment({
            id,
            payment: response.data.payment,
          })
        );
        resolve(response.data.message);

        cb && cb();
      } else {
        reject(new Error("Unexpected status code"));
      }
    } catch (error) {
      // Handle errors
      if (error?.response) {
        if (error.response.status === 500) {
          reject(new Error(error.response.data.message));
        } else if (error.response.status === 400) {
          toast.error("Validation error", {
            autoClose: 2000,
            closeButton: true,
          });
          dispatch(paymentActions.setErrorValidation(error.response.data));
          reject(new Error("Validation error"));
        } else {
          reject(new Error("Error updating payment"));
        }
      } else {
        reject(
          new Error("Server is down, please check if your server is running")
        );
      }
    }
  });

  toast.promise(updatePaymentPromise, {
    pending: "Mise à jour du paiement en cours...",
    success: `Paiement effectué avec succès`,
    error: (error) => {
      if (error.message.includes("Validation error")) {
        return "Erreur de validation";
      } else if (error.message.includes("Server is down")) {
        return "Le serveur est hors service, veuillez vérifier s'il fonctionne";
      } else {
        return "Erreur lors de la mise à jour du paiement";
      }
    },
  });

  updatePaymentPromise.finally(() => {
    dispatch(paymentActions.setCreateLoading(false));
  });
};
export const updateCustempayment =
  (id, updatedpayment, cb) => async (dispatch) => {
    dispatch(paymentActions.setError(null));
    dispatch(paymentActions.setCreateLoading(true));

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await request.put(`/payments/${id}`, updatedpayment);
      if (response.status === 200) {
        dispatch(
          studentActions.updateStudentPayment({
            id,
            payment: response.data.payment,
          })
        );
        toast.success(response.data.message);
        cb && cb();
      }
    } catch (error) {
      if (error?.response) {
        if (error.response.status === 500) {
          toast.error(error.response.data.message, {
            autoClose: false,
            closeButton: true,
          });
        } else if (error.response.status === 400) {
          toast.error("Validation error", {
            autoClose: 2000,
            closeButton: true,
          });
          dispatch(paymentActions.setErrorValidation(error.response.data));
        } else {
          toast.error("Error updating payment", {
            autoClose: 5000,
            closeButton: true,
          });
        }
        // dispatch(paymentActions.setError(error.response.data.message));
      } else {
        dispatch(paymentActions.setPayment(null));
        toast.error("Server is down, please check if your server is running", {
          autoClose: 5000,
          closeButton: true,
        });
      }
    } finally {
      dispatch(paymentActions.setCreateLoading(false));
    }
  };

export const deletepayment = (id, cb) => async (dispatch) => {
  try {
    const response = await request.delete(`payments/${id}`);
    if (response.status === 200) {
      dispatch(paymentActions.removepayment(id));
      toast.success(response.data.message);
    }
  } catch (error) {
    if (error?.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(
        "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
      );
    }
  }
};
