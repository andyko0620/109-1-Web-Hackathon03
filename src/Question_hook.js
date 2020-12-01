import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question

  const next = () => {
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question
    setCurrentQuestion(current_question+1)
    // if(current_question===3){

    // }
  }

  const choose = (index,id) => {
    // TODO : update 'ans' for the option you clicked
    if(ans[index]==="undefined")
    {
      setAns([...ans,id])
    }
    else{
      let newans=ans
      newans[index]= id
      setAns(newans);
    }
    
  }

  const getQuestions = () => {
    // TODO : get questions from backend
    instance.get('/getContents')
      .then(questions=>{
        //console.log(questions.data)
        const Mycontents=questions.data.contents
        console.log(Mycontents)
        setContents(Mycontents)
      })
      .catch(err=>{
        console.error(err)
      })
  }

  useEffect(() => {
    if (!contents.length)
    {
      getQuestions()
    }
      
  })

  // TODO : fill in the rendering contents and logic
  return (
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
            {current_question<=contents.length-1 ?
              `Question ${contents[current_question].questionID} of ${contents.length}`
              :`Question ${contents.length} of ${contents.length}`
            }
            </div> 
          </div>

          <div id="question-title">
            {current_question<=contents.length-1?
              contents[current_question].question
              :`Your Score: ${score}/${contents.length}` }

          </div>

          {current_question<=contents.length-1 ?
          <>
          <div id="options">
              {current_question===contents.length-1 ?
              <>
              <div className="each-option">
                  <input 
                     type="radio"
                     id={`q${contents[current_question].questionID}_1`}
                     //onChange={choose(5,1)}
                     
                  />
                  <span>{contents[current_question].options[0]}</span>
              </div>
              <div className="each-option">
                  <input 
                     type="radio"
                     id={`q${contents[current_question].questionID}_2`}
                    // onChange={choose(5,2)}
                    
                     
                  />
                  <span>{contents[current_question].options[1]}</span>
              </div>
              </>
              :
              <>
               <div className="each-option">
                  <input 
                     type="radio"
                     id={`q${contents[current_question].questionID}_1`}
                    // onChange={choose(contents[current_question].questionID,1)}
                    
                     
                  />
                  <span>{contents[current_question].options[0]}</span>
              </div>
              <div className="each-option">
                  <input 
                     type="radio"
                     id={`q${contents[current_question].questionID}_2`}
                    // onChange={choose(contents[current_question].questionID,2)}
                    
                     
                  />
                  <span>{contents[current_question].options[1]}</span>
              </div>
              <div className="each-option">
                  <input 
                     type="radio"
                     id={`q${contents[current_question].questionID}_3`}
                    // onChange={choose(contents[current_question].questionID,3)}
                    
                     
                  />
                  <span>{contents[current_question].options[2]}</span>
              </div>
              <div className="each-option">
                  <input 
                     type="radio"
                     id={`q${contents[current_question].questionID}_4`}
                    // onChange={choose(contents[current_question].questionID,4)}
                    
                     
                  />
                  <span>{contents[current_question].options[3]}</span>
              </div> 
              </>
              }
    
          </div>
          
          <div id="actions" onClick={next}>
            NEXT
          </div>
          </>
          :<div></div>
          }
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question
