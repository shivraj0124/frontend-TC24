import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Close, TokenOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import themeHook from "../Context";
function HodDetails() {
  const { token, userDetails } = themeHook();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagesize, setPagesize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [hodList, sethodList] = useState([]);
  const [hodListCount, sethodListCount] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isModelOpen2, setIsModelOpen2] = useState(false);
  const [pocUserName, setPocUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNO] = useState("");
  const [department, setdepartment] = useState();
  const [dptList, setdptList] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentId, setdeleteHodsetdepartmentId] = useState();
  const [isModelOpen3, setIsModelOpen3] = useState(false);
  const [editHod, seteditHod] = useState();
  const [deleteHod, setdeleteHod] = useState();
  const handleRowsPerPageChange = (event) => {
    console.log("mypagesize", event.target.value);
    setLoading(true);
    setPagesize(+event.target.value);
    setPageNumber(1);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handlePageChange = (event, newPage) => {
    setLoading(true);
    setPage(newPage);
    let pgnum = newPage + 1;
    setPageNumber(pgnum);
    console.log("this is newpage", pgnum);
  };
  const getAllHod = async () => {
    console.log(userDetails);
    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/poc/getAllHodPoc",
        {
          page: page,
          rows: rowsPerPage,
          college: userDetails.College,
        }
      );
      console.log(result.data.data);
      sethodList(result.data.data.data);
      sethodListCount(result.data.data.totalHods);
      setLoading(false);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
  };
  const handleAddHod = async (e) => {
    e.preventDefault();
    console.log(
      "POC Details",

      department
    );
    try {
      const result = await axios.post(
        "http://localhost:8000/api/poc/addHOD",
        {
          email: email,
          mobileNo: mobileNo,
          userType: "poc",
          allocated_college: userDetails.College,
          allocated_department: department,
        },
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );
      if (result.data.data.status) {
        toast.success(result.data.data.msg);
      } else {
        toast.error(result.data.data.msg);
      }
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
    setIsModelOpen(false);
  };
  const handleSearch = async (search) => {
    console.log(search);
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/poc/searchHod`,
        {
          search: search,
          allocated_college: userDetails.College,
        }
      );
      console.log(response.data);
      sethodList(response.data.hod);
      setInterval(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setInterval(() => {
        setLoading(false);
      }, 2000);
    }
    search.trim() === "" ? getAllHod() : "";
  };
  const handleDeleteHodModal = async (id, name) => {
    setdeleteHod({ id: id, name: name });
    setIsModelOpen2(true);
  };

  const handleDeleteHod = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8000/api/poc/delete_HOD",
        {
          hod_id: deleteHod.id,
          userType: "poc",
        },
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );
      if (result.data.data.status) {
        toast.success(result.data.data.msg);
      } else {
        toast.error(result.data.data.msg);
      }
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
    setIsModelOpen2(false);
  };

  const handleEditHodModal = async (id, email, mobileNo) => {
    getAllDptAddHod();

    seteditHod({
      id: id,
      email: email,
      mobileNo: mobileNo,
    });

    setEmail(email);
    setMobileNO(mobileNo);
    setIsModelOpen3(true);
  };

  const handleEditHod = async (e) => {
    e.preventDefault();
    console.log(token, "tokennn");

    try {
      const result = await axios.post(
        "http://localhost:8000/api/poc/editHodPoc",
        {
          id: editHod.id,
          email: email,
          mobileNo: mobileNo,
          userType: "poc",
        },
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );
      if (result.data.data.status) {
        toast.success(result.data.data.msg);
      } else {
        toast.error(result.data.data.msg);
      }
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
    setIsModelOpen3(false);
  };

  const getAllDptAddHod = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8000/api/dpt/getAllDptAddHod",
        {
          college: userDetails.College,
        }
      );
      console.log(result.data.data);
      setdptList(result.data.data.data);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
  };
  useEffect(() => {
    getAllHod();
    getAllDptAddHod();
  }, [page, pagesize, pageNumber, isModelOpen, isModelOpen2, isModelOpen3]);
  return (
    <div className="flex flex-col w-full  h-[90vh] p-5">
      <div className="flex flex-row justify-between w-[100%]">
        <div>
          <h1 className="text-lg font-semibold ">Hod List</h1>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <input
            type="text"
            placeholder="Search here"
            className="h-max p-1 px-2 rounded-md focus:outline-none border-2 border-gray-200"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#327c1c",
              height: "max-content",
            }}
            onClick={() => {
              setIsModelOpen(true);
              getAllDptAddHod();
            }}
            disabled={dptList?.length > 0 ? false : true}
          >
            Add HOD
          </Button>
        </div>
      </div>
      <div className=" mt-5 rounded">
        <Paper sx={{ width: "100%" }}>
          <TableContainer
            sx={{
              maxWidth: "100%",
              maxHeight: "500px",
              overflowX: "auto",
              overflowY: "auto",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile No</TableCell>
                  <TableCell>Department Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      <CircularProgress />{" "}
                    </TableCell>
                  </TableRow>
                )}
                {loading === false && !hodList?.length > 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="capitalize"
                      align="center"
                    >
                      No Data available in table
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  hodList?.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {page * rowsPerPage + (index + 1)}
                        </TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.mobileNo}</TableCell>
                        <TableCell>{item.allocated_department?.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-row gap-2">
                            <h2
                              className="text-blue-700 cursor-pointer"
                              onClick={() =>
                                handleEditHodModal(
                                  item._id,
                                  item.email,
                                  item.mobileNo
                                )
                              }
                            >
                              Edit{" "}
                            </h2>
                            <h2
                              className="text-red-500 cursor-pointer"
                              onClick={() =>
                                handleDeleteHodModal(item._id, item.username)
                              }
                            >
                              Delete
                            </h2>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            rowsPerPage={rowsPerPage}
            page={page}
            count={hodListCount}
            component="div"
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          ></TablePagination>
        </Paper>
        {isModelOpen && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  bg-opacity-10 backdrop-filter backdrop-blur-lg">
              <div className="relative  my-6 mx-auto w-[50%]">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold text-[#757575]">
                      Add HOD
                    </h3>
                    <button
                      className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsModelOpen(false)}
                    >
                      <Close />
                    </button>
                  </div>
                  <form onSubmit={handleAddHod}>
                    <div className="p-4">
                      <div className="flex flex-col">
                        <label className="mt-5">Email</label>
                        <input
                          type="email"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter Email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">Mobile No.</label>
                        <input
                          type="telephone"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter Mobile No"
                          onChange={(e) => setMobileNO(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">department Name</label>
                        <select
                          className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          onChange={(event) => {
                            setdepartment(event.target.value);
                          }}
                        >
                          <option value="">Select Department</option>
                          {dptList &&
                            dptList.map((item, index) => {
                              return (
                                <option
                                  key={index + 1}
                                  id={item._id}
                                  value={item._id}
                                >
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="flex flex-col py-4 justify-between gap-3">
                        <div className="flex gap-2 mt-10">
                          <Button
                            variant="contained"
                            type="submit"
                            style={{
                              backgroundColor: "#16a34a",
                              height: "max-content",
                            }}
                          >
                            Submit
                          </Button>
                          <Button
                            onClick={() => setIsModelOpen(false)}
                            variant="contained"
                            style={{
                              backgroundColor: "#dcfce7",
                              height: "max-content",
                              color: "#16a34a",
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
        {isModelOpen2 && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  bg-opacity-10 backdrop-filter backdrop-blur-lg">
              <div className="relative  my-6 mx-auto w-[50%]">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold text-[#757575]">
                      Delete HOD
                    </h3>
                    <button
                      className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsModelOpen2(false)}
                    >
                      <Close />
                    </button>
                  </div>
                  <form onSubmit={handleDeleteHod}>
                    <div className="p-4">
                      <div className="flex flex-col py-4 justify-between gap-3">
                        <h1>Are you sure ?</h1>
                        <h3>
                          Do you want to delete{" "}
                          <span className="text-blue-400">
                            {deleteHod.name}
                          </span>{" "}
                          Hod's record ?
                        </h3>
                        <div className="flex gap-2 mt-10">
                          <Button
                            variant="contained"
                            type="submit"
                            style={{
                              backgroundColor: "#E53935",
                              height: "max-content",
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={() => setIsModelOpen2(false)}
                            variant="contained"
                            style={{
                              backgroundColor: "#dcfce7",
                              height: "max-content",
                              color: "#16a34a",
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
        {isModelOpen3 && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  bg-opacity-10 backdrop-filter backdrop-blur-lg">
              <div className="relative  my-6 mx-auto w-[50%]">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold text-[#757575]">
                      Edit HOD
                    </h3>
                    <button
                      className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsModelOpen3(false)}
                    >
                      <Close />
                    </button>
                  </div>
                  <form onSubmit={handleEditHod}>
                    <div className="p-4">
                      <div className="flex flex-col">
                        <label className="mt-5">Email</label>
                        <input
                          type="email"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="mt-5">Mobile No.</label>
                        <input
                          type="telephone"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter Mobile No"
                          value={mobileNo}
                          onChange={(e) => setMobileNO(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex flex-col py-4 justify-between gap-3">
                        <div className="flex gap-2 mt-10">
                          <Button
                            variant="contained"
                            type="submit"
                            style={{
                              backgroundColor: "#16a34a",
                              height: "max-content",
                            }}
                          >
                            Submit
                          </Button>
                          <Button
                            onClick={() => setIsModelOpen3(false)}
                            variant="contained"
                            style={{
                              backgroundColor: "#dcfce7",
                              height: "max-content",
                              color: "#16a34a",
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HodDetails;
