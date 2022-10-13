import { useEffect, useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  READ_ALL_DATA_1,
  READ_ALL_DATA_2,
  DELETE_ALL_DATA,
  DELETE_POKEMON,
  DATA_SERVER,
  SHOW_CONFIG,
  COUNTDOWN,
} from "../reducers/crudReducer.jsx";
import {
  getPokemonList,
  getPokemon,
  getPokemonSelect,
} from "../services/routesPokemon";
import pokeball from "../assets/pokeball.png";
import socket from "../socket/socket";
import arrowUp from "../assets/arrow-up.svg";
import llave from "../assets/llave.png";
import pokeapi from "../assets/pokeapi.png";
import arrowDown from "../assets/arrow-down.svg";

const ConfigMulti = () => {
  const [arrGeneration, setArrGeneration] = useState([151]),
    {
      dbPokemon1,
      dbPokemonSelect,
      dataServer,
      showConfig,
      countdown,
      noCorrect,
    } = useSelector((state) => state.crud),
    dispatch = useDispatch(),
    [loading1, setLoading1] = useState(false),
    [showImg, setShowImg] = useState(false),
    [hidePanel, setHidePanel] = useState(false),
    [showCorrect, setShowCorrect] = useState(false),
    [countShowPokemon, setCountShowPokemon] = useState(0),
    [showCountdown, setShowCountdown] = useState(false),
    [numPokemon, setNumPokemon] = useState(0),
    [counter, setCounter] = useState(0),
    [showResults, setShowResults] = useState(false),
    [correctCounter, setCorrectCounter] = useState(0),
    [counterDown, setCounterDown] = useState(8),
    [focusSelect, setFocus] = useState(""),
    [busquedaPokemon, setBusquedaPokemon] = useState(""),
    [namePokemonSelect, setNamePokemonSelect] = useState([]),
    [pokemonGen, setPokemonGen] = useState(0),
    [arrPokemonsUse, setArrPokemonsUse] = useState([]),
    [arrPokemons, setArrPokemons] = useState([]),
    [createOrUnit, setCreateOrUnit] = useState(false),
    [disableBtn, setDisableBtn] = useState(false),
    refImgSelect = createRef(),
    refPanel = createRef(),
    refPanelPokeball = createRef();

  const handleBtnGeneration = (e) => {
    if (arrGeneration.includes(Number(e.target.slot))) {
      setArrGeneration(
        arrGeneration.filter((item) => item !== Number(e.target.slot))
      );
      e.target.style.backgroundColor = "rgb(173, 173, 173)";
      e.target.style.color = "rgb(90, 87, 83)";
    } else {
      e.target.style.backgroundColor = "rgb(129, 179, 212)";
      e.target.style.color = "whitesmoke";
      setArrGeneration([...arrGeneration, Number(e.target.slot)]);
    }
  };

  const loadPokemon1 = async (num) => {
    const response = await getPokemonList(num);
    if (response.status === 200) {
      let obj = [];
      for (let index = 0; index < num; index++) {
        let auxObj = { name: response.data.results[index].name };
        obj.push(auxObj);
      }
      dispatch(READ_ALL_DATA_1(obj));
    }
  };

  const loadselect = async (num) => {
    const response = await getPokemon(num);
    if (response.status === 200) {
      dispatch(READ_ALL_DATA_2(response.data));
      setLoading1(true);
      let auxGen = 0,
        auxArrGeneration = [0, 151, 251, 386, 493, 649, 721, 809, 998];
      for (let index = 0; index < auxArrGeneration.length; index++) {
        if (
          response.data.id <= auxArrGeneration[index] &&
          response.data.id > auxArrGeneration[index - 1]
        ) {
          auxGen = index;
        }
      }
      setPokemonGen(auxGen);
    }
  };

  const filterPokemon = (terminoBusqueda) => {
    let resultFilter = dbPokemon1.filter((element) => {
      if (
        element.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return element;
      }
    });

    let result = resultFilter;
    if (resultFilter.length > 2) {
      result = resultFilter.slice(0, 5);
    }
    setNamePokemonSelect(result);
  };

  const handleBusquedaPokemons = (e) => {
    setBusquedaPokemon(e.target.value);
    filterPokemon(e.target.value);
  };

  const control = (e) => {
    switch (e.keyCode) {
      case 39:
        focusSelect.nextElementSibling.focus();
        setFocus(focusSelect.nextElementSibling);
        break;
      case 37:
        focusSelect.previousElementSibling.focus();
        setFocus(focusSelect.previousElementSibling);
        break;
      case 13:
        if (focusSelect.nextElementSibling === null) {
          focusSelect.previousElementSibling.focus();
          setFocus(focusSelect.previousElementSibling);
        }
        if (focusSelect.previousElementSibling === null) {
          focusSelect.nextElementSibling.focus();
          setFocus(focusSelect.nextElementSibling);
        }
        selectNamePokemon(e);
        break;
      default:
        moveCursorToEnd();
        break;
    }
  };

  const pokemonSelect = async (name) => {
    const response = await getPokemonSelect(name);
    if (response.status === 200) {
      setCounter(counter + 1);
      let auxGen = 0,
        auxArrGeneration = [0, 151, 251, 386, 493, 649, 721, 809, 998];
      for (let index = 0; index < auxArrGeneration.length; index++) {
        if (
          response.data.id <= auxArrGeneration[index] &&
          response.data.id > auxArrGeneration[index - 1]
        ) {
          auxGen = index;
        }
      }
      if (response.data.types.length === 2) {
        if (dbPokemonSelect.types.length === 2) {
          if (
            dbPokemonSelect.types[0].type.name ===
            response.data.types[0].type.name
          ) {
            countShowPokemon < 3
              ? setCountShowPokemon(countShowPokemon + 1)
              : null;
          } else {
            if (
              dbPokemonSelect.types[0].type.name ===
              response.data.types[1].type.name
            ) {
              countShowPokemon < 3
                ? setCountShowPokemon(countShowPokemon + 1)
                : null;
            } else {
              if (
                dbPokemonSelect.types[1].type.name ===
                response.data.types[0].type.name
              ) {
                countShowPokemon < 3
                  ? setCountShowPokemon(countShowPokemon + 1)
                  : null;
              } else {
                if (
                  dbPokemonSelect.types[1].type.name ===
                  response.data.types[1].type.name
                ) {
                  countShowPokemon < 3
                    ? setCountShowPokemon(countShowPokemon + 1)
                    : null;
                }
              }
            }
          }
        } else {
          if (
            dbPokemonSelect.types[0].type.name ===
            response.data.types[0].type.name
          ) {
            countShowPokemon < 3
              ? setCountShowPokemon(countShowPokemon + 1)
              : null;
          } else {
            if (
              dbPokemonSelect.types[0].type.name ===
              response.data.types[1].type.name
            ) {
              countShowPokemon < 3
                ? setCountShowPokemon(countShowPokemon + 1)
                : null;
            }
          }
        }

        setArrPokemons([
          ...arrPokemons,
          {
            name: response.data.name,
            id: response.data.id,
            notypes: response.data.types.length,
            type2: response.data.types[0].type.name,
            type1: response.data.types[1].type.name,
            gen: auxGen,
            img: response.data.sprites.front_default,
          },
        ]);
      } else {
        if (dbPokemonSelect.types.length === 2) {
          if (
            dbPokemonSelect.types[0].type.name ===
            response.data.types[0].type.name
          ) {
            countShowPokemon < 3
              ? setCountShowPokemon(countShowPokemon + 1)
              : null;
          } else {
            if (
              dbPokemonSelect.types[1].type.name ===
              response.data.types[0].type.name
            ) {
              countShowPokemon < 3
                ? setCountShowPokemon(countShowPokemon + 1)
                : null;
            }
          }
        } else {
          if (
            dbPokemonSelect.types[0].type.name ===
            response.data.types[0].type.name
          ) {
            countShowPokemon < 3
              ? setCountShowPokemon(countShowPokemon + 1)
              : null;
          }
        }

        setArrPokemons([
          ...arrPokemons,
          {
            name: response.data.name,
            id: response.data.id,
            notypes: response.data.types.length,
            type1: response.data.types[0].type.name,
            img: response.data.sprites.front_default,
            gen: auxGen,
          },
        ]);
      }
    }
  };

  const handleSubmit = () => {
    if (showImg) {
      refImgSelect.current.classList.add("is-correct");
    } else {
      setShowImg(true);
    }
    pokemonSelect(dbPokemonSelect.name);
    setDisableBtn(true);
  };

  const selectNamePokemon = async (e) => {
    e.preventDefault();
    if (e.target.value === dbPokemonSelect.name) {
      if (showImg) {
        setShowCorrect(true);
        setDisableBtn(true);
      } else {
        setShowImg(true);
        setShowCorrect(true);
        setDisableBtn(true);
      }
      dispatch(COUNTDOWN(false));
      switch (correctCounter) {
        case 0:
          dispatch(
            DATA_SERVER({
              scoreAdmin: dataServer.scoreAdmin + 8,
              hitCounter: dataServer.hitCounter + 1,
            })
          );
          socket.emit("correct", {
            nameServer: dataServer.nameServer,
            number: 1,
            points: dataServer.scoreAdmin + 8,
            numAcert: 1,
            hitCounter: dataServer.hitCounter + 1,
          });
          break;
        case 1:
          dispatch(
            DATA_SERVER({
              scoreAdmin: dataServer.scoreAdmin + 6,
              hitCounter: dataServer.hitCounter + 1,
            })
          );
          socket.emit("correct", {
            nameServer: dataServer.nameServer,
            number: 1,
            points: dataServer.scoreAdmin + 6,
            numAcert: 2,
            hitCounter: dataServer.hitCounter + 1,
          });
          break;
        case 2:
          dispatch(
            DATA_SERVER({
              scoreAdmin: dataServer.scoreAdmin + 4,
              hitCounter: dataServer.hitCounter + 1,
            })
          );
          socket.emit("correct", {
            nameServer: dataServer.nameServer,
            number: 1,
            points: dataServer.scoreAdmin + 4,
            numAcert: 3,
            hitCounter: dataServer.hitCounter + 1,
          });
          break;
        case 3:
          dispatch(
            DATA_SERVER({
              scoreAdmin: dataServer.scoreAdmin + 2,
              hitCounter: dataServer.hitCounter + 1,
            })
          );
          setCorrectCounter(correctCounter - 3);
          socket.emit("correct", {
            nameServer: dataServer.nameServer,
            number: 1,
            points: dataServer.scoreAdmin + 2,
            numAcert: 0,
            hitCounter: dataServer.hitCounter + 1,
          });
          break;
        default:
          break;
      }
    }
    pokemonSelect(e.target.value);
    setArrPokemonsUse(...arrPokemonsUse, e.target.value);
    let auxArr = namePokemonSelect.filter(
      (item) => item.name !== e.target.value
    );
    setNamePokemonSelect(auxArr);
    dispatch(DELETE_POKEMON(e.target.value));
  };

  useEffect(() => {
    //mostrar pokemon cuando se adivino
    if (showCorrect === true) {
      if (refImgSelect.current) {
        refImgSelect.current.classList.add("is-correct");
      }
    }
  }, [refImgSelect]);

  const handleSend = async (aux) => {
    console.log("init");
    dispatch(DELETE_ALL_DATA());
    setBusquedaPokemon("");
    setNamePokemonSelect([]);
    setArrPokemons([]);
    setShowResults(false);
    setShowCorrect(false);
    setShowImg(false);
    for (let index = 0; index < arrGeneration.length; index++) {
      loadPokemon1(arrGeneration[index]);
    }

    let auxNumArra = Math.floor(Math.random() * (arrGeneration.length - 1 + 1)), //eligiendo un index del arra de generaciones al azar
      auxNumSend = 0;
    console.log(auxNumArra);

    if (arrGeneration.length === 1) {
      let max, min;
      switch (arrGeneration[0]) {
        case 151:
          min = 0;
          break;
        case 100:
          min = 151;
          break;
        case 135:
          min = 251;
          break;
        case 107:
          min = 386;
          break;
        case 156:
          min = 493;
          break;
        case 72:
          min = 649;
          break;
        case 88:
          min = 721;
          break;
        case 89:
          min = 809;
          break;
        default:
          break;
      }
      max = min + arrGeneration[0];
      let auxNum = Math.floor(Math.random() * (max - min + 1) + min);
      loadselect(auxNum);
      auxNumSend = auxNum;
    } else {
      let max, min;
      switch (arrGeneration[auxNumArra]) {
        case 151:
          min = 0;
          break;
        case 100:
          min = 151;
          break;
        case 135:
          min = 251;
          break;
        case 107:
          min = 386;
          break;
        case 156:
          min = 493;
          break;
        case 72:
          min = 649;
          break;
        case 88:
          min = 721;
          break;
        case 89:
          min = 809;
          break;
        default:
          break;
      }
      max = min + arrGeneration[auxNumArra];
      let auxNum = Math.floor(Math.random() * (max - min + 1) + min);
      console.log(auxNum);
      loadselect(auxNum);
      auxNumSend = auxNum;
    }

    if (refImgSelect.current) {
      refImgSelect.current.classList.remove("is-correct");
    }

    let date = new Date(),
      sec = date.getSeconds() + 10,
      auxInterval = 8;

    if (sec >= 60) {
      sec = sec - 60;
    }
    dispatch(SHOW_CONFIG(false));

    let interval = setInterval(() => {
      auxInterval = auxInterval - 1;
      setCounterDown(auxInterval);
      if (auxInterval === 0) {
        clearInterval(interval);
      }
    }, 1000);

    setTimeout(() => {
      setShowCountdown(true);
      dispatch(COUNTDOWN(true));
    }, 9000);

    socket.emit("startGame", {
      nameServer: dataServer.nameServer,
      numberGames: dataServer.numberGames,
      timeShowShadow: dataServer.timeShowShadow,
      timeSec: sec,
      numPokemon: auxNumSend,
      arrGeneration: arrGeneration,
    });

    setHidePanel(true);
    setDisableBtn(false);
  };

  const controlInput = (e) => {
    let $divBtn = document.getElementById("divBtnOpc");

    switch (e.keyCode) {
      case 40:
        $divBtn.firstElementChild.focus();
        setFocus($divBtn.firstElementChild);
        break;
      default:
        break;
    }
  };

  const handlerTime = () => {
    let min = Math.floor(dataServer.timeShowShadow / 60),
      seg = dataServer.timeShowShadow % 60;
    return (
      <div>
        {seg == 0 ? (
          <h2>{min}m</h2>
        ) : (
          <h2>
            {min}m {seg}s
          </h2>
        )}
      </div>
    );
  };

  useEffect(() => {
    //Escuchador de sockets
    socket.on("correct", (correct) => {
      handlerPoints(correct);
      setCorrectCounter(correct.numAcert);
    });
  }, [socket]);

  useEffect(() => {
    //Escuchando cuando acaben todos los miembros
    setTimeout(() => {
      if (dataServer.round === dataServer.numberGames && dataServer.hitCounter === dataServer.countMembers) {
        console.log("se termino");
        setShowResults(true);
      } else {
        if (dataServer.hitCounter === dataServer.countMembers) {
          setShowCountdown(false);
          dispatch(DATA_SERVER({ round: dataServer.round + 1, hitCounter: 0 }));
          setCorrectCounter(0);
          setCountShowPokemon(0);
          handleSend();
        }
        
      }
    }, 3000);
  }, [dataServer.hitCounter]);

  const handlerPoints = (correct) => {
    //manejador de puntos

    switch (correct.number) {
      case 1:
        dispatch(
          DATA_SERVER({
            scoreAdmin: correct.points,
            hitCounter: correct.hitCounter,
          })
        );
        break;
      case 2:
        dispatch(
          DATA_SERVER({
            scoreMember1: correct.points,
            hitCounter: correct.hitCounter,
          })
        );
        break;
      case 3:
        dispatch(
          DATA_SERVER({
            scoreMember2: correct.points,
            hitCounter: correct.hitCounter,
          })
        );
        break;
      case 4:
        dispatch(
          DATA_SERVER({
            scoreMember3: correct.points,
            hitCounter: correct.hitCounter,
          })
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    //escuchando el tiempo de partida para terminar la partida
    if (showCorrect === false) {
      if (noCorrect === true) {
        handleSubmit();
      }
    }
  }, [noCorrect]);

  return (
    <div>
      {showConfig ? (
        <div id="configMulti">
          <div>
            <h1>Configure the game</h1>
          </div>
          <div id="numberGames">
            <h2>Number of rounds </h2>
            <div>
              <button
                onClick={() => {
                  dataServer.numberGames === 0
                    ? null
                    : dispatch(
                        DATA_SERVER({ numberGames: dataServer.numberGames - 1 })
                      );
                }}
              >
                {" "}
                -{" "}
              </button>
              <h2>{dataServer.numberGames}</h2>
              <button
                onClick={() => {
                  dataServer.numberGames === 10
                    ? null
                    : dispatch(
                        DATA_SERVER({ numberGames: dataServer.numberGames + 1 })
                      );
                }}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
          <div id="timeShadow">
            <h2>Time for each game</h2>
            <div>
              <button
                onClick={() => {
                  dataServer.timeShowShadow === 0
                    ? null
                    : dispatch(
                        DATA_SERVER({
                          timeShowShadow: dataServer.timeShowShadow - 15,
                        })
                      );
                }}
              >
                {" "}
                -{" "}
              </button>
              {dataServer.timeShowShadow > 50 ? (
                handlerTime()
              ) : (
                <h2>{dataServer.timeShowShadow}s</h2>
              )}
              <button
                onClick={() => {
                  dataServer.timeShowShadow === 300
                    ? null
                    : dispatch(
                        DATA_SERVER({
                          timeShowShadow: dataServer.timeShowShadow + 15,
                        })
                      );
                }}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
          <div>
            <div>
              <h2>Select the generations you will play with</h2>
            </div>
            <div>
              <button slot="151" onClick={handleBtnGeneration}>
                {" "}
                1° <br /> Generation{" "}
              </button>
              <button slot="100" onClick={handleBtnGeneration}>
                {" "}
                2° <br /> Generation{" "}
              </button>
              <button slot="135" onClick={handleBtnGeneration}>
                {" "}
                3° <br /> Generation{" "}
              </button>
              <button slot="107" onClick={handleBtnGeneration}>
                {" "}
                4° <br /> Generation{" "}
              </button>
              <button slot="156" onClick={handleBtnGeneration}>
                {" "}
                5° <br /> Generation{" "}
              </button>
              <button slot="72" onClick={handleBtnGeneration}>
                {" "}
                6° <br /> Generation{" "}
              </button>
              <button slot="88" onClick={handleBtnGeneration}>
                {" "}
                7° <br /> Generation{" "}
              </button>
              <button slot="89" onClick={handleBtnGeneration}>
                {" "}
                8° <br /> Generation{" "}
              </button>
            </div>
            <div>
              <button onClick={handleSend}>START</button>
            </div>
          </div>
        </div>
      ) : showCountdown ? (
        showResults ? (
          <h1>results</h1>
        ) : (
          <div id="divPokemonSingle" ref={refPanelPokeball} className="multi">
            <div id="divImgPokemons">
              {loading1 ? (
                <div>
                  {showImg ? (
                    <div
                      id="divImgPokemonShow"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <button
                        style={{
                          color: "white",
                          cursor: "not-allowed",
                          backgroundColor: "rgb(203, 192, 206)",
                        }}
                      >
                        {" "}
                        Submit
                      </button>
                      <img
                        id="imgPokemon"
                        ref={refImgSelect}
                        width="20vw"
                        src={dbPokemonSelect.sprites.front_default}
                        alt=""
                      />
                    </div>
                  ) : countShowPokemon === 3 ? ( //cuando son tres llaves las obtenidas
                  <div id="divImgShow">
                    <button id="btn" onClick={() => setShowImg(true)}>
                      {" "}
                      Show Pokemon
                      <br /> 
                      <img className="is-active" src={llave} alt="key1" />
                      <img className="is-active" src={llave} alt="key2" />
                      <img className="is-active" src={llave} alt="key3" />
                    </button>
                    <img
                      id="imgPokeballShow"
                      src={pokeball}
                      width="20vw"
                      alt=""
                    />
                    <div id="divCircle"></div>
                  </div>
                ) : (
                  countShowPokemon === 2 ? //cuando son dos llaves las obtenidas
                  <div id="divImgShow">
                    <button
                      disabled
                      style={{
                        color: "white",
                        cursor: "not-allowed",
                        width: "35vw",
                        backgroundColor: "rgb(203, 192, 206)",
                      }}
                    >
                      {" "}
                      Show Pokemon
                      <br />
                      <img className="is-active" src={llave} alt="key1" />
                      <img className="is-active" src={llave} alt="key2" />
                      <img style={{
                      filter: "brightness(50%)",
                    }} src={llave} alt="key3" />
                    </button>
                    <img
                      id="imgPokeballShow"
                      src={pokeball}
                      width="20vw"
                      alt=""
                    />
                    <div id="divCircle"></div>
                  </div>:
                  countShowPokemon === 1 ? //cuando es una llave las obtenida
                  <div id="divImgShow">
                    <button
                      disabled
                      style={{
                        color: "white",
                        cursor: "not-allowed",
                        width: "35vw",
                        backgroundColor: "rgb(203, 192, 206)",
                      }}
                    >
                      {" "}
                      Show Pokemon
                      <br />
                      <img className="is-active" src={llave} alt="key1" />
                      <img style={{
                      filter: "brightness(50%)",
                    }} src={llave} alt="key2" />
                      <img style={{
                      filter: "brightness(50%)",
                    }} src={llave} alt="key3" />
                    </button>
                    <img
                      id="imgPokeballShow"
                      src={pokeball}
                      width="20vw"
                      alt=""
                    />
                    <div id="divCircle"></div>
                  </div> : 
                  <div id="divImgShow">
                  <button
                    disabled
                    style={{
                      color: "white",
                      cursor: "not-allowed",
                      width: "35vw",
                      backgroundColor: "rgb(203, 192, 206)",
                    }}
                  >
                    {" "}
                    Show Pokemon
                    <br />
                    <img style={{
                      filter: "brightness(50%)",
                    }} src={llave} alt="key1" />
                    <img style={{
                      filter: "brightness(50%)",
                    }} src={llave} alt="key2" />
                    <img style={{
                      filter: "brightness(50%)",
                    }} src={llave} alt="key3" />
                  </button>
                  <img
                    id="imgPokeballShow"
                    src={pokeball}
                    width="20vw"
                    alt=""
                  />
                  <div id="divCircle"></div>
                </div>
                  )}
                </div>
              ) : (
                <div
                  id="divInicioPokeball"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <button disabled>
                    {" "}
                    Show Pokemon <br /> {countShowPokemon}/3
                  </button>
                  <img src={pokeball} alt="" />
                </div>
              )}
            </div>
            <div id="divBuscadorPokemon">
              <div>
                <h2 htmlFor="text">Who is this Pokemon?</h2>
              </div>
              <div id="divBuscadorPokemons">
                <div>
                  {showCorrect ? (
                    <div id="divCorrect">
                      <h2>WIN</h2>
                    </div>
                  ) : disableBtn ? (
                    <div id="divLost">
                      <h2>TIME OVER</h2>
                    </div>
                  ) : (
                    <input
                      type="text"
                      name="busqueda"
                      placeholder="Name"
                      value={busquedaPokemon}
                      onKeyDown={controlInput}
                      id="buscador"
                      onChange={handleBusquedaPokemons}
                      autoComplete="off"
                    />
                  )}
                </div>
                <div id="divBtnOpc">
                  {namePokemonSelect.map(({ name }) =>
                    disableBtn ? (
                      <div key={name}></div>
                    ) : (
                      <button
                        onKeyDown={control}
                        value={name}
                        slot={name}
                        key={name}
                        translate="no"
                        onClick={selectNamePokemon}
                      >
                        {name}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div id="listPokemons">
                {arrPokemons.map(({ name, gen, img, type1, type2, id }) =>
                  name === dbPokemonSelect.name ? (
                    <div className="true" key={id}>
                      <div>
                        {gen > pokemonGen ? (
                          <h1>
                            {gen}
                            <img src={arrowDown} alt="" />
                          </h1>
                        ) : gen < pokemonGen ? (
                          <h1>
                            {gen}
                            <img src={arrowUp} alt="" />
                          </h1>
                        ) : (
                          <h1 className="is-true">{gen}</h1>
                        )}
                      </div>
                      <div>
                        <img src={img} alt="" />
                      </div>
                      <div translate="no">
                        <h1
                          value={name}
                          slot={name}
                          translate="no"
                          onClick={selectNamePokemon}
                        >
                          {name}
                        </h1>
                      </div>
                      <div>
                        {dbPokemonSelect.types.length === 2 ? (
                          type1 === dbPokemonSelect.types[0].type.name ? (
                            <h2 className={type1}>{type1}</h2>
                          ) : type1 === dbPokemonSelect.types[1].type.name ? (
                            <h2 className={type1}>{type1}</h2>
                          ) : (
                            <h2 className="false">{type1}</h2>
                          )
                        ) : type1 === dbPokemonSelect.types[0].type.name ? (
                          <h2 className={type1}>{type1}</h2>
                        ) : (
                          <h2 className="false"> {type1}</h2>
                        )}
                      </div>
                      <div>
                        {type2 == null ? (
                          <div></div>
                        ) : dbPokemonSelect.types.length === 2 ? (
                          type2 === dbPokemonSelect.types[0].type.name ? (
                            <h2 className={type2}>{type2}</h2>
                          ) : type2 === dbPokemonSelect.types[1].type.name ? (
                            <h2 className={type2}>{type2}</h2>
                          ) : (
                            <h2 className="false">{type2}</h2>
                          )
                        ) : type2 === dbPokemonSelect.types[0].type.name ? (
                          <h2 className={type2}>{type2}</h2>
                        ) : (
                          <h2 className="false"> {type2}</h2>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div key={name}>
                      <div>
                        {gen > pokemonGen ? (
                          <h1>
                            {gen}
                            <img src={arrowDown} alt="" />
                          </h1>
                        ) : gen < pokemonGen ? (
                          <h1>
                            {gen}
                            <img src={arrowUp} alt="" />
                          </h1>
                        ) : (
                          <h1 className="is-true">{gen}</h1>
                        )}
                      </div>
                      <div>
                        <img src={img} alt="" />
                      </div>
                      <div>
                        <h1
                          value={name}
                          slot={name}
                          translate="no"
                          onClick={selectNamePokemon}
                        >
                          {name}
                        </h1>
                      </div>
                      <div>
                        {dbPokemonSelect.types.length === 2 ? (
                          type1 === dbPokemonSelect.types[0].type.name ? (
                            <h2 className={type1}>{type1}</h2>
                          ) : type1 === dbPokemonSelect.types[1].type.name ? (
                            <h2 className={type1}>{type1}</h2>
                          ) : (
                            <h2 className="false">{type1}</h2>
                          )
                        ) : type1 === dbPokemonSelect.types[0].type.name ? (
                          <h2 className={type1}>{type1}</h2>
                        ) : (
                          <h2 className="false"> {type1}</h2>
                        )}
                      </div>
                      <div>
                        {type2 == null ? (
                          <div></div>
                        ) : dbPokemonSelect.types.length === 2 ? (
                          type2 === dbPokemonSelect.types[0].type.name ? (
                            <h2 className={type2}>{type2}</h2>
                          ) : type2 === dbPokemonSelect.types[1].type.name ? (
                            <h2 className={type2}>{type2}</h2>
                          ) : (
                            <h2 className="false">{type2}</h2>
                          )
                        ) : type2 === dbPokemonSelect.types[0].type.name ? (
                          <h2 className={type2}>{type2}</h2>
                        ) : (
                          <h2 className="false"> {type2}</h2>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )
      ) : (
        <div id="waitMulti">
          <h2>Round {dataServer.round} will start in:</h2>
          <h2>{counterDown}s</h2>
          <img src={pokeball} alt="" />
        </div>
      )}
    </div>
  );
};

export default ConfigMulti;
