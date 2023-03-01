import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import logo from "../Asset/fileupload.png";
import "react-toastify/dist/ReactToastify.css";
import HeaderPc from "../components/HeaderPc";
import PcSidebar from "../components/PcSidebar";
import {Link} from "react-router-dom";
const PcUploadRepair = () => {
  const [file, setFile] = useState();

  const handleChange = (event) => {
    // console.log(event.target);
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log(file);
    const formData = new FormData();
    formData.append("uploads", file);
    // console.log(formData);

    axios
      .post("http://localhost:5000/pc/uploadrepairfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Successfully uploaded");
      })
      .catch(() => {
        toast.error("Failure");
      });
  };

  return (
    <>
      <HeaderPc />
      <PcSidebar />
      <div className="outer-container">
        <div className="my-6">
          <p className="text-color title-size">Upload recurring files </p>
        </div>
        <div className="mycontainer1">
          <div>
            <p className="format">Download format for recurring file </p>
          </div>
          <Link to="https://docs.google.com/spreadsheets/d/17AKdKZAsQ6Urbto2RvoN_MhcWQMH4QI2/edit?usp=sharing&ouid=102308490812095146273&rtpof=true&sd=true" target="_blank">
            <div className="btn" role="button">
              Download sample file
            </div>
          </Link>
        </div>
        <div className="mycontainer">
          <div className="upload-container">
            <form
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <div className="upload-dot">
                <img src={logo} className="img-file" />
                <h3>Browse .XLSX Files</h3>
                <input
                  className="file-in"
                  type="file"
                  accept=".xls, .xlsx"
                  name="uploads"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </div>
              <button type="submit" className="btn upload-btn" role="button">
                Upload
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default PcUploadRepair;
