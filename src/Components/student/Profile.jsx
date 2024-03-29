import React, { useEffect, useState } from "react";
import themeHook from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Profile() {
  const { userDetails } = themeHook();
  const [pr, setpr] = useState([]);
  const navigate = useNavigate();

  const getuserproject = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/getuprojects",
        {
          user: userDetails._id,
        }
      );
      console.log(data);
      setpr(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getuserproject();
  }, []);

  return (
    <div className=" md:h-[90vh] bg-[#f5f5f5] border md:border-none relative">
      <img
        className=" h-40 w-[100%]"
        src="https://www.itu.int/en/ITU-D/Environment/PublishingImages/Pages/Priority-Areas/Green-GovStack/Green%20gov%20banner.jpg"
      />
      <div className=" grid grid-cols-1 md:grid-cols-[25%_1fr] gap-4 p-4 absolute top-20 w-[100%] md:h-[85%] ">
        <div className=" bg-white rounded-lg p-3 flex gap-2 flex-col items-center border md:border-none">
          <img
            className=" h-24 w-24 rounded-full"
            src="https://www.itu.int/en/ITU-D/Environment/PublishingImages/Pages/Priority-Areas/Green-GovStack/Green%20gov%20banner.jpg"
          />
          <h1 className=" font-semibold">{userDetails?.username}</h1>
          <div className=" border w-full"></div>
          <h1>{userDetails?.email}</h1>
          <h1>{userDetails?.mobileNo}</h1>
        </div>
        <div className=" bg-white rounded-lg h-[100%] overflow-y-auto p-2">
          <h1 className=" font-semibold text-darkgreen">Your Projects</h1>
          <div className=" md:p-3 flex flex-col gap-2">
            {pr.map((item, index) => (
              <div
                key={index}
                className=" grid grid-cols-1 min-[580px]:grid-cols-[auto_1fr] rounded-lg  gap-4 justify-center bg-[#f5f5f5] p-3"
              >
                <img
                  src={item.multimedia[0]}
                  className="w-full min-[580px]:w-28  h-28 rounded-xl object-cover"
                />
                <div className=" flex gap-2 flex-col justify-start ">
                  <div>
                    <p className=" font-semibold text-xl">{item.title}</p>
                  </div>

                  <div className=" line-clamp-2 text-sm">
                    {item.description}
                  </div>

                  <div className=" text-xs">
                    <span className=" font-semibold">Published on :</span>
                    {item.time}
                  </div>
                  <div
                    onClick={() => {
                      navigate(`/project/${item._id}`);
                    }}
                    className="text-xs bg-[#57CC99] w-28 rounded-full bg-opacity-25 px-2 py-1 text-green-600 text-center font-semibold"
                  >
                    Go to Project
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
