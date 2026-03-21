

import { 
  SiReact, 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiCplusplus, 
  SiSharp, 
  SiCss,
  SiC,
  SiDart,
  SiDocker,
  SiElixir,
  SiGit,
  SiGo,
  SiHaskell,
  SiHtml5,
  SiKotlin,
  SiLua,
  SiMarkdown,
  SiPhp,
  SiPostgresql,
  SiRuby,
  SiRust,
  SiSass,
  SiSwift
} from 'react-icons/si';
import {  FaNodeJs } from 'react-icons/fa';
import type React from 'react';
import { VscJson } from 'react-icons/vsc';
import { GrDocumentTxt } from 'react-icons/gr';
import { TbSquareLetterJ } from 'react-icons/tb';

export const fileLogo :Record<string,React.ReactNode>= {

    '.html': <SiHtml5 color="#E34F26" />,
  '.css':  <SiCss color="#1572B6" />,
  '.scss': <SiSass color="#CC6699" />,
  '.sass': <SiSass color="#CC6699" />,
  '.js':   <SiJavascript color="#F7DF1E" />,
  '.jsx':  <SiReact color="#61DAFB" />,
  '.ts':   <SiTypescript color="#3178C6" />,
  '.tsx':  <SiReact color="#61DAFB" />,
  '.json': <VscJson color="#05c2d6" />,
  '.md':   <SiMarkdown color="#000000" />,

  // --- Systems & General Purpose ---
  '.py':   <SiPython color="#3776AB" />,
  '.java': <TbSquareLetterJ color="#e87e4d" />,
  '.c':    <SiC color="#A8B9CC" />,
  '.cpp':  <SiCplusplus color="#00599C" />,
  '.cs':   <SiSharp color="#512BD4" />,
  '.go':   <SiGo color="#00ADD8" />,
  '.rs':   <SiRust color="#000000" />,
  '.php':  <SiPhp color="#777BB4" />,
  '.rb':   <SiRuby color="#CC342D" />,
  '.lua':  <SiLua color="#2C2D72" />,
  '.txt': <GrDocumentTxt color="#fcfefb"/>,

  // --- Mobile & Functional ---
  '.kt':     <SiKotlin color="#7F52FF" />,
  '.swift':  <SiSwift color="#F05138" />,
  '.dart':   <SiDart color="#0175C2" />,
  '.hs':     <SiHaskell color="#5E5086" />,
  '.ex':     <SiElixir color="#4E275E" />,

  // --- Backend & DevOps ---
  '.sql':    <SiPostgresql color="#4169E1" />,
  '.docker': <SiDocker color="#2496ED" />,
  '.git':    <SiGit color="#F05032" />,
  '.node':   <FaNodeJs color="#339933" />,

}