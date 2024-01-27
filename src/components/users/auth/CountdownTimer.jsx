import { useState, useEffect } from 'react';


const CountDownTimer = ({ seconds = 60, callback }) => {
  const [[secs], setTime] = useState([seconds]);

  const tick = () => {
    if (secs === 0) {
      callback();
    } else {
      setTime([secs - 1]);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return <span>{`${secs.toString().padStart(2, '0')}s`}</span>
};

export default CountDownTimer;
