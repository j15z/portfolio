import {
  SiReact,
  SiFigma,
  SiGithub,
  SiPytorch,
  SiPython,
  SiUnity,
} from "react-icons/si";
import { FaAws, FaGoogle } from "react-icons/fa";
import { PiDnaThin } from "react-icons/pi";

export const bioInfo = {
  name: "Justin Blumencranz",
  title: "Programmer + Designer",
  location: "Palo Alto, California",
  age: 22,
  education: [
    {
      degree: "M.S. (in progress)",
      field: "Computer Science (Artificial Intelligence)",
      school: "Stanford University",
      year: "2026",
    },
    {
      degree: "B.S. (in progress)",
      field: "Symbolic Systems (Human Computer Interaction)",
      school: "Stanford University",
      year: "2026",
    },
  ],
  avatarSrc: "/profile.jpeg",
  bio: [
    "Building connection through technology and play",
    "I am a software engineer and designer who loves building thoughtful, user‑centered systems. My work spans full‑stack web development, UI/UX, and interactive experiences. I care about clean architecture, accessible design, and creating tools to help people learn, play, and connect.",
  ],
  skills: {
    proficient: [
      { name: "React", Icon: SiReact },
      { name: "Python", Icon: SiPython },
      { name: "Unity/C#", Icon: SiUnity },
    ],
    learning: [
      { name: "PyTorch", Icon: SiPytorch },
      { name: "Strands Agents", Icon: PiDnaThin },
      { name: "AWS", Icon: FaAws },
    ],
    misc: [
      { name: "Figma", Icon: SiFigma },
      { name: "GitHub", Icon: SiGithub },
      { name: "G Suite", Icon: FaGoogle },
    ],
  },
} as const;
