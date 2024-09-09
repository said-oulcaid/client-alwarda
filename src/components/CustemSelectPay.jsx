import { Button, Card, CardBody, Chip, Tooltip } from "@nextui-org/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const CustemSelectPay = ({
  id,
  formData,
  handelPaySubject,
  handelPay50,
  loading,
  handelSubmit
}) => {
  return (
    <form onSubmit={handelSubmit}>
    <Card className="h-[250px]">
      <CardBody className="flex flex-col w-full gap-3  h-full overflow-auto">
      {formData?.subjects &&
        JSON.parse(formData?.subjects)?.map((s) => (
          <div className="flex gap-2 items-center " key={s.id}>
            <Chip
              key={s.id}
              color={s.isPayed ? "success" : "danger"}
              size="lg"
              variant="faded"
              startContent={
                s.isPayed ? <FaCheckCircle /> : <IoIosCloseCircle />
              }
              endContent={<>{s.pricePerMonth - s.discount} DH</>}
            >
              <div className="text-small text-gray-950 dark:text-white">
                {s.name}
              </div>
            </Chip>
            <div>
              <Tooltip
                content={
                  s.isPayed ? "Annuler cette matière" : "Payé cette matière"
                }
                color={s.isPayed ? "danger" : "success"}
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
                  color={s.isPayed ? "danger" : "success"}
                  onClick={() =>
                    handelPaySubject(
                      s.id,
                      s.isPayed ? false : true,
                      s.pricePerMonth
                    )
                  }
                >
                  {s.isPayed ? (
                    <IoClose className="text-lg" />
                  ) : (
                    <FaCheckCircle className="text-lg" />
                  )}
                </Button>
              </Tooltip>
            </div>
          </div>
        ))}
      <div className="flex items-center gap-2">
        <Chip
          key={"50DH"}
          color={formData?.have50 === 0 ? "success" : "danger"}
          size="lg"
          variant="faded"
          startContent={
            formData?.have50 === 0 ? <FaCheckCircle /> : <IoIosCloseCircle />
          }
        >
          <div className="text-small text-gray-950 dark:text-white">50 DH</div>
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

export default CustemSelectPay;
