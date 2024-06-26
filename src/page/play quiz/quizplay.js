// import { useEffect } from    "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Quizplay = () => {

    const loginscore = localStorage.getItem('logincoin');
    const userCoins = localStorage.getItem("usercoin");
    const token = localStorage.getItem('token');
    const coins= token ? loginscore : userCoins
    console.log("user",coins);
    // useEffect(() => {

    //     function preventBack() { 
    //       window.history.forward();  
    //     } 

    //     setTimeout(() => preventBack(), 0);
      
    //   }, []);

    return (
        <>
            <div>
                <Row className="flex">
                    <Col className="md:w-[400px] items-end  lg:w-[530px] py-3 px-2">
                        {/* <div className="bg-white mt-[50px] h-[350px] mx-auto mb-[8px]">
                            <p className="text-black text-center">
                                ads by goggle
                            </p>
                        </div> */}
                        <div className="border-2 w-full p-[15px] m-[5px] rounded-[30px]"  style={{ borderColor: "#0060FF",boxShadow: "5px  10px 15px rgba(0, 96, 255, 0.3)"}}>
                            <h1 class="text-[12px] text-center text-[#D85B00] font-black ">
                                QuizTimeNow
                            </h1>
                            <h3 class="justify-center flex">
                                <p className="font-[700] text-center text-[18px] text-white"> You have won {coins} </p>
                                <img className="w-[25px] ml-2"    src={require('../../image/coins-1.png')} alt="svg"></img>
                            </h3>
                            <div className="text-center py-6">
                                <Link to={`/quizhome`}>
                                    <Button className="py-[10px] px-8 bg-[#389A06]  rounded-md text-white font-bold cursor-pointer" >
                                        PLAY QUIZ
                                    </Button>
                                </Link>
                            </div>

                            <ul class="list-disc text-white text-sm flex flex-col gap-3 px-9 ">
                                <li>You've got 90 - 150 seconds to answer all questions</li>
                                <li>Answer as many questions as you can</li>
                                <li>For Every Correct answer you will get +50 points and will loose -25 points on every Incorrect answer</li>
                                <li>You can take help by using the lifelines present in the contest.</li>
                                <li>Lifelines can be used for free or by using a given amount of coins for each lifeline.</li>
                            </ul>
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
export default Quizplay;