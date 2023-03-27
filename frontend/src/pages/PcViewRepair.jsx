import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import HeaderPc from "../components/HeaderPc";
import PcSidebarRepair from "../components/PcSidebarRepair";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Oval } from "react-loader-spinner";

const PcViewRepair = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [files, setFiles] = useState([]);
  const [department, setDepartment] = useState("");
  const [sr_no, setSr_No] = useState("");
  const [bill_no, setBill_no] = useState("");
  const [academic_year, setAcademicYear] = useState("");
  const [supplier, setSupplier] = useState("");
  const [all, setAll] = useState([]);
  const [description, setDescription] = useState([]);
  const [amountlesser, setAmountlesser] = useState("");
  const [amountgreater, setAmountgreater] = useState("");
  const [material, setMaterial] = useState("");
  const [recyear, setRecyear] = useState("");
  const [expenselesser, setExpenselesser] = useState("");
  const [expensegreater, setExpensegreater] = useState("");
  const [loading, setLoading] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false); //Used in handleDeleteClick
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); //Used in handleDeleteClick

  const handleDeleteClick = (fileId, confirmDeleteValue) => {
    setConfirmDelete(confirmDeleteValue);
    setConfirmDeleteId(fileId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      "http://localhost:5000/pc/downloadrepairfile",
      {
        responseType: "blob",
        params: {
          department: department,
          sr_no: sr_no,
          academic_year: academic_year,
          bill_no: bill_no,
          supplier: supplier,
          description: description,
          material: material,
          recyear: recyear,
          amountgreater: amountgreater,
          amountlesser: amountlesser,
          expensegreater: expensegreater,
          expenselesser: expenselesser,
        },
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${Date.now()}` + "test.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  const handleDelete = async (id) => {
    setConfirmDelete(false);
    try {
      await axios
        .post("http://localhost:5000/pc/deleterowrepair", {
          id: id,
        })
        .then((res) => {
          window.location.reload("user/pc/repair/view");
        })
        .catch((err) => {
          window.location.reload("user/pc/repair/view");
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteMany = async () => {
    try {
      await axios
        .post("http://localhost:5000/pc/deleterowrepairmany", {
          ids: selectedRows,
        })
        .then((res) => {
          window.location.reload("user/pc/repair/view");
        })
        .catch((err) => {
          window.location.reload("user/pc/repair/view");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5000/pc/getsupp", {
        withCredentials: true,
      })
      .then((response) => {
        setAll(response.data.supp);
        return axios.get("http://localhost:5000/pc/getme", {
          withCredentials: true,
        });
      })
      .then((response) => {
        setDepartment(response.data.department);
        return axios.get(`http://localhost:5000/pc/searchrepair`, {
          withCredentials: true,
          params: {
            department: response.data.department,
            sr_no: sr_no,
            academic_year: academic_year,
            bill_no: bill_no,
            supplier: supplier,
            description: description,
            material: material,
            recyear: recyear,
            amountgreater: amountgreater,
            amountlesser: amountlesser,
            expensegreater: expensegreater,
            expenselesser: expenselesser,
          },
        });
      })
      .then((response) => {
        setFiles(response.data.files);
        setLoading(false);
      });
  }, [
    department,
    sr_no,
    academic_year,
    bill_no,
    supplier,
    description,
    material,
    recyear,
    amountgreater,
    amountlesser,
    expensegreater,
    expenselesser,
  ]);

  return (
    <>
      <div>
        <HeaderPc />
        <PcSidebarRepair />
        <div className="title-size text-color">Recurring data</div>
        <div className="min-h-screen">
          <div>
            <p className="text-color title-size"></p>
          </div>
          <div className="container table">
            <div className="overflow-x-auto">
              <div>
                <div className="w-full">
                  <div className="shadow-md rounded my-5">
                    <table className="min-w-max bg-white w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-center"></th>
                          <th className="py-3 px-6 text-center"></th>
                          <th className="py-3 px-6 text-center">Sr_No</th>
                          <th className="py-3 px-6 text-center">
                            Description_of_Material
                          </th>
                          <th className="py-3 px-6 text-center">
                            Name_Of_Supplier
                          </th>
                          <th className="py-3 px-6 text-center">Bill_No</th>
                          <th className="py-3 px-6 text-center">Date</th>
                          <th className="py-3 px-6 text-center">Amount</th>
                          <th className="py-3 px-6 text-center">Material</th>
                          <th className="py-3 px-6 text-center">
                            Receiving_Year
                          </th>
                          <th className="py-3 px-6 text-center">Year</th>
                          <th className="py-3 px-6 text-center">
                            Yearly_expense
                          </th>
                          <th className="py-3 px-6 text-center">Department</th>
                        </tr>
                      </thead>
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-center"></th>
                          <th className="py-3 px-6 text-center">
                            <div className="checkbox-flex">
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={handleDeleteMany}
                                disabled={selectedRows.length === 0}
                              >
                                Delete
                              </button>
                              <input
                                type="checkbox"
                                style={{ marginTop: "4px" }}
                                checked={selectedRows.length === files.length}
                                onChange={(e) =>
                                  setSelectedRows(
                                    e.target.checked
                                      ? files.map((file) => file._id)
                                      : []
                                  )
                                }
                              />
                            </div>
                          </th>
                          <th className="py-3 px-6 text-center">
                            <input
                              className="form-box-sm"
                              type="text"
                              name="sr_no"
                              placeholder="Enter sr_no"
                              value={sr_no}
                              onChange={(event) => {
                                setSr_No(event.target.value);
                              }}
                            ></input>
                          </th>
                          <th className="py-3 px-6 text-center">
                            <input
                              className="form-box-sm"
                              type="text"
                              name="description"
                              placeholder="Enter Description"
                              value={description}
                              onChange={(event) => {
                                setDescription(event.target.value);
                              }}
                            ></input>
                          </th>
                          <th className="py-3 px-6 text-center">
                            <select
                              className="form-dropdown-sm"
                              value={supplier}
                              onChange={(event) => {
                                // console.log(event.target.value);
                                if (event.target.value === "Select supplier") {
                                  setSupplier("");
                                } else {
                                  setSupplier(event.target.value);
                                }
                              }}
                            >
                              <option>Select supplier</option>
                              {all.map((supp) => (
                                <option key={supp.supplier}>
                                  {supp.supplier}
                                </option>
                              ))}
                            </select>
                          </th>
                          <th className="py-3 px-6 text-center">
                            <input
                              className="form-box-sm"
                              type="text"
                              name="bill_no"
                              placeholder="Enter Bill no."
                              value={bill_no}
                              onChange={(event) => {
                                setBill_no(event.target.value);
                              }}
                            ></input>
                          </th>
                          <th className="py-3 px-6 text-center">Date</th>
                          <th className="py-3 px-6 text-center">
                            <div className="updown">
                              <input
                                className="form-box-sm"
                                type="text"
                                name="amountlesser"
                                placeholder="Enter Min Amount"
                                value={amountlesser}
                                onChange={(event) => {
                                  setAmountlesser(event.target.value);
                                }}
                              ></input>
                              <input
                                className="form-box-sm"
                                type="text"
                                name="amountgreater"
                                placeholder="EnterMax Amount"
                                value={amountgreater}
                                onChange={(event) => {
                                  setAmountgreater(event.target.value);
                                }}
                              ></input>
                            </div>
                          </th>
                          <th className="py-3 px-6 text-center">
                            <input
                              className="form-box-sm"
                              type="text"
                              name="material"
                              placeholder="Enter Material"
                              value={material}
                              onChange={(event) => {
                                setMaterial(event.target.value);
                              }}
                            ></input>
                          </th>
                          <th className="py-3 px-6 text-center"></th>
                          <th className="py-3 px-6 text-center">
                            <input
                              className="form-box-sm"
                              type="text"
                              name="academic_year"
                              placeholder="Enter Year (yyyy-yy)"
                              value={academic_year}
                              onChange={(event) => {
                                setAcademicYear(event.target.value);
                              }}
                            ></input>
                          </th>
                          <th className="py-3 px-6 text-center">
                            <div className="updown">
                              <input
                                className="form-box-sm"
                                type="text"
                                name="expenselesser"
                                placeholder="Enter Min Yearly Expense"
                                value={expenselesser}
                                onChange={(event) => {
                                  setExpenselesser(event.target.value);
                                }}
                              ></input>
                              <input
                                className="form-box-sm"
                                type="text"
                                name="expensegreater"
                                placeholder="Enter Max Yearly Expense"
                                value={expensegreater}
                                onChange={(event) => {
                                  setExpensegreater(event.target.value);
                                }}
                              ></input>
                            </div>
                          </th>
                          <th className="py-3 px-6 text-center"></th>
                        </tr>
                      </thead>
                      {loading ? (
                        <>
                          <tbody className="text-gray-600 text-sm font-light">
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td
                                className="py-3 px-6 text-center"
                                style={{ cursor: "pointer" }}
                              >
                                <div>
                                  <Oval
                                    height={40}
                                    width={40}
                                    color="#4fa94d"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel="oval-loading"
                                    secondaryColor="#4fa94d"
                                    strokeWidth={2}
                                    strokeWidthSecondary={2}
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      ) : (
                        <>
                          {files.map((file) => (
                            <>
                              <tbody className="text-gray-600 text-sm font-light">
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                  <td
                                    className="py-3 px-6 text-center"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <div
                                      className="transform hover:text-red-500 hover:scale-110"
                                      // onClick={() => setConfirmDelete(true)}
                                      onClick={() =>
                                        handleDeleteClick(file._id, true)
                                      }
                                    >
                                      <RiDeleteBin6Line className="table-icons"></RiDeleteBin6Line>
                                    </div>
                                    {confirmDelete &&
                                    confirmDeleteId === file._id ? (
                                      <>
                                        <td
                                          className="py-3 px-6 text-center"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <div className="flex-row">
                                            <div
                                              onClick={() =>
                                                handleDelete(file._id)
                                              }
                                            >
                                              <div
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                                style={{ marginRight: "10px" }}
                                              >
                                                Delete
                                              </div>
                                            </div>
                                            <div
                                              onClick={() =>
                                                setConfirmDelete(false)
                                              }
                                            >
                                              <div className="bg-neutral-500 text-white px-4 py-2 rounded-md hover:bg-neutral-600">
                                                Cancel
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </td>

                                  <td className="py-3 px-6 text-center">
                                    <div>
                                      <input
                                        type="checkbox"
                                        checked={selectedRows.includes(
                                          file._id
                                        )}
                                        onChange={(e) =>
                                          setSelectedRows(
                                            (prevSelectedRows) => {
                                              if (e.target.checked) {
                                                return [
                                                  ...prevSelectedRows,
                                                  file._id,
                                                ];
                                              } else {
                                                return prevSelectedRows.filter(
                                                  (id) => id !== file._id
                                                );
                                              }
                                            }
                                          )
                                        }
                                      />
                                    </div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <div>{file.Sr_No}</div>
                                  </td>
                                  <td
                                    className="py-3 px-6 text-center"
                                    style={{
                                      wordBreak: "break-all",
                                      overflowWrap: "break-word",
                                      maxWidth: "300px",
                                    }}
                                  >
                                    <div>{file.Description_of_Material}</div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <div>{file.Name_Of_Supplier}</div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <div>{file.Bill_No}</div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <div>{file.Date}</div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <div>{file.Amount}</div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <div>{file.Material}</div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <div>{file.Receiving_Year}</div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <div>{file.Year}</div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <div>{file.Yearly_expense}</div>
                                  </td>
                                  <td className="py-3 px-6 text-center">
                                    <div>{file.Department}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          ))}
                        </>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="download-flex">
              <div>
                <form
                  onSubmit={(event) => {
                    handleSubmit(event);
                  }}
                >
                  <button
                    type="submit"
                    className="btn download-btn"
                    role="button"
                  >
                    Download repair file
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PcViewRepair;
