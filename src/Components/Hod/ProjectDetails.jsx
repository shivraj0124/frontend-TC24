import React, { useState, useEffect } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
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
import { Link } from "react-router-dom";
const styles = {
  paper: {
    width: "100%", // Set Paper component width to 100% of its container
    overflowX: "auto", // Add horizontal scrollbar if content overflows
  },
  pagination: {
    flexShrink: 0, // Prevent pagination component from shrinking
  },
};

function ProjectDetails() {
  const projectTypes = [
    { id: 1, value: "Software" },
    { id: 2, value: "Hardware" },
    { id: 3, value: "AI/Ml" },
    { id: 4, value: "IOT" },
  ];
  const { token, userDetails } = themeHook();
  const [loading, setLoading] = useState(true);
  const [chatlistcount, setChatlistcount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagesize, setPagesize] = useState(10);
  const [pagenumber, setPagenumber] = useState(1);
  const [projectList, setProjectList] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [showDes, setShowDes] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isModelOpen1, setIsModelOpen1] = useState(false);
  const [isModelOpen2, setIsModelOpen2] = useState(false);
  const [isModelOpen3, setIsModelOpen3] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  //add college
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [multimedia, setMultimedia] = useState([]);
  const [contributors, setContributors] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [selectedType, setSelectedType] = useState("");
  // for delete
  const [deleteProject, setDeleteProject] = useState({});
  //for edit
  const [editProject, setEditProject] = useState();
  const [isEnabled, setIsEnabled] = useState();
  const [img, setimg] = useState([]);
  const [sstatus, setstatus] = useState("");

  const toggleStatus = () => {
    setIsEnabled(!isEnabled);
  };
  const setbase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMultimedia(reader.result);
    };
  };

  let t = "false";
  let f = "true";
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setbase(file);
    console.log(file);
  };

  const handleRowsPerPageChange = (event) => {
    console.log("mypagesize", event.target.value);
    setLoading(true);
    setPagesize(+event.target.value);
    setPagenumber(1);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handlePageChange = (event, newPage) => {
    setLoading(true);
    setPage(newPage);
    let pgnum = newPage + 1;
    setPagenumber(pgnum);
    console.log("this is newpage", pgnum);
  };

  const getAllProjects = async () => {
    console.log(userDetails);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/hod/getProjects",
        {
          allocated_college: userDetails.allocated_college,
          allocated_department: userDetails.allocated_department,
        }
      );
      setProjectList(result.data.data.data);
      console.log(result.data.data.data);
      setProjectCount(result.data.data.projectCount);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
    setLoading(false);
  };
  const handleAddProject = async (e) => {
    e.preventDefault();
    const timestamp = new Date();
    try {
      const result = await axios.post(
        "http://localhost:8000/api/hod/addProject",
        {
          title: title,
          description: description,
          multimedia: multimedia,
          contributers: contributors,
          live_demo: liveDemo,
          college: userDetails.allocated_college,
          department: userDetails.allocated_department,
          type: selectedType,
          userType: "HOD",
          timestamp: timestamp,
        },
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );
      if (result?.data?.data?.status) {
        toast.success(result?.data?.data?.msg);
      } else {
        toast.error(result?.data?.data?.msg);
      }
      setIsModelOpen(false);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
  };
  const handleDeleteProjectModal = async (id, name) => {
    setDeleteProject({ id: id, name: name });
    console.log(id, name);
    setIsModelOpen2(true);
  };
  const handleDeleteProject = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8000/api/hod/deleteProject",
        {
          project_id: deleteProject.id,
        },
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );
      if (result?.data?.data?.status) {
        toast.success(result?.data?.data?.msg);
      } else {
        toast.error(result?.data?.data?.msg);
      }
      setIsModelOpen2(false);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
  };
  const handleEditProjectModal = async (item) => {
    setEditProject(item);
    setIsModelOpen3(true);
    setTitle(item.title);
    setDescription(item.description);
    // setMultimedia(item.multimedia);
    setContributors(item.contributers);
    setLiveDemo(item.live_demo);
    setSelectedType(item.type);
  };
  const handleEditProject = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8000/api/hod/editProject",
        {
          id: editProject._id,
          title: title,
          description: description,
          multimedia: multimedia,
          contributers: contributors,
          live_demo: liveDemo,
          college: userDetails.allocated_college,
          department: userDetails.allocated_department,
          type: selectedType,
          userType: "HOD",
        },
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );
      if (result?.data?.data?.status) {
        toast.success(result?.data?.data?.msg);
      } else {
        toast.error(result?.data?.data?.msg);
      }
      setIsModelOpen(false);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
    setIsModelOpen3(false);
  };
  const handleSearch = async (search) => {
    console.log(search);
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/hod/searchProject?search=${search}`,
        {
          allocated_department: userDetails.allocated_department,
        }
      );
      setProjectList(response.data.projects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Projects:", error);
      // setInterval(() => {
      setLoading(false);
      // }, 2000);
    }
  };

  const handlestatus = async (id, s) => {
    try {
      console.log(id, s, "54545458458");
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/hod/handleStatus",
        {
          project_id: id,
          active: s,
        }
      );
      if (data.data.status) {
        setLoading(false);
        getAllProjects();
      }
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [page, rowsPerPage, isModelOpen, isModelOpen2, isModelOpen3]);
  return (
    <div className="flex flex-col w-full  h-[90vh] p-5">
      <div className="flex flex-row justify-between ">
        <div>
          <h1 className="text-lg font-semibold ">Projects</h1>
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
            Add Project
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
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Multimedia</TableCell>
                  <TableCell>Contributors</TableCell>
                  <TableCell>Live Demo</TableCell>
                  <TableCell>Like Count</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Type</TableCell>
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
                {loading === false && !projectList?.length > 0 && (
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
                  projectList?.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {page * rowsPerPage + (index + 1)}
                        </TableCell>
                        <TableCell
                          className="cursor-pointer"
                          onClick={() => {
                            setCurrentRow(item);
                            setIsModelOpen1(true);
                          }}
                        >
                          {" "}
                          {item.title}{" "}
                        </TableCell>
                        <TableCell>
                          {" "}
                          {item.description.split(" ").slice(0, 5)}
                          <br />
                          <h1
                            className="text-blue-500 cursor-pointer"
                            onClick={() => {
                              setShowDes(item.description);
                              setCurrentRow(item);
                              setIsModelOpen1(true);
                            }}
                          >
                            Read More...
                          </h1>
                        </TableCell>
                        <TableCell>
                          <a target="_blank" href={item.multimedia}>
                            <img
                              className="w-[50px] h-[50px]"
                              src={item.multimedia}
                            />{" "}
                          </a>
                        </TableCell>
                        <TableCell> {item.contributers} </TableCell>
                        <TableCell>
                          <Link
                            className="text-blue-400"
                            target="_blank"
                            to={item.live_demo}
                          >
                            {item.live_demo}
                          </Link>
                        </TableCell>
                        <TableCell>{item.likecount}</TableCell>
                        <TableCell>
                          <div onClick={toggleStatus}>
                            {item?.isActive === "true" ? (
                              <FaToggleOn
                                onClick={() => handlestatus(item._id, t)}
                                size={23}
                                color="green"
                              />
                            ) : (
                              <FaToggleOff
                                onClick={() => handlestatus(item._id, f)}
                                size={23}
                                color="red"
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>
                          <div className="flex flex-row gap-2">
                            <h2
                              className="text-blue-700 cursor-pointer"
                              onClick={() => handleEditProjectModal(item)}
                            >
                              Edit
                            </h2>
                            <h2
                              className="text-red-500 cursor-pointer"
                              onClick={(e) =>
                                handleDeleteProjectModal(item._id, item.title)
                              }
                            >
                              Delete
                            </h2>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                    {
                    }
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            rowsPerPage={rowsPerPage}
            page={page}
            count={projectCount}
            component="div"
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          ></TablePagination>
        </Paper>

        {isModelOpen1 && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  bg-opacity-10 backdrop-filter backdrop-blur-lg">
              <div className="relative  my-6 mx-auto w-[50%]">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold text-[#757575]">
                      Project Details
                    </h3>
                    <button
                      className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsModelOpen1(false)}
                    >
                      <Close />
                    </button>
                  </div>
                  <div className="p-4">
                    <a href={currentRow.multimedia} target="_blank">
                      <img
                        src={currentRow.multimedia}
                        className="rounded-md h-[200px]"
                      />
                    </a>
                    <div className="flex flex-col mt-2">
                      <h1 className="font-bold">Title</h1>
                      <div>{currentRow.title}</div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <h1 className="font-bold">Description</h1>
                      <div>{currentRow.description}</div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <h1 className="font-bold">Multimedia</h1>
                      <div>{currentRow.multimedia}</div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <h1 className="font-bold">Contributors</h1>
                      <div>
                        {" "}
                        {currentRow.contributers?.c1},
                        {currentRow.contributers?.c2},
                        {currentRow.contributers?.c3},
                        {currentRow.contributers?.c4}
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <h1 className="font-bold">Live Demo</h1>
                      <div>{currentRow.live_demo}</div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <h1 className="font-bold">Likes</h1>
                      <div>{currentRow.likecount}</div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <h1 className="font-bold">Comments</h1>
                      <div>{currentRow.commentcount}</div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <h1 className="font-bold">Type</h1>
                      <div>{currentRow.type}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {isModelOpen && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  bg-opacity-10 backdrop-filter backdrop-blur-lg">
              <div className="relative  my-6 mx-auto w-[50%]">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold text-[#757575]">
                      Add Project
                    </h3>
                    <button
                      className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsModelOpen(false)}
                    >
                      <Close />
                    </button>
                  </div>
                  <form onSubmit={handleAddProject}>
                    <div className="p-4">
                      <div className="flex flex-col">
                        <label className="mt-5">Project Title</label>
                        <input
                          type="text"
                          className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter Project Title"
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">Project Type</label>
                        <select
                          className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          onChange={(event) => {
                            setSelectedType(event.target.value);
                          }}
                        >
                          <option value="">Select Project Type</option>
                          {projectTypes &&
                            projectTypes.map((item, index) => {
                              return (
                                <option
                                  key={index + 1}
                                  id={item.id}
                                  value={item.value}
                                >
                                  {item.value}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">PRoject Description</label>
                        <textarea
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter Project Description"
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="mt-5">Multimedia</label>
                        <input
                          type="file"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Drop Multimedia"
                          onChange={handleImageUpload}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">Project Contributors</label>
                        <input
                          type="telephone"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Ex. Mohan Rane, Satish Ratho"
                          onChange={(e) => setContributors(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">Project Live Demo</label>
                        <input
                          type="telephone"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Drop Live Project Link"
                          onChange={(e) => setLiveDemo(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex flex-col py-2 justify-between gap-3">
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
                      Delete Project
                    </h3>
                    <button
                      className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsModelOpen2(false)}
                    >
                      <Close />
                    </button>
                  </div>
                  <form onSubmit={handleDeleteProject}>
                    <div className="p-4">
                      <div className="flex flex-col py-4 justify-between gap-3">
                        <h1>Are you sure ?</h1>
                        <h3>
                          Do you want to Delete{" "}
                          <span className="text-blue-400">
                            {deleteProject.name}
                          </span>{" "}
                          project's records ?
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
                      Edit Project
                    </h3>
                    <button
                      className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsModelOpen3(false)}
                    >
                      <Close />
                    </button>
                  </div>
                  <form onSubmit={handleEditProject}>
                    <div className="p-4">
                      <div className="flex flex-col">
                        <label className="mt-5">Project Title</label>
                        <input
                          type="text"
                          className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter Project Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">Project Type</label>
                        <select
                          className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          defaul
                          onChange={(event) => {
                            setSelectedType(event.target.value);
                          }}
                        >
                          <option value="">{selectedType}</option>
                          {projectTypes &&
                            projectTypes.map((item, index) => {
                              return (
                                <option
                                  key={index + 1}
                                  id={item.id}
                                  value={item.value}
                                >
                                  {item.value}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">Project Description</label>
                        <textarea
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Enter Project Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="mt-5">Project Contributors</label>
                        <input
                          type="telephone"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Ex. Mohan Rane, Satish Ratho"
                          value={contributors}
                          onChange={(e) => setContributors(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">Project Live Demo</label>
                        <input
                          type="telephone"
                          className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="Drop Live Project Link"
                          value={liveDemo}
                          onChange={(e) => setLiveDemo(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mt-5">Multimedia</label>
                        <div className="flex flex-row items-center gap-2">
                          {" "}
                          <input
                            type="file"
                            className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                            placeholder="Drop Multimedia"
                            onChange={handleImageUpload}
                          />
                          <a href={editProject.multimedia} target="_blank">
                            <img
                              src={editProject.multimedia}
                              className="w-[80px] h-[80px] rounded-md"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-col py-2 justify-between gap-3">
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

export default ProjectDetails;
