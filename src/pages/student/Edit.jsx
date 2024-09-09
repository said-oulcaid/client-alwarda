import {
  Button,
  Checkbox,
  Chip,
  DatePicker,
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
import { getLevels } from "../../redux/api/levelApi";
import { getSubjectsByLevel } from "../../redux/api/subjectApi";
import { studentActions } from "../../redux/slices/studentSlice";
import { parseDate } from "@internationalized/date";
import { getstudentById, updateStudent } from "../../redux/api/studentApi";
import { formatErrorField } from "../../utils/utils";
import SelectMaterialEdit from "../../components/SelectMaterialEdit";

const Edit = ({ isOpen, onOpenChange, itemToEdit, SelectEditItem }) => {
  const dispatch = useDispatch();
  const { centres } = useSelector((state) => state.centre);
  const { levels } = useSelector((state) => state.level);
  const [currentMonth,setCurrentMonth]=useState(false)
  const { loading, errorValidation, student } = useSelector(
    (state) => state.student
  );
  const { subjects, loading: subjectsLoading } = useSelector(
    (state) => state.subject
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    sex: "",
    phone: "",
    phoneParent: "",
    registrationDate: "",
    centreId: "",
    levelId: "",
    subjectIds: [],
    currentMonth:false
  });
  const [subjectsIds, setSubjectsIds] = useState([]);
  useEffect(() => {
    if (formData.levelId !== "") {
      dispatch(getSubjectsByLevel(formData.levelId));
      if (formData?.levelId != student?.levelId) {
        setFormData((prev) => ({
          ...prev,
          subjectIds: [],
        }));

        setSubjectsIds([]);
      } else {
        setFormData((prev) => ({
          ...prev,
          subjectIds: student.subjects.map((s) => s.id + ""),
        }));

        setSubjectsIds(student.subjects.map((s) => s.id));
      }
    }
  }, [dispatch, formData.levelId, student?.levelId, student?.subjects]);
  useEffect(() => {
    dispatch(getCentres());
    dispatch(getLevels());
  }, [dispatch, itemToEdit, student]);
  useEffect(() => {
    if (itemToEdit) {
      dispatch(getstudentById(itemToEdit));
    } else {
      resetFormData();
    }
  }, [itemToEdit, dispatch]);
  console.log(itemToEdit);
  useEffect(() => {
    dispatch(studentActions.setErrorValidation(null));
  }, [isOpen, dispatch]);

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      // subjectIds:
      //   student?.levelId === formData.levelId
      //     ? formData.subjectIds.map((s) => parseInt(s))
      //     : [],
    });

    dispatch(
      updateStudent(
        itemToEdit,
        {
          ...formData,
          currentMonth:currentMonth,
          subjectsIds: formData.subjectIds.map((s) => parseInt(s)),
        },
        openChange
      )
    );
  };
  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      sex: "",
      phone: "",
      phoneParent: "",
      registrationDate: "",
      centreId: "",
      levelId: "",
      subjectIds: [],
      currentMonth:false
    });
    setSubjectsIds([]); // Clear subjects as well
  };
  const openChange = () => {
    if (isOpen) {
      SelectEditItem(null);
      resetFormData();
    }
    onOpenChange();
  };
  useEffect(() => {
    if (student) {
      setFormData({
        ...student,
        currentMonth:false,
        subjectIds:
          student.subjects.length > 0
            ? student.subjects.map((s) => s.id + "")
            : [],
      });
      setSubjectsIds(
        student.subjects.length > 0 ? student.subjects.map((s) => s.id) : []
      );
    }
  }, [student]);

  return (
    <Modal isOpen={isOpen} onOpenChange={openChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handelSubmit} className="dark:text-white">
            <ModalHeader className="flex flex-col gap-1">
              Modifié Le eleve
            </ModalHeader>
            <ModalBody>
              {loading.loadingGetById && (
                <div className="w-full h-full flex items-center justify-center">
                  <Spinner />
                </div>
              )}
              {student && (
                <div className="flex flex-col pr-2 gap-1 overflow-y-auto h-[360px]">
                  <Input
                    autoFocus
                    label="Nom"
                    placeholder="Enter Le Nom D'eleve"
                    variant="bordered"
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }));
                      dispatch(studentActions.setErrorValidation(null));
                    }}
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
                              <li key={e}>-{e}</li>
                            )
                          )}
                        </ol>
                      )
                    }
                  />
                  <Input
                    autoFocus
                    label="Prenom"
                    placeholder="Enter Le Prenom D'eleve"
                    variant="bordered"
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }));
                      dispatch(studentActions.setErrorValidation(null));
                    }}
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
                              <li key={e}>-{e}</li>
                            )
                          )}
                        </ol>
                      )
                    }
                  />

                  <Select
                    label="Sex"
                    placeholder="Selectioné Le Sex"
                    variant="bordered"
                    selectedKeys={[formData.sex]}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, sex: e.target.value }));
                      dispatch(studentActions.setErrorValidation(null));
                    }}
                    value={formData.sex}
                    isInvalid={
                      errorValidation &&
                      formatErrorField(errorValidation, "sex") &&
                      true
                    }
                    errorMessage={
                      errorValidation &&
                      formatErrorField(errorValidation, "sex") && (
                        <ol>
                          {formatErrorField(errorValidation, "sex").map((e) => (
                            <li key={e}>-{e}</li>
                          ))}
                        </ol>
                      )
                    }
                  >
                    {[
                      { label: "garçon", value: "HOMME" },
                      { label: "fille", value: "FEMME" },
                    ].map((sex) => (
                      <SelectItem className="dark:text-white" key={sex.value}>
                        {sex.value}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    autoFocus
                    label="Télé Personnee"
                    placeholder="Enter Le Télé D'eleve"
                    variant="bordered"
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }));
                      dispatch(studentActions.setErrorValidation(null));
                    }}
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
                              <li key={e}>-{e}</li>
                            )
                          )}
                        </ol>
                      )
                    }
                  />
                  <Input
                    autoFocus
                    label="Télé Parents"
                    placeholder="Enter Le Télé De Parents "
                    variant="bordered"
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        phoneParent: e.target.value,
                      }));
                      dispatch(studentActions.setErrorValidation(null));
                    }}
                    value={formData.phoneParent}
                    isInvalid={
                      errorValidation &&
                      formatErrorField(errorValidation, "phoneParent") &&
                      true
                    }
                    errorMessage={
                      errorValidation &&
                      formatErrorField(errorValidation, "phoneParent") && (
                        <ol>
                          {formatErrorField(errorValidation, "phoneParent").map(
                            (e) => (
                              <li key={e}>-{e}</li>
                            )
                          )}
                        </ol>
                      )
                    }
                  />
                  <DatePicker
                    defaultValue={
                      student &&
                      parseDate(student?.registrationDate.split("T")[0])
                    }
                    label="Inscri Le"
                    variant="bordered"
                    showMonthAndYearPickers
                    onChange={(newDate) => {
                      setFormData((prev) => ({
                        ...prev,
                        registrationDate: new Date(newDate).toISOString(),
                      }));
                    }}
                    isInvalid={
                      errorValidation &&
                      formatErrorField(errorValidation, "registrationDate") &&
                      true
                    }
                    errorMessage={
                      errorValidation &&
                      formatErrorField(errorValidation, "registrationDate") && (
                        <ol>
                          {formatErrorField(
                            errorValidation,
                            "registrationDate"
                          ).map((e) => (
                            <li key={e}>-{e}</li>
                          ))}
                        </ol>
                      )
                    }
                  />
                  <Select
                    label="Centre"
                    placeholder="Selectioné Le Centre "
                    selectedKeys={[formData.centreId + ""]}
                    variant="bordered"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        centreId: parseInt(e.target.value),
                      }))
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
                              <li key={e}>-{e}</li>
                            )
                          )}
                        </ol>
                      )
                    }
                  >
                    {centres?.map((centre) => (
                      <SelectItem className="dark:text-white" key={centre.id}>
                        {centre.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    className="dark:text-white"
                    label="Niveau"
                    placeholder="Selectioné Le Niveau"
                    variant="bordered"
                    selectedKeys={[formData.levelId + ""]}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        levelId: parseInt(e.target.value),
                      }));
                      dispatch(studentActions.setErrorValidation(null));
                    }}
                    value={formData.levelId}
                    isInvalid={
                      errorValidation &&
                      formatErrorField(errorValidation, "levelId") &&
                      true
                    }
                    errorMessage={
                      errorValidation &&
                      formatErrorField(errorValidation, "levelId") && (
                        <ol>
                          {formatErrorField(errorValidation, "levelId").map(
                            (e) => (
                              <li key={e}>-{e}</li>
                            )
                          )}
                        </ol>
                      )
                    }
                  >
                    {levels?.map((level) => (
                      <SelectItem
                        className="dark:text-white"
                        key={level.id}
                        endContent={level?.type}
                        subjects={subjects}
                        addSubjects={(values) => {
                          setFormData((prev) => ({
                            ...prev,
                            subjectIds: values,
                          }));
                          dispatch(studentActions.setErrorValidation(null));
                        }}
                        errorValidation={errorValidation}
                      >
                        {level.name}
                      </SelectItem>
                    ))}
                  </Select>

                  {subjectsLoading.loadingGet ? (
                    <div className="flex items-center justify-center w-full">
                      <Spinner />
                    </div>
                  ) : formData.levelId === "" ? (
                    <div className="flex justify-center items-cenetr py-2 ">
                      <Chip color="warning" variant="bordered">
                        choisire chine niveau pour selectioné les matiértes
                      </Chip>
                    </div>
                  ) : (<>
                    <SelectMaterialEdit
                      subjects={subjects}
                      selectedKeys={subjectsIds}
                      addSubjects={(values) => {
                        setFormData((prev) => ({
                          ...prev,
                          subjectIds: values,
                        }));
                        dispatch(studentActions.setErrorValidation(null));
                      }}
                      errorValidation={errorValidation}
                    />
                    <Checkbox isSelected={currentMonth} onValueChange={setCurrentMonth}>Inclure le mois en cours dans les mises à jour des Matières</Checkbox>
                    </>
                  )}
                </div>
              )}
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
                Edite
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Edit;
