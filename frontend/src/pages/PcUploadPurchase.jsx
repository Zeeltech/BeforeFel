import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import logo from "../Asset/fileupload.png";
import "react-toastify/dist/ReactToastify.css";
import HeaderPc from "../components/HeaderPc";
import PcSidebarPurchase from "../components/PcSidebarPurchase";
import { Link } from "react-router-dom";
const PcUploadPurchase = () => {
  const [file, setFile] = useState();
  const [department, setDepartment] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/pc/getme", {
        withCredentials: true,
      })
      .then((response) => {
        setDepartment(response.data.department);
        console.log("setting" + response.data.department);
      });
  });

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
      .post("http://localhost:5000/pc/uploadfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: { department: department },
      })
      .then((response) => {
        console.log(response);
        if (response.data.message === "Please reload the page") {
          toast.error("Please reload the page");
        } else {
          toast.success("Successfully uploaded");
        }
      })
      .catch(() => {
        toast.error("Failure");
      });
  };

  return (
    <>
      <HeaderPc />
      <PcSidebarPurchase />
      <div className="outer-container">
        <div className="my-6">
          <p className="text-color title-size">Upload purchase files </p>
        </div>
        <div className="mycontainer1">
          <div>
            <p className="format">Download format for Purchase file </p>
          </div>
          <Link
            to="https://docs.google.com/spreadsheets/d/197NPzjB8B8ZyyTGOm8RaUlLA6HDnsJUm/edit?usp=sharing&ouid=102308490812095146273&rtpof=true&sd=true"
            target="_blank"
          >
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

export default PcUploadPurchase;
