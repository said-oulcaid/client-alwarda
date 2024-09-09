import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getpaymentById,
  updateCustempayment,
} from "../../redux/api/paymentApi";
import {
  Badge,
  Chip,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import ErrorAlert from "../../components/ErrorAlert";
import { FaCheckCircle } from "react-icons/fa";
import { formatDateToDDMMYY, getVariantShip } from "../../utils/utils";
import { PiHandCoinsBold } from "react-icons/pi";

import { IoIosCloseCircle } from "react-icons/io";
import CustemPayment from "../../components/CustemPayment";
import CustemSelectPay from "../../components/CustemSelectPay";

const Edite = () => {
  useEffect(() => {
    document.title = "Alwarda | Modifier Paiement";
  }, []);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payment, loading, error } = useSelector((state) => state.payment);

  const [formData, setFormData] = useState(null);
  useEffect(() => {
    dispatch(getpaymentById(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (payment) {
      setFormData(payment);
    }
  }, [payment, id]);

  const handelPaySubject = (id, value = true, price) => {
    setFormData((prev) => {
      const subjects = JSON.parse(prev.subjects);
      const discountPerSubject = subjects.length > 1 ? 50 : 0;
      const updatedSubjects = subjects.map((s) =>
        s.id === id
          ? {
              ...s,
              isPayed: value,
              amountPaid: value
                ? parseInt(s.pricePerMonth) - discountPerSubject
                : 0,
            }
          : s
      );

      const updatedAmountPaid = updatedSubjects
        .filter((s) => s.isPayed)
        .reduce(
          (total, s) =>
            total + (parseInt(s.pricePerMonth, 10) - discountPerSubject),
          0
        );
      return {
        ...prev,
        amountPaid: updatedAmountPaid,
        subjects: JSON.stringify(updatedSubjects),
      };
    });
  };
  const hedelpayCustemSubject = (newSubjects) => {
    setFormData((prev) => ({
      ...prev,
      subjects: newSubjects,
      amountPaid: parseInt(
        JSON.stringify(
          JSON.parse(newSubjects).reduce(
            (total, subject) => total + parseInt(subject.amountPaid),
            0
          )
        )
      ),
      amountDue: parseInt(
        formData.totalAmount -
          JSON.stringify(
            JSON.parse(newSubjects).reduce(
              (total, subject) => total + parseInt(subject.amountPaid),
              0
            )
          )
      ),
    }));
  };
  const handelPay50 = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      have50: value,
    }));
  };
  const handelSelectSubmit = (e) => {
    e.preventDefault();
    const { amountPaid, subjects, have50} = formData;
    dispatch(
      updateCustempayment(id, { amountPaid, subjects, have50 }, () =>
        navigate(-1)
      )
    );
  };
  const handelCutemSelectSubmit = (e) => {
    e.preventDefault();
    const { amountPaid, subjects, have50} = formData;
    dispatch(
      updateCustempayment(id, { amountPaid, subjects, have50 }, () =>
        navigate(-1)
      )
    );
  };
  return (
    <div className="w-full p-5 bg-white dark:bg-[#43474b] rounded-lg ">
      {loading.loadingGetById ? (
        <div className="flex w-full justify-center py-11">
          <Spinner
            size="lg"
            className="m-auto"
            label="Chargement en cours..."
          />
        </div>
      ) : error ? (
        <ErrorAlert message={error} />
      ) : (
        payment && (
          <div className="w-full  grid grid-cols-1  md:grid-cols-[1fr_auto] gap-3">
            <div className="w-full">
              <Tabs
                aria-label="Options"
                fullWidth
                className="flex-1"
                onSelectionChange={() => setFormData(payment)}
              >
                <Tab key="simple" title="Simple">
                  <CustemSelectPay
                    formData={formData}
                    handelPay50={handelPay50}
                    handelPaySubject={handelPaySubject}
                    id={id}
                    loading={loading}
                    handelSubmit={handelSelectSubmit}
                  />
                </Tab>
                <Tab key="custem" title="Personalisé">
                  <CustemPayment
                    payment={payment}
                    loading={loading}
                    formData={formData}
                    handelPay50={handelPay50}
                    hedelpayCustemSubject={hedelpayCustemSubject}
                    id={id}
                    handelSubmit={handelCutemSelectSubmit}
                  />
                </Tab>
              </Tabs>
            </div>
            <div className="p-4 space-y-3 dark:text-white dark:bg-[#18191A] rounded-md bg-gray-100  dark:shadow-gray-200  shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] ">
              <div className="flex flex-col gap-2 w-full items-start">
                {formData?.subjects &&
                  JSON.parse(formData?.subjects)?.map((s) => (
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
                    className={
                      formData?.have50 === 0 ? "text-success" : "text-danger"
                    }
                  >
                    {formData?.have50 === 0 ? "Payé" : "Non payé"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-1">
                    <span className=" text-gray-600 dark:text-gray-400">
                      Demare Le :
                    </span>
                    <span>{formatDateToDDMMYY(payment?.startAt)}</span>
                  </div>
                  <div className="flex gap-1">
                    <span className=" text-gray-600 dark:text-gray-400">
                      Jusqua :
                    </span>
                    <span>{formatDateToDDMMYY(payment?.dueDate)}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Total ({JSON.parse(payment?.subjects)?.length}) matiére :
                  </span>
                  <span className="tracking-widest">
                    {payment?.discount + payment?.totalAmount} DH
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Rabais:
                  </span>
                  <span>-{payment?.discount} DH</span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <PiHandCoinsBold size="25" /> :
                  </span>
                  <span className="tracking-widest">
                    {formData?.amountPaid} DH
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between  gap-4">
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Devoir:
                  </span>
                  <span className="tracking-widest">
                    {payment?.totalAmount} DH
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Le Rest:
                  </span>
                  <span className="tracking-widest">
                    {payment?.totalAmount - formData?.amountPaid} DH
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Edite;
