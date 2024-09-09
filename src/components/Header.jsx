import { Avatar, Button} from "@nextui-org/react";

import { motion } from "framer-motion";
import { RiMenu3Line } from "react-icons/ri";

import ToggleThem from "./ToggleThem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ toggleSideBare, open }) => {
  const {user} = useSelector(state=>state.auth)
  return (
    <header
      className={`fixed top-0 right-0  z-[100] ${
        open ? "left-16" : "left-0"
      } duration-500 ease-in-out  h-16 bg-white  flex justify-between px-3 items-center dark:bg-[#242526] dark:text-white`}
    >
      <Button isIconOnly size="sm" variant="bordered" onClick={toggleSideBare}>
        <motion.span
          animate={{ rotate: open ? "0deg" : "180deg" }}
          className=" text-lg"
          transition={{ duration: 0.7 }}
        >
          <RiMenu3Line />
        </motion.span>
      </Button>
      <div className=" flex gap-3 items-center ">
        <ToggleThem />
        <div className="flex items-center gap-2">
          <Link to="/" className="flex flex-col items-end ">
            <span className="text-xs sm:text-medium font-semibold">{user.firstName + " " + user.lastName}</span>
            <span className="text-[10px] sm:text-sm font-semibold text-gray-400">
            {user.isOwner ? "@Admin" :" @Responsable" } 
            </span>
          </Link>
          <Avatar isBordered className="flex-shrink-0" />
        </div>
      </div>
    </header>
  );
};

export default Header;
