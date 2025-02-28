import React, { useState } from 'react';
import TypeWriter from './type_writer';
import CommandOutput from './command_output';
import './command_line.css';

const static_line_left = "NewViewer@Luka-Supersystem:";
const static_line_right = "/c/Users/LukaDolgov/portfolio$ ";


const CommandLine = ({ command, content, delayBefore, speed, onComplete, active }) => {
    const [done, setDone] = useState(false);
    const handleComplete = () => {
        setDone(true);
        if (onComplete) {
          onComplete();
        }
      };
        return (
            <p className="command-line">
            <span className="prompt">
                <span className="user-info">{static_line_left}</span>
                <span className="directory">{static_line_right}</span>
            </span>
            <TypeWriter text={command} delayBefore={delayBefore} speed={speed} onComplete={handleComplete} active={active}/>
            {done && <CommandOutput content={content} />}
            </p>
        );
    };

export default CommandLine;
