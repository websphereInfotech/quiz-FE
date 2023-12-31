import { Col, Row } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";
import { LiaHomeSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BaseUrl = process.env.REACT_APP_BASEURL;

const Profile = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  const [databaseCoins, setDatabaseCoins] = useState(0);

  const allcoins = localStorage.getItem("allcoins") || 0;
  // const newcoins= localStorage.getItem("coin") || 0;
const mobileNumber = sessionStorage.getItem("moblieNumber");


  let playCount = sessionStorage.getItem("playCount") || 0;
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDatabaseCoins = async () => {
      try {
        const response = await axios.post(
          `${BaseUrl}/api/updateCoins`,
          { coins: databaseCoins },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": 5000,
            },
          }
        );
        setDatabaseCoins(response.data.totalCoins);
        console.log("coins", response.data.totalCoins); // Update with your actual API response structure
      } catch (error) {
        console.error("Error fetching database coins:", error);
      }
    };
    fetchDatabaseCoins();
    const playerIsGuest = checkIfPlayerIsGuest();

    // Set the isGuest state based on the result
    setIsGuest(playerIsGuest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIfPlayerIsGuest = () => {
    const guestToken = localStorage.getItem("token");
    // localStorage.removeItem('token');
    console.log("TOKEN", guestToken);
    return !!guestToken;
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <div className="bg-color">
        <Row className="h-[100%] ">
          <Col className="md:w-[400px]  lg:w-[520px]  px-2 relative flex-col flex">
            <div className="">
              <div className="flex justify-between lg:w-[520px] py-[8px] cursor-pointer bg-color header">
                <Link to={`/quizhome`} className="pl-[10px]">
                  <img
                    src={require("../../image/download (1).png")}
                    alt=""
                    width={"40%"}
                  />
                </Link>

                <div className="flex justify-between">
                  <div className="flex items-center">
                    <img
                      class="w-[25px] "
                      src={require("../../../src/image/gift.gif")}
                      alt="animation"
                    />
                    <p className="text-white text-[10px] font-[700] pt-1">
                      {" "}
                      Daily Reward
                    </p>
                  </div>
                  <div className="mt-[3px] flex items-center ml-1">
                    <div class="text-[10px] flex w-[110px] text-white bg-[#2DAAE2] px-[18px] py-[5px] rounded-full">
                      <img
                        className="w-3 mr-2"
                        src="https://monetix-lookat1.quiztwiz.com/static/media/coin.637476e7fc615b3d4479fb73c7565f29.svg"
                        alt="svg"
                      ></img>
                      <p>{isGuest ? databaseCoins : allcoins} COINS</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-full gap-10 mt-6 pt-14">
                <div className="w-32  rounded-full ">
                  <img
                    className="h-32 rounded-full bg-[#f6f6f711]"
                    src={require("../../../src/image/download.png")}
                    alt="profile"
                  ></img>
                </div>
                <div class="flex gap-1 flex-col items-center justify-center text-white">
                  <p class="text-3xl">User X</p>
                  {
                    isGuest ?
                  <p class="text-sm">
                    {mobileNumber}
                    </p> :
                    <p>
                      mobile not updated
                    </p>
                  }
                  <p class="text-sm">Email not updated</p>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6 gap-10">
                <div className="w-[150px] rounded-xl py-2 px-4 flex justify-between items-center bg-[#2DAAE2] ">
                  <p className="text-white text-sm">Coins </p>
                  <p className="text-white text-lg">
                    {" "}
                    {isGuest ? databaseCoins : allcoins}
                  </p>
                </div>
                <div class="w-[150px] py-2 px-4 rounded-xl border-2 border-[#2DAAE2]  flex  items-center justify-between">
                  <p class="text-white text-sm">Quiz Played</p>
                  <p class="text-white text-lg">{playCount}</p>
                </div>
              </div>
              {isGuest ? (
                <></>
              ) : (
                <Link to={`/login`}>
                  <div class="flex justify-center mt-6">
                    <p className="text-center mx-3 py-3 px-14 font-[700] bg-[#F9B234]  text-white rounded-full cursor-pointer">
                      Join Now
                    </p>
                  </div>
                </Link>
              )}
              <div className="pb-8">
                <div className="bg-white lg:w-[500px] h-[360px] mx-auto mt-7 mb-[8px]">
                  <p className="text-black text-sm text-center">
                    ads by goggle
                  </p>
                </div>
              </div>
            </div>

            <div
              className=" footer flex justify-around lg:w-[520px] bg-color pb-4"
              style={{boxShadow: "0px -15px 15px rgba(9, 58, 92,0.5)"}}
            >
              <Link to="/category">
                <div className={`px-8 py-1 rounded-[28px] `}>
                  <BiCategory className="text-white ml-4 text-[20px]  mx-2 my-1" />
                  <p className="text-white text-[12px]">Category</p>
                </div>
              </Link>
              <Link to="/quizhome">
                <div className={`px-8 py-1 rounded-[28px]`}>
                  <LiaHomeSolid className="text-white text-[20px] mx-2 my-1" />
                  <p className="text-white text-[12px]">Home</p>
                </div>
              </Link>

              <Link to="/profile">
                <div
                  className={`px-8 py-1 rounded-[28px] ${
                    isClicked ? "" : "bg-[#94C120]"
                  }`}
                  onClick={handleClick}
                >
                  <CgProfile className={`text-white text-[20px] mx-2 my-1`} />
                  <p className="text-white text-[12px]">Profile</p>
                </div>
              </Link>
            </div>
          </Col>
          <Col className="fixed ">
            <div className="flex justify-center py-16 md:py-10">
              <img
                className="lg:w-[65%] md:w-[300px] "
                src={require('../../../src/image/image2.png')}
                alt=""
              ></img>
            </div>

            <div class="font-bold text-center text-white md:text-sm lg:text-2xl  big:bottom-12  big:z-[-1]">
              Welcome to Quiztwiz. Play a quiz and earn coins.
              <p class="font-normal text-2xl pt-4 text-center">
                There's a quiz for everyone!{" "}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Profile;
