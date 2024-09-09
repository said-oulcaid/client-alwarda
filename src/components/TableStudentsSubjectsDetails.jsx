import { Chip } from "@nextui-org/react";
import React from "react";
import { CgDanger } from "react-icons/cg";
import { PiMoneyWavyThin, PiStudent } from "react-icons/pi";
import { TbSchool } from "react-icons/tb";

const TableStudentsSubjectsDetails = ({ subjects }) => {
  console.log(subjects)
  return (
    <>
      {subjects.length > 0 ? (
        <div className="rounded-lg border border-gray-200 w-full h-fit overflow-y-auto dark:border-gray-700 mt-4 ">
          <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#43474b] text-xs">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="font-normal">
                  <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white">
                    Nom
                  </th>
                  <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white">
                    Enseignant
                  </th>
                  <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white">
                    Niveau
                  </th>
                  <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white">
                    Prix
                  </th>
                  <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white">
                    <div className="w-full flex justify-end">
                      {subjects && (
                        <Chip variant="flat" color="success" size="sm">
                          Total {subjects.length}
                        </Chip>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
                {subjects && subjects.length > 0 ? (
                  subjects.map((subject) => (
                    <tr
                      className="hover:bg-blue-200 dark:hover:bg-gray-900"
                      key={subject.id}
                    >
                      <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                        {subject.name}
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Chip
                          variant={subject?.teacher ? "bordered" : "flat"}
                          color={subject?.teacher ? "default" : "danger"}
                          startContent={subject?.teacher && <TbSchool />}
                          size="sm"
                          radius="sm"
                        >
                          {subject?.teacher ? (
                            `${subject.teacher.firstName} ${subject.teacher.lastName}`
                          ) : (
                            <CgDanger />
                          )}
                        </Chip>
                      </td>
                      <td className="whitespace-nowrap tracking-wider px-2 py-1 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Chip
                          variant={subject.level ? "bordered" : "flat"}
                          color={subject.level ? "default" : "danger"}
                          startContent={subject.level && <TbSchool />}
                          size="sm"
                          radius="sm"
                        >
                          {subject.level ? subject.level.name : <CgDanger />}
                        </Chip>
                      </td>

                      <td className="whitespace-nowrap tracking-wider px-2 py-1 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Chip
                          variant="bordered"
                          color="default"
                          startContent={<PiMoneyWavyThin />}
                          size="sm"
                          radius="sm"
                        >
                          {subject.pricePerMonth} MAD
                        </Chip>
                      </td>
                      <td></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className="flex subjects-center justify-center font-semibold text-lg py-5 text-red-500">
                        Aucun matière trouvée
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
      <div className=" flex items-center justify-center w-full h-full"><h1 className="font-bold text-xl text-danger">No Matiéres</h1></div>  
      )}
    </>
  );
};

export default TableStudentsSubjectsDetails;
