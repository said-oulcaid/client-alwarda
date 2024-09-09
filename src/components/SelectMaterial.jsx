import { useEffect, useState } from "react";
import { Chip, Select, SelectItem } from "@nextui-org/react";
import { RiCloseCircleLine } from "react-icons/ri";
import { formatErrorField } from "../utils/utils";
import { studentActions } from "../redux/slices/studentSlice";
import { useDispatch } from "react-redux";

export default function SelectMaterial({ subjects,addSubjects,errorValidation }) {
  const [values, setValues] = useState([]);
 const dispatch= useDispatch()
  const handleSelectionChange = (e) => {
    const values = e.target.value.split(",").map((e) => parseInt(e));

    dispatch(studentActions.setErrorValidation(null))
    if (values.some(isNaN)) {
      setValues([]);
      addSubjects([])
    } else {
      setValues(values);
      addSubjects(values) 
    }
  };
  const filterValues = (i) => {
    setValues((prev) => prev.filter((v) => v !== i));
    addSubjects(values.filter(v=>v!==i))
  };
  useEffect(() => {
    setValues((prev) => prev.filter((v) => v !== ""));
  }, [values.length]);

  return (
    <>
      {subjects?.length === 0 ? (
        <div className="flex justify-center items-cenetr py-2 ">
          <Chip color="danger" variant="bordered">
            il n'y a pas de matiére à ce niveau
          </Chip>
        </div>
      ) : (
        <div className="flex w-full   flex-col gap-2">
          <Select
            size="sm"
            label="Matiéres"
            selectionMode="multiple"
            placeholder="Selectioné Les Matiéres"
            selectedKeys={values.map((v) => v + "")}
            variant="bordered"
            className=""
            onChange={handleSelectionChange}
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
                    <li  key={e}>-{e}</li>
                  ))}
                </ol>
              )
            }
          >
            {subjects?.map((m) => (
              <SelectItem
                className="dark:text-white"
                key={m.id}
                value={values.join(",")}
              >
                {m.name}
              </SelectItem>
            ))}
          </Select>
          <span className="flex items-center flex-wrap gap-1">
            Selected:{" "}
            {values.map((l, i) => (
              <Chip
                key={i}
                endContent={
                  <RiCloseCircleLine
                    onClick={() => filterValues(l)}
                    className="cursor-pointer"
                  />
                }
              >
                {subjects?.find((s) => s.id === l)?.name}
              </Chip>
            ))}{" "}
          </span>
        </div>
      )}
    </>
  );
}
