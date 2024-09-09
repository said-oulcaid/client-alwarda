import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FiEye, FiSearch } from "react-icons/fi";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";
import { MdPhoneInTalk } from "react-icons/md";
import { getCentreById } from "../../redux/api/centreApi";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../../components/ErrorAlert";
import { formatTimestamp } from "../../utils/utils";
import { FaBook, FaPhoneVolume } from "react-icons/fa";
import PieChart from "../../components/PieChart";

const Show = () => {
  useEffect(() => {
    document.title = "Alwarda | Details Centres";
  }, []);
  const { id } = useParams();
  const { centre, loading, error } = useSelector((state) => state.centre);
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const boysCount = centre?.students.filter(
    (student) => student.sex === "HOMME"
  ).length;
  const girlsCount = centre?.students.filter(
    (student) => student.sex === "FEMME"
  ).length;

  const filteredStudents = useMemo(() => {
    if (centre) {
      return centre.students?.filter((s) =>
        (s.firstName + " " + s.lastName)
          .toLowerCase()
          .includes(searchItem.toLowerCase())
      );
    } else {
      return [];
    }
  }, [searchItem, centre]);

  const pages = Math.ceil(filteredStudents?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredStudents?.slice(start, end);
  }, [page, filteredStudents, rowsPerPage]);
  useEffect(() => {
    dispatch(getCentreById(id));
  }, [id, dispatch]);

  return (
    <div>
      {error && <ErrorAlert message={error} className="w-fit" />}
      {loading.loadingGetById && (
        <div className="flex w-full justify-center py-9 ">
          <Spinner size="lg" label="Chargement en cours..." />
        </div>
      )}
      {centre && (
        <>
          <div className="flex flex-col justify-start  gap-5">
            <h1 className="md:text-3xl text-xl font-semibold underline underline-offset-8 flex items-center gap-1 md:gap-2">
              <FiEye />
              <span className="tracking-wider">{centre.name} </span>
            </h1>

            {centre.user ? (
              <div className="flex flex-wrap gap-3 w-full items-center  h-auto ">
                <Card
                  shadow="none"
                  className="shrink-0 w-[300px] border-none bg-white dark:bg-[#43474b] "
                >
                  <CardHeader className="justify-between">
                    <div className="flex gap-3">
                      <Avatar isBordered radius="full" size="md" />
                      <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {centre.user.firstName + " " + centre.user.lastName}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-500">
                          @Responsable
                        </h5>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-3 py-0">
                    <p className="text-small pl-px text-default-500 flex gap-1 items-center pb-2">
                      <MdPhoneInTalk /> {centre.user.phone}
                    </p>
                  </CardBody>
                </Card>
                {(girlsCount > 0 || boysCount > 0) && <PieChart
                  girlsCount={girlsCount}
                  boysCount={boysCount}
                  width={200}
                  widthChart={380}
                  breakpoint={480}
                />}
              </div>
            ) : (
              <ErrorAlert
                message="Il n'y a pas de responsable dans ce centre. Veuillez choisir une."
                variant="warning"
              />
            )}

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
            <div className="overflow-x-auto rounded-t-lg w-full justify-center  h-[539px]">
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
                      Niveau
                    </th>
                    <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                      Les mtiéres
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
                        {centre.students && (
                          <Chip variant="flat" color="success" size="lg">
                            Total {filteredStudents.length}
                          </Chip>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
                  {centre.students && items.length > 0 ? (
                    items.map((s) => (
                      <tr
                        className="hover:bg-blue-200 dark:hover:bg-gray-900"
                        key={s.id}
                      >
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center">
                          {s.firstName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center">
                          {s.lastName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center">
                          {s.level.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center">
                          <Popover showArrow offset={10}>
                            <PopoverTrigger>
                              <Button
                                radius="full"
                                variant="flat"
                                className="font-semibold text-medium"
                                color={
                                  s.subjects.length > 0 ? "success" : "danger"
                                }
                                startContent={<FaBook />}
                                size="sm"
                              >
                                {s.subjects.length}
                              </Button>
                            </PopoverTrigger>
                            {s.subjects.length > 0 && (
                              <PopoverContent className="w-fit">
                                <div className="px-1 py-2 w-full">
                                  <p className="text-small font-bold text-foreground">
                                    les Matiéres
                                  </p>
                                  <div className="mt-2 flex flex-col gap-2 w-full">
                                    {s.subjects.map((s) => (
                                      <Chip variant="dot">{s.name} </Chip>
                                    ))}
                                  </div>
                                </div>
                              </PopoverContent>
                            )}
                          </Popover>
                        </td>
                        <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-white w-auto text-center">
                          <Chip
                            variant="bordered"
                            color="default"
                            startContent={<FaPhoneVolume />}
                            size="lg"
                            radius="sm"
                            className=" "
                          >
                            {s.phone}
                          </Chip>
                        </td>
                        <td className="whitespace-nowrap tracking-wider px-4 py-2   w-auto text-center">
                          {s.sex === "HOMME" ? (
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
                          {formatTimestamp(s.registrationDate)}
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
          <div className="my-4  ">
            {page > 1 && <Pagination
              showControls
              isCompact
              total={pages}
              page={page}
              onChange={(page) => setPage(page)}
              showShadow
            />}

          </div>
        </>
      )}
    </div>
  );
};

export default Show;
