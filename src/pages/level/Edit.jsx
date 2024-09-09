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
  import { getLevelById, updateLevel } from "../../redux/api/levelApi";
  import { formatErrorField } from "../../utils/utils";
  import { levelActions } from "../../redux/slices/levelSlice";
  import ErrorAlert from "../../components/ErrorAlert";
  const types = [  "ECOLE_PRIMAIRE", "COLLEGE", "LYCEE"];

  const Edit = ({ isOpen, onOpenChange, itemToEdit, SelectEditItem }) => {
  
    const dispatch = useDispatch();
    const { level, loading, errorValidation, error } = useSelector(
      (state) => state.level
    );
    const [formData, setFormData] = useState({
      name: "",
      type: "",
    });
    const [disableBtn, setDisableBtn] = useState(true);
  
    useEffect(() => {
      if (itemToEdit) {
        dispatch(getLevelById(itemToEdit));
        setDisableBtn(true);
      }
    }, [dispatch, itemToEdit]);
  
    useEffect(() => {
      if (level) {
        setFormData(level);
      }
    }, [level]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateLevel(itemToEdit, formData, () => onOpenChange()));
    };
  
    const handleClose = () => {
      if (isOpen) {
        SelectEditItem(null);
        setFormData({
          type: "",
          color: "",
        });
      }
      dispatch(levelActions.setErrorValidation(null));
      onOpenChange();
    };
  
    const handleChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setDisableBtn(false);
    };
  
    return (
      <Modal isOpen={isOpen} onOpenChange={handleClose} placement="center">
        <ModalContent>
          <form onSubmit={handleSubmit} className="dark:text-white">
            <ModalHeader className="flex flex-col gap-1">
              Modifier le Niveau
            </ModalHeader>
            <ModalBody>
              {!error && !loading.loadingGetById ? (
                <>
                  <Input
                    size="lg"
                    autoFocus
                    label="Nom"
                    placeholder="Entrer le nom du niveau"
                    variant="bordered"
                    onChange={(e) => handleChange("name", e.target.value)}
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
                    <Select
                onChange={(e) => handleChange("type", e.target.value)}
                defaultSelectedKeys={[level?.type+'']}
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
                </>
              ) : (
                <div className="py-6 flex w-full justify-center">
                  <Spinner size="lg" label="Chargement en cours..." />
                </div>
              )}
              {error && <ErrorAlert message={error} />}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleClose}>
                Fermer
              </Button>
              <Button
                color="success"
                type="submit"
                isDisabled={disableBtn}
                isLoading={loading.loadingUpdate}
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
  