import React from "react";
import { useParams } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { MdPhoneInTalk } from "react-icons/md";
const Show = () => {
  const { id } = useParams();
  return (
    <div>
      <div className="flex flex-col justify-start  gap-5">
        <h1 className="md:text-3xl text-xl font-semibold underline flex items-center gap-1 md:gap-2">
          <FiEye />
          <span>Centre nome {id}</span>
        </h1>
        <Card shadow="none" className="max-w-[300px] border-none bg-white">
          <CardHeader className="justify-between">
            <div className="flex gap-3">
              <Avatar isBordered radius="full" size="md" />
              <div className="flex flex-col items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Ali Alami
                </h4>
                <h5 className="text-small tracking-tight text-default-500">
                  @Admin
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0">
            <p className="text-small pl-px text-default-500 flex gap-1 items-center pb-2">
              <MdPhoneInTalk /> +212658459674
            </p>
          </CardBody>
        </Card>
        <h1 className="md:text-2xl text-xl font-semibold">Les Eleves</h1>
      </div>
    </div>
  );
};

export default Show;
