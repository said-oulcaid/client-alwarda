import {
  Button,
  Chip,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TbSchool } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Create from "./Create";
import swal from "sweetalert";
import { BiSolidEdit, BiTrash } from "react-icons/bi";
import Edit from "./Edit";
import { PiStudent, PiMoneyWavyThin } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteSubject,
  getSubjects,
} from "../../redux/api/subjectApi";
import { CgDanger } from "react-icons/cg";
import ErrorAlert from "../../components/ErrorAlert";
import { TfiReload } from "react-icons/tfi";
import { getLevels } from "../../redux/api/levelApi";

const SubjectList = () => {
  useEffect(() => {
    document.title = "Alwarda | Matiéres";
  }, []);
  const dispatch = useDispatch();
  const { subjects, loading, error } = useSelector((state) => state.subject);
  const { levels } = useSelector((state) => state.level);

  const getSubjectsCallback = useCallback(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  const getLevelsCallback = useCallback(() => {
    dispatch(getLevels());
  }, [dispatch]);

  useEffect(() => {
    getSubjectsCallback();
    getLevelsCallback();
  }, [getSubjectsCallback, getLevelsCallback]);

  const [searchItem, setSearchItem] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filteredSubjects = useMemo(() => {
    return subjects?.filter((s) =>
    (s.name.toLowerCase().includes(searchItem.toLowerCase()) &&
      (selectedLevel === "" || s.levelId === Number(selectedLevel)))
    );
  }, [searchItem, subjects, selectedLevel]);

  const pages = Math.ceil(filteredSubjects?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredSubjects?.slice(start, end);
  }, [page, filteredSubjects, rowsPerPage]);

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
        title: "Êtes-vous sûr de vouloir supprimer la matière ?",
        text: "Cette action est irréversible.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((isOk) => {
        if (isOk) {
          dispatch(deleteSubject(itemToDelete));
        }
        setItemToDelete(null);
      });
    }
  }, [itemToDelete, dispatch]);

  return (
    <>
      <div className="flex justify-start ">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-semibold underline">Matières</h1>
          <Tooltip
          
            color="foreground"
            content="Actualiser"
            offset={4}
            showArrow
            closeDelay={0}
            delay={0}
            placement="left"
          >
            <span>
              <Button
                isIconOnly={true}
                size="sm"
                variant="faded"
                onClick={getSubjectsCallback}
              >
                <TfiReload />
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-between gap-3 items-start md:items-center bg-white shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
          size="lg"
            fullWidth
            isClearable
            placeholder="Rechercher par nom..."
            startContent={<FiSearch />}
            variant="faded"
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
            onChange={(e) =>{
              setSelectedLevel(e.target.value)
              setPage(1)
            } }
          >
            <SelectItem key="" value=""  className="dark:text-white">Tous les niveaux</SelectItem>
            {levels?.map((level) => (
              <SelectItem key={level.id} value={level.id}  className="dark:text-white" endContent={level?.type}>
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
      {error && (
        <div className="mt-4">
          <ErrorAlert message={error} />
        </div>
      )}
      {!error && subjects && (
        <div className="rounded-lg border border-gray-200 w-full h-[543px] overflow-y-auto dark:border-gray-700 mt-4">
          <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#43474b] text-lg">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="font-normal">
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Nom
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Enseignant
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Niveau
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Nombre d'élèves
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Prix
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    <div className="w-full flex justify-end">
                      {subjects && (
                        <Chip variant="flat" color="success" size="lg">
                          Total {filteredSubjects.length}
                        </Chip>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
                {subjects && items.length > 0 ? (
                  items.map((subject) => (
                    <tr
                      className="hover:bg-blue-200 dark:hover:bg-gray-900"
                      key={subject.id}
                    >
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                        {subject.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 w-auto">
                        {subject?.teacher
                          ? `${subject.teacher.firstName} ${subject.teacher.lastName}`
                          : "Non Assigné"}
                      </td>
                      <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto">
                        <Chip
                          variant={subject.level ? "bordered" : "flat"}
                          color={subject.level ? "default" : "danger"}
                          startContent={subject.level && <TbSchool />}
                          size="lg"
                          radius="sm"
                        >
                          {subject.level ? (
                            subject.level.name
                          ) : (
                            <CgDanger />
                          )}
                        </Chip>
                      </td>
                      <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Chip
                          variant="bordered"
                          color="default"
                          startContent={<PiStudent />}
                          size="lg"
                          radius="sm"
                        >
                          {subject._count?.students}
                        </Chip>
                      </td>
                      <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Chip
                          variant="bordered"
                          color="default"
                          startContent={<PiMoneyWavyThin />}
                          size="lg"
                          radius="sm"
                        >
                          {subject.pricePerMonth} MAD
                        </Chip>
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 w-full">
                        <div className="flex justify-center w-full items-center gap-2">

                          <Button
                            size="sm"
                            isIconOnly
                            radius="md"
                            className="text-xl"
                            color="warning"
                            variant="ghost"
                            onPress={() => SelectEditItem(subject.id)}
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
                            onClick={() => setItemToDelete(subject.id)}
                          >
                            <BiTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className="flex items-center justify-center font-semibold text-lg py-5 text-red-500">
                        Aucun matière trouvée
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {loading.get && (
        <div className="w-full flex justify-center items-center mt-16">
          <Spinner
            size="lg"
            className="m-auto"
            label="Chargement en cours..."
          />
        </div>
      )}

      <div className="my-4  w-full flex ">
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
      <Create
        onOpenChange={onCreateChangeOpen}
        isOpen={isCreateOpen}
        onCreateChangeOpen={onCreateChangeOpen}
      />
      {itemToEdit && (
        <Edit
          onOpenChange={onEditChangeOpen}
          isOpen={isEditOpen}
          itemToEdit={itemToEdit}
          SelectEditItem={SelectEditItem}
        />
      )}
    </>
  );
};

export default SubjectList;
