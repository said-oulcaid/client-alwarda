import { Button, Spinner } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getstudentById } from "../../redux/api/studentApi";
import { formatTimestamp } from "../../utils/utils";
// import ErrorAlert from "../../components/ErrorAlert";
import { useParams } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert";
import SwipperSubjects from "../../components/SwipperSubjects";
import TableStudentsSubjectsDetails from "../../components/TableStudentsSubjectsDetails";
import SwipperStudentsPaymentsDetails from "../../components/SwipperStudentsPaymentsDetails";

const Show = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { student, loading, error } = useSelector((state) => state.student);
  useEffect(() => {
    dispatch(getstudentById(id));
  }, [dispatch, id]);

  return (
    <>
      {error && <ErrorAlert message={error} />}
      {loading?.loadingGetById && (
        <div className="w-full flex justify-center items-center pt-16">
          <Spinner
            size="lg"
            className="m-auto"
            label="Chargement en cours..."
          />
        </div>
      )}
      {student && (
        <>
          <div className="w-full grid gap-3 grid-cols-1 grid-rows-1  md:grid-cols-2  lg:grid-cols-3  ">
            <div className="p-3 bg-white rounded-lg flex flex-col gap-2 dark:bg-[#242526] text-xl  ">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0 font-semibold">
                  Prenom :{" "}
                </span>
                <span className="font-semibold ">{student.firstName} </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0 font-semibold">
                  Nom :{" "}
                </span>
                <span className="font-semibold ">{student.lastName} </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0 font-semibold">
                  Tél :{" "}
                </span>
                <span className="font-semibold ">{student.phone} </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0 font-semibold">
                  Tél Parent :{" "}
                </span>
                <span className="font-semibold ">{student.phoneParent} </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0 font-semibold">
                  Sex :{" "}
                </span>
                <span className="font-semibold ">{student.sex} </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0 font-semibold">
                  Grade :{" "}
                </span>
                <span className="font-semibold ">{student.school} </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0 font-semibold">
                  Niveau :{" "}
                </span>
                <span className="font-semibold ">{student.level.name} </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0 font-semibold">
                  Centre :{" "}
                </span>
                <span className="font-semibold flex items-center gap-3">
                  {student.centre.name}
                  <div
                    className="size-6 rounded-lg  mx-auto border-1 border-black"
                    style={{ background: student.centre.color }}
                  ></div>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0 font-semibold">
                  Date d'iscreption :{" "}
                </span>
                <span className="font-semibold">
                  {formatTimestamp(student.registrationDate)}{" "}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 flex-shrink-0 font-semibold">
                  Inscri par :{" "}
                </span>
                <span className="font-semibold">
                  {student.user.firstName + " " + student.user.firstName}{" "}
                </span>
              </div>
            </div>
            <div className="p-3  flex  justify-center items-center">
              {student.subjects.length > 0 ? (
                <SwipperSubjects subjects={student.subjects} />
              ) : (
                <h1 className="font-bold text-xl text-danger">No Matiéres</h1>
              )}
            </div>
            <div className="p-3 bg-white rounded-lg dark:bg-[#242526]  ">
              {<TableStudentsSubjectsDetails subjects={student.subjects} />}
            </div>
          </div>
          <div className="w-full py-3 mt-2 ">
            <SwipperStudentsPaymentsDetails payments={student.payments} />
          </div>
        </>
      )}
    </>
  );
};

export default Show;
