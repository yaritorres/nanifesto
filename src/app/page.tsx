'use client'
import './globals.css';
import { useState } from "react";
import Welcome from "./pages/Welcome";
import Homepage from "./pages/Homepage";
import HamburgerMenu from './components/hamburgerMenu';

export default function Home() {
  const [animate, setAnimate] = useState(false);
  const [hamOpen, setHamOpen] = useState(false);

  return (
    <main>
      <HamburgerMenu hamOpen={hamOpen} setHamOpen={setHamOpen} />
      <Welcome animate={animate} setAnimate={setAnimate} hamOpen={hamOpen} />
      <Homepage animate={animate} hamOpen={hamOpen} />
    </main>
  );
}
