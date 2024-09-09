import {
  Button,
  Chip,
  Input,
  Pagination,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaPlus, FaSchool } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Create from "./Create";
import swal from "sweetalert";
import { BiSolidEdit, BiTrash } from "react-icons/bi";
import Edit from "./Edit";
import { HiMail } from "react-icons/hi";
import { FaPhoneVolume } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/api/userApi";
import { CgDanger } from "react-icons/cg";
import ErrorAlert from "../../components/ErrorAlert";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const List = () => {
  useEffect(() => {
    document.title = "Alwarda | Utilisateurs";
  }, []);
  const dispatch = useDispatch();
  const { error, loading, users } = useSelector((state) => state.user);

  const getUsersCallback = useCallback(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);
  console.log(users);
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const { totalFilteredUsers, pages } = useMemo(() => {
    const filteredUsers = users?.filter((c) =>
      (c.firstName + " " + c.lastName)
        .toLowerCase()
        .includes(searchItem.toLowerCase())
    );
    const totalFilteredUsers = filteredUsers?.length;
    const pages = Math.ceil(totalFilteredUsers / rowsPerPage);
    return { totalFilteredUsers, pages, filteredUsers };
  }, [searchItem, users, rowsPerPage]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const filteredUsers = users?.filter((c) =>
      (c.firstName + " " + c.lastName)
        .toLowerCase()
        .includes(searchItem.toLowerCase())
    );
    return filteredUsers?.slice(start, end);
  }, [page, searchItem, users]);

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
          dispatch(deleteUser(itemToDelete));
        }
        setItemToDelete(null);
      });
    }
  }, [itemToDelete, dispatch]);
  console.log(error);
  return (
    <>
      <div className="flex justify-start ">
        <h1 className="text-3xl font-semibold underline">Utilisateurs</h1>
      </div>
      <div className="flex justify-between gap-3 items-start md:items-center bg-white  shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
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
        >
          Nouveau
        </Button>
      </div>
      {error && (
        <div className="mt-4">
          <ErrorAlert message={error} />
        </div>
      )}
      {!error && users && (
        <div className="rounded-lg  mt-4 ">
          <div className="overflow-x-auto rounded-t-lg ">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b] text-lg shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] h-fit">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="font-normal">
                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Prenom
                  </th>
                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Nom
                  </th>

                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Telephone
                  </th>
                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Email
                  </th>
                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Centre
                  </th>

                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white ">
                    <div className="w-full flex justify-end">
                      {users && (
                        <Chip variant="flat" color="success" size="lg">
                          Total {totalFilteredUsers}
                        </Chip>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
                {items?.length > 0 ? (
                  items.map((c, i) => (
                    <tr
                      className="hover:bg-blue-200 dark:hover:bg-gray-900"
                      key={i}
                    >
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                        {c.firstName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto tracking-widest ">
                        {c.lastName}
                      </td>
                      <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Chip
                          variant="bordered"
                          color="default"
                          startContent={<FaPhoneVolume />}
                          size="lg"
                          radius="sm"
                          className=" "
                        >
                          {c.phone}
                        </Chip>
                      </td>
                      <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                        <Chip
                          variant="bordered"
                          color="default"
                          startContent={<HiMail />}
                          size="lg"
                          radius="sm"
                          className=" "
                        >
                          {c.email}
                        </Chip>
                      </td>
                      <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                        {c.isOwner ? (
                          <Chip variant="flat" color="success" startContent={ <MdOutlineAdminPanelSettings className="text-xl"/>}>
                           Admin
                          </Chip>
                        ) : (
                          <Chip
                            variant={c.centre ? "bordered" : "flat"}
                            color={c.centre ? "default" : "danger"}
                            startContent={c.centre && <FaSchool />}
                            size="lg"
                            radius="sm"
                          >
                            {c.centre ? c.centre.name : <CgDanger />}
                          </Chip>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 w-full ">
                        <div className="flex justify-center w-full items-center gap-2">
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
                        aucun Utilisateur trouvé
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
      )}
      {pages > 1 && (
        <div className="my-4  w-full flex justify-between">
          <Pagination
            showControls
            isCompact
            total={pages}
            page={page}
            onChange={(page) => setPage(page)}
            showShadow
          />
        </div>
      )}
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
