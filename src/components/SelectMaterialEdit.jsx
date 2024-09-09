import { useEffect, useState } from "react";
import { Chip, Select, SelectItem } from "@nextui-org/react";
import { formatErrorField } from "../utils/utils";
import { studentActions } from "../redux/slices/studentSlice";
import { useDispatch } from "react-redux";

export default function SelectMaterialEdit({ subjects, addSubjects, errorValidation, selectedKeys }) {
  const [values, setValues] = useState(selectedKeys);
  const dispatch = useDispatch();

  const handleSelectionChange = (selected) => {
    const selectedValues = Array.from(selected).map((value) => parseInt(value, 10));

    dispatch(studentActions.setErrorValidation(null));
    if (selectedValues.some(isNaN)) {
      setValues([]);
      addSubjects([]);
    } else {
      setValues(selectedValues);
      addSubjects(selectedValues);
    }
  };

  useEffect(() => {
    // Update the selected keys when `selectedKeys` changes (e.g., when the level changes)
    setValues(selectedKeys);
  }, [selectedKeys]);

  return (
    <>
      {subjects?.length === 0 ? (
        <div className="flex justify-center items-center py-2">
          <Chip color="danger" variant="bordered">
            il n'y a pas de matière à ce niveau
          </Chip>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2">
          <Select
            size="sm"
            label="Matières"
            selectionMode="multiple"
            placeholder="Sélectionnez les matières"
            selectedKeys={values.map(String)} // Ensure selectedKeys is an array of strings
            variant="bordered"
            className=""
            onSelectionChange={handleSelectionChange} // Update the handler to correctly handle selected values
            isInvalid={
              errorValidation &&
              formatErrorField(errorValidation, "subjectIds") &&
              true
            }
            errorMessage={
              errorValidation &&
              formatErrorField(errorValidation, "subjectIds") && (
                <ol>
                  {formatErrorField(errorValidation, "subjectIds").map((e) => (
                    <li key={e}>-{e}</li>
                  ))}
                </ol>
              )
            }
          >
            {subjects?.map((m) => (
              <SelectItem key={m.id} value={m.id + ""}>
                {m.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}
    </>
  );
}
