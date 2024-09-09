import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FiEye, FiSearch } from "react-icons/fi";
import {
  Chip,
  Input,
  Pagination,
  Spinner,
} from "@nextui-org/react";

import { getLevelById } from "../../redux/api/levelApi";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../../components/ErrorAlert";
import { formatTimestamp } from "../../utils/utils";
import {  FaPhoneVolume } from "react-icons/fa";
import PieChart from "../../components/PieChart";
import { CgDanger } from "react-icons/cg";

const Show = () => {
  useEffect(() => {
    document.title = "Alwarda | Details Niveau";
  }, []);
  const { id } = useParams();
  const { level, loading, error } = useSelector((state) => state.level);
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const boysCount = level?.students.filter(
    (student) => student.sex === "HOMME"
  ).length;
  const girlsCount = level?.students.filter(
    (student) => student.sex === "FEMME"
  ).length;

  const filteredStudents = useMemo(() => {
    if (level) {
      return level.students?.filter((s) =>
        (s.firstName + " " + s.lastName)
          .toLowerCase()
          .includes(searchItem.toLowerCase())
      );
    } else {
      return [];
    }
  }, [searchItem, level]);

  const pages = Math.ceil(filteredStudents?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredStudents?.slice(start, end);
  }, [page, filteredStudents, rowsPerPage]);
  useEffect(() => {
    dispatch(getLevelById(id));
  }, [id, dispatch]);

  console.log(level)

  return (
    <div>
      {error && <ErrorAlert message={error} className="w-fit" />}
      {loading.loadingGetById && (
        <div className="flex w-full justify-center py-9 ">
          <Spinner size="lg" label="Chargement en cours..." />
        </div>
      )}
      {level && (
        <>
          <div className="flex flex-col justify-start  gap-5">
            <h1 className="md:text-3xl text-xl font-semibold underline underline-offset-8 flex items-center gap-1 md:gap-2">
              <FiEye />
              <span className="tracking-wider">{level.name} </span>
            </h1>
            <div className="flex flex-wrap gap-3 w-full items-center  h-auto ">
               { (girlsCount >0 || boysCount>0 ) && <PieChart
                  girlsCount={girlsCount}
                  boysCount={boysCount}
                  width={200}
                  widthChart={380}
                  breakpoint={480}
                />}
              </div>
            <h1 className="md:text-2xl text-xl font-semibold">Les Eleves</h1>
          </div>
          <div className=" bg-white  shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white w-full">
            <form className="w-full ">
              <Input
                fullWidth
                isClearable
                placeholder="Rechercher par nom..."
                startContent={<FiSearch />}
                variant="faded"
                onChange={(e) => setSearchItem(e.target.value)}
                value={searchItem}
                onClear={() => setSearchItem("")}
                size="lg"
                className="tracking-widest"
              />
            </form>
          </div>
          <div className="rounded-lg border  w-full   dark:border-gray-700 mt-4 ">
            <div className="overflow-x-auto rounded-t-lg w-full justify-center  ">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b] shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] text-lg h-fit">
                <thead className="ltr:text-left rtl:text-right">
                  <tr className="font-normal">
                    <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                      Prenom
                    </th>
                    <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                      Nom
                    </th>
                    <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                      Télé
                    </th>
                    <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                      sex
                    </th>
                    <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                      Inscrit Le
                    </th>

                    <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white ">
                      <div className="w-full flex justify-end">
                        {level.students && (
                          <Chip variant="flat" color="success" size="lg">
                            Total {filteredStudents.length}
                          </Chip>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
                  {level.students && items.length > 0 ? (
                    items.map((l) => (
                      <tr
                        className="hover:bg-blue-200 dark:hover:bg-gray-900"
                        key={l.id}
                      >
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center">
                          {l.firstName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center">
                          {l.lastName}
                        </td>
                        <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-white w-auto text-center">
                          <Chip
                          variant={l.phone ? "bordered" : "flat"}
                            color={l.phone ? "default" : "danger"}
                            startContent={<FaPhoneVolume />}
                            size="lg"
                            radius="sm"
                            className=" "
                          >
                            {l.phone ? l.phone : <CgDanger />} 
                          </Chip>
                        </td>
                        <td className="whitespace-nowrap tracking-wider px-4 py-2   w-auto text-center">
                          {l.sex === "HOMME" ? (
                            <Chip variant="faded" className="bg-[#ADD8E6] ">
                              <span className="text-gray-700"> garçon</span>
                            </Chip>
                          ) : (
                            <Chip variant="faded" className="bg-[#ffe8ec]">
                              <span className="text-gray-700">fille</span>
                            </Chip>
                          )}
                        </td>
                        <td className="whitespace-nowrap tracking-widest text-sm px-4 py-2 text-gray-700 dark:text-white w-auto text-center  font-semibold">
                          {formatTimestamp(l.registrationDate)}
                        </td>
                        <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-white w-auto text-center"></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8}>
                        <div className="flex itesm-center justify-center font-semibold text-lg py-5 text-red-500">
                          Aucun Eleve Trouvé
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {pages > 1 && 
          <div className="my-4  ">
            <Pagination
              showControls
              isCompact
              total={pages}
              page={page}
              onChange={(page) => setPage(page)}
              showShadow
            />
          </div>}
         
        </>
      )}
    </div>
  );
};

export default Show;
