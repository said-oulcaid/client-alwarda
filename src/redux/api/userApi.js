import { toast } from "react-toastify";
import { request } from "../request";
import { userActions } from "../slices/userSlice";


export const getUsers = (cb) => async (dispatch) => {
  dispatch(userActions.setError(null));
  dispatch(userActions.setGetLoading(true));
  dispatch(userActions.setUsers(null));
  try {
        // 

    const response = await request.get("/users");
    dispatch(userActions.setUsers(response.data));
  } catch (error) {
    
    
    if (error?.response) {
      dispatch(userActions.setError(error.response.data.message));
    } else {
      dispatch(userActions.setError("Le serveur est en panne, veuillez vérifier si votre serveur fonctionne"));
    }
    cb && cb();
  } finally {
    dispatch(userActions.setGetLoading(false));
  }
};


export const createUser = (user, cb) => async (dispatch) => {
  dispatch(userActions.setError(null));
  dispatch(userActions.setCreateLoading(true));
  try {
    // await new Promise((resolve)=>setTimeout(resolve,3000))

    const response = await request.post("/users", user);
    dispatch(userActions.addUser(response.data.user));
    toast.success(response.data.message);
    cb && cb();
  } catch (error) {
    
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error("Erreur de validation", {
          autoClose: 2000,
          closeButton: true,
        });
        dispatch(userActions.setErrorValidation(error.response.data));
      } else {
        toast.error(error.response.data.message, {
          autoClose: false,
          closeButton: true,
        });
      }
    } else {
      toast.error("Le serveur est en panne, veuillez vérifier si votre serveur fonctionne", {
        autoClose: 5000,
        closeButton: true,
      });
    }
  } finally {
    dispatch(userActions.setCreateLoading(false));
  }
};

// Fetch a user by ID
export const getUserById = (id, cb) => async (dispatch) => {
  dispatch(userActions.setError(null));
  dispatch(userActions.setGetLoadingById(true));
  dispatch(userActions.setUser(null));
  try {
    const response = await request.get(`/users/${id}`);
   
    dispatch(userActions.setUser(response.data));
  } catch (error) {
   
    if (error?.response) {
      dispatch(userActions.setError(error.response.data.message));
    } else {
      dispatch(userActions.setError("Le serveur est en panne, veuillez vérifier si votre serveur fonctionne"));
    }
    dispatch(userActions.setUser(null));
    cb && cb();
  } finally {
    dispatch(userActions.setGetLoadingById(false));
  }
};

// Update a user by ID
export const updateUser = (id, updatedUser={}, cb) => async (dispatch) => {
  dispatch(userActions.setError(null));
  dispatch(userActions.setCreateLoading(true));
  let formData = { ...updatedUser };

  
  if (!formData.password) {
    delete formData.password;
  }
  if ( !formData.centreId ) {
    delete formData.centreId;
  }
  try {
    

    const response = await request.put(`/users/${id}`, formData);
   if(response.status === 200){
    dispatch(userActions.updateUsers({ id, user: response.data.user }));
    toast.success(response.data.message);
    cb && cb();
   } 
  } catch (error) {
    
    if (error?.response) {
      if (error.response.status === 400) {
        toast.error("Erreur de validation", {
          autoClose: 2000,
          closeButton: true,
        });
        dispatch(userActions.setErrorValidation(error.response.data));
      } else {
        toast.error("Erreur de mise à jour de l'utilisateur", {
          autoClose: 5000,
          closeButton: true,
        });
      }
    } else {
      toast.error("Le serveur est en panne, veuillez vérifier si votre serveur fonctionne", {
        autoClose: 5000,
        closeButton: true,
      });
    }
  } finally {
    dispatch(userActions.setCreateLoading(false));
  }
};

// Delete a user by ID
export const deleteUser = (id, cb) => async (dispatch) => {
  try {
    const response = await request.delete(`/users/${id}`);
   if (response.status === 200){
    dispatch(userActions.removeUser(id));
    toast.success(response.data.message);
   }

  } catch (error) {
    
    if (error?.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Le serveur est en panne, veuillez vérifier si votre serveur fonctionne");
    }
  }
};
