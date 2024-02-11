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
function CollegesTable() {
  const { token } = themeHook();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagesize, setPagesize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [collegeList, setCollegeList] = useState([]);
  const [collegeListCount, setCollegeListCount] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isModelOpen2, setIsModelOpen2] = useState(false);
  const [collegeName, setCollegeName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");
  const [collegeId, setCollegeId] = useState();
  const [isModelOpen3, setIsModelOpen3] = useState(false);
  const [editCollege, setEditCollege] = useState();

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
  const getAllColleges = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/admin/getAllCollegesAdmin",
        {
          page: page,
          rows: rowsPerPage,
        }
      );
      console.log(result.data.data);
      setCollegeList(result.data.data.data);
      setCollegeListCount(result.data.data.totalColleges);
      setLoading(false);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
  };
  const handleAddCollege = async (e) => {
    e.preventDefault();
    console.log("College Details", collegeName, about, address, token);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/admin/addCollege",
        {
          name: collegeName,
          about: about,
          address: address,
          userType: "admin",
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
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/searchCollege`,
        {
          params: { search },
        }
      );
      setCollegeList(response.data.faculties);
      setInterval(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setInterval(() => {
        setLoading(false);
      }, 2000);
    }
  };
  const handleDeleteCollegeModal = async (id, name) => {
    setCollegeId({ id: id, name: name });
    setIsModelOpen2(true);
  };

  const handleDeleteCollege = async (e) => {
    e.preventDefault();
    console.log(collegeId.name);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/admin/deleteCollege",
        {
          college_id: collegeId.id,
          userType: "admin",
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
  const handleEditCollegeModal = async (id, name, about, address) => {
    setEditCollege({ id: id, name: name, about: about, address: address });
    setCollegeName(name);
    setAbout(about);
    setAddress(address);
    setIsModelOpen3(true);
  };
  const handleEditCollege = async (e) => {
    e.preventDefault();
    console.log(collegeName, about, address);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/admin/editCollege",
        {
          id: editCollege.id,
          name: collegeName,
          about: about,
          address: address,
          userType: "admin",
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
  useEffect(() => {
    getAllColleges();
  }, [page, pagesize, pageNumber, isModelOpen, isModelOpen2, isModelOpen3]);
  return (
    <div className="flex flex-col w-full  h-[90vh] p-5">
      <div className="flex flex-row justify-between ">
        <div>
          <h1 className="text-lg font-semibold ">College List</h1>
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
            onClick={() => setIsModelOpen(true)}
          >
            Add College
          </Button>
        </div>
      </div>
      <div className=" mt-5 rounded">
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: 550 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>About</TableCell>
                  <TableCell>Address</TableCell>
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
                {loading === false && !collegeList?.length > 0 && (
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
                  collegeList?.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {page * rowsPerPage + (index + 1)}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.about}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>
                          <div className="flex flex-row gap-2">
                            <h2
                              className="text-blue-700 cursor-pointer"
                              onClick={() =>
                                handleEditCollegeModal(
                                  item._id,
                                  item.name,
                                  item.about,
                                  item.address
                                )
                              }
                            >
                              Edit
                            </h2>
                            <h2
                              className="text-red-500 cursor-pointer"
                              onClick={() =>
                                handleDeleteCollegeModal(item._id, item.name)
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
            count={collegeListCount}
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
                      Add College
                    </h3>
                    <button
                      className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsModelOpen(false)}
                    >
                      <Close />
                    </button>
                  </div>
                  <form onSubmit={handleAddCollege}>
                    <div className="p-4">
                      <div className="flex flex-col">
                        <label className="mt-5">College Name</label>
                        <input
                          type="text"
                          className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter College Name"
                          onChange={(e) => setCollegeName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">About</label>
                        <input
                          type="telephone"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="About The College"
                          onChange={(e) => setAbout(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">Address</label>
                        <input
                          type="telephone"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter College Address"
                          onChange={(e) => setAddress(e.target.value)}
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
                      Delete College
                    </h3>
                    <button
                      className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsModelOpen2(false)}
                    >
                      <Close />
                    </button>
                  </div>
                  <form onSubmit={handleDeleteCollege}>
                    <div className="p-4">
                      <div className="flex flex-col py-4 justify-between gap-3">
                        <h1>Are you sure ?</h1>
                        <h3>
                          Do you want to delete{" "}
                          <span className="text-blue-400">
                            {collegeId.name}
                          </span>{" "}
                          college's records ?
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
                      Edit College
                    </h3>
                    <button
                      className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsModelOpen3(false)}
                    >
                      <Close />
                    </button>
                  </div>
                  <form onSubmit={handleEditCollege}>
                    <div className="p-4">
                      <div className="flex flex-col">
                        <label className="mt-5">College Name</label>
                        <input
                          type="text"
                          className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter College Name"
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">About</label>
                        <input
                          type="telephone"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="About The College"
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">Address</label>
                        <input
                          type="telephone"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter College Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
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

export default CollegesTable;
