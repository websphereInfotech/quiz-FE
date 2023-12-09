import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

localStorage.clear();

const Quiz = () => {
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false); //Model Open & Close
  const [questions, setQuestions] = useState([]); // Fatch To Questions Data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Questions Index Set
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Fetch The Answer
  const [answerStatus, setAnswerStatus] = useState(null); //Answer True False Check
  const [totalscore, setTotalScore] = useState(0); // Show The Score

  // Function To Open The Modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function To Close The Modal
  const closeModal = () => {
    setModalOpen(false);
    navigate("/quizplay");

    //Show The Tostify
    toast("100 Coins Rewarded!!", {
      style: { background: "black", color: "white" },
      progressStyle: { background: "#cc00ff" },
      icon: (
        <img
          src={require("../../image/coin-2.jpg")}
          className="w-full"
          alt="coin"
        />
      ),
    });
  };

  //Fetch Questions Data
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          ` https://0135-223-179-148-39.ngrok-free.app/api/quesation/loginquestions`,{headers: {
            'ngrok-skip-browser-warning': 5000
          }}
        );
        // const response = await axios.get(`http://localhost:5000/api/quesation/loginquestions`)
        setQuestions(response.data.data.slice(0, 2));
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchQuestions();
  }, []);

  // Check The Answer True & False
  const handleOptionClick = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct; // Check  Selected Answer Is Correct

    setSelectedAnswer(answer); // Update The State And Use The Updated Value
    setAnswerStatus(isCorrect);

    const correctScore = 50;
    const wrongScore = -50;

    const scoreChange = isCorrect ? correctScore : wrongScore; // Calculate The Score Based on Correctness

    setTotalScore((prevScore) => prevScore + scoreChange); // Update The Total Score
    setTimeout(() => {
      setSelectedAnswer(null); // Clear The Selected Answer And Answer Status
      setAnswerStatus(null);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }

      // Check If it's The Second Question And Open The Modal
      if (currentQuestionIndex === 1) {
        openModal();
      }
    }, 1000);
  };
  const defaultScore = 100 + totalscore;
  localStorage.setItem("totalsocre", defaultScore);
  //   let interval = setInterval(() => {
  //     // Check if Adsense script is loaded every 300ms
  //     if (window.adsbygoogle) {
  //       pushAd()
  //       // clear the interval once the ad is pushed so that function isn't called indefinitely
  //       clearInterval(interval)
  //     }
  //   }, 1000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])
  // useEffect(() => {
  //   const initializeAdSense = () => {
  //     if (window.adsbygoogle && window.adsbygoogle.loaded) {
  //       return; // AdSense script already loaded
  //     }

  //     window.adsbygoogle = window.adsbygoogle || [];
  //     window.adsbygoogle.loaded = true;

  //     const script = document.createElement("script");
  //     script.src =
  //       "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  //     script.async = true;
  //     script.crossOrigin = "anonymous";

  //     script.onload = () => {
  //       console.log("AdSense script loaded successfully");
  //     };

  //     script.onerror = (error) => {
  //       console.error("Error loading AdSense script:", error);
  //     };

  //     document.head.appendChild(script);
  //   };

  //   const pushAd = () => {
  //     try {
  //       // Push ads after the script is loaded
  //       (window.adsbygoogle = window.adsbygoogle || []).push({});
  //       console.log("Ad pushed successfully");
  //     } catch (error) {
  //       console.error("Error pushing ads:", error);
  //     }
  //   };

  //   initializeAdSense();

  //   // Check if Adsense script is loaded every 300ms
  //   const interval = setInterval(() => {
  //     if (window.adsbygoogle && window.adsbygoogle.loaded) {
  //       pushAd();
  //       clearInterval(interval); // Clear the interval once the ad is pushed
  //     }
  //   }, 300);

  //   return () => {
  //     clearInterval(interval); // Cleanup function to clear the interval
  //   };
  // }, []);

  return (
    <>
      <div className="bg-[#0F172A]">
        <Row className="flex  ">
          <Col className="lg:w-[520px] md:w-[410px]  py-3 px-2">
            <div className="bg-white h-[350px] mx-auto mb-[8px]">
              <p className="text-black text-center">ads by goggle</p>
              {/* <iframe data-aa='2279699' src='//ad.a-ads.com/2279699?size=300x250' style={{width:'300px', height:'250px', border:'0px', padding:'0', overflow:'hidden', backgroundColor: 'transparent'}}></iframe> */}
              {/* <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9720528266916800"
                crossOrigin="anonymous"
              ></script> */}
              {/* <ins
                className="adsbygoogle"
                style={{display:'block'}}
                data-ad-client="ca-pub-9720528266916800"
                data-ad-slot="6643013555"
                data-ad-format="auto"
                data-full-width-responsive="true"
                data-adtest="on"
              ></ins> */}

              {/* <script>
                {(window.adsbygoogle = window.adsbygoogle || []).push({})}
              </script> */}
            </div>

            <div className="text-center">
              <h1 className="font-bold text-white text-18">Let's begin!</h1>
              <span className="text-[12px] text-[#8789c3]">
                Answer few questions and win 150 free!
              </span>
            </div>
            <div className=" text-[#bac8ff] font-bold text-center pt-5 pb-3">
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>
            {currentQuestionIndex < questions.length && (
              <>
                <div
                  key={questions[currentQuestionIndex]._id}
                  className="text-lg font-bold px-10 text-white text-center pb-5"
                >
                  <span>{questions[currentQuestionIndex].question}</span>
                </div>
                <div className="grid-cols-2 grid text-white pt-2">
                  {questions[currentQuestionIndex]?.answers.map(
                    (answer, index) => (
                      <Col
                        key={index}
                        onClick={() => handleOptionClick(answer)}
                        className={`flex flex-col items-center m-2 py-2 border-2 border-[#404380] ${
                          answer === selectedAnswer
                            ? answerStatus
                              ? "bg-[#099623] !important"
                              : "bg-[#f02d1f] !important"
                            : answer ===
                                questions[currentQuestionIndex].correct &&
                              answerStatus === false
                            ? "bg-[#099623] !important"
                            : "bg-[#20213f] !important"
                        } rounded-full cursor-pointer`}
                      >
                        {answer}
                      </Col>
                    )
                  )}
                </div>
                {isModalOpen && (
                  <div className="modal-container ">
                    <div className="modal">
                      <div className="flex justify-end">
                        <FaX className="cursor-pointer" />
                      </div>
                      <div className="flex justify-center">
                        <img
                          src={require("../../../src/image/getreward..gif")}
                          alt="ads"
                        ></img>
                      </div>

                      <h2 class="text-2xl mb-4 text-[#D8E91E] flex justify-center">
                        New Reward Available
                      </h2>
                      <h2 class="lg:text-4xl md:text-[1.5rem] mb-4 flex justify-center">
                        Get Instant 100 Coins!
                      </h2>
                      <p class="mb-6 text-[#8E8F98] flex justify-center">
                        Watch a simple ad and get rewarded
                      </p>
                      <div className="flex justify-center">
                        <button
                          class="bg-[#D8E91E] w-[50%] rounded-[1.5rem] text-black font-bold py-4 px-4 mr-2 flex justify-center"
                          onClick={closeModal}
                        >
                          Claim
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            <p className="text-[#ffcc5b] text-center font-bold cursor-pointer pt-3">
              <Link to="/login">Sign-Up - Login</Link>
            </p>

            <div className="w-full pl-5 pt-6">
              <h1 className="w-full font-bold text-lg text-white">
                Play Quiz and Win Coins!
              </h1>
              <ul className="text-[#8789c3] text-[14px] list-disc my-3 px-4">
                <li className="mb-2">
                  {" "}
                  Play Quizzes in 25+ categories like GK, Sports, Bollywood,
                  Business, Cricket &amp; more!{" "}
                </li>
                <li className="mb-2"> Compete with lakhs of other players! </li>
                <li className="mb-2"> Win coins for every game </li>
                <li className="mb-2">
                  {" "}
                  Trusted by millions of other quiz enthusiasts like YOU!{" "}
                </li>
              </ul>
            </div>

            <div className="border-2 w-[100%] p-6 rounded-xl bg-white bg-opacity-10">
              <h1 className="text-2xl text-center text-blue-500 ">Fun Facts</h1>
              <p className="text-center text-white">
                The insurance industry is one of the largest industries in the
                United States, with over $1.5 trillion in annual premiums.The
                word "insurance" comes from the French word "assurer", which
                means "to make sure". The first insurance company in the United
                States was founded in Charleston, South Carolina, in 1735.The
                insurance industry employs over 2 million people in the United
                States. The average American household spends about $1,500 per
                year on insurance premiums. The most expensive type of insurance
                in the United States is long-term care insurance, which can cost
                upwards of $5,000 per month.
              </p>
            </div>
          </Col>
          <Col className="fixed ">
            <div className="flex justify-center py-16 md:py-10">
              <img
                className="lg:w-[65%] md:w-[300px] "
                src="https://monetix-lookat1.quiztwiz.com/static/media/sidePoster.9c9656d2998c44eb6b57.png"
                alt=""
              ></img>
            </div>
            <div className="font-bold text-center text-white md:text-sm  big:bottom-12  big:z-[-1]">
              Welcome to Quiztwiz. Play a quiz and earn coins.
              <p className="font-normal text-2xl pt-4 text-center">
                There's a quiz for everyone!{" "}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Quiz;
