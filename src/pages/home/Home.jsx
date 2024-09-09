import { MdOutlineAdminPanelSettings, MdPhoneInTalk } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";
import PieChart from "../../components/PieChart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, getUsers } from "../../redux/api/userApi";
import { Chip, Spinner } from "@nextui-org/react";
import io from "socket.io-client";
import { FaSchool } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";


const SOCKET_SERVER_URL = process.env.REACT_APP_SOKET_URL;

const Home = () => {
  const { user: loginUser } = useSelector((state) => state.auth);
  const { user, users } = useSelector((state) => state.user);
  const token = localStorage.getItem("session_user")
  ? JSON.parse(localStorage.getItem("session_user")).token
  : null;

  useEffect(() => {
    document.title = "Alwarda | Accueil";
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loginUser) {
      dispatch(getUserById(loginUser.id));
      dispatch(getUsers());
    }
  }, [dispatch, loginUser]);

  const [connectedClients, setConnectedClients] = useState([]);
  useEffect(() => {
    if (token) {
      const newSocket = io(SOCKET_SERVER_URL);
      newSocket.on("connect", () => {
        newSocket.emit("conectCLintId", token);
      });
      newSocket.on("connectedClients", (clients) => {
        setConnectedClients(clients);
      });

      return () => {
        newSocket.close();
      };
    }
  }, [token]);
  return (
    <>
      {loginUser && user ? (
        !user?.isOwner ? (
          <div className="grid grid-cols-[auto] md:grid-cols-[auto,1fr]  gap-2 w-full">
            <div className=" bg-white rounded-lg flex flex-col gap-3 justify-center  p-3 dark:bg-[#242526] dark:text-white">
              <div className="flex items-center gap-2">
                <div className="size-24 rounded-full bg-gray-200 dark:text-[#242526] flex justify-center items-center  text-4xl flex-shrink-0 capitalize">
                  {user && user?.firstName.slice(0, 1)}
                </div>
                <div className="h-full flex-1 flex flex-col items-start gap-2 text-medium">
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Nome:</span>{" "}
                    <span>{user?.lastName}</span>
                  </span>
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Prenom:</span>
                    <span>{user?.firstName}</span>
                  </span>
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Role:</span>
                    <span>@Responsable</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full ">
                <span className="flex gap-2 items-center">
                  <MdPhoneInTalk />
                  {user?.phone}
                </span>

                <span className="flex gap-2 items-center">
                  <MdOutlineAlternateEmail />
                  <span>{user?.email}</span>
                </span>
              </div>
            </div>

            <div className=" bg-white rounded-lg flex flex-col items-center p-3 dark:bg-[#242526] dark:text-white">
              <h1 className="font-bold lg:text-3xl text-xl">
                {user?.centre?.name || "Vous n'avez aucun centre"}
              </h1>
              <PieChart
                boysCount={user?.countSex.HOMME}
                girlsCount={user?.countSex.FEMME}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[auto] md:grid-cols-[auto,1fr]  gap-2 w-full">
            <div className=" bg-white rounded-lg flex flex-col gap-3 justify-center  p-3 dark:bg-[#242526] dark:text-white">
              <div className="flex items-center gap-2">
                <div className="size-24 rounded-full bg-gray-200 dark:text-[#242526] flex justify-center items-center  text-4xl flex-shrink-0 capitalize">
                  {user && user?.firstName.slice(0, 1)}
                </div>
                <div className="h-full flex-1 flex flex-col items-start gap-2 text-medium">
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Nome:</span>{" "}
                    <span>{user?.lastName}</span>
                  </span>
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Prenom:</span>
                    <span>{user?.firstName}</span>
                  </span>
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Role:</span>
                    <span>@Admin</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full ">
                <span className="flex gap-2 items-center">
                  <MdPhoneInTalk />
                  {user?.phone}
                </span>

                <span className="flex gap-2 items-center">
                  <MdOutlineAlternateEmail />
                  <span>{user?.email}</span>
                </span>
              </div>
            </div>

            <div className=" bg-white rounded-lg flex flex-col items-center p-3 dark:bg-[#242526] dark:text-white">
              <h1 className="font-bold lg:text-3xl text-xl">
                Totale D'élèves{" "}
                <Chip>{user?.countSex.HOMME + user?.countSex.FEMME}</Chip>
              </h1>
              <PieChart
                boysCount={user?.countSex.HOMME}
                girlsCount={user?.countSex.FEMME}
              />
            </div>
          </div>
        )
      ) : (
        <div className="w-full py-10 flex justify-center">
          <Spinner label="Chargement ..." size="lg" />
        </div>
      )}
      <div className="rounded-lg border border-gray-200 w-full h-fit overflow-y-auto dark:border-gray-700 mt-4 ">
        <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#43474b] text-xs">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="font-normal">
                <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white">
                  Utilisateur
                </th>

                <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white">
                  Centre
                </th>

                <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white">
                  <div className="w-full flex justify-end">
                    {users && (
                      <Chip variant="flat" color="success" size="sm">
                        Total {users.length}
                      </Chip>
                    )}
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr
                    className="hover:bg-blue-200 dark:hover:bg-gray-900"
                    key={user.id}
                  >
                    <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                      {user.firstName + " " + user.lastName}
                    </td>

                    <td className="whitespace-nowrap tracking-wider px-2 py-1 text-gray-700 dark:text-gray-200 w-auto text-center">
                      <Chip
                        variant="flat"
                        color={
                          connectedClients.includes(user.id)
                            ? "success"
                            : "default"
                        }
                        size="sm"
                      >
                        {connectedClients.includes(user.id)
                          ? "Conecté"
                          : "Déconnecter"}
                      </Chip>
                    </td>

                    <td className="whitespace-nowrap tracking-wider px-2 py-1 text-gray-700 dark:text-gray-200 w-auto text-center">
                      {user.isOwner ? (
                        <Chip
                          variant="flat"
                          color="success"
                          startContent={
                            <MdOutlineAdminPanelSettings className="text-xl" />
                          }
                        >
                          Admin
                        </Chip>
                      ) : (
                        <Chip
                          variant={user.centre ? "bordered" : "flat"}
                          color={user.centre ? "default" : "danger"}
                          startContent={user.centre && <FaSchool />}
                          size="lg"
                          radius="sm"
                        >
                          {user.centre ? user.centre.name : <CgDanger />}
                        </Chip>
                      )}
                    </td>
                    <td></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="flex users-center justify-center font-semibold text-lg py-5 text-red-500">
                      Aucun Utilisateure trouvée
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
