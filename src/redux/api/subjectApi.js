import { toast } from "react-toastify";
import { request } from "../request";
import { subjectActions } from "../slices/subjectSlice";

export const getSubjects = (cb) => async (dispatch) => {
  dispatch(subjectActions.setError(null));
  dispatch(subjectActions.setGetLoading(true));
  dispatch(subjectActions.setSubjects(null));
  try {
    const response = await request.get("/subjects");
    dispatch(subjectActions.setSubjects(response.data));
  } catch (error) {
   
    dispatch(subjectActions.setSubjects(null));
    if (error?.response) {
      error.response.status === 500 &&
        dispatch(subjectActions.setError(error.response.data.message));
    } else {
      dispatch(
        subjectActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    cb && cb();
  } finally {
    dispatch(subjectActions.setGetLoading(false));
  }
};
export const getSubjectsByLevel = (levelId,cb) => async (dispatch) => {
  dispatch(subjectActions.setError(null));
  dispatch(subjectActions.setGetLoading(true));
  dispatch(subjectActions.setSubjects(null));
  try {
    const response = await request.get(`/subjects/level/${levelId}`);
   
    dispatch(subjectActions.setSubjects(response.data));
  } catch (error) {
   
    dispatch(subjectActions.setSubjects(null));

    if (error?.response) {
      error.response.status === 500 &&
        dispatch(subjectActions.setError(error.response.data.message));
    } else {
      dispatch(
        subjectActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    cb && cb();
  } finally {
    dispatch(subjectActions.setGetLoading(false));
  }
};

export const createSubject = (subject, cb) => async (dispatch) => {
  dispatch(subjectActions.setError(null));
  dispatch(subjectActions.setCreateLoading(true));

  try {
    
    const response = await request.post("/subjects", subject);
    dispatch(subjectActions.addSubject(response.data.subject));
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
        dispatch(subjectActions.setErrorValidation(error.response.data));
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
    dispatch(subjectActions.setCreateLoading(false));
  }
};

export const getSubjectById = (id, cb) => async (dispatch) => {
  dispatch(subjectActions.setError(null));
  dispatch(subjectActions.setGetLoadingById(true));
  dispatch(subjectActions.setSubject(null));

  try {
    
    const response = await request.get(`/subjects/${id}`);
    dispatch(subjectActions.setSubject(response.data));
  } catch (error) {
   
    if (error?.response) {
      if (error.response.status === 500 || error.response.status === 404) {
        dispatch(subjectActions.setError(error.response.data.message));
      } else {
        dispatch(
          subjectActions.setError("Erreur lors de la récupération du sujet")
        );
      }
    } else {
      dispatch(
        subjectActions.setError(
          "Le serveur est en panne, vérifiez si votre serveur est démarré ?"
        )
      );
    }
    dispatch(subjectActions.setSubject(null));
    cb && cb();
  } finally {
    dispatch(subjectActions.setGetLoadingById(false));
  }
};

export const updateSubject = (id, updatedSubject, cb) => async (dispatch) => {
  dispatch(subjectActions.setError(null));
  dispatch(subjectActions.setCreateLoading(true));
  dispatch(subjectActions.setSubject(null));

  try {
    
    const response = await request.put(`/subjects/${id}`, updatedSubject);
    if (response.status === 200) {
      dispatch(subjectActions.updateSubjects({ id, subject: response.data.subject }));
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
        dispatch(subjectActions.setErrorValidation(error.response.data));
      } else {
        toast.error("Erreur lors de la mise à jour du sujet", {
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
    dispatch(subjectActions.setCreateLoading(false));
  }
};

export const deleteSubject = (id, cb) => async (dispatch) => {
  try {
    const response = await request.delete(`/subjects/${id}`);
    if (response.status === 200) {
      dispatch(subjectActions.removeSubject(id));
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
