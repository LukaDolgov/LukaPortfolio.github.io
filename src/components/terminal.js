import React, { useState, useMemo } from 'react';
import CommandLine from './command_line.js';
import Project from './project_type.js'
import './terminal.css';
import './command_line.css';

//directories
let main_dir = "/c/Users/LukaDolgov/portfolio$ ";
let projects_dir = "/c/Users/LukaDolgov/portfolio/portfolio_projects$ ";
let resume_pdf = "/LukaPortfolio.github.io/Luka_Dolgov_Resume_PDF.pdf"
//gifs
let gif_proj1 = "/LukaPortfolio.github.io/Coinbase_gif.gif";
let gif_proj2 = "";

//commands
let c1 = "ls";
let c2 ="cat portfolio_name"
let c3 = "cat portfolio_info";
let c4 =  "cd portfolio_projects";
let c5 = "cat project1";
let c6 = "cat project 2";
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
let c3O = (<p id="portfolio_info_desc"> 
  I'm an undergraduate student at Yale University class of 2028
 interested in building quantitative models, game theory model development,
and computational AI design and modeling.
In this directory, you can explore some of my work and download my resume.
  </p>);
let c4O = "";
let c5O = <Project
 projectnum="1. "
 projecttitle = "Coinbase Trading Bot"
 project_desc = "In this project, I use a coinbase API to connect to real-time Bitcoin trading information and pass it through a LSTM strategy to make a price prediction. I use certain economic theory for risk-management and staking quantity. I have trained the model on 900 days of Bitcoin past prices."
 project_gif = {gif_proj1}> 
 </Project>
 let c6O = <Project
 projectnum = "2. "
 projecttitle = "Shakespearean Text Generator"
 project_desc = "In this project, I use the PyTorch Machine learning library to build a transformer model that generates text in the style of shakespeare, where it is trained on a document containing all of shakespeare's playes. I use byte pair encoding for tokenization. "
 project_gif = {gif_proj2}>
 </Project>
const calculateDirectory = (i) => {
  if (i < 4) {
      return main_dir;
    } else if (i>=4) {
    return projects_dir;
    }
  }

//logic
const Terminal = () => {
  const [commands, setCommands] = useState([c1, c2, c3, c4, c5, c6]);
  const content = useMemo(() => [c1O, c2O, c3O, c4O, c5O, c6O], []);
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
      <a
        href = { resume_pdf }
        download
        className="download-button"
      >
        Download Resume
    </a>
      {
        commands.slice(0, currIndex + 1).map((command, i) => (
          <CommandLine
            key={i}
            directory={ calculateDirectory(i) }
            command={command}
            content={content[i]}
            delayBefore={500} 
            speed={50}
            onComplete={i === currIndex ? handleCommandComplete : undefined}
            active={ showExtra ? false : i === currIndex }
          />
        ))
      }
       {showExtra  && (
      <CommandLine
        key="blank"
        directory={calculateDirectory(currIndex + 1)}
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
