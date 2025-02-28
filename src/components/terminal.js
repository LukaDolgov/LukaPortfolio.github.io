import React, { useState, useMemo } from 'react';
import CommandLine from './command_line.js';
import './terminal.css';
import './command_line.css';

//comands
let c1 = "ls";
let c2 ="cat portfolio_name"
let c3 = "cat portfolio_info";
let c4 =  "cat portfolio_projects";

//varaible values for outputs
let c1O = "portfolio_name   portfolio_info   portfolio_projects";
let c2O = (
    <div className="header">
    <span className="large-name">Luka Dolgov</span>
    <span className="small-info">
      cell: 414-708-5494 &nbsp; gmail: luka.dolgov@gmail.com &nbsp; GitHub:{' '}
      <a href="https://github.com/LukaDolgov" target="_blank" rel="noopener noreferrer"  style={{ color: "blue" }}>
        LukaDolgov
      </a>
    </span>
  </div>
  );
let c3O = "\nI'm an undergraduate student at Yale University class of 2028\n" +
"interested in building quantitative models, game theory model development,\n" +
"and computational AI design and modeling.\n" +
"In this directory, you can explore some of my work and download my resume.\n ";
let c4O = "cat: portfolio_projects: Is a directory";



//logic
const Terminal = () => {
  const [commands, setCommands] = useState([c1, c2, c3, c4]);
  const content = useMemo(() => [c1O, c2O, c3O, c4O], []);
  const [currIndex, setCurrIndex] = useState(0);
  const [showExtra, setShowExtra] = useState(false);
  // This index tracks the command that is currently being printed.
  const handleCommandComplete = () => {
    if (currIndex < commands.length - 1) {
      setCurrIndex(prev => prev + 1);
    } else {
      if (commands[currIndex] !== "clear") {
        setShowExtra(true);
      }
    }
  };
  const handleReset = () => {
    // Clear the extra flag and reset state when the reset button is clicked.
    setShowExtra(false);
    if (currIndex === commands.length - 1) {
      setCommands(prevCommands => [...prevCommands, "clear"]);
      setCurrIndex(prev => prev + 1);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className="terminal">
      <p className="replay-button"
        onClick={handleReset} 
      >
        Replay Animations
      </p>
      {
        commands.slice(0, currIndex + 1).map((command, i) => (
          <CommandLine
            key={i}
            command={command}
            content={content[i]}
            delayBefore={1000} 
            speed={50}
            onComplete={i === currIndex ? handleCommandComplete : undefined}
            active={ showExtra ? false : i === currIndex }
          />
        ))
      }
       {showExtra  && (
      <CommandLine
        key="blank"
        command=""     
        content=""     
        delayBefore={1000}
        speed={50}
        active={true}  
      />
    )}
    </div>
  );
};

export default Terminal;
