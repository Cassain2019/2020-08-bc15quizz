import React, {useState} from 'react';
import QuestionsCard from './Components/QuestionsCard';
import { fetchQuestions, Difficulty, QuestionState } from './API';
import { GlobalStyle, Wrapper } from './App.styles'
const TotalQuestions = 12;

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {

const [Loading, setLoading] = useState(false);
const [Questions, setQuestions] = useState<QuestionState[]>([]);
const [Number, setNumber] = useState(0);
const [UserAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
const [Score, setScore] = useState(0);
const [GameOver, setGameOver] = useState(true);

console.log(Questions);


/* Creating Function "startquiz" used on Begin Quiz Button */
  const startquiz = async() => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TotalQuestions, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

/* Creating Function "score" used on Top of the Quiz Screen*/
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!GameOver){
      const answer = e.currentTarget.value;
      const correct = Questions[Number].correct_answer === answer; 
      
      if (correct) setScore(prev => prev + 1 )
      
      const AnswerObject = {
        question: Questions[Number].question, 
        answer,
        correct,
        correctAnswer: Questions[Number].correct_answer
      }
  
      setUserAnswer(prev => [...prev, AnswerObject])
    }
  
  };

/* Creating Function "nextQuestion" used for Next Question*/
  const nextQuestion = async() => {
  const nextQuestion = Number + 1;
  if (nextQuestion === TotalQuestions) {
    setGameOver(true);
  }
  else {
    setNumber(nextQuestion);
  }
};



return (
  <>
  <GlobalStyle/>
  
  <Wrapper>
    <h1>Quiz App created by Kashif Hussain</h1>
{GameOver  || UserAnswer.length === TotalQuestions ? (
    <button className='start' onClick={startquiz}>Start Quiz</button> ) : null }
{!GameOver ? (
    <p className='score'>Score... : {Score} </p> ) : null }

          {Loading ? (
        <p>Loading....</p> ) : null }

        {!Loading && !GameOver ? (
    
  <QuestionsCard
    questionNumber={ Number + 1 }
    totalQuestion={ TotalQuestions }
    mainQuestion={Questions[Number].question}
    possibleAnswers={Questions[Number].answers}
    userAnswer={UserAnswer ? UserAnswer[Number] : undefined }
    callback = {checkAnswer}
  /> ) : null }

        {!GameOver && !Loading && UserAnswer.length === Number + 1 && Number !== TotalQuestions - 1 ? (
    <button className='next' onClick={nextQuestion}>Next</button> ) : null}
    </Wrapper>
    </>
  );
}

export default App;
