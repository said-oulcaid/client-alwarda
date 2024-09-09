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
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Create from "./Create";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { BiSolidEdit, BiTrash } from "react-icons/bi";
import Edit from "./Edit";
import { PiStudent } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { deleteLevel, getLevels } from "../../redux/api/levelApi";
import ErrorAlert from "../../components/ErrorAlert";
import { TfiReload } from "react-icons/tfi";
const types = ["ECOLE_PRIMAIRE", "COLLEGE", "LYCEE"];
const List = () => {
  useEffect(() => {
    document.title = "Alwarda |  Niveaux";
  }, []);
  const dispatch = useDispatch();
  const { levels, loading, error } = useSelector((state) => state.level);

  const getLevelsCallback = useCallback(() => {
    dispatch(getLevels());
  }, [dispatch]);

  useEffect(() => {
    getLevelsCallback();
  }, [getLevelsCallback]);
  const [selectedType, setSelectedType] = useState("");

  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filteredLevels = useMemo(() => {
    return levels
      ?.filter((l) => l.name.toLowerCase().includes(searchItem.toLowerCase()))
      .filter((l) => (selectedType ? l.type === selectedType : true));
  }, [searchItem, levels, selectedType]);

  const pages = Math.ceil(filteredLevels?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredLevels?.slice(start, end);
  }, [page, filteredLevels, rowsPerPage]);

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
        title: "Êtes-vous sûr de vouloir supprimer ce niveau ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((isOk) => {
        if (isOk) {
          dispatch(deleteLevel(itemToDelete));
        }
        setItemToDelete(null);
      });
    }
  }, [itemToDelete, dispatch]);

  return (
    <>
      <div className="flex justify-start ">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-semibold underline">Niveaux</h1>
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
                onClick={getLevelsCallback}
              >
                <TfiReload />
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-between gap-3 items-start md:items-center bg-white shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
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
          <Select
            size="lg"
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
            variant="faded"
            placeholder="filtres par"
            id="type"
          >
            {types.map((s) => (
              <SelectItem value={s} key={s} className="dark:text-white">
                {s}
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
      {!error && levels && (
        <div className="rounded-lg border border-gray-200 w-full h-[535px] dark:border-gray-700 mt-4">
          <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#43474b] text-lg">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="font-normal">
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Nom
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Gade
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    Nombre d'élèves
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                    <div className="w-full flex justify-end">
                      {filteredLevels && (
                        <Chip variant="flat" color="success" size="lg">
                          Total {filteredLevels.length}
                        </Chip>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
                {items.length > 0 ? (
                  items.map((level, i) => (
                    <tr
                      className="hover:bg-blue-200 dark:hover:bg-gray-900"
                      key={level.id}
                    >
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white ">
                        {level.name}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">
                        {level.type}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 text-center">
                        <Chip
                          variant="bordered"
                          color="default"
                          startContent={<PiStudent />}
                          size="lg"
                          radius="sm"
                        >
                          {level.students?.length}
                        </Chip>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <Button
                             size="sm"
                            isIconOnly
                             radius="md"
                             className="text-xl"
                             color="primary"
                             variant="ghost"
                            as={Link}
                            to={`/niveaux/show/${level.id}`}
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
                            onPress={() => SelectEditItem(level.id)}
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
                            onClick={() => setItemToDelete(level.id)}
                          >
                            <BiTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <div className="flex items-center justify-center font-semibold text-lg py-5 text-red-500">
                        Aucun niveau trouvé
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {loading.loadingGet && (
        <div className="w-full flex justify-center items-center mt-16">
          <Spinner
            size="lg"
            className="m-auto"
            label="Chargement en cours..."
          />
        </div>
        // <TableSkitlon rows={rowsPerPage} />
      )}
      <div className="my-4 w-full flex">
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
          onEditChangeOpen={onEditChangeOpen}
          SelectEditItem={SelectEditItem}
        />
      )}
    </>
  );
};

export default List;
