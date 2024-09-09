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
import { getCentres } from "../../redux/api/centreApi";
import { createUser } from "../../redux/api/userApi";
import { BsEye, BsEyeSlash} from "react-icons/bs";
import { BsPatchCheckFill } from "react-icons/bs";

import { formatErrorField } from "../../utils/utils";
import { userActions } from "../../redux/slices/userSlice";

const Create = ({ isOpen, onOpenChange }) => {
  const { centres } = useSelector((state) => state.centre);
  const { errorValidation, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const  [showPassword,setShowPassword] = useState()
  useEffect(() => {
    dispatch(getCentres());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    centreId: "",
  });
  const handelChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if(errorValidation){
      dispatch(userActions.setErrorValidation(null))
    }
  };
  const handelSubmit = (e) => {
    e.preventDefault();
 
    dispatch(createUser(formData,()=>{
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        centreId: "",
      })
      onOpenChange()}));
  };
  useEffect(() => {
    if (isOpen) {
      setFormData({     firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        centreId: "",});
      dispatch(userActions.setErrorValidation(null));
      dispatch(getCentres());
    }
  }, [isOpen, dispatch]);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handelSubmit} className="dark:text-white">
            <ModalHeader className="flex flex-col gap-1">
              Crée une Nouvelle Utilisateur
            </ModalHeader>
            <ModalBody>
            <div className="flex flex-col  gap-1 overflow-y-auto h-[360px]">
              <Input
              size="lg"
                label="Prenom"
                placeholder="Enter Le Prenom D'etulisateur"
                variant="bordered"
                onChange={(e) => handelChange("firstName", e.target.value)}
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
              />{" "}
              <Input
              size="lg"
                autoFocus
                label="Nome"
                placeholder="Enter Le Nom D'etulisateur"
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
              <Input
              size="lg"
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
                      {formatErrorField(errorValidation, "email").map((e) => (
                        <li>-{e}</li>
                      ))}
                    </ol>
                  )
                }
              />
              <Input
              size="lg"
                label="Mot De Pass"
                type={showPassword ? "text" :"password"}
                endContent={ !showPassword ? <BsEye className="cursor-pointer" onClick={()=>setShowPassword(!showPassword)}/> : <BsEyeSlash className="cursor-pointer" onClick={()=>setShowPassword(!showPassword)}/> }
                placeholder="Mot De Pass"
                variant="bordered"
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
              <Input
              size="lg"
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
                      {formatErrorField(errorValidation, "phone").map((e) => (
                        <li>-{e}</li>
                      ))}
                    </ol>
                  )
                }
              />
              {centres ? (
                <Select
                size="lg"
                  label="Selectioné Le Centre"
                  className="dark:text-white"
                  variant="bordered"
                  onChange={(e) =>
                    handelChange("centreId", parseInt(e.target.value))
                  }
                  value={formData.centreId}
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
                  {centres?.map((c, i) => (
                    <SelectItem
                    
                      className="dark:text-white text-gray-900"
                      key={c.id}
                      value={c.id}
                      endContent={
                        c.user ? <BsPatchCheckFill  color="primary"/> :null
                      }
                    >
                      {c.name}
                    </SelectItem>
                  ))}
                </Select>
              ) : (
                <div className="w-full flex justify-center">
                  <Spinner
                    size="sm"
                    className="m-auto"
                    label="Chargement en cours..."
                  />
                </div>
              )}</div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Annuler
              </Button>
              <Button
                color="success"
                type="submit"
                isLoading={loading.loadingCreate}
              >
                Crée
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Create;
