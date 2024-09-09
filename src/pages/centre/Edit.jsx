import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCentreById, updateCentre } from "../../redux/api/centreApi";
import { formatErrorField } from "../../utils/utils";
import { centreActions } from "../../redux/slices/centreSlice";
import ErrorAlert from "../../components/ErrorAlert";

const Edit = ({ isOpen, onOpenChange, itemToEdit, SelectEditItem }) => {
 
  const dispatch = useDispatch();
  const { centre, loading, errorValidation,error } = useSelector(
    (state) => state.centre
  );
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    location: "",
  });
  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    if (itemToEdit) {
      dispatch(getCentreById(itemToEdit));
      setDisableBtn(true);
    }
  }, [dispatch, itemToEdit]);
  useEffect(() => {
    if (centre) {
      const { students, user, ...res } = centre;
      setFormData((prev) => res);
    }
  }, [centre]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCentre(itemToEdit, formData, () => onOpenChange()));
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
    dispatch(centreActions.setErrorValidation(null));

    onOpenChange();
  };
  const handelChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setDisableBtn(false);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} placement="center">
      <ModalContent>
        <form onSubmit={handleSubmit} className="dark:text-white">
          <ModalHeader className="flex flex-col gap-1">
            Modifié Le Centre
          </ModalHeader>
          <ModalBody>
            { !error && (!loading.loadingGetById   ? (
              <>
                {" "}
                <Input
                  size="lg"
                  autoFocus
                  label="Nome"
                  placeholder="Enter Le Nom De Centre"
                  variant="bordered"
                  onChange={(e) => handelChange("name", e.target.value)}
                  value={formData.name}
                  id="name"
                  isInvalid={
                    errorValidation &&
                    formatErrorField(errorValidation, "name") &&
                    true
                  }
                  errorMessage={
                    errorValidation &&
                    formatErrorField(errorValidation, "name") && (
                      <ol>
                        {formatErrorField(errorValidation, "name").map((e) => (
                          <li>-{e}</li>
                        ))}
                      </ol>
                    )
                  }
                />
                <Input
                  size="lg"
                  label="Adress"
                  placeholder="Enter L'Adress De Centre"
                  variant="bordered"
                  onChange={(e) => handelChange("location", e.target.value)}
                  value={formData.location}
                  id="location"
                  isInvalid={
                    errorValidation &&
                    formatErrorField(errorValidation, "location") &&
                    true
                  }
                  errorMessage={
                    errorValidation &&
                    formatErrorField(errorValidation, "location") && (
                      <ol>
                        {formatErrorField(errorValidation, "location").map(
                          (e) => (
                            <li>-{e}</li>
                          )
                        )}
                      </ol>
                    )
                  }
                />
                <div>
                  <label
                    htmlFor="color"
                    className="block text-sm font-medium   w-fit"
                  >
                    Choisire un coleur
                  </label>
                  {errorValidation &&
                    formatErrorField(errorValidation, "color") &&
                    formatErrorField(errorValidation, "color").map((e) => (
                      <p className="text-danger text-xs ms-1">-{e}</p>
                    ))}
                </div>
                <input
                  type="color"
                  className="p-1 h-10 w-14 block mx-auto bg-white border border-gray-200 cursor-pointer rounded-lg disableBtnd:opacity-50 disableBtnd:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                  id="color"
                  title="Choose your color"
                  onChange={(e) => handelChange("color", e.target.value)}
                  value={formData.color}
                />
              </>
            ) : (
              <div className="py-6 flex w-full justify-center">
                <Spinner size="lg"  label="Chargement en cours..." />
              </div>
            ))}
            {
              error && <ErrorAlert message={error} />
            }
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              Fermer
            </Button>
            <Button
              color="success"
              type="submit"
              isDisabled={disableBtn}
              isLoading={loading.loadingCreate}
            >
              Mettre à jour
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Edit;