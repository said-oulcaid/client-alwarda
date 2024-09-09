import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../redux/api/userApi";
import { userActions } from "../../redux/slices/userSlice";
import { formatErrorField } from "../../utils/utils";
import { BsEye, BsEyeSlash, BsPatchCheckFill } from "react-icons/bs";
import { getCentres } from "../../redux/api/centreApi";
import ErrorAlert from "../../components/ErrorAlert";

const Edit = ({ isOpen, onOpenChange, SelectEditItem, itemToEdit }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState();

  const { user, errorValidation, error, loading } = useSelector(
    (state) => state.user
  );
  const { centres  } = useSelector((state) => state.centre);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    centreId: "",
  });
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (itemToEdit) {
      dispatch(getUserById(itemToEdit));
      setDisableBtn(true);
    }
    dispatch(getCentres());
  }, [dispatch, itemToEdit,isOpen]);
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...user, password: "" }));
    }
  }, [user]);
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(formData.centreId===""){
      itemToEdit.centreId=null
    }
    dispatch(updateUser(itemToEdit, formData,()=>onOpenChange()));
  };

  const handleClose = () => {
    if (isOpen) {
      SelectEditItem(null);

      setFormData({
        name: "",
        color: "",
        location: "",
      });
    }
    dispatch(userActions.setErrorValidation(null));
    
    onOpenChange();
  };
  const handelChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setDisableBtn(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      placement="center"
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handelSubmit} className="dark:text-white">
            <ModalHeader className="flex flex-col gap-1">
            Modifié l'Utilisateur
            </ModalHeader>
            <ModalBody>
              
              {!error &&
                (!loading.loadingGetById ? (
                  <div className="flex flex-col  gap-1 overflow-y-auto h-[360px]">
                    <Input size="lg"
                      autoFocus
                      label="Nome"
                      placeholder="Enter Le Nom D'etulisateur"
                      variant="bordered"
                      onChange={(e) =>
                        handelChange("firstName", e.target.value)
                      }
                      value={formData.firstName}
                      isInvalid={
                        errorValidation &&
                        formatErrorField(errorValidation, "firstName") &&
                        true
                      }
                      errorMessage={
                        errorValidation &&
                        formatErrorField(errorValidation, "firstName") && (
                          <ol>
                            {formatErrorField(errorValidation, "firstName").map(
                              (e) => (
                                <li>-{e}</li>
                              )
                            )}
                          </ol>
                        )
                      }
                    />
                    <Input size="lg"
                      label="Prenom"
                      placeholder="Enter Le Prenom D'etulisateur"
                      variant="bordered"
                      onChange={(e) => handelChange("lastName", e.target.value)}
                      value={formData.lastName}
                      isInvalid={
                        errorValidation &&
                        formatErrorField(errorValidation, "lastName") &&
                        true
                      }
                      errorMessage={
                        errorValidation &&
                        formatErrorField(errorValidation, "lastName") && (
                          <ol>
                            {formatErrorField(errorValidation, "lastName").map(
                              (e) => (
                                <li>-{e}</li>
                              )
                            )}
                          </ol>
                        )
                      }
                    />
                    <Input size="lg"
                      label="Email"
                      placeholder="email D'etulisateur"
                      variant="bordered"
                      onChange={(e) => handelChange("email", e.target.value)}
                      value={formData.email}
                      isInvalid={
                        errorValidation &&
                        formatErrorField(errorValidation, "email") &&
                        true
                      }
                      errorMessage={
                        errorValidation &&
                        formatErrorField(errorValidation, "email") && (
                          <ol>
                            {formatErrorField(errorValidation, "email").map(
                              (e) => (
                                <li>-{e}</li>
                              )
                            )}
                          </ol>
                        )
                      }
                    />
                    <Input size="lg"
                      label="Mot De Pass"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mot De Pass"
                      variant="bordered"
                      endContent={
                        formData.password &&
                        (!showPassword ? (
                          <BsEye
                            className="cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <BsEyeSlash
                            className="cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ))
                      }
                      onChange={(e) => handelChange("password", e.target.value)}
                      value={formData.password}
                      isInvalid={
                        errorValidation &&
                        formatErrorField(errorValidation, "password") &&
                        true
                      }
                      errorMessage={
                        errorValidation &&
                        formatErrorField(errorValidation, "password") && (
                          <ol>
                            {formatErrorField(errorValidation, "password").map(
                              (e) => (
                                <li>-{e}</li>
                              )
                            )}
                          </ol>
                        )
                      }
                    />
                    <Input size="lg"
                      label="Telephone"
                      placeholder="Exemple +212612345678"
                      variant="bordered"
                      onChange={(e) => handelChange("phone", e.target.value)}
                      value={formData.phone}
                      isInvalid={
                        errorValidation &&
                        formatErrorField(errorValidation, "phone") &&
                        true
                      }
                      errorMessage={
                        errorValidation &&
                        formatErrorField(errorValidation, "phone") && (
                          <ol>
                            {formatErrorField(errorValidation, "phone").map(
                              (e) => (
                                <li>-{e}</li>
                              )
                            )}
                          </ol>
                        )
                      }
                    />
                    <Select
                      label="Selectioné Le Centre"
                      className="dark:text-white"
                      variant="bordered"
                      onChange={(e) =>
                        handelChange("centreId", parseInt(e.target.value))
                      }
                      value={formData.centreId}
                      defaultSelectedKeys ={[user?.centreId+""]}
                  
                      isInvalid={
                        errorValidation &&
                        formatErrorField(errorValidation, "centreId") &&
                        true
                      }
                      errorMessage={
                        errorValidation &&
                        formatErrorField(errorValidation, "centreId") && (
                          <ol>
                            {formatErrorField(errorValidation, "centreId").map(
                              (e) => (
                                <li>-{e}</li>
                              )
                            )}
                          </ol>
                        )
                      }
                    >
                      {centres &&(
                        centres?.map((c) => (
                          <SelectItem
                            className="dark:text-white"
                            key={c.id}
                         
                            value={c.id}
                            endContent={
                              c.user ? (
                                <BsPatchCheckFill color="primary" />
                              ) : null
                            }
                          >
                            {c.name}
                          </SelectItem>
                        )))}
                    </Select>
                  </div>
                ) : (
                  <div className="py-6 flex w-full justify-center">
                    <Spinner size="lg" label="Chargement en cours..." />
                  </div>
                ))}
                {
                  error &&  <div className="mt-4">
                  <ErrorAlert message={error} />
                </div>
                }
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Annuler
              </Button>
              <Button color="success" type="submit" isDisabled={disableBtn} isLoading={loading.loadingCreate}>
              Modifié
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Edit;
