import { useEffect, useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import pokeball from "../assets/pokeball.png";
import socket from "../socket/socket";
import {
  READ_ALL_DATA_1,
  READ_ALL_DATA_2,
  DELETE_ALL_DATA,
  DELETE_POKEMON,
  DATA_SERVER,
  COUNTDOWN,
  SHOW_CONFIG,
  NOCORRECT,
} from "../reducers/crudReducer.jsx";
import arrowUp from "../assets/arrow-up.svg";
import pokeapi from "../assets/pokeapi.png";
import llave from "../assets/llave.png";
import arrowDown from "../assets/arrow-down.svg";
import {
  getPokemonList,
  getPokemon,
  getPokemonSelect,
} from "../services/routesPokemon";

const WaitMember = () => {
  const {
      dataServer,
      showConfig,
      dbPokemonSelect,
      dbPokemon1,
      noCorrect,
      countdown,
    } = useSelector((state) => state.crud),
    dispatch = useDispatch(),
    [loading1, setLoading1] = useState(false),
    [showImg, setShowImg] = useState(false),
    [hidePanel, setHidePanel] = useState(false),
    [noRepeat, setNoRepeat] = useState(false),
    [firstList, setFirstList] = useState(""),
    [showCorrect, setShowCorrect] = useState(false),
    [showResults, setShowResults] = useState(false),
    [auxPokemonList, setAuxPokemonList] = useState(0),
    [countShowPokemon, setCountShowPokemon] = useState(0),
    [counter, setCounter] = useState(0),
    [counterDown, setCounterDown] = useState(0),
    [correctCounter, setCorrectCounter] = useState(0),
    [countRound, setCountRound] = useState(1),
    [showCountdown, setShowCountdown] = useState(false),
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

  useEffect(() => {
    loadPokemon1(auxPokemonList);
  }, [noRepeat]);

  const loadPokemon1 = async () => {
    console.log("auxPokemonList", auxPokemonList);
    if (auxPokemonList.length === 1) {
      const response = await getPokemonList(auxPokemonList[0]);
      if (response.status === 200) {
        let obj = [];
        for (let index = 0; index < auxPokemonList; index++) {
          let auxObj = { name: response.data.results[index].name };
          obj.push(auxObj);
        }
        dispatch(READ_ALL_DATA_1(obj));
      }
    } else {
      for (let index = 0; index < auxPokemonList.length; index++) {
        const response = await getPokemonList(auxPokemonList[index]);
        if (response.status === 200) {
          let obj = [];
          for (let i = 0; i < auxPokemonList[index]; i++) {
            let auxObj = { name: response.data.results[i].name };
            obj.push(auxObj);
          }
          dispatch(READ_ALL_DATA_1(obj));
        }
      }
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
      //acierto de pokemon
      if (showImg) {
        setShowCorrect(true);
        setDisableBtn(true);
      } else {
        setShowCorrect(true);
        setShowImg(true);
        setDisableBtn(true);
      }
      dispatch(COUNTDOWN(false)); //esconder contador al acertar
      switch (
        correctCounter //saber cuantos puntos tocan segun cuantos han adivinado
      ) {
        case 0:
          dispatch(DATA_SERVER({ hitCounter: dataServer.hitCounter + 1 }));
          switch (dataServer.myNumber) { //asignando los puntos por miembro
            case 2:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points: dataServer.scoreMember1 + 8,
                numAcert: 1,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember1: dataServer.scoreMember1 + 8 }));
              break;
            case 3:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points: dataServer.scoreMember2 + 8,
                numAcert: 1,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember1: dataServer.scoreMember2 + 8 }));
              break;
            case 4:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points: dataServer.scoreMember3 + 8,
                numAcert: 1,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember3: dataServer.scoreMember3 + 8 }));
              break;
            default:
              break;
          }
          break;
        case 1:
          dispatch(DATA_SERVER({ hitCounter: dataServer.hitCounter + 1 }));
          switch (dataServer.myNumber) {
            case 2:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points:  dataServer.scoreMember1 + 6,
                numAcert: 2,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember1: dataServer.scoreMember1 + 6 }));
              break;
            case 3:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points: dataServer.scoreMember2 + 6,
                numAcert: 2,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember2: dataServer.scoreMember2 + 6 }));
              break;
            case 4:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points: dataServer.scoreMember3 + 6,
                numAcert: 2,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember3: dataServer.scoreMember3 + 6 }));
              break;
            default:
              break;
          }
          break;
        case 2:
          dispatch(DATA_SERVER({ hitCounter: dataServer.hitCounter + 1 }));
          switch (dataServer.myNumber) {
            case 2:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points: dataServer.scoreMember1 + 4,
                numAcert: 3,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember1: dataServer.scoreMember1 + 4 }));
              break;
            case 3:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points: dataServer.scoreMember2 + 4,
                numAcert: 3,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember2: dataServer.scoreMember2 + 4 }));
              break;
            case 4:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points: dataServer.scoreMember3 + 4,
                numAcert: 3,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember3: dataServer.scoreMember3 + 4 }));
              break;
            default:
              break;
          }
          break;
        case 3:
          dispatch(DATA_SERVER({ hitCounter: dataServer.hitCounter + 1 }));
          switch (dataServer.myNumber) {
            case 2:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points: dataServer.scoreMember1 + 2,
                numAcert: 0,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember1: dataServer.scoreMember1 + 2 }));
              break;
            case 3:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points: dataServer.scoreMember2 + 2,
                numAcert: 0,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember2: dataServer.scoreMember2 + 2 }));
              break;
            case 4:
              socket.emit("correct", {
                nameServer: dataServer.nameServer,
                number: dataServer.myNumber,
                points: dataServer.scoreMember3 + 2,
                numAcert: 0,
                hitCounter: dataServer.hitCounter + 1,
              });
              dispatch(DATA_SERVER({ scoreMember3: dataServer.scoreMember3 + 2 }));
              break;
            default:
              break;
          }
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

  useEffect(() => {
    socket.on("startGame", (startGame) => {
      console.log(startGame);
      timeStartGame(startGame);
      setShowCountdown(true);
    });
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
        setShowResults(true)
      } else {
        if (dataServer.hitCounter === dataServer.countMembers) {
          //resetGame()
          dispatch(SHOW_CONFIG(true));
          setShowCountdown(true);
          setCountShowPokemon(0);
          setCorrectCounter(0);
          //activar contador
          dispatch(DATA_SERVER({ round: dataServer.round + 1, hitCounter: 0 }));
        }
      }
    }, 3000);
  }, [dataServer.hitCounter]);

  const resetGame = async () => {
    console.log("init");
  };

  const handlerPoints = (correct) => {
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
      case 0:
        dispatch(
          DATA_SERVER({
            scoreMember3: correct.point,
            hitCounter: correct.hitCounters,
          })
        );
        break;
      default:
        break;
    }
  };

  const timeStartGame = (startGame) => {
    dispatch(DATA_SERVER({ timeShowShadow: startGame.timeShowShadow }));
    let date = new Date(),
      sec = date.getSeconds() + 1,
      auxCount = 8;
    setCounterDown(auxCount);
    let interval = setInterval(() => {
      if (sec === 59) {
        sec = 0;
      } else {
        sec = sec + 1;
      }
      auxCount = auxCount - 1;
      setCounterDown(auxCount);
      if (startGame.timeSec === sec) {
        initGame(startGame);
        clearInterval(interval);
        dispatch(COUNTDOWN(true));
      }
      console.log(sec);
    }, 1000);
  };

  const initGame = (startGame) => {
    //dispatch(DELETE_ALL_DATA());
    setBusquedaPokemon("");
    setNamePokemonSelect([]);
    setShowCorrect(false);
    setDisableBtn(false);
    setShowResults(false);
    setShowImg(false);
    setArrPokemons([]);
    dispatch(SHOW_CONFIG(false));
    setAuxPokemonList(startGame.arrGeneration);
    loadselect(startGame.numPokemon);
    setNoRepeat(true);
    //dispatch(SHOW_CONFIG(true)) solo cuando se acaben los
  };

  useEffect(() => {
    //escuchando el seacabo el tiempo para desabilitar el juego
    if (showCorrect === false) {
      if (noCorrect === true) {
        handleSubmit();
      }
    }
  }, [noCorrect]);

  return (
    <div>
      {showConfig ? (
        showCountdown ? (
          <div id="waitMulti">
            <h2>Round {dataServer.round} will start in:</h2>
            <h2>{counterDown}s</h2>
            <img src={pokeball} alt="" />
          </div>
        ) : (
          <div id="waitMulti">
            <h2>Waiting for {dataServer.nameAdmin} to set up the game</h2>
            <img src={pokeball} alt="" />
          </div>
        )
      ) : (
        showResults ? 
        <h1>results</h1> :
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
      )}
    </div>
  );
};

export default WaitMember;
