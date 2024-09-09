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
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLevel } from "../../redux/api/levelApi"; 
import { formatErrorField } from "../../utils/utils";
import { levelActions } from "../../redux/slices/levelSlice"; 
const types = ["ECOLE_PRIMAIRE", "COLLEGE", "LYCEE"];
const Create = ({ isOpen, onOpenChange, onCreateChangeOpen }) => {

  const dispatch = useDispatch();
  const { errorValidation, loading } = useSelector((state) => state.level);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createLevel(formData, () => {
        setFormData({ name: "" });
        onCreateChangeOpen();
      })
    );

  };

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "" });
      dispatch(levelActions.setErrorValidation(null));
    }
  }, [isOpen, dispatch]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handelSubmit} className="dark:text-white">
            <ModalHeader className="flex flex-col gap-1">
              Créer une Nouvelle Niveau
            </ModalHeader>
            <ModalBody>
              <Input
                size="sm"
                autoFocus
                label="Nom"
                placeholder="Enter Le Nom De Niveau"
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
                        <li key={e}>-{e}</li>
                      ))}
                    </ol>
                  )
                }
              />
              <Select
                size="sm"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, type: e.target.value }))
                }
                value={formData.type}
                label="Grade"
                placeholder="Selctioné Le Grad De Niveau"
                variant="bordered"
                id="type"
                isInvalid={
                  errorValidation &&
                  formatErrorField(errorValidation, "type") &&
                  true
                }
                errorMessage={
                  errorValidation &&
                  formatErrorField(errorValidation, "type") && (
                    <ol>
                      {formatErrorField(errorValidation, "type").map((e) => (
                        <li key={e}>-{e}</li>
                      ))}
                    </ol>
                  )
                }
              >
                {types.map((s) => (
                  <SelectItem value={s} key={s} className="dark:text-white">
                    {s}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fermer
              </Button>
              <Button
                color="success"
                type="submit"
                isLoading={loading.loadingCreate}
              >
                Créer
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Create;
