import './App.css';
import { gsap } from "gsap";
import { useRef, useState } from "react";
import { useGSAP } from '@gsap/react';
import catImageExcited from './assets/excited.jpeg';
import catImageSad from './assets/sad.jpeg';
import catImagePlease from './assets/please.jpeg';

gsap.registerPlugin(useGSAP);
function App() {
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [noTextIndex, setNoTextIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const typesOfNo = ["No", "Are you sure?", "Really Sure?", "Think Again!", "Last Chance!", "Surely Not?", "You might regret this...", "Give it another thought", "Are you absolutely certain?", "Have a heart", "Don't be so cold", "Change of Heart?", "Wouldn't you reconsider?", "Is that your final answer?", "You're breaking my heart!"]

  function handleYesClick() {
    setYes(true);
  }
  function handleNoClick() {
    setNo(true);
    setNoTextIndex(Math.min((noTextIndex + 1),typesOfNo.length-1));
    // Move the button to a random location
    const noBtn = document.getElementById("noBtn");
    const mainDiv = document.querySelector(".main-div");
    // Move the button to a random position within the main-div
    const maxX = mainDiv.clientWidth - noBtn.clientWidth;
    const maxY = mainDiv.clientHeight - noBtn.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setPosition({ x: randomX, y: randomY });
  }

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  const container = useRef();
  const tl = useRef();
  useGSAP(
    () => {
      tl.current =
        gsap
          .timeline()
          .from(".one", { opacity: 0, y: 10, duration: 0.7 })
          .to(".one", { opacity: 0, y: 10, duration: 0.7 }, "+=1.5")
          .from(".two", { opacity: 0, y: 10, duration: 0.7 })
          .from(".two_", { opacity: 0, y: 10, duration: 0.7 }) // "<" indicates it should start at the same time as the previous animation
          .to(".two", { opacity: 0, y: 10, duration: 0.7 }, "+=2.5") // "+=" indicates a relative time offset
          .to(".two_", { opacity: 0, y: 10, duration: 0.7 }, "-=1") // "-=" indicates a relative time offset
          // .from(".three", { opacity: 0, y: 10, duration: 0.7 })
          // .to(".three", { opacity: 0, y: 10, duration: 0.7 }, "+=2")
          .from(".three", { scale: 0.2, opacity: 0, duration: 0.7 })
          .from(".fake-btn", { scale: 0.2, opacity: 0, duration: 0.3 })
          .to(".hbd-chatbox span", { visibility: "visible", duration: 0.5, stagger: 0.1 })
          .to(".fake-btn", { backgroundColor: "rgb(127, 206, 248)", duration: 0.1 })
          .to(".three", { scale: 0.2, opacity: 0, y: -150, duration: 0.5 }, "+=0.7")
          .from(".idea-1", { ...ideaTextTrans, duration: 0.7 })
          .to(".idea-1", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")
          .from(".idea-2", { ...ideaTextTrans, duration: 0.7 })
          .to(".idea-2", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")
          .from(".idea-3", { ...ideaTextTrans, duration: 0.7 })
          .to(".idea-3 strong", { scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff", duration: 0.5 })
          .to(".idea-3", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")
          .from(".idea-4", { ...ideaTextTrans, duration: 0.7 })
          .to(".idea-4", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")
          .from(".idea-5", { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0, duration: 0.7 }, "+=0.5")
          .to(".idea-5 span", { rotation: 90, x: 8, duration: 0.7 }, "+=0.4")
          .to(".idea-5", { scale: 0.2, opacity: 0, duration: 0.7 }, "+=2")
          .from(".idea-6 span", { scale: 0, opacity: 0, rotation: 15, duration: 0.8, ease: "expo.out", stagger: 0.2 })
          .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: "expo.out", }, 0.2, "+=1")
          .from(".idea-7", { ...ideaTextTrans, duration: 0.7 })
          .to(".idea-7", { ...ideaTextTransLeave, duration: 0.7 }, "+=1.5")
          .from(".main-div", { opacity: 0, duration: 1.0, ease:"expo.in"})
          .from(".Image", { opacity: 0, duration: 1.0 })
          .from(".btn", { opacity: 0, duration: 1.0 })

      tl.current.play()
    },
    { scope: container }
  );

  if (yes) {
    return (
      <div className="main-div">
        <h1>Yay! I am so excited to go to prom with you!</h1>
        <img src={catImageExcited} alt='Excited' />
        <br></br>
        <button className="btn" onClick={() => window.location.reload()}>Restart</button>
        <p>PS: If you're free today, let's go the planeterium, you've been wanting to go to...</p>
        <p> If not today, let me know whenever I'm always available :)</p>
      </div>
    );
  }

  return (
    <div ref={container}>
      <div className='common one'>
        <h1>Hi Puja!</h1>
      </div>
      <div className='common two'>
        <h1>It is Valentine's Day</h1>
        <p className='two_'>and Love is in the air...</p>
      </div>
      <div className='common three'>
        <div class="text-box">
          <p class="hbd-chatbox">
            {
              "Happy Valentine's Day!! \n I couldn't help but ask you blah blah blah... "
                .split("").map((char, index) => (
                  (char === '\n') ?
                    <br></br>
                    :
                    <span key={index}>{char}</span>
                ))
            }
          </p>
          <p class="fake-btn">Send</p>
        </div>
      </div>
      <div class="common four">
        <p class="idea-1">That's what I was going to do.</p>
        <p class="idea-2">But then I stopped.</p>
        <p class="idea-3">
          I realised, I wanted to do something <strong>special.</strong>
        </p>
        <p class="idea-4">Because,</p>
        <p class="idea-5">
          You are Special
          <span>:)</span>
        </p>
        <p class="idea-6">
          <span>S</span>
          <span>O</span>
        </p>
        <p class="idea-7">I know its early to ask but,</p>
      </div>
      <div className="main-div">
        <h1> Puja, will you be my Prom Date? </h1>
        <img className="Image" src={no ? catImageSad : catImagePlease} alt='Please' />
        <br></br>
        <div className="button-group">
          <button className="btn"
            onClick={handleYesClick}>
            Yes
          </button>
          <button
            id="noBtn"
            style={position.x === 0 ? null : { position: "absolute", top: position.y, left: position.x }}
            className="btn"
            onClick={handleNoClick}
            onMouseEnter={handleNoClick}
          >
            {typesOfNo[noTextIndex]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
