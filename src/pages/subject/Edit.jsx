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
import { getSubjectById, updateSubject } from "../../redux/api/subjectApi";
import { formatErrorField } from "../../utils/utils";
import { subjectActions } from "../../redux/slices/subjectSlice";
import ErrorAlert from "../../components/ErrorAlert";

const Edit = ({ isOpen, onOpenChange, itemToEdit, SelectEditItem }) => {

  const dispatch = useDispatch();
  const { subject, loading, errorValidation, error } = useSelector(
    (state) => state.subject
  );
  const { levels } = useSelector((state) => state.level);

  const [formData, setFormData] = useState({
    name: "",
    pricePerMonth: "",
    levelId: "",
    school: "",
  });

  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (itemToEdit) {
      dispatch(getSubjectById(itemToEdit));
      setDisableBtn(true);
    }
  }, [dispatch, itemToEdit]);

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name,
        pricePerMonth: subject.pricePerMonth,
        levelId: subject.levelId,
        school: subject.school,
      });
    }
  }, [subject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSubject(itemToEdit, formData, () => onOpenChange()));
  };

  const handleClose = () => {
    if (isOpen) {
      SelectEditItem(null);
      setFormData({
        name: "",
        pricePerMonth: "",
        levelId: "",
        school: "",
      });
    }
    dispatch(subjectActions.setErrorValidation(null));
    onOpenChange();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setDisableBtn(false);
  };
  console.log(subject )

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} placement="center">
      <ModalContent>
        <form onSubmit={handleSubmit} className="dark:text-white">
          <ModalHeader className="flex flex-col gap-1">
            Modifier Le Matiére
          </ModalHeader>
          <ModalBody>
            {!error && !loading.loadingGetById ? (
              <>
                <Input
                  size="sm"
                  autoFocus
                  label="Nom"
                  placeholder="Enter Le Nom De Matière"
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
                          <li key={e}>-{e}</li>
                        ))}
                      </ol>
                    )
                  }
                />
                <Input
                  size="sm"
                  label="Prix"
                  placeholder="Enter Le Prix"
                  variant="bordered"
                  type="number"
                  min="0"
                  onChange={(e) => handleChange("pricePerMonth", e.target.value)}
                  value={formData.pricePerMonth}
                  id="pricePerMonth"
                  isInvalid={
                    errorValidation &&
                    formatErrorField(errorValidation, "pricePerMonth") &&
                    true
                  }
                  errorMessage={
                    errorValidation &&
                    formatErrorField(errorValidation, "pricePerMonth") && (
                      <ol>
                        {formatErrorField(errorValidation, "pricePerMonth").map(
                          (e) => (
                            <li key={e}>-{e}</li>
                          )
                        )}
                      </ol>
                    )
                  }
                />
                <Select
                  size="sm"
                  label="Niveaux"
                  placeholder="Sélectionnez Le Niveau"
                  variant="bordered"
                  onChange={(e) => handleChange("levelId", e.target.value)}
                  value={formData.levelId}
                  defaultSelectedKeys={[subject ?  subject?.levelId + "" : "" ]}
                >
                  {levels?.map((level) => (
                    <SelectItem key={level.id} value={level.id} className="dark:text-white" endContent={level.type}>
                      {level.name}
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
              Modifier
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Edit;
