import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/quiz.css";
import DisplayScore from "./DisplayScore";

const Form = () => {

    const [questions, setQuestions] = useState([]);
    const [storeUserAnswer, setUserAnswer] = useState("");
    const [storeQuestion, setQuestion] = useState({
        question:""
    });
    //const [storeAnswer, setAnswer] = useState("");
    const [score,setScore] = useState(0);
    const [selected,setSelected] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:2300/AAQuiz/api/v1/getQuestions`)
        .then((result) => setQuestions(result.data))
        .catch((error) =>  console.log(error))
    },[])
    //console.log(questions);

    const handleSubmit = () => {
        console.log("selected question:", storeQuestion)
        axios.get(`http://localhost:2300/AAQuiz/api/v1/getAnswers?question=${storeQuestion.question}`)
        .then((result) => {
            //setAnswer(result.data)
            //console.log(result.data)
            validateData(result.data)
            //console.log(storeAnswer);
        })
        .catch((error) => console.log(error))
    }

    const validateData = (storeAnswer) => {
        console.log("backend answer",storeAnswer, "user answer",storeUserAnswer)
        if(storeAnswer === storeUserAnswer) {
            //console.log("storeAnswer",storeAnswer, "storeUserAnswer",storeUserAnswer)
            setScore(score+1);
            console.log(score); 
        }
    }

    const displayScore = () => {
        //alert(`your score is ${score}`)
        console.log("displayScore");
        // return (
        <p style={{"color":"white"}}>Hello</p>
        // )
        //window.location.reload();
    }
    return (
        <>
        {questions.map((index,key) => (
            <>
            <div className="main">
            <h3>{key+1}{". "}{index.question}</h3>
            <input type="radio" value={index.option1} 
            onChange={(e) => {
                setUserAnswer(e.target.value)
                setQuestion({question:index.question})
            }}/>
            {index.option1}<br></br>
            <input type="radio" value={index.option2} 
            
            onChange={(e) => {
                setUserAnswer(e.target.value)
                setQuestion({question:index.question})
            }}/>{index.option2}<br></br>
            <input type="radio" value={index.option3} 
            
            onChange={(e) => {
                setUserAnswer(e.target.value)
                setQuestion({question:index.question})
            }}/>{index.option3}<br></br>
            <input type="radio" value={index.option4} 
            
            onChange={(e) => {
                setUserAnswer(e.target.value)
                setQuestion({question:index.question})
            }}/>{index.option4}<br></br>
            <br></br>
            <button type="submit" onClick={() => handleSubmit()}>Save</button><br></br>
            </div>
            </>
        ))}
        <button type="submit" onClick={() => displayScore()}>Submit Quiz</button>

        </>
    )
}

export default Form;