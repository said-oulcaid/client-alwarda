import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { BiSend } from "react-icons/bi";

const CustemPayment = ({
  loading,
  formData,
  handelPay50,
  id,
  handelSubmit,
  hedelpayCustemSubject,
}) => {
  const subjects = JSON.parse(formData?.subjects);
  const [NewSubjects, setNewSubjects] = useState(subjects);
  useEffect(() => {
    if (formData?.subjects) {
      const parsedSubjects = JSON.parse(formData.subjects);
      setNewSubjects(parsedSubjects);
    }
  }, [formData?.subjects]);
  const handelChange = (id, price) => {
    const newPrice = Number(String(price).replace(/^0+/, ""));
    if (newPrice < 0) return;

    setNewSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, amountPaid: newPrice } : s))
    );
    
  };
  const handelAdd = (i) => {
    // setNewSubjects(prev=>prev.map(s=>(s.id===id ? {...s})))
    hedelpayCustemSubject(
      JSON.stringify(
        NewSubjects?.map((s) =>
          s.id === i
            ? { ...s, isPayed: s.amountPaid >= s.pricePerMonth - s.discount }
            : s
        )
      )
    );
  };

  return (
    <form onSubmit={handelSubmit}>
      <Card className="h-[250px]">
        <CardBody className="flex flex-col w-full gap-3  h-full overflow-auto">
          <div className="flex flex-col gap-1">
            {formData?.subjects &&
              subjects?.map((s) => (
                <Chip
                  size="lg"
                  className="py-6"
                  variant="dot"
                  endContent={
                    <Button
                      isIconOnly
                      className="text-medium"
                      size="sm"
                      variant="flat"
                      color="primary"
                      isDisabled={NewSubjects.find((e) => e.id === s.id)?.amountPaid === subjects.find((e) => e.id === s.id)?.amountPaid }
                      onClick={() => handelAdd(s.id)}
                      radius="full"
                    >
                      <BiSend className="cursor-pointer" />
                    </Button>
                  }
                >
                  <div className="text-small text-gray-950 dark:text-white flex gap-2 items-center">
                    <span>{s.name}</span>{" "}
                    <Input
                      size="sm"
                      variant="faded"
                      className="w-[100px]"
                      placeholder="Prix"
                      type="number"
                      value={
                        NewSubjects.find((e) => e.id === s.id)?.amountPaid === 0
                          ? ""
                          : NewSubjects.find((e) => e.id === s.id)?.amountPaid
                      }
                      onChange={(e) => handelChange(s.id, e.target.value)}
                    />
                  </div>
                </Chip>
              ))}
          </div>
          <div className="flex items-center gap-2">
            <Chip
              key={"50DH"}
              color={formData?.have50 === 0 ? "success" : "danger"}
              size="lg"
              variant="faded"
              startContent={
                formData?.have50 === 0 ? (
                  <FaCheckCircle />
                ) : (
                  <IoIosCloseCircle />
                )
              }
            >
              <div className="text-small text-gray-950 dark:text-white">
                50 DH
              </div>
            </Chip>
            <Tooltip
              content={formData?.have50 === 0 ? "Annuler 50DH" : "Payé 50DH"}
              color={formData?.have50 === 0 ? "success" : "danger"}
              showArrow
              delay={0}
              size="sm"
              closeDelay={0}
            >
              <Button
                isIconOnly
                size="sm"
                radius="md"
                variant="ghost"
                color={formData?.have50 === 0 ? "danger" : "success"}
                onClick={() => handelPay50(id, formData?.have50 === 0 ? 50 : 0)}
              >
                {formData?.have50 === 0 ? (
                  <IoClose className="text-lg" />
                ) : (
                  <FaCheckCircle className="text-lg" />
                )}
              </Button>
            </Tooltip>
          </div>
          <Button
            fullWidth
            className="mt-auto flex-shrink-0"
            type="submit"
            color="primary"
            isLoading={loading.loadingCreate}
          >
            Payé
          </Button>
        </CardBody>
      </Card>
    </form>
  );
};

export default CustemPayment;
