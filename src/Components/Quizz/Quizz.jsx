import React, { useRef, useState } from 'react';
import './Quizz.css';
import { data } from '../../assets/data';

const Quizz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const option_array = [Option1, Option2, Option3, Option4];

    const CheckAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add('correct');
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add('wrong');
            }
            setLock(true);
            option_array[question.ans - 1].current.classList.add('correct');
        }
    };

    const next = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
                return;
            }
            setIndex(prev => prev + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            option_array.forEach((Option) => {
                Option.current.classList.remove('wrong');
                Option.current.classList.remove('correct');
                return null;
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
        }

    return (
        <div className='container'>
            <h1>Quizz App</h1>
            <hr />
            {result ? (
                <div>
                    <h2>Your Score: {score}/{data.length}</h2>
                    <button onClick={reset}>Reset</button>
                </div>
            ) : (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => CheckAns(e, 1)}>{question.option1}</li>
                        <li ref={Option2} onClick={(e) => CheckAns(e, 2)}>{question.option2}</li>
                        <li ref={Option3} onClick={(e) => CheckAns(e, 3)}>{question.option3}</li>
                        <li ref={Option4} onClick={(e) => CheckAns(e, 4)}>{question.option4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className='index'>{index + 1} of {data.length} questions</div>
                </>
            )}
        </div>
    );
};

export default Quizz;
