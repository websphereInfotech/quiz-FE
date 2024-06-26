import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const BaseUrl = process.env.REACT_APP_BASEURL;

const Result = () => {

    const [coins, setCoins] = useState(0);
    
    const calculateEarnedCoins = (score) => {
        if (score >= 50 && score <= 150) {
            return 500;
        } else if (score >= 200 && score <= 350) {
            return 750;
        } else if (score >= 400 && score <= 550) {
            return 1000;
        } else if (score >= 600 && score <= 700) {
            return 5000;
        } else if (score >= 750) {
            return 10000;
        } else {
            return 25;
        }
    };

    const score = localStorage.getItem('score') || 0;

    const earnedCoins = calculateEarnedCoins(score);
    localStorage.setItem('earnedCoins', earnedCoins)
    
    useEffect(() => {
        const updateCoins = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.post(`${BaseUrl}/api/updateCoins`, 
                    {
                        coins: coins,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                );
 
                setCoins(earnedCoins);
                localStorage.setItem("coin",response.data.totalCoins)
              } catch (error) {
                console.error('Error updating coins:', error);
              }
            };

            updateCoins(); 
          }, [coins,earnedCoins]);
          

    return (
        <>
            <div>

                <Row className="">
                    <Col className="md:w-[400px]  lg:w-[520px]  px-2 relative flex-col flex" >
                        <div className="" >
                      
                            <div >

                                <div className="">
                                    <div className="flex justify-center ">
                                        <h1 className="text-white text-4xl">Well Played</h1>
                                        <img className="w-[200px] absolute " src="https://monetix-lookat1.quiztwiz.com/static/media/animation.82d3951ab49c98d92a06.gif" alt="gift"></img>
                                    </div>

                                    <div className="grid-cols-2 flex-col pt-[100px] justify-center gap-2 grid text-white mx-[50px] font">
                                        <Col className="flex flex-col items-center py-2 pl-[10px] pr-[10px] bg-[#1A2F77]  rounded-xl cursor-pointer ">
                                            <p>{score}</p>
                                            <p>Your Score</p>
                                        </Col>
                                        <Col className="flex flex-col  items-center py-2 pl-[10px] pr-[10px] bg-[#1A2F77] rounded-xl cursor-pointer text-center">
                                            <p>{earnedCoins}</p>
                                            {/* <p>{coins}</p> */}
                                            <p>Coins Earned</p>
                                        </Col>


                                        {/* <p> COINS</p> */}
                                    </div>
                                </div>

                                <div class="mt-5 cursor-pointer flex justify-center">
                                    <button class=" flex gap-2 rounded-full px-7 py-2 border-2 border-[#D85B00] text-white ">
                                        Double Your winnings
                                        <img    src={require('../../image/coins-1.png')} alt="coin" />
                                    </button>
                                </div>

                                <div class="w-[85%] mx-auto  my-6" style={{ border: "1px solid #2DAAE2" }}></div>

                                <Link to="/quizhome">
                                    <div className="flex justify-center ">
                                        <button class="rounded-full px-7 py-2 text-white flex justify-center bg-[#389A06]">
                                            Home
                                        </button>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </Col>
                    <Col className="fixed me-[15%] bg-image">

                    <div className="py-16 md:py-10">
                        <img className="lg:w-[100%] md:w-[300px] " src={require('../../image/quiz-1.png')} alt=""></img>
                        </div>

                        <div class="font-bold text-center text-white md:text-sm  big:bottom-12  big:z-[-1]">
                            Welcome to QuizTimeNow. Play a quiz and earn coins.
                            <p class="font-normal text-2xl pt-4 text-center">
                                There's a quiz for everyone! </p>
                        </div>

                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Result