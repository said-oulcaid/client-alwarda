import { toast } from "react-toastify";
import { request } from "../request";
import { levelActions } from "../slices/levelSlice";

export const getLevels = (cb) => async (dispatch) => {
  dispatch(levelActions.setError(null));
  dispatch(levelActions.setGetLoading(true));
  dispatch(levelActions.setLevels(null));
  try {
    const response = await request.get("/levels");
    dispatch(levelActions.setLevels(response.data));
   
  } catch (error) {
    
    dispatch(levelActions.setLevels(null));
    if (error?.response) {
      error.response.status === 500 &&
        dispatch(levelActions.setError(error.response.data.message));
    } else {
      dispatch(
        levelActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    cb && cb();
  } finally {
    dispatch(levelActions.setGetLoading(false));
  }
};
export const getLevelsBySchool = (school,cb) => async (dispatch) => {
  dispatch(levelActions.setError(null));
  dispatch(levelActions.setGetLoading(true));
  dispatch(levelActions.setLevels(null));
  try {
       

    const response = await request.get(`/levels/school/${school}`);
    dispatch(levelActions.setLevels(response.data));

  } catch (error) {
    
    dispatch(levelActions.setLevels(null));
    if (error?.response) {
      error.response.status === 500 &&
        dispatch(levelActions.setError(error.response.data.message));
    } else {
      dispatch(
        levelActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    cb && cb();
  } finally {
    dispatch(levelActions.setGetLoading(false));
  }
};

export const createLevel = (level, cb) => async (dispatch) => {
  dispatch(levelActions.setError(null));
  dispatch(levelActions.setCreateLoading(true));

  try {
    
    const response = await request.post("/levels", level);
    dispatch(levelActions.addLevel(response.data.level));
    toast.success(response.data.message);
    cb && cb();
  } catch (error) {
  
    if (error?.response) {
      if (error.response.status === 500) {
        toast.error(error.response.data.message, {
          autoClose: false,
          closeButton: true,
        });
      } else if (error.response.status === 400) {
        toast.error("Erreur de validation", {
          autoClose: 2000,
          closeButton: true,
        });
        dispatch(levelActions.setErrorValidation(error.response.data));
      }
    } else {
      toast.error(
        "Le serveur est en panne, vérifiez si votre serveur est démarré ?",
        {
          autoClose: 5000,
          closeButton: true,
        }
      );
    }
  } finally {
    dispatch(levelActions.setCreateLoading(false));
  }
};

export const getLevelById = (id, cb) => async (dispatch) => {
  dispatch(levelActions.setError(null));
  dispatch(levelActions.setGetLoadingById(true));
  dispatch(levelActions.setLevel(null));

  try {
    
    const response = await request.get(`/levels/${id}`);
    dispatch(levelActions.setLevel(response.data));
  } catch (error) {
   
    if (error?.response) {
      if (error.response.status === 500 || error.response.status === 404) {
        dispatch(levelActions.setError(error.response.data.message));
      } else {
        dispatch(
          levelActions.setError("Erreur lors de la récupération du level")
        );
      }
    } else {
      dispatch(
        levelActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    dispatch(levelActions.setLevel(null));
    cb && cb();
  } finally {
    dispatch(levelActions.setGetLoadingById(false));
  }
};

export const updateLevel = (id, updatedLevel, cb) => async (dispatch) => {
  dispatch(levelActions.setError(null));
  dispatch(levelActions.setCreateLoading(true));
  dispatch(levelActions.setLevel(null));

  try {
    
    const response = await request.put(`/levels/${id}`, updatedLevel);
    if (response.status === 200) {
      dispatch(levelActions.updateLevels({ id, level: response.data.level }));
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
        toast.error("Erreur de validation", {
          autoClose: 2000,
          closeButton: true,
        });
        dispatch(levelActions.setErrorValidation(error.response.data));
      } else {
        toast.error("Erreur lors de la mise à jour du level", {
          autoClose: 5000,
          closeButton: true,
        });
      }
    } else {
      toast.error("Le serveur est en panne, vérifiez si votre serveur est démarré ?", {
        autoClose: 5000,
        closeButton: true,
      });
    }
  } finally {
    dispatch(levelActions.setCreateLoading(false));
  }
};

export const deleteLevel = (id, cb) => async (dispatch) => {
  try {
    const response = await request.delete(`/levels/${id}`);
    if (response.status === 200) {
      dispatch(levelActions.removeLevel(id));
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
