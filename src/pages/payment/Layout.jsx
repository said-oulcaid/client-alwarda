import { Button } from "@nextui-org/react";
import { Link,  Outlet, useLocation } from "react-router-dom";

const LayoutPayment = () => {
  
  const {pathname} = useLocation()
  return (
    <div className="flex flex-col items-center w-full gap-6">
      <div className="flex items-center gap-5 w-fit justify-center dark:border-gray-800 dark:bg-[#242526] dark:text-white bg-white p-3 border-gray-300 border-3 rounded-2xl ">
       
        <Button as={Link} to="/paiements/primaire" color={ pathname.includes('primaire') ?  "primary" :"default"} variant="flat">
          primaire
        </Button>
        <Button as={Link} to="/paiements/college" color={ pathname.includes('college') ?  "primary" :"default"} variant="flat">
          college
        </Button>
        <Button as={Link} to="/paiements/lycee" color={pathname.includes('lycee') ?  "primary" :"default"} variant="flat">
          lycee
        </Button>
      </div>
      <main className="w-full">

      <Outlet />
      </main>
    </div>
  );
};

export default LayoutPayment;
