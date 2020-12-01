import Question from '../models/Question'
import Answer from '../models/Answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  const GetContents=await Question.find();
  try{
    res.status(200).json({message: 'success',contents: GetContents})
  }catch{
    res.status(403).json({message: 'error',contents: []})
  }

  
}

exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
  const CheckAns=await Answer.find();
  let score=0;
  
  try{
    res.status(200).json({message: 'success',score: score})
  }catch{
    res.status(403).json({message: 'error',score: -1})
  }
}
