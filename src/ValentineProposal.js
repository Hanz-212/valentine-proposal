import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import heartGif from "./heart.gif";
import loveSong from "./love-song.mp3";
import fireworksGif from "./fireworks.gif";
import surpriseGif from "./surprise.gif";

const FloatingHeart = ({ style }) => (
  <motion.div
    initial={{ y: "100vh" }}
    animate={{
      y: "-100vh",
      x: [0, 10, -10, 0],
    }}
    transition={{
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{
      position: "fixed",
      color: "pink",
      fontSize: "24px",
      ...style,
    }}
  >
    ❤️
  </motion.div>
);

const ValentineProposal = () => {
  const [noClicks, setNoClicks] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isQuoteVisible, setIsQuoteVisible] = useState(true);

  const messages = [
    "Are you sure? I know a place just for you and me!",
    "I even asked my Professor for help!",
    "Think about the free chocolates!",
    "Tara Samgyupppppp!",
    "Okay fine... Wala ka nang kawala mehehe. 😜"
  ];

  const funnyLoveQuotes = [
    "You must be a magician, because every time I look at you, everyone else disappears! 🎩✨",
    "Are you a camera? Because every time I look at you, I smile! 📸😊",
    "I'm not a mathematician, but I'm pretty good at adding me and you together! ➕❤️",
    "Do you have a map? I keep getting lost in your eyes! 🗺️👀",
    "Is your name Google? Because you have everything I've been searching for! 🔍💝",
    "Are you a parking ticket? Because you've got FINE written all over you! 🎫😘",
    "I'm not a photographer, but I can picture us together! 📷💑",
    "Is your name WiFi? Because I'm feeling a strong connection! 📶💕",
    "You must be tired because you've been running through my mind all day! 🏃‍♀️💭",
    "Are you French? Because Eiffel for you! 🗼💘",
    "I'd tell you a chemistry joke, but I know I wouldn't get a reaction! ⚗️😅",
    "You're like a dictionary - you add meaning to my life! 📚❤️",
    "Is this the Hogwarts Express? Because you've got me under your spell! ⚡️💫",
    "Do you like Star Wars? Because Yoda one for me! 🌟💚",
    "Are you a cat? Because you're purr-fect! 🐱💖"
  ];

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
    }));
    setHearts(newHearts);
  }, []);

  useEffect(() => {
    if (yesClicked) {
      const audio = new Audio(loveSong);
      audio.loop = true;
      audio.play();
      setShowFireworks(true);
      setTimeout(() => setShowSurprise(true), 3000);

      // Start the quote rotation
      const quoteInterval = setInterval(() => {
        setIsQuoteVisible(false);
        setTimeout(() => {
          setCurrentQuoteIndex((prev) => (prev + 1) % funnyLoveQuotes.length);
          setIsQuoteVisible(true);
        }, 500);
      }, 3000);

      return () => {
        audio.pause();
        audio.currentTime = 0;
        clearInterval(quoteInterval);
      };
    }
  }, [yesClicked]);

  const handleNoClick = useCallback(() => {
    setNoClicks((prev) => Math.min(prev + 1, messages.length - 1));
  }, []);

  const handleYesClick = useCallback(() => {
    setYesClicked(true);
    setPlayMusic(true);
  }, []);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient">
      <style>
        {`
          .bg-gradient {
            background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%);
          }
          .card-glass {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .quote-text {
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .btn-valentine {
            transition: all 0.3s ease;
          }
          .btn-valentine:hover {
            transform: scale(1.05);
          }
          @media (max-width: 576px) {
            .display-4 {
              font-size: 2rem;
            }
            .btn-valentine {
              font-size: 1rem !important;
            }
          }
        `}
      </style>

      {hearts.map((heart) => (
        <FloatingHeart key={heart.id} style={{ left: heart.left }} />
      ))}
      
      {yesClicked && <Confetti />}
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="card card-glass p-4 p-md-5 text-center"
            >
              <motion.h1 
                className="display-4 mb-4 text-danger fw-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Will you be my Valentine? 💖
              </motion.h1>

              <AnimatePresence>
                {!yesClicked && (
                  <motion.p 
                    className="lead mb-4"
                    animate={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    {messages[noClicks]}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
                <motion.button
                  className="btn btn-valentine btn-danger btn-lg px-4 py-2"
                  style={{ fontSize: `${1 + noClicks * 0.5}rem` }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                >
                  Yes 💘
                </motion.button>

                {!yesClicked && noClicks < messages.length - 1 && (
                  <motion.button
                    className="btn btn-valentine btn-secondary btn-lg"
                    style={{ fontSize: `${1 - noClicks * 0.1}rem` }}
                    whileHover={{ x: [0, -20, 20, -20, 20, 0] }}
                    transition={{ duration: 0.5 }}
                    onClick={handleNoClick}
                  >
                    No 💔
                  </motion.button>
                )}
              </div>

              {yesClicked && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4"
                >
                  <h2 className="h3 text-danger mb-4">You made my day! 🎉</h2>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <img src={heartGif} alt="Heart Celebration" className="img-fluid mx-auto" style={{ maxWidth: "200px" }} />
                  </motion.div>
                  
                  <motion.div 
                    className="quote-text lead fst-italic mb-4"
                    animate={{ opacity: isQuoteVisible ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {funnyLoveQuotes[currentQuoteIndex]}
                  </motion.div>

                  {showFireworks && (
                    <motion.img
                      src={fireworksGif}
                      alt="Fireworks Celebration"
                      className="img-fluid mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ maxWidth: "250px" }}
                    />
                  )}
                  
                  {showSurprise && (
                    <motion.img
                      src={surpriseGif}
                      alt="Special Surprise"
                      className="img-fluid"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      style={{ maxWidth: "250px" }}
                    />
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValentineProposal;