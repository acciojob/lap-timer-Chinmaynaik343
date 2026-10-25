
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const timerRef = useRef(null);

    // Start or resume the timer
    const startTimer = () => {
        if (timerRef.current !== null) return;

        setIsRunning(true);

        timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 10);
    };

    // Stop the timer
    const stopTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsRunning(false);
    };

    // Record the current lap
    const recordLap = () => {
        setLaps((prevLaps) => [...prevLaps, time]);
    };

    // Reset timer and laps
    const resetTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;

        setTime(0);
        setLaps([]);
        setIsRunning(false);
    };

    // Clear interval when component unmounts
    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);
        };
    }, []);

    // Format time as MM:SS:CC
    const formatTime = (centiseconds) => {
        const minutes = Math.floor(centiseconds / 6000);
        const seconds = Math.floor((centiseconds % 6000) / 100);
        const cs = centiseconds % 100;

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0") +
            ":" +
            String(cs).padStart(2, "0")
        );
    };

    return (
        <div className="container">
            <h1>Lap Timer</h1>

            <h2 className="timer">{formatTime(time)}</h2>

            <div className="buttons">
                <button onClick={startTimer} disabled={isRunning}>
                    Start
                </button>

                <button onClick={stopTimer} disabled={!isRunning}>
                    Stop
                </button>

                <button onClick={recordLap} disabled={!isRunning}>
                    Lap
                </button>

                <button onClick={resetTimer}>
                    Reset
                </button>
            </div>

            <h2>Laps</h2>

            <ul className="laps">
                {laps.map((lap, index) => (
                    <li key={index}>
                        Lap {index + 1}: {formatTime(lap)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
