import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatepayment } from "../redux/api/paymentApi";
import {
  Badge,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { formatDateToDDMMYY, getVariantShip } from "../utils/utils";
import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { IoIosCloseCircle, IoMdMore } from "react-icons/io";
import { PiHandCoinsBold } from "react-icons/pi";
import { GiPayMoney } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";

const PaymentStudentsDetails = ({ payment }) => {
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
      subjects: JSON.stringify(
        subjects.map((s) => ({
          ...s,
          isPayed: true,
          amountPaid: s.pricePerMonth - s.discount,
        }))
      ),
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
        <>
          <div className="px-1 py-2 space-y-3 dark:text-white  ">
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
                <span className={have50 === 0 ? "text-success" : "text-danger"}>
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
        </>
      );
    } else if (amountPaid === 0) {
      return (
        <>
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
                <span className={have50 === 0 ? "text-success" : "text-danger"}>
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
        </>
      );
    } else {
      return (
        <>
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
                <span className={have50 === 0 ? "text-success" : "text-danger"}>
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
        </>
      );
    }
  } else {
    return (
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
            <span className={have50 === 0 ? "text-success" : "text-danger"}>
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
            <span className="tracking-widest">{discount + totalAmount} DH</span>
          </div>
          <div className="flex gap-1">
            <span className=" text-gray-600 dark:text-gray-400">Rabais:</span>
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
            <span className=" text-gray-600 dark:text-gray-400">Devoir:</span>
            <span className="tracking-widest">{totalAmount} DH</span>
          </div>
          <div className="flex gap-1">
            <span className=" text-gray-600 dark:text-gray-400">Le Rest:</span>
            <span className="tracking-widest">{amountDue} DH</span>
          </div>
        </div>
        <div className="absolute top-4 right-0 rotate-45">
          <Chip color="default">Pas Encore</Chip>
        </div>
      </div>
    );
  }
};

export default PaymentStudentsDetails;
