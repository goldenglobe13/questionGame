import { CSSTransition } from "react-transition-group";
import "./AnalogClock.css";
import { useEffect, useState } from "react";
const r = document.querySelector(":root");

let defaultTime;

const AnalogClock = () => {
  const nowa = new Date();
  const hoursGenerala = nowa.getHours();
  const minutesa = nowa.getMinutes();
  const secondsa = nowa.getSeconds();
  useEffect(() => {
    const hoursHandlea =
      hoursGenerala * 30 - 90 + minutesa / 2 + secondsa * (0.5 / 60);

    const minutesHandlea = (minutesa / 60) * 360 - 90 + secondsa / 10;

    const secondsHandlea = (secondsa / 60) * 360 - 90;

    r.style.setProperty("--hours-deg", `${hoursHandlea}deg`);
    r.style.setProperty("--minutes-deg", `${minutesHandlea}deg`);
    r.style.setProperty("--seconds-deg", `${secondsHandlea}deg`);
  }, []);

  defaultTime = (
    <>
      <div className="twoDa">{`${
        hoursGenerala < 10 ? "0" : ""
      }${hoursGenerala}`}</div>
      <div className="oneDa">:</div>
      <div className="twoDa">{`${minutesa < 10 ? "0" : ""}${minutesa}`}</div>
      <div className="oneDa">:</div>
      <div className="twoDa">{`${secondsa < 10 ? "0" : ""}${secondsa}`}</div>
    </>
  );

  const [time, setTime] = useState(defaultTime);
  // const isTime = time !== "" ? true : false;
  // console.log(isTime);

  useEffect(() => {
    let x = setInterval(() => {
      const now = new Date();
      const hoursGeneral = now.getHours();
      const hours = now.getHours() <= 12 ? now.getHours() : now.getHours() - 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const hoursHandle = hours * 30 - 90 + minutes / 2 + seconds * (0.5 / 60);

      const minutesHandle = (minutes / 60) * 360 - 90 + seconds / 10;

      const secondsHandle = (seconds / 60) * 360 - 90;

      r.style.setProperty("--hours-deg", `${hoursHandle}deg`);
      r.style.setProperty("--minutes-deg", `${minutesHandle}deg`);
      r.style.setProperty("--seconds-deg", `${secondsHandle}deg`);

      // const ampm = hours >= 12 ? "AM" : "PM";

      setTime(
        <>
          <div className="twoDa">{`${
            hoursGeneral < 10 ? "0" : ""
          }${hoursGeneral}`}</div>
          <div className="oneDa">:</div>
          <div className="twoDa">{`${minutes < 10 ? "0" : ""}${minutes}`}</div>
          <div className="oneDa">:</div>
          <div className="twoDa">{`${seconds < 10 ? "0" : ""}${seconds}`}</div>
        </>
      );
    }, 1000);
    return () => clearInterval(x);
  }, []);
  return (
    <>
      <CSSTransition in={true} appear={true} timeout={700} classNames="myClass">
        <div className="timeContainer">
          <div className="time">{time}</div>
        </div>
      </CSSTransition>

      {/* <CSSTransition
        in={time}
        appear={true}
        timeout={700}
        classNames="containerClass"
      >
        <div className="handsContainer">
          <div className="cen cen1"></div>
          <div className="cen cen2"></div>
          <div className="hour"></div>
          <div className="min"></div>
          <div className="sec"></div>
        </div>
      </CSSTransition> */}

      <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames="containerClass"
      >
        <div className="handsContainer">
          <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="cen1Class"
          >
            <div className="cen cen1"></div>
          </CSSTransition>
          <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="cen2Class"
          >
            <div className="cen cen2"></div>
          </CSSTransition>
          <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="hourClass"
          >
            <div className="hour"></div>
          </CSSTransition>
          <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="minClass"
          >
            <div className="min"></div>
          </CSSTransition>
          <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="secClass"
          >
            <div className="sec"></div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </>
  );
};

export default AnalogClock;
