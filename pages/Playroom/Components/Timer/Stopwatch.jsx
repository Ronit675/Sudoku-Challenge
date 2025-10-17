import React, { useState, useEffect } from 'react'
import '../Timer/Timer.css'
function Stopwatch() {
    const [seconds, setSeconds] = useState(0);

    const [isRunning, setIsRunning] = useState(true);

    // useEffect runs code when component mounts and when isRunning changes
    useEffect(() => {
        // If timer should run, set up an interval that increases seconds every second
        if (isRunning) {
            const id = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);

            // Cleanup function: this runs when isRunning changes or component unmounts
            return () => clearInterval(id);
        }

        // If the timer is not running, do nothing (no interval to clean up)
        return undefined;
    }, [isRunning]);

    // Convert total seconds into hours, minutes and seconds
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Helper to show numbers with two digits (e.g. 4 -> "04")
    const twoDigits = (n) => String(n).padStart(2, '0');

    return (
        <div className='TimerContainer'>
            <div className='TimerDisplay'>
                {twoDigits(hrs)}:{twoDigits(mins)}:{twoDigits(secs)}
            </div>
                <div className='TimerButton'>
                    {isRunning ? (
                        <button className='btn btn-secondary' onClick={() => setIsRunning(false)}>Pause</button>
                    ) : (
                        <button className='btn btn-primary' onClick={() => setIsRunning(true)}>Start</button>
                    )}
                </div>
        </div>
    );
}

export default Stopwatch