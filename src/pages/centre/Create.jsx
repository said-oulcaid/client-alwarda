import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCentre } from "../../redux/api/centreApi";
import { formatErrorField } from "../../utils/utils";
import { centreActions } from "../../redux/slices/centreSlice";

const Create = ({ isOpen, onOpenChange, onCreateChangeOpen }) => {
 
  const dispatch = useDispatch();

  const { errorValidation, loading } = useSelector((state) => state.centre);
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    location: "",
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createCentre(formData, () => {
        setFormData({ name: "", color: "", location: "" });
        onCreateChangeOpen();
      })
    );
  };
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", color: "", location: "" });
      dispatch(centreActions.setErrorValidation(null));
    }
  }, [isOpen, dispatch]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handelSubmit} className="dark:text-white">
            <ModalHeader className="flex flex-col gap-1">
              Crée une Nouvelle Centre
            </ModalHeader>
            <ModalBody >
              <Input
                size="lg"
                autoFocus
                label="Nome"
                placeholder="Enter Le Nom De Centre"
                variant="bordered"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
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
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
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
                className="p-1 h-10 w-14 block mx-auto bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                id="color"
                title="Choose your color"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, color: e.target.value }))
                }
                value={formData.color}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Ferme
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
