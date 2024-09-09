import { Skeleton } from "@nextui-org/react";
import  { useEffect, useState } from "react";

const TableSkitlon = ({ rows=1 }) => {
  const [numberOfRows, setNumberOfRows] = useState(rows);
  useEffect(() => {
    setNumberOfRows(rows);
  }, [rows]);
  return (
    <div className="rounded-lg border border-gray-200  w-full dark:border-gray-700 mt-4 shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
      <div className="overflow-x-auto rounded-t-lg w-full justify-center">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b] text-lg">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="font-normal">
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                <Skeleton className="rounded-lg">
                  <div className=" h-[32px]  rounded-lg  w-[70px] bg-default-300"></div>
                </Skeleton>
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                <Skeleton className="rounded-lg">
                  <div className="h-[32px] rounded-lg   w-[70px] bg-default-300"></div>
                </Skeleton>
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                <Skeleton className="rounded-lg">
                  <div className="h-[32px] rounded-lg   w-[70px] bg-default-300"></div>
                </Skeleton>
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                <Skeleton className="rounded-lg">
                  <div className="h-[32px] rounded-lg   w-[70px] bg-default-300"></div>
                </Skeleton>
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                <Skeleton className="rounded-lg">
                  <div className="h-[32px] rounded-lg   w-[70px] bg-default-300"></div>
                </Skeleton>
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white ">
                <Skeleton className="rounded-lg">
                  <div className="h-[32px] rounded-lg   w-[70px] bg-default-300"></div>
                </Skeleton>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(numberOfRows)
              .fill(null)
              .map((r,i) => (
                <tr className="hover:bg-blue-200 dark:hover:bg-gray-900" key={i}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center underline underline-offset-2">
                    <Skeleton className="rounded-lg">
                      <div className="h-[32px] rounded-lg   w-[190px] bg-default-300"></div>
                    </Skeleton>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                    <Skeleton className="rounded-lg w-fit">
                      <div className="size-6 rounded-lg  mx-auto shadow-sm"></div>
                    </Skeleton>
                  </td>
                  <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-start ">
                    <Skeleton className="rounded-lg">
                      <div className="h-[32px] rounded-lg   w-[70px] bg-default-300"></div>
                    </Skeleton>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                    <Skeleton className="rounded-lg">
                      <div className="h-[32px] rounded-lg  w-[200px] bg-default-300"></div>
                    </Skeleton>
                  </td>
                  <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                    <Skeleton className="rounded-lg">
                      <div className="h-[32px] rounded-lg   w-[70px] bg-default-300"></div>
                    </Skeleton>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 w-full ">
                    <div className="flex justify-center w-full items-center gap-2">
                      <Skeleton className="rounded-lg">
                        <div className="h-[32px] rounded-lg  w-[70px] bg-default-300"></div>
                      </Skeleton>
                      <Skeleton className="rounded-lg">
                        <div className="h-[32px] rounded-lg   w-[70px] bg-default-300"></div>
                      </Skeleton>
                      <Skeleton className="rounded-lg">
                        <div className="h-[32px] rounded-lg   w-[70px] bg-default-300"></div>
                      </Skeleton>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkitlon;
