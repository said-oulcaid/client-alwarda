import {
  Button,
  Chip,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { FaBook, FaPhoneVolume, FaPlus, FaSchool } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Create from "./Create";
import swal from "sweetalert";
import { FiEye } from "react-icons/fi";
import { BiSolidEdit, BiTrash } from "react-icons/bi";
import Edit from "./Edit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, getStudents } from "../../redux/api/studentApi";
import { formatTimestamp } from "../../utils/utils";
import { CgDanger } from "react-icons/cg";
import { getLevels } from "../../redux/api/levelApi";
import ErrorAlert from "../../components/ErrorAlert";
import { LiaBookMedicalSolid } from "react-icons/lia";

const List = () => {
  useEffect(() => {
    document.title = "Alwarda | Etudients";
  }, []);

  const {
    students,
    loading: studentsLoading,
    error: studentsError,
  } = useSelector((state) => state.student);
  const { levels } = useSelector((state) => state.level);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudents());
    dispatch(getLevels);
  }, [dispatch]);
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = useMemo(() => {
    const filteredStudents = students?.filter((c) =>
      (c.firstName + " " + c.lastName)
        .toLowerCase()
        .includes(searchItem.toLowerCase())
    );
    return Math.ceil(filteredStudents?.length / rowsPerPage);
  }, [searchItem, students]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const filteredStudents = students?.filter((c) =>
      (c.firstName + " " + c.lastName)
        .toLowerCase()
        .includes(searchItem.toLowerCase())
    );
    return filteredStudents?.slice(start, end);
  }, [page, searchItem, students]);

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onOpenChange: onCreateChangeOpen,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditChangeOpen,
  } = useDisclosure();

  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const SelectEditItem = (id) => {
    setItemToEdit(id);
    onEditOpen();
  };

  useEffect(() => {
    if (itemToDelete) {
      swal({
        title: "are you shure you want to delete this poste ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((isOk) => {
        if (isOk) {
          dispatch(deleteStudent(itemToDelete));
        }
        setItemToDelete(null);
      });
    }
  }, [itemToDelete,dispatch]);

  return (
    <>
      <div className="flex justify-start ">
        <h1 className="text-3xl font-semibold underline">Eleves</h1>
      </div>
      <div className="flex justify-between gap-3 items-start md:items-center bg-white  shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            fullWidth
            isClearable
            placeholder="Rechercher par nom..."
            startContent={<FiSearch />}
            variant="faded"
            size="lg"
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
            onClear={() => setSearchItem("")}
            className="tracking-widest"
          />
          <Select
            size="lg"
            aria-label="Niveau"
            placeholder="Filtrer par niveau"
            variant="faded"
            onChange={(e) => {
              setPage(1);
            }}
          >
            <SelectItem key="" value="" className="dark:text-white">
              Tous les niveaux{" "}
            </SelectItem>
            {levels?.map((level) => (
              <SelectItem
                key={level.id}
                value={level.id}
                className="dark:text-white"
              >
                {level.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Button
          endContent={<FaPlus />}
          color="primary"
          variant="flat"
          onPress={onCreateOpen}
        >
          Nouveau
        </Button>
      </div>
      {studentsError && (
        <div className="mt-4">
          <ErrorAlert message={studentsError} />
        </div>
      )}
      {!studentsError && students && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 mt-4 shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b] text-md">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="font-normal">
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Nom
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Prénom
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Niveau
                  </th>
                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Les mtiéres
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Télé
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Centre
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Inscrit Le
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    {students && (
                      <Chip variant="flat" color="success" size="lg">
                        Total {students?.length}
                      </Chip>
                    )}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
                {students && items.length > 0 ? (
                  items?.map((s) => (
                    <tr
                      className="hover:bg-blue-200 dark:hover:bg-gray-900"
                      key={s.id}
                    >
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center underline underline-offset-2">
                        {s.firstName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                        {s.lastName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                        <Chip
                          variant={s.level?.name ? "bordered" : "flat"}
                          color={s.level?.name ? "default" : "danger"}
                          startContent={s.level?.name && <FaSchool />}
                          size="md"
                          radius="sm"
                        >
                          {s.level?.name ? s.level?.name : <CgDanger />}
                        </Chip>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center">
                        <Popover showArrow offset={10}>
                          <PopoverTrigger>
                            <Button
                              radius="full"
                              variant="flat"
                              className="font-semibold text-medium"
                              color={
                                s.subjects?.length > 0 ? "success" : "danger"
                              }
                              startContent={<FaBook />}
                              size="sm"
                            >
                              {s.subjects?.length}
                            </Button>
                          </PopoverTrigger>
                          {s.subjects?.length > 0 ? (
                            <PopoverContent className=" relative">
                              <div className="px-1 py-2 w-full">
                                <p className="text-small font-bold text-foreground">
                                  les Matiéres
                                </p>
                                <div className="mt-2 flex flex-col gap-2 w-full">
                                  {s.subjects.map((s) => (
                                    <Chip variant="dot" key={s.id}>
                                      {s.name}{" "}
                                    </Chip>
                                  ))}
                                </div>
                              </div>
                            </PopoverContent>
                          ) : (
                            <PopoverContent className=" relative">
                              <div className="px-1 py-2 w-full">
                                <p className="text-small font-bold text-foreground">
                                  Ajouter matiéres
                                </p>
                                <div className="mt-2 flex flex-col gap-2 w-full">
                                  <LiaBookMedicalSolid />
                                </div>
                              </div>
                            </PopoverContent>
                          )}
                        </Popover>
                      </td>
                      <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Chip
                          variant="bordered"
                          color="default"
                          startContent={<FaPhoneVolume />}
                          size="md"
                          radius="sm"
                          className=" "
                        >
                          {s.phone ? (
                            s.phone
                          ) : (
                            <span className="text-gray-500"> Aucune Télé</span>
                          )}
                        </Chip>
                      </td>

                      <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Chip
                          variant={s.centre?.name ? "bordered" : "flat"}
                          color={s.centre?.name ? "default" : "danger"}
                          startContent={s.centre?.name && <FaSchool />}
                          size="md"
                          radius="sm"
                        >
                          {s.centre?.name ? s.centre?.name : <CgDanger />}
                        </Chip>
                      </td>
                      <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                        {formatTimestamp(s.registrationDate)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 w-full ">
                        <div className="flex justify-center w-full items-center gap-2">
                          <Button
                            size="sm"
                            isIconOnly
                            radius="md"
                            className="text-xl"
                            color="primary"
                            variant="ghost"
                            as={Link}
                            to={`/eleves/show/${s.id}`}
                          >
                            <FiEye />
                          </Button>
                          <Button
                            size="sm"
                            isIconOnly
                            radius="md"
                            className="text-xl"
                            color="warning"
                            variant="ghost"
                            onPress={() => SelectEditItem(s.id)}
                          >
                            <BiSolidEdit />
                          </Button>
                          <Button
                            size="sm"
                            isIconOnly
                            radius="md"
                            className="text-xl"
                            color="danger"
                            variant="ghost"
                            onClick={() => setItemToDelete(s.id)}
                          >
                            <BiTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8}>
                      <div className="flex itesm-center justify-center font-semibold text-lg py-5 text-red-500">
                        aucun centre trouvé
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {studentsLoading.loadingGet && (
        <div className="w-full flex justify-center items-center mt-16">
          <Spinner
            size="lg"
            className="m-auto"
            label="Chargement en cours..."
          />
        </div>
      )}
      <div className="my-4  w-full flex justify-between">
        {pages > 1 && (
          <Pagination
            showControls
            isCompact
            total={pages}
            page={page}
            onChange={(page) => setPage(page)}
            showShadow
          />
        )}
      </div>
      <Create onOpenChange={onCreateChangeOpen} isOpen={isCreateOpen} />
      <Edit
        onOpenChange={onEditChangeOpen}
        isOpen={isEditOpen}
        itemToEdit={itemToEdit}
        SelectEditItem={SelectEditItem}
      />
    </>
  );
};

export default List;
