import axios from "../../../contexts/api/axios";
import eventEmitter from "../../../contexts/api/eventEmitter";
import { useNavigate, Link } from "react-router-dom";
import { BsBell, BsBellFill, BsClockFill } from "react-icons/bs";

import logoNewU from "../../../assets/images/newU.png";
import logoNewC from "../../../assets/images/newC.png";
import { toast } from "react-toastify";

export default function Notif({ u_info }) {
  const miseAJour = () => {
    axios
      .get(`conge/miseAJour/`, u_info.opts)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message, {
            autoClose: 5000,
          });
          eventEmitter.emit("miseAJour");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <>
      <li className="nav-item  pe-2 d-flex align-items-center">
        <div className="nav-link text-body p-0">
          <BsBell className="cursor-pointer" size={15} />
        </div>
      </li>
    </>
  );
}
