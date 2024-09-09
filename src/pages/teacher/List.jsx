import { Button, Chip, Input, Pagination, useDisclosure } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { BiSolidEdit, BiTrash } from "react-icons/bi";
import { FaPhoneVolume, FaPlus} from "react-icons/fa";
import { FiEye, FiSearch } from "react-icons/fi";
import swal from "sweetalert";
import Create from "./Create";
import Edit from "./Edit";
import Show from "./Show";
import { HiMail } from "react-icons/hi";


const centres = [
  "eknke",
  "zzwcjxjbcjb",
  "bjxbjbrf rf",
  "frjrnfr",
  "d",
  "f",
  "r",
];
const List = () => {
  useEffect(() => {
    document.title = "Alwarda | Enseignants";
  }, []);
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = useMemo(() => {
    const filteredCentres = centres.filter((c) =>
      c.toLowerCase().includes(searchItem.toLowerCase())
    );
    return Math.ceil(filteredCentres.length / rowsPerPage);
  }, [searchItem]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const filteredCentres = centres.filter((c) =>
      c.toLowerCase().includes(searchItem.toLowerCase())
    );
    return filteredCentres.slice(start, end);
  }, [page, searchItem]);

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
  const {
    isOpen: isShowOpen,
    onOpen: onShowOpen,
    onOpenChange: onShowChangeOpen,
  } = useDisclosure();
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToShow, setItemToShow] = useState(null);

  const SelectEditItem = (id) => {
    setItemToEdit(id);
    onEditOpen();
  };
  const SelectShowItem = (id) => {
    setItemToShow(id);
    onShowOpen();
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
          console.log("delete " + itemToDelete);
        }
        setItemToDelete(null);
      });
    }
  }, [itemToDelete]);
  return (
    <>
      <div className="flex justify-start ">
        <h1 className="text-3xl font-semibold underline">Enseignats</h1>
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
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 mt-4 shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b] text-md">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="font-normal">

                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white ">
                  Nom
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                  Prénom
                </th>

                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                  Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                  Télé
                </th>

                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
              {items.map((c, i) => (
                <tr
                  className="hover:bg-blue-200 dark:hover:bg-gray-900"
                  key={i}
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                    {c}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                    Alami
                  </td>
                  <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center underline">
                    <Chip
                      variant="bordered"
                      color="default"
                      startContent={<HiMail />}
                      size="md"
                      radius="sm"
                      className=" "
                    >
                      test_test@test.com
                    </Chip>
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
                      +212658963214
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
                        onClick={() => SelectShowItem(i + 1)}
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
                        onPress={() => SelectEditItem(i + 1)}
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
                        onClick={() => setItemToDelete(i + 1)}
                      >
                        <BiTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
      <Create onOpenChange={onCreateChangeOpen} isOpen={isCreateOpen} />
      <Edit
        onOpenChange={onEditChangeOpen}
        isOpen={isEditOpen}
        itemToEdit={itemToEdit}
        SelectEditItem={SelectEditItem}
      />
      <Show
        onOpenChange={onShowChangeOpen}
        isOpen={isShowOpen}
        itemToEdit={itemToShow}
        SelectEditItem={SelectShowItem}
      />
    </>
  )
}

export default List