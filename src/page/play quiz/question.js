import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { VscHeartFilled } from "react-icons/vsc";
import { Link, useNavigate, useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { AiOutlineMenu } from "react-icons/ai";

const BaseUrl = process.env.REACT_APP_BASEURL;

const Question = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate(); // page navigate

  const [showLifelines, setShowLifelines] = useState(false); // show the lifeline
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [questionData, setQuestionData] = useState([]); // question data fetch in api
  const [score, setScore] = useState(0); // show the score
  const [secondsRemaining, setSecondsRemaining] = useState(118);
  const [progress, setProgress] = useState(100); // show progressbar
  const [FiftyFifty, setFiftyFifty] = useState(false); // show & hide 2 option
  const [audienceResponses, setAudienceResponses] = useState(Array(4).fill("")); // audienceResponses for
  const [audience, setAudience] = useState(false); // show & hide audienceResponses in ui
  const [isFrozen, setIsFrozen] = useState(false); // freeze time for this state
  const [remainingAnswers, setRemainingAnswers] = useState([]); // firstlifeline answer set
  const [useFirstLifeline, setUseFirstLifeline] = useState(true);
  const [useSecLifeline, setUseSecLifeline] = useState(true);
  const [useThirdLifeline, setUseThirdLifeline] = useState(true);
  const [useFourthLifeline, setUseFourthLifeline] = useState(true);
  const [databaseCoins, setDatabaseCoins] = useState(0);
  const [isGuest, setIsGuest] = useState(true);
  const allcoins = localStorage.getItem("coins") || 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLifelinesClick = () => {
    setShowLifelines(!showLifelines);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/quesation/questions?quiz=${categoryId}`);
       
        setQuestionData(response.data.data.slice(0, 15));
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    };
    if (categoryId) {
      fetchData();
    }
    const playerIsGuest = checkIfPlayerIsGuest();
    // Set the isGuest state based on the result
    setIsGuest(playerIsGuest);
    // const countdownInterval = setInterval(() => {
    //   if (!isFrozen) {
    //     setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    //     setProgress((prevProgress) => prevProgress - 100 / 118); // Adjust for your total time
    //   }
    // }, 1000);

    
    // if (secondsRemaining === 0) {
    //   clearInterval(countdownInterval);
    //   navigate("/result");
    // }
    // return () => clearInterval(countdownInterval);
  }, [categoryId]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (!isFrozen) {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
        setProgress((prevProgress) => prevProgress - 100 / 118); // Adjust for your total time
      }
    }, 1000);
    if (secondsRemaining === 0) {
      clearInterval(countdownInterval);
      navigate("/result");
    }
    return () => clearInterval(countdownInterval);
  }, [secondsRemaining, navigate, isFrozen]);

  const checkIfPlayerIsGuest = () => {
    const guestToken = localStorage.getItem("token");
    return !!guestToken;
  };

  const formatTime = (seconds) => {
    return `${seconds}`;
  };
  const handleOptionClick = (answer) => {
    if (selectedAnswer !== null) {
      return;
    }
    const currentQuestion = questionData[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct;
  
    const scoreChange = isCorrect ? 50 : -25;
    setScore((prevScore) => prevScore + scoreChange);
  
    setSelectedAnswer(answer);
    setAnswerStatus(isCorrect);
    const newScore = isCorrect ? score + 50 : score - 25;
    localStorage.setItem("score", newScore);
  
    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswerStatus(null);
  
      if (currentQuestionIndex < questionData.length - 1) {
        setCurrentQuestionIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          return newIndex < questionData.length ? newIndex : prevIndex;
        });        
        setFiftyFifty(false);
        setAudience(false);
        setIsFrozen(false);
      } else {
        navigate("/result");
      }
    }, 1000);
  };
  
  // 50: 50 lifeline
  const FirstLifeline = () => {
    if (useFirstLifeline) {
      const currentQuestion = questionData[currentQuestionIndex];
      setFiftyFifty(true);
      const correctAnswer = currentQuestion.correct;

      const incorrectAnswers = currentQuestion.answer.filter(
        (answer) => answer !== correctAnswer
      );
      const eliminatedAnswers = getRandomElements(incorrectAnswers, 2);

      const remaining = currentQuestion.answer.filter(
        (answer) => !eliminatedAnswers.includes(answer)
      );
      setRemainingAnswers(remaining);
      setUseFirstLifeline(false);
    }
  };
  const getRandomElements = (array, numElements) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, numElements);
  };
  const SecLifeline = () => {
    const simulateAudienceResponses = () => {
      const totalResponses = 100;
      const simulatedResponses = [
        Math.floor(Math.random() * totalResponses),
        Math.floor(Math.random() * totalResponses),
        Math.floor(Math.random() * totalResponses),
        Math.floor(Math.random() * totalResponses),
      ];
      setUseSecLifeline(false);

      return simulatedResponses;
    };

    if (useSecLifeline) {
      const currentQuestion = questionData[currentQuestionIndex];
      const simulatedResponses = simulateAudienceResponses(currentQuestion);

      setAudienceResponses(simulatedResponses);
      setAudience(true);
    }
  };

  useEffect(() => {    
    const token = localStorage.getItem('token');
    const fetchDatabaseCoins = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/api/updateCoins`,{coins:databaseCoins},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setDatabaseCoins(response.data.totalCoins);
      } catch (error) {
        console.error("Error fetching database coins:", error);
      }
    }
    fetchDatabaseCoins();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audienceResponses]);

  //Freeze Time lifeline
  const thirdLifeline = () => {
    if (useThirdLifeline) {
      toggleFreeze();
      setUseThirdLifeline(false);
    }
  };
  const toggleFreeze = () => {
    setIsFrozen((prevIsFrozen) => !prevIsFrozen);
  };

  // Flip Questions lifeline
  const fourthLifeline = () => {
    if (useFourthLifeline) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setUseFourthLifeline(false);
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div>
      <div className="relative">
          <div className="flex justify-between items-center cursor-pointer bg-[#0B0D26] px-4 py-2 text-white header">
          <Link to={`/quizhome`} className="px-[10px] m-0 p-0">
                  <div className="text-[#3FCAFF] md:text-2xl sm:text-lg font-bold italic font-serif">
                    QuizTime !
                  </div>
                </Link>
            <div className="hidden lg:flex items-center">
              <ul className="flex items-center text-white font-semibold">
                <li className="mx-3"><Link to='/quizhome'>HOME</Link></li>
                <li className="mx-3"><Link to='/privacy-policy'>PRIVACY POLICY</Link></li>
                <li className="mx-3"><Link to='/login'>LOGIN</Link></li>
                <li className="mx-3"><Link to='/aboutus'>ABOUT US</Link></li>
                <li className="mx-3"><Link to='/contact'>CONTACT US</Link></li>
              </ul>
            </div>
            <div className="mt-[3px] flex items-center ml-1">
              {/* <div className="text-[10px] flex text-white w-[110px] bg-[#2DAAE2] px-[18px] py-[5px] rounded-md me-2">
                <img
                  className="w-[14px] mr-1"
                  src={require('../../image/coins-1.png')}
                  alt="svg"
                ></img>
                <p> {isGuest ? databaseCoins : allcoins} COINS</p>
              </div> */}
            </div>
            <div className="lg:hidden">
              <AiOutlineMenu className="text-2xl text-white" onClick={toggleMenu} />
            </div>
          </div>
          {isMenuOpen && (
            <div className="absolute left-0 top-12 w-full bg-[#050230] text-white py-2 z-50">
              <ul className="flex flex-col items-start pl-4">
                <li className="my-1"><Link to='/quizhome'>HOME</Link></li>
                <li className="my-1"><Link to='/privacy-policy'>PRIVACY POLICY</Link></li>
                <li className="my-1"><Link to='/login'>LOGIN</Link></li>
                <li className="my-1"><Link to='/aboutus'>ABOUT US</Link></li>
                <li className="my-1"><Link to='/contact'>CONTACT US</Link></li>
              </ul>
            </div>
          )}
        </div>
        <Row className="">
          <Col className="md:w-[400px]  lg:w-[520px] relative flex-col flex">
            <div>
            {/* <div
                className="flex  justify-between items-center     lg:w-[520px]  py-[8px] cursor-pointer bg-[#0B0D26] header"
                style={{ boxShadow: "0px 10px 15px rgba(8, 13, 87,0.7)" }}
              >
                <Link to={`/quizhome`} className="px-[10px] m-0 p-0">
                  <div className="text-[#3FCAFF] md:text-2xl sm:text-lg font-bold italic font-serif">
                    QuizTime !
                  </div>
                </Link>
                <div className="flex  justify-between">
                  <div className="flex items-center">
                    <img
                      class="w-[25px] "
                      src={require("../../../src/image/gift.gif")}
                      alt="animation"
                    />
                    <p className="text-white text-[10px] font-[700] pt-1">
                      Daily Reward
                    </p>
                  </div>
                  <div className="mt-[3px] flex items-center ml-1">
                    <div class="text-[10px] flex text-white w-[110px] bg-[#2DAAE2] px-[18px] py-[5px] rounded-md me-2">
                    <img
                        className="w-[14px] mr-1"
                        src={require('../../image/coins-1.png')}
                        alt="svg"
                      ></img>
                      <p> {isGuest ? databaseCoins : allcoins} COINS</p>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="mt-[70px] ml-5 flex justify-between">
                <div className="text-[14px] text-white flex justify-between">
                  Question {currentQuestionIndex + 1}/{questionData.length}
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "60%",
                    paddingTop: "8px",
                  }}
                >
                  <LinearProgress
                    className="bg-[#75f207]"
                    variant="determinate"
                    value={progress}
                    sx={{ height: 5 }}
                  />
                  <Typography
                    variant="body2"
                    style={{ textAlign: "center" }}
                  ></Typography>
                </div>
                <h3 className="text-white">{formatTime(secondsRemaining)}</h3>
              </div>
              {currentQuestionIndex < questionData.length && (
                <>
                  <div
                    key={questionData[currentQuestionIndex]._id}
                    className="text-[14px] font-bold px-10 text-white text-center pt-5 pb-3"
                  >
                    <span>{questionData[currentQuestionIndex].question}</span>
                  </div>

                  <div className="grid-cols-2 grid text-white pt-2">
                    {questionData[currentQuestionIndex]?.answer.map(
                      (answer, index) => (
                        <Col
                          key={index}
                          onClick={() => handleOptionClick(answer)}
                          className={`flex flex-col items-center m-2 py-2 rounded-xl cursor-pointer ${
                            FiftyFifty && remainingAnswers.length > 0
                              ? remainingAnswers.includes(answer)
                                ? answer === selectedAnswer
                                  ? answerStatus
                                    ? "bg-[#099623] !important"
                                    : "bg-[#f02d1f] !important"
                                  : answer ===
                                      questionData[currentQuestionIndex]
                                        ?.correct && answerStatus === false
                                  ? "bg-[#099623] !important"
                                  : "bg-[#171349] !important"
                                : "hidden"
                              : answer === selectedAnswer
                              ? answerStatus
                                ? "bg-[#099623] !important"
                                : "bg-[#f02d1f] !important"
                              : answer ===
                                  questionData[currentQuestionIndex]?.correct &&
                                answerStatus === false
                              ? "bg-[#099623] !important"
                              : "bg-[#171349] !important"
                          }`}
                        >
                          {answer}
                        </Col>
                      )
                    )}
                  </div>
                </>
              )}

              <div className="flex justify-center items-center pt-4 text-lg font-bold">
                <p className="text-white">Your Score : </p>
                <span class="text-[#FFCC5B] pl-1">{score}</span>
              </div>

              {/* <div className="pb-8">
                <div className="bg-white lg:w-[500px] h-[360px] mx-auto mt-7 mb-[8px]">
                  <p className="text-black text-sm text-center">
                    ads by goggle
                  </p>
                </div>
              </div> */}
            </div>

            <div
              className="  footer flex justify-around lg:w-[520px] bg-[#0B0D26] pb-4 border-t border-[#389A06]"
              style={{boxShadow: "0px -15px 15px rgba(9, 58, 92,0.5)"}}
            >
              <div className="">
                <div className="flex justify-center  pt-3 relative">
                  <p
                    onClick={handleLifelinesClick}
                    className="text-white  transition duration-1000 absolute top-[-12px] bg-[#0B0D26] w-[180px] justify-center flex border cursor-pointer rounded-full  px-3 py-1 border-[#389A06]"
                  >
                    <VscHeartFilled
                      className="pt-[3px] mr-2 text-[18px] text-[#3FCAFF]"
                    />
                    <span className="text-[14px] font-[600] text-white">
                      Tap To Use Lifelines
                    </span>
                  </p>

                  {showLifelines && (
                    <>
                      <div className="flex gap-10 pt-8  relative">
                        <div>
                          <div
                            className={`h-[60px] w-[60px] border-[1px] rounded-full flex justify-center items-center cursor-default  ${
                              useFirstLifeline
                                ? "text-[#FFCC5B] border-[#FFCC5B] "
                                : "text-white border-white"
                            } `}
                            onClick={FirstLifeline}
                          >
                            50:50
                          </div>

                          <p className="text-white text-[12px] text-center">
                            50:50
                          </p>
                        </div>

                        <div>
                          <div className="flex justify-center">
                            <div
                              className={`h-[60px] w-[60px] gap-1 border-[1px] rounded-full flex justify-center items-center ${
                                useSecLifeline
                                  ? " border-[#FFCC5B] ": " border-white" } `}
                              onClick={SecLifeline}
                            >
                              <img
                                src="https://monetix-lookat1.quiztwiz.com/static/media/audience.c5d1df6dd75223d4733d68b4785d21c5.svg"
                                alt="audience poll"
                                style={{ filter: useSecLifeline ? "" : "brightness(0) invert(1)" }}
                                />
                            </div>
                          </div>
                          <p className="text-white text-[12px]">
                            Audience poll
                          </p>
                        </div>

                        <div>
                          <div className="flex justify-center">
                            <div
                              className={`h-[60px] w-[60px] border-[1px] rounded-full flex justify-center items-center ${
                                useThirdLifeline
                                  ? " border-[#FFCC5B] ": " border-white" }`}
                              onClick={thirdLifeline}
                            >
                              <img
                                src="https://monetix-lookat1.quiztwiz.com/static/media/freez.34d9b896bdb87fdf156faab0392be612.svg"
                                alt="Freeze"
                                style={{ filter: useThirdLifeline ? "" : "brightness(0) invert(1)" }}
                              />
                            </div>
                          </div>
                          <p className="text-white text-[12px]">Freeze Timer</p>
                        </div>

                        <div>
                          <div className="flex justify-center">
                            <div
                              className={`h-[60px] w-[60px] border-[1px] rounded-full flex justify-center items-center ${
                                useFourthLifeline
                                  ? " border-[#FFCC5B] ": " border-white" }`}
                              onClick={fourthLifeline}
                            >
                              <img
                                src="https://monetix-lookat1.quiztwiz.com/static/media/flip.9d50f995c4455c51e153268fcc5cbee5.svg"
                                alt="Flip"
                                style={{ filter: useFourthLifeline ? "" : "brightness(0) invert(1)" }}
                              />
                            </div>
                          </div>
                          <p className="text-white text-[12px]">
                            Flip Question
                          </p>
                        </div>
                      </div>
                      {audience && (
                        <div className="text-white flex justify-around	mt-5 absolute	bg-[#0F172A] w-full h-full">
                          <div>
                            <div className="my-3 text-lg	">
                              A - <span>{audienceResponses[0]} %</span>
                            </div>
                            <div className="my-3 text-lg	">
                              B - <span>{audienceResponses[1]} %</span>
                            </div>
                          </div>
                          <div>
                            <div className="my-3 text-lg	">
                              C - <span>{audienceResponses[2]} %</span>
                            </div>
                            <div className="my-3 text-lg	">
                              D - <span>{audienceResponses[3]} %</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
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
                There's a quiz for everyone!{" "}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Question;
