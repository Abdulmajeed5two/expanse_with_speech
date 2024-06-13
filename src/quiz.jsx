import { useState } from "react";
import "./App.css";
import data from "./data";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const preQues = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedOption('');
      setIsAnswered(false);
    }
  };

  const nextQues = () => {
    if (selectedOption === data[index].ans) {
      setScore(score + 10);
    }
    if (index < data.length - 1) {
      setIndex(index + 1);
      setSelectedOption('');
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handleOptionSelect = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
    }
  };

  const getOptionClass = (option) => {
    if (!isAnswered) return '';
    if (option === data[index].ans) return 'correct';
    if (option === selectedOption) return 'incorrect';
    return '';
  };

  return (
    <>
      <h2>Quiz Application</h2>
      <hr />
      {showScore ? (
        <div>
          <h3>Your score is: {score} out of {data.length * 10}</h3>
        </div>
      ) : (
        <div>
          <b>{data[index].questions}</b>
          <ul>
            {['option1', 'option2', 'option3'].map((opt, i) => (
              <li key={i}>
                <input
                  type="radio"
                  name="option"
                  value={data[index][opt]}
                  checked={selectedOption === data[index][opt]}
                  onChange={() => handleOptionSelect(data[index][opt])}
                  disabled={isAnswered}
                />
                <span className={getOptionClass(data[index][opt])}>
                  {data[index][opt]}
                </span>
                {isAnswered && data[index][opt] === data[index].ans && (
                  <span style={{ color: 'green', marginLeft: '10px' }}>✔</span>
                )}
                {isAnswered && data[index][opt] === selectedOption && data[index][opt] !== data[index].ans && (
                  <span style={{ color: 'red', marginLeft: '10px' }}>✘</span>
                )}
              </li>
            ))}
          </ul>

          {isAnswered && (
            <div>
              {selectedOption === data[index].ans ? (
                <p style={{ color: "green" }}>Correct!</p>
              ) : (
                <p style={{ color: "red" }}>Wrong! The correct answer is: {data[index].ans}</p>
              )}
            </div>
          )}

          <button onClick={preQues} disabled={index === 0}>Previous</button>
          <button onClick={nextQues} disabled={!isAnswered}>Next</button>
        </div>
      )}
    </>
  );
}

export default Quiz;
