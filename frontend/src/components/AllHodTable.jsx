import React from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

function AllHodTable(hod) {
  const Changestatus = async (event) => {
    event.preventDefault();
    console.log("click");
    axios
      .post("https://purchase-and-repair.onrender.com/hod/status", {
        email: hod.hod.email,
        status: hod.hod.status,
      })
      .then((res) => {
        window.location.reload("/user/admin/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const HandleDelete = async (event) => {
    event.preventDefault();
    await axios
      .post("https://purchase-and-repair.onrender.com/hod/delete", {
        email: hod.hod.email,
      })
      .then((res) => {
        window.location.reload("user/admin/dashboard");
      })
      .catch((err) => {
        window.location.reload("user/admin/dashboard");
      });
  };

  return (
    <tbody className="text-gray-600 text-sm font-light">
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6 text-center">
          <span className="font-medium">{hod.hod.name}</span>
        </td>
        <td className="py-3 px-6">
          <div>{hod.hod.email}</div>
        </td>
        <td className="py-3 px-6">
          <div>{hod.hod.department}</div>
        </td>
        <td className="py-3 px-6">
          <span className="text-green-500 rounded-full text-ls">
            {hod.hod.status}
          </span>
        </td>
        <td className="py-3 px-6 text-center" style={{ cursor: "pointer" }}>
          <div
            className="transform hover:text-red-500 hover:scale-110"
            onClick={HandleDelete}
          >
            <RiDeleteBin6Line className="table-icons"></RiDeleteBin6Line>
            Delete
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default AllHodTable;
