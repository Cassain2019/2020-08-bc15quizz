import React from 'react';
import { Wrapper, ButtonWrapper } from './QuestionsCard.styles';

/* Declaring the Types of the Properties */
type Props = {
    mainQuestion: string;
    possibleAnswers: string[];
    callback: any;
    userAnswer: any;
    questionNumber: number;
    totalQuestion: number;
}

/*React Functional Components and Passing Properties*/
/*Dangerously Set Innner Element allow us to set value in Paragraph */
export const QuestionsCard: React.FC<Props> = ({mainQuestion, possibleAnswers, callback, userAnswer, questionNumber, totalQuestion}) => {
  return (
    <Wrapper>
        <p> Question No. : {questionNumber} / {totalQuestion}</p>
        <p dangerouslySetInnerHTML={{ __html: mainQuestion}}/>
        <div>
            {possibleAnswers.map(possibleAnswers => (
                <ButtonWrapper
                    correct = {userAnswer?.correctAnswer === userAnswer }
                    userClicked = { userAnswer?.answer === userAnswer }
                >
                    <button disabled={userAnswer} value={possibleAnswers} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html:possibleAnswers}}/>
                    </button>
                </ButtonWrapper>
            ))}    
        </div>
    </Wrapper>
  );
}

export default QuestionsCard;
