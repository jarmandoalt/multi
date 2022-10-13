import { useEffect, useState, createRef, useRef, useInterval } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NOCORRECT } from "../reducers/crudReducer.jsx";

const HeaderMulti = () => {
  const { dataServer, countdown } = useSelector(
      (state) => state.crud
    ),
    dispatch = useDispatch(),
    [countMin, setCountMin] = useState(0),
    [countSeg, setCountSeg] = useState(),
    [auxRef, setAuxRef] = useState(true),
    refProgress = useRef(auxRef)
    
    const STATUS = {
      STARTED: 'Started',
    STOPPED: 'Stopped',
  }
    const INITIAL_COUNT = dataServer.timeShowShadow

    const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
    const [status, setStatus] = useState(STATUS.STOPPED)
  
    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

    function useInterval(callback, delay) {
      const savedCallback = useRef()
    
      // Remember the latest callback.
      useEffect(() => {
        savedCallback.current = callback
      }, [callback])
    
      // Set up the interval.
      useEffect(() => {
        function tick() {
          savedCallback.current()
        }
        if (delay !== null) {
          let id = setInterval(tick, delay)
          return () => clearInterval(id)
        }
      }, [delay])
    }

  const twoDigits = (num) => String(num).padStart(2, '0')
    

  const handleStart = () => {
    setStatus(STATUS.STARTED)
  }
  const handleStop = () => {
    setStatus(STATUS.STOPPED)
  }
  const handleReset = () => {
    setStatus(STATUS.STOPPED)
    setSecondsRemaining(INITIAL_COUNT)
  }

  useInterval(
    () => {
      console.log(secondsRemaining);
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1)
      } else {
        setStatus(STATUS.STOPPED)
      }
    },
    status === STATUS.STARTED ? 1000 : null,
    // passing null stops the interval
    )


    useEffect(() => {
        if (countdown === false) {
          handleStop()
          handleReset()
        }
        if (countdown === true) {
          handleStart()
        }
    }, [countdown]);

  const handlerProgress = () => {
    let min = Math.floor(dataServer.timeShowShadow / 60),
      seg = dataServer.timeShowShadow % 60;
      let auxCount = dataServer.timeShowShadow;
      if (countdown === true) {
        if (dataServer.timeShowShadow < 60) {
          /* let interval = setInterval(() => { //contador para comenzar la partida menos de un minuto  
              auxCount = auxCount - 1;
              setCountSeg(auxCount);
              console.log(refProgress.current);
              if (refProgress.current === false) {
                console.log("salimos");
                //clearInterval(interval);
              }
              console.log(auxCount);
              if (auxCount === 0) {
                clearInterval(interval);
                dispatch(NOCORRECT(true));
              }
          }, 1000); */
          
        } else { //contadores de tiempo de partida
            let auxCount = seg,
              auxMin = min;
            if (auxCount === 0) {
              auxCount = 59;
              auxMin = auxMin - 1;
              let interval = setInterval(() => {
                auxCount = auxCount - 1;
                setCountSeg(auxCount);
                setCountMin(auxMin);
                console.log(auxCount);
                if (auxCount === 0) {
                  if (auxMin === 0) {
                    console.log("llego");
                    clearInterval(interval);
                    dispatch(NOCORRECT(true));
                  }
                  auxMin = auxMin - 1;
                  auxCount = 60;
                  console.log(auxMin, auxCount);
                }
              }, 1000);
            } else {
                let interval = setInterval(() => {
                  auxCount = auxCount - 1;
                  setCountSeg(auxCount);
                  setCountMin(auxMin);
                  console.log(auxCount);
                  if (auxCount === 0) {
                    if (auxMin === 0) {
                      console.log("llego");
                      dispatch(NOCORRECT(true));
                      clearInterval(interval);
                    }
                    auxMin = auxMin - 1;
                    auxCount = 60;
                  }
                }, 1000);
            }
      }
      }
     
  };


  /* const timeOver = () => {
    dispatch(NOCORRECT(true));
  };

  useEffect(() => {
    if (countSeg === 0) {
      if (countMin === 0) {
        timeOver()
      }
    }
  }, [countMin])
   */

  const handlerTime = () => {
    return (
      <div id="countdown">
        {dataServer.timeShowShadow < 60 ? (
          countSeg == 0 ? (
              <h2>
              </h2>
          ) : (
            <h2>{twoDigits(secondsToDisplay)}s</h2>
          )
        ) : countMin === 0 ? (
          countSeg === 0 ? (
              <h2>
              </h2>
          ) : (
            <h2>{twoDigits(secondsToDisplay)}s</h2>
          )
        ) : (
          <h2>
            {twoDigits(minutesToDisplay)}m {twoDigits(secondsToDisplay)}s
          </h2>
        )}
      </div>
    );
  };

  return (
    <div id="header">
      {dataServer.countMembers == 1 ? (
        <div id="headerMulti">
          <div>
            <h1>{dataServer.nameAdmin}</h1>
            <h1>{dataServer.scoreAdmin}</h1>
          </div>
        </div>
      ) : dataServer.countMembers == 2 ? (
        <div id="headerMulti">
          <div>
            <h1>{dataServer.nameAdmin}</h1>
            <h1>{dataServer.scoreAdmin}</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember1}</h1>
            <h1>{dataServer.scoreMember1}</h1>
          </div>
        </div>
      ) : dataServer.countMembers == 3 ? (
        <div id="headerMulti">
          <div>
            <h1>{dataServer.nameAdmin}</h1>
            <h1>{dataServer.scoreAdmin}</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember1}</h1>
            <h1>{dataServer.scoreMember1}</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember2}</h1>
            <h1>{dataServer.scoreMember2}</h1>
          </div>
        </div>
      ) : (
        <div id="headerMulti">
          <div>
            <h1>{dataServer.nameAdmin}</h1>
            <h1>{dataServer.scoreAdmin}</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember1}</h1>
            <h1>{dataServer.scoreMember1}</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember2}</h1>
            <h1>{dataServer.scoreMember2}</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember3}</h1>
            <h1>{dataServer.scoreMember3}</h1>
          </div>
        </div>
      )}
      {countdown ? handlerTime() : <div></div>}
    </div>
  );
};

export default HeaderMulti;
