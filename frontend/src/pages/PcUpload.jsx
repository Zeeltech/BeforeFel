import { useState } from "react";
import logo from "../Asset/fileupload.png";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import purchase from "../Asset/purchase.png";
import repair from "../Asset/repair.png";
import HeaderPc from "../components/HeaderPc";
import PcSidebar from "../components/PcSidebar";


const PcUpload = () => {
  return (
    <div>
      <HeaderPc/>
      <PcSidebar/>
      <div>
      <p className="text-color title-size">Select type of file</p>
      <div className="container-flex">
        <div >
          <Link to="/pc/upload/purchase">
            <img src={purchase} alt="Purchase" className="choose-file-img" />
            <p className="text-color">Purchase</p>
          </Link>
        </div>
        <div>
          <Link to="/pc/upload/repair">
            <img src={repair} alt="Repair" className="choose-file-img" />
            <p className="text-color">Recurring</p>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PcUpload;
