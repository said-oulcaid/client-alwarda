import { toast } from "react-toastify";
import { request } from "../request";
import { centreActions } from "../slices/centreSlice";

export const getCentres = (cb) => async (dispatch) => {
  dispatch(centreActions.setError(null));
  dispatch(centreActions.setGetLoading(true));
  dispatch(centreActions.setCentres(null));
  try {
    // 
    const response = await request.get("/centres");
    dispatch(centreActions.setCentres(response.data));
    console.log(response)
  } catch (error) {
   
    // dispatch(centreActions.setError(null));
    dispatch(centreActions.setCentres(null));
    if (error?.response) {
      error.response.status === 500 &&
        dispatch(centreActions.setError(error.response.data.message));

     
    } else {
      dispatch(
        centreActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    cb && cb();
  } finally {
    dispatch(centreActions.setGetLoading(false));
  }
};

export const createCentre = (centre, cb) => async (dispatch) => {
  dispatch(centreActions.setError(null));
  dispatch(centreActions.setCreateLoading(true));

  try {
    ;
    const response = await request.post("/centres", centre);
    dispatch(centreActions.addCentre(response.data.centre));
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
      dispatch(centreActions.setErrorValidation(error.response.data));
    } else {
      toast.error(
        "Le serveur est en panne, vérifiez si votre serveur est démarré ?",
        {
          autoClose: 5000,
          closeButton: true,
        }
      );
    }
    // dispatch(centreActions.setError(null))F;
  } finally {
    dispatch(centreActions.setCreateLoading(false));
  }
};

export const getCentreById = (id, cb) => async (dispatch) => {
  dispatch(centreActions.setError(null));
  dispatch(centreActions.setGetLoadingById(true));
  dispatch(centreActions.setCentre(null));

  try {
    

    const response = await request.get(`/centres/${id}`);
    dispatch(centreActions.setCentre(response.data));
  } catch (error) {
  
    if (error?.response) {
      if (error.response.status === 500 || error.response.status === 404) {
        dispatch(centreActions.setError(error.response.data.message));
      } else {
        dispatch(
          centreActions.setError("Erreur lors de la récupération du centre")
        );
      }
    } else {
      dispatch(
        centreActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    dispatch(centreActions.setCentre(null));
    cb && cb();
  }
  finally {
    dispatch(centreActions.setGetLoadingById(false));
  }
};

export const updateCentre = (id, updatedCentre, cb) => async (dispatch) => {
  dispatch(centreActions.setError(null));
  dispatch(centreActions.setCreateLoading(true));
  dispatch(centreActions.setCentre(null));

  try {
    
    const response = await request.put(`/centres/${id}`, updatedCentre);
    if (response.status === 200){
      dispatch(centreActions.updateCentres({ id, centre: response.data.centre }));
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
        dispatch(centreActions.setErrorValidation(error.response.data));
      } else {
        toast.error("Error updating centre", {
          autoClose: 5000,
          closeButton: true,
        });
      }
      // dispatch(centreActions.setError(error.response.data.message));
    } else {
      toast.error("Server is down, please check if your server is running", {
        autoClose: 5000,
        closeButton: true,
      });
    }
  } finally {
    dispatch(centreActions.setCreateLoading(false));
  }
};

export const deleteCentre = (id, cb) => async (dispatch) => {
  try {
    const response = await request.delete(`centres/${id}`);
    if (response.status === 200){
      dispatch(centreActions.removeCentre(id))
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
