import {
  Badge,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { IoIosCloseCircle, IoMdMore } from "react-icons/io";
import { formatDateToDDMMYY, getVariantShip } from "../utils/utils";
import { PiHandCoinsBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatepayment } from "../redux/api/paymentApi";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiPayMoney } from "react-icons/gi";

const PaymentStatus = ({ payment }) => {
  const {
    totalAmount,
    amountPaid,
    amountDue,
    startAt,
    discount,
    dueDate,
    have50,
    subjects: jsonSubjects,
    id,
  } = payment;
  const currentDate = new Date();
  const startDate = new Date(startAt);

  const subjects = jsonSubjects ? JSON.parse(jsonSubjects) : [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelPayAll = () => {
    const updatePayment = {
      ...payment,
      subjects: JSON.stringify(subjects.map((s) => ({ ...s, isPayed: true,amountPaid:s.pricePerMonth - s.discount }))),
      amountPaid: totalAmount,
      amountDue: 0,
    };
    dispatch(updatepayment(id, updatePayment));
  };
  const handelPay50 = () => {
    const updatePayment = {
      ...payment,
      have50: 0,
    };
    dispatch(updatepayment(id, updatePayment));
  };
  if (payment && currentDate >= startDate) {
    if (totalAmount === amountPaid) {
      return (
        <Popover size="lg">
          <PopoverTrigger>
            <span>
              <Badge
                content={
                  have50 === 0 ? <FaCheckCircle /> : <IoIosCloseCircle />
                }
                variant="faded"
                color={have50 === 0 ? "success" : "danger"}
                size="sm"
              >
                <Chip
                  color="success"
                  variant="bordered"
                  size="sm"
                  className="cursor-pointer"
                >
                  Payé
                </Chip>
              </Badge>
            </span>
          </PopoverTrigger>
          <PopoverContent className="relative">
            <div className="px-1 py-2 space-y-3 dark:text-white ">
              <div className="flex flex-col gap-2 w-full items-start">
                {subjects?.map((s) => (
                 <Badge content={s.pricePerMonth - s.discount} size="sm">
                 <Chip
                   key={s.id}
                   color={getVariantShip(
                     s.isPayed,
                     s.pricePerMonth - s.discount,
                     s?.amountPaid
                   )}
                   size="lg"
                   variant="faded"
                   startContent={
                     s.isPayed ? <FaCheckCircle /> : <IoIosCloseCircle />
                   }
                   endContent={<>{s?.amountPaid} DH</>}
                 >
                   <div className="text-small text-gray-950 dark:text-white">
                     {s.name}
                   </div>
                 </Chip>
               </Badge>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Devoir de 50 DH:
                  </span>
                  <span
                    className={have50 === 0 ? "text-success" : "text-danger"}
                  >
                    {have50 === 0 ? "Payé" : "Non payé"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-1">
                    <span className=" text-gray-600 dark:text-gray-400">
                      Demare Le :
                    </span>
                    <span>{formatDateToDDMMYY(startAt)}</span>
                  </div>
                  <div className="flex gap-1">
                    <span className=" text-gray-600 dark:text-gray-400">
                      Jusqua :
                    </span>
                    <span>{formatDateToDDMMYY(dueDate)}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Total ({subjects?.length}) matiére :
                  </span>
                  <span className="tracking-widest">
                    {discount + totalAmount} DH
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Rabais:
                  </span>
                  <span>-{discount} DH</span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <PiHandCoinsBold size="25" /> :
                  </span>
                  <span className="tracking-widest">{amountPaid} DH </span>
                </div>
              </div>
              <div className="flex items-center justify-between  gap-4">
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Devoir:
                  </span>
                  <span className="tracking-widest">{totalAmount} DH</span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Le Rest:
                  </span>
                  <span className="tracking-widest">{amountDue} DH</span>
                </div>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <Dropdown
                showArrow
                classNames={{
                  base: "before:bg-default-200",
                  content:
                    "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black dark:text-gray-200",
                }}
                placement="bottom-start"
              >
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="faded"
                    color="warning"
                    radius="full"
                    size="sm"
                  >
                    <IoMdMore size={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  disabledKeys={[
                    amountPaid === totalAmount && "allPayed",
                    have50 === 0 && "50DH_payed",
                  ]}
                >
                  <DropdownItem
                    key="allPayed"
                    startContent={<FcMoneyTransfer />}
                    onClick={handelPayAll}
                  >
                    Payé Touts
                  </DropdownItem>
                  <DropdownItem
                    key="50DH_payed"
                    startContent={<FaMoneyBillWave className="text-success" />}
                    onClick={handelPay50}
                  >
                    Payé just 50 Dh
                  </DropdownItem>
                  <DropdownItem
                    key="custem"
                    className="text-warning"
                    color="warning"
                    onPress={() => navigate(`/paiements/edit/${id}`)}
                    startContent={<GiPayMoney />}
                  >
                    Personnaliser le paiement
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </PopoverContent>
        </Popover>
      );
    } else if (amountPaid === 0) {
      return (
        <Popover size="lg">
          <PopoverTrigger>
            <span>
              <Badge
                content={
                  have50 === 0 ? <FaCheckCircle /> : <IoIosCloseCircle />
                }
                variant="faded"
                color={have50 === 0 ? "success" : "danger"}
                size="sm"
              >
                <Chip
                  color="danger"
                  variant="bordered"
                  size="sm"
                  className="cursor-pointer"
                >
                  Non payé
                </Chip>
              </Badge>
            </span>
          </PopoverTrigger>
          <PopoverContent className="relative">
            <div className="px-1 py-2 space-y-3 dark:text-white">
              <div className="flex flex-col gap-2 w-full items-start">
                {subjects?.map((s) => (
                   <Badge content={s.pricePerMonth - s.discount} size="sm">
                   <Chip
                     key={s.id}
                     color={getVariantShip(
                       s.isPayed,
                       s.pricePerMonth - s.discount,
                       s?.amountPaid
                     )}
                     size="lg"
                     variant="faded"
                     startContent={
                       s.isPayed ? <FaCheckCircle /> : <IoIosCloseCircle />
                     }
                     endContent={<>{s?.amountPaid} DH</>}
                   >
                     <div className="text-small text-gray-950 dark:text-white">
                       {s.name}
                     </div>
                   </Chip>
                 </Badge>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Devoir de 50 DH:
                  </span>
                  <span
                    className={have50 === 0 ? "text-success" : "text-danger"}
                  >
                    {have50 === 0 ? "Payé" : "Non payé"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-1">
                    <span className=" text-gray-600 dark:text-gray-400">
                      Demare Le :
                    </span>
                    <span>{formatDateToDDMMYY(startAt)}</span>
                  </div>
                  <div className="flex gap-1">
                    <span className=" text-gray-600 dark:text-gray-400">
                      Jusqua :
                    </span>
                    <span>{formatDateToDDMMYY(dueDate)}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Total ({subjects?.length}) matiére :
                  </span>
                  <span className="tracking-widest">
                    {discount + totalAmount} DH
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Rabais:
                  </span>
                  <span>-{discount} DH</span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <PiHandCoinsBold size="25" /> :
                  </span>
                  <span className="tracking-widest">{amountPaid} DH </span>
                </div>
              </div>
              <div className="flex items-center justify-between  gap-4">
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Devoir ({subjects?.length}):
                  </span>
                  <span className="tracking-widest">{totalAmount} DH</span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Le Rest:
                  </span>
                  <span className="tracking-widest">{amountDue} DH</span>
                </div>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <Dropdown
                showArrow
                classNames={{
                  base: "before:bg-default-200",
                  content:
                    "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black dark:text-gray-200",
                }}
                placement="bottom-start"
              >
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="faded"
                    color="warning"
                    radius="full"
                    size="sm"
                  >
                    <IoMdMore size={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  disabledKeys={[
                    amountPaid === totalAmount && "allPayed",
                    have50 === 0 && "50DH_payed",
                  ]}
                >
                  <DropdownItem
                    key="allPayed"
                    startContent={<FcMoneyTransfer />}
                    onClick={handelPayAll}
                  >
                    Payé Touts
                  </DropdownItem>
                  <DropdownItem
                    key="50DH_payed"
                    startContent={<FaMoneyBillWave className="text-success" />}
                    onClick={handelPay50}
                  >
                    Payé just 50 Dh
                  </DropdownItem>
                  <DropdownItem
                    key="custem"
                    className="text-warning"
                    color="warning"
                    onPress={() => navigate(`/paiements/edit/${id}`)}
                    startContent={<GiPayMoney />}
                  >
                    Personnaliser le paiement
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </PopoverContent>
        </Popover>
      );
    } else {
      return (
        <Popover size="lg">
          <PopoverTrigger>
            <span>
              <Badge
                content={
                  have50 === 0 ? <FaCheckCircle /> : <IoIosCloseCircle />
                }
                variant="faded"
                color={have50 === 0 ? "success" : "danger"}
                size="sm"
              >
                <Chip
                  color="warning"
                  variant="bordered"
                  size="sm"
                  className="cursor-pointer"
                >
                  Partiellement payé
                </Chip>
              </Badge>
            </span>
          </PopoverTrigger>
          <PopoverContent className="relative">
            <div className="px-1 py-2 space-y-3 dark:text-white">
              <div className="flex flex-col gap-2 w-full items-start">
                {subjects?.map((s) => (
                  <Badge content={s.pricePerMonth - s.discount} size="sm">
                  <Chip
                    key={s.id}
                    color={getVariantShip(
                      s.isPayed,
                      s.pricePerMonth - s.discount,
                      s?.amountPaid
                    )}
                    size="lg"
                    variant="faded"
                    startContent={
                      s.isPayed ? <FaCheckCircle /> : <IoIosCloseCircle />
                    }
                    endContent={<>{s?.amountPaid} DH</>}
                  >
                    <div className="text-small text-gray-950 dark:text-white">
                      {s.name}
                    </div>
                  </Chip>
                </Badge>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Devoir de 50 DH:
                  </span>
                  <span
                    className={have50 === 0 ? "text-success" : "text-danger"}
                  >
                    {have50 === 0 ? "Payé" : "Non payé"}
                  </span>
                </div>
                <div className="flex items-center justify-between  gap-3">
                  <div className="flex gap-1">
                    <span className=" text-gray-600 dark:text-gray-400">
                      Demare Le :
                    </span>
                    <span>{formatDateToDDMMYY(startAt)}</span>
                  </div>
                  <div className="flex gap-1">
                    <span className=" text-gray-600 dark:text-gray-400">
                      Jusqua :
                    </span>
                    <span>{formatDateToDDMMYY(dueDate)}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Total ({subjects?.length}) matiére :
                  </span>
                  <span className="tracking-widest">
                    {discount + totalAmount} DH
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Rabais:
                  </span>
                  <span>-{discount} DH</span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <PiHandCoinsBold size="25" /> :
                  </span>
                  <span className="tracking-widest">{amountPaid} DH </span>
                </div>
              </div>
              <div className="flex items-center justify-between  gap-4">
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Devoir ({subjects?.length}):
                  </span>
                  <span className="tracking-widest">{totalAmount} DH</span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Le Rest:
                  </span>
                  <span className="tracking-widest">{amountDue} DH</span>
                </div>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <Dropdown
                showArrow
                classNames={{
                  base: "before:bg-default-200",
                  content:
                    "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black dark:text-gray-200",
                }}
                placement="bottom-start"
              >
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="faded"
                    color="warning"
                    radius="full"
                    size="sm"
                  >
                    <IoMdMore size={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  disabledKeys={[
                    amountPaid === totalAmount && "allPayed",
                    have50 === 0 && "50DH_payed",
                  ]}
                >
                  <DropdownItem
                    key="allPayed"
                    startContent={<FcMoneyTransfer />}
                    onClick={handelPayAll}
                  >
                    Payé Touts
                  </DropdownItem>
                  <DropdownItem
                    key="50DH_payed"
                    startContent={<FaMoneyBillWave className="text-success" />}
                    onClick={handelPay50}
                  >
                    Payé just 50 Dh
                  </DropdownItem>
                  <DropdownItem
                    key="custem"
                    className="text-warning"
                    color="warning"
                    onPress={() => navigate(`/paiements/edit/${id}`)}
                    startContent={<GiPayMoney />}
                  >
                    Personnaliser le paiement
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </PopoverContent>
        </Popover>
      );
    }
  } else {
    return (
      <Chip color="default" variant="solid" size="sm">
        pas encore
      </Chip>
    );
  }
};

export default PaymentStatus;
