import {
  Button,
  Chip,
  Input,
  Pagination,
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
import { FaUserShield } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteCentre, getCentres } from "../../redux/api/centreApi";
import { CgDanger } from "react-icons/cg";
import ErrorAlert from "../../components/ErrorAlert";
import { TfiReload } from "react-icons/tfi";

const List = () => {
  useEffect(() => {
    document.title = "Alwarda | Centres";
  }, []);
  const dispatch = useDispatch();
  const { centres, loading, error } = useSelector((state) => state.centre);

  const getCentresCallback = useCallback(() => {
    dispatch(getCentres());
  }, [dispatch]);

  useEffect(() => {
    getCentresCallback();
  }, [getCentresCallback]);

  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const filteredCentres = useMemo(() => {
    return centres?.filter((c) =>
      c.name.toLowerCase().includes(searchItem.toLowerCase())
    );
  }, [searchItem, centres]);

  const { totalFilteredCentres, pages } = useMemo(() => {
    const filteredCentres = centres?.filter((c) =>
      c.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    const totalFilteredCentres = filteredCentres?.length;
    const pages = Math.ceil(totalFilteredCentres / rowsPerPage);

    return { totalFilteredCentres, pages, filteredCentres };
  }, [searchItem, centres, rowsPerPage]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredCentres?.slice(start, end);
  }, [page, filteredCentres, rowsPerPage]);
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
        title: "Êtes-vous sûr de vouloir supprimer l'utilisateur ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((isOk) => {
        if (isOk) {
          dispatch(deleteCentre(itemToDelete));
        }
        setItemToDelete(null);
      });
    }
  }, [itemToDelete, dispatch]);

  return (
    <>
      <div className="flex justify-start ">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-semibold underline">Centres</h1>
          <Tooltip
            color="foreground"
            content="actualisé"
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
                onClick={getCentresCallback}
              >
                <TfiReload />
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-between gap-3 items-center bg-white  shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
        <div className="w-full sm:max-w-[44%]">
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
        </div>
        <Button
          endContent={<FaPlus />}
          color="primary"
          variant="flat"
          onPress={onCreateOpen}
          // className="hover:-translate-y-1"
        >
          Nouveau
        </Button>
      </div>
      {error && (
        <div className="mt-4">
          <ErrorAlert message={error} />
        </div>
      )}
      {!error && centres && (
        <div className="rounded-lg    w-full h-[292px] max-h-[535px]  mt-4 ">
          <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b] text-lg ">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="font-normal">
                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Nom
                  </th>
                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Couleur
                  </th>
                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Localisation
                  </th>
                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Administrateur
                  </th>

                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Nombre d'élèves
                  </th>
                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white ">
                    <div className="w-full flex justify-end">
                      {centres && (
                        <Chip variant="flat" color="success" size="lg">
                          Total {totalFilteredCentres} {/*  //totoal */}
                        </Chip>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
                {centres && items.length > 0 ? (
                  items.map((c) => (
                    <tr
                      className="hover:bg-blue-200 dark:hover:bg-gray-900"
                      key={c.id}
                    >
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-start  underline-offset-2">
                        {c.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                        <div
                          className="size-6 rounded-lg  mx-auto border-1 border-black"
                          style={{ background: c.color }}
                        ></div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                        {c.location}
                      </td>
                      <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Chip
                          variant={c.user ? "bordered" : "flat"}
                          color={c.user ? "default" : "danger"}
                          startContent={c.user && <FaUserShield />}
                          size="lg"
                          radius="sm"
                        >
                          {c.user ? (
                            c.user.firstName + " " + c.user.lastName
                          ) : (
                            <CgDanger />
                          )}
                        </Chip>
                      </td>
                      <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Chip
                          variant="bordered"
                          color="default"
                          endContent={<PiStudent />}
                          size="lg"
                          radius="sm"
                        >
                          {c.students.length}
                        </Chip>
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
                            to={`/centres/show/${c.id}`}
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
                            onPress={() => SelectEditItem(c.id)}
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
                            onClick={() => setItemToDelete(c.id)}
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

export default List;
