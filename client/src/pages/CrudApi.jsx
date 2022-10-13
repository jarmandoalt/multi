import { useEffect, useState, createRef } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  READ_ALL_DATA_1,
  READ_ALL_DATA_2,
  DELETE_ALL_DATA,
  DELETE_POKEMON,
  DATA_SERVER,
} from "../reducers/crudReducer.jsx";
import pokeball from "../assets/pokeball.png";
import arrowUp from "../assets/arrow-up.svg";
import pokeapi from "../assets/pokeapi.png";
import llave from "../assets/llave.png";
import arrowDown from "../assets/arrow-down.svg";
import {
  getPokemonList,
  getPokemon,
  getPokemonSelect,
} from "../services/routesPokemon";
import {
  saveServer,
  getServerName,
  updateCountMembers,
} from "../services/routes";

const CrudApi = () => {
  const { dbPokemon1, dbPokemonSelect, dataServer } = useSelector(
      (state) => state.crud
    ),
    dispatch = useDispatch(),
    [loading1, setLoading1] = useState(false),
    [showImg, setShowImg] = useState(false),
    [arrGeneration, setArrGeneration] = useState([151]),
    [hidePanel, setHidePanel] = useState(false),
    [showCorrect, setShowCorrect] = useState(false),
    [counter, setCounter] = useState(0),
    [countShowPokemon, setCountShowPokemon] = useState(0),
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
    navigate = useNavigate(),
    refPanelPokeball = createRef(),
    refBtnMenu = createRef();

  /* document.addEventListener("keydown", (e) => {
    let $input = document.getElementById("buscador");
    if (
      e.keyCode === 39 ||
      e.keyCode === 13 ||
      e.keyCode === 40 ||
      e.keyCode === 37
    ) {
      console.log("fail");
    } else {
      moveCursorToEnd();
    }
  }); */

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
        //Guardar pokemon si tiene dos tipos

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
        //Guardar pokemon si tiene un  tipo

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

  const control = (e) => {
    //controlar con teclado
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

  const controlInput = (e) => {
    //control teclado
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

  const moveCursorToEnd = () => {
    let el = document.getElementById("buscador");
    el.focus();
    if (typeof el.selectionStart == "number") {
      el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
      var range = el.createTextRange();
      range.collapse(false);
      range.select();
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

  const handleBtnGeneration = (e) => {
    //btn de menu
    if (arrGeneration.includes(Number(e.target.slot))) {
      setArrGeneration(
        arrGeneration.filter((item) => item !== Number(e.target.slot))
      );
      e.target.style.backgroundColor = "rgb(158, 157, 152)";
      e.target.style.color = "rgb(90, 87, 83)";
    } else {
      e.target.style.backgroundColor = "rgb(129, 179, 212)";
      e.target.style.color = "whitesmoke";
      setArrGeneration([...arrGeneration, Number(e.target.slot)]);
    }
  };

  const handleSend = (aux) => {
    dispatch(DELETE_ALL_DATA());
    setBusquedaPokemon("");
    setNamePokemonSelect([]);
    setArrPokemons([]);
    setCountShowPokemon(0);
    setShowCorrect(false);
    setShowImg(false);
    for (let index = 0; index < arrGeneration.length; index++) {
      loadPokemon1(arrGeneration[index]);
    }
    let auxNumArra = Math.floor(Math.random() * (arrGeneration.length - 1 + 1));

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
      loadselect(auxNum);
    }
    refPanel.current.classList.add("is-hidePanel");
    refPanelPokeball.current.classList.add("is-hidePanel");
    if (showImg) {
      refImgSelect.current.classList.remove("is-correct");
    }
    setHidePanel(true);
    setDisableBtn(false);
  };

  const handleReload = () => {
    handleSend();
  };

  const handleBusquedaPokemons = (e) => {
    setBusquedaPokemon(e.target.value);
    filterPokemon(e.target.value);
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

  const selectNamePokemon = async (e) => {
    e.preventDefault();
    if (e.target.value === dbPokemonSelect.name) {
      if (showImg === true) {
        console.log("4");
        setShowCorrect(true);
        setDisableBtn(true);
        refImgSelect.current.classList.add("is-correct");
      } else {
        setShowImg(true);
        setShowCorrect(true);
        setDisableBtn(true);
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

  const handleSubmit = () => {
    if (showImg) {
      refImgSelect.current.classList.add("is-correct");
    } else {
      setShowImg(true);
    }
    pokemonSelect(dbPokemonSelect.name);
    setDisableBtn(true);
  };

  useEffect(() => {
    //mostrar pokemon cuando se adivino
    if (showCorrect === true) {
      if (refImgSelect.current) {
        refImgSelect.current.classList.add("is-correct");
      }
    }
  }, [refImgSelect]);

  const handlerServer = (e) => {
    e.preventDefault();
    dispatch(DATA_SERVER({ [e.target.name]: e.target.value }));
  };

  const joinServer = async (name) => {
    const response = await getServerName(name);
    if (response.status === 200) {
      if (response.data.server.length == 0) {
        console.log("server no encontrado");
      } else {
        if (response.data.server[0].countMembers == 4) {
          console.log("server lleno");
        } else {
          dispatch(DATA_SERVER({ id: socket.id }));
          updateCountMembers(
            response.data.server[0]._id,
            response.data.server[0].countMembers + 1
          );
          socket.emit("join", {
            nameServer: dataServer.nameServer,
            tagName: dataServer.name,
            rol: "member",
            nomMember: response.data.server[0].countMembers,
            idServer: response.data.server[0]._id,
          });
          navigate("/home/room");
        }
      }
    }
  };

  const sendServer = async (e) => {
    e.preventDefault();
    //Create server
    if (e.target.slot == 1) {
      dispatch(DATA_SERVER({ adminId: socket.id, id: socket.id }));
      const response = await getServerName(dataServer.nameServer);
      if (response.status === 200) {
        if (response.data.server.length == 0) {
          await saveServer({ dataServer, member: 1 });
          navigate("/home/room");
          socket.emit("create", {
            nameServer: dataServer.nameServer,
            tagName: dataServer.name,
            rol: "admin",
          });
        } else {
          console.log("Nombre de server utilizado");
        }
      }
    } else {
      await joinServer(dataServer.nameServer);
    }
  };

  return (
    <div id="divPage">
      <form id="multi">
        <div>
          <h1>Multiplayer</h1>
        </div>
        <div>
          <input
            required
            type="text"
            placeholder="name"
            name="name"
            onChange={handlerServer}
            value={dataServer.nameCreator}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setCreateOrUnit(false);
            }}
          >
            Create Room{" "}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setCreateOrUnit(true);
            }}
          >
            Join Room
          </button>
        </div>
        {createOrUnit ? (
          <div>
            <h3>Write the name of the room</h3>
            <input
              required
              type="text"
              name="nameServer"
              onChange={handlerServer}
              value={dataServer.nameServer}
              placeholder="Name Server"
            />
            <button onClick={sendServer}>Join</button>
          </div>
        ) : (
          <div>
            <h3>Write the name of the room</h3>
            <input
              required
              type="text"
              name="nameServer"
              onChange={handlerServer}
              value={dataServer.nameServer}
              placeholder="Name Server"
            />
            <button slot="1" onClick={sendServer}>
              Create
            </button>
          </div>
        )}
      </form>
      <div id="divPokemonSingle" ref={refPanelPokeball}>
        <div id="divImgPokemons">
          {loading1 ? (
            <div>
              {showImg ? (
                <div
                  id="divImgPokemonShow"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {disableBtn ? (
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
                  ) : (
                    <button
                      style={{
                        color: "white",
                        cursor: "pointer",
                        backgroundColor: "rgb(203, 192, 206)",
                      }}
                      onClick={handleSubmit}
                    >
                      {" "}
                      Surrender
                    </button>
                  )}
                  <img
                    id="imgPokemon"
                    ref={refImgSelect}
                    width="20vw"
                    src={dbPokemonSelect.sprites.front_default}
                    alt="pokemon65"
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
                Show Pokemon <br />
                <img
                  style={{
                    filter: "brightness(50%)",
                  }}
                  src={llave}
                  alt="key1"
                />
                <img
                  style={{
                    filter: "brightness(50%)",
                  }}
                  src={llave}
                  alt="key2"
                />
                <img
                  style={{
                    filter: "brightness(50%)",
                  }}
                  src={llave}
                  alt="key3"
                />
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
                  <h2>LOST</h2>
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
      <div id="divBtnHide">
        <div>
          {hidePanel ? (
            <button
              onClick={() => {
                setHidePanel(false);
                refPanel.current.classList.remove("is-hidePanel");
                refPanelPokeball.current.classList.remove("is-hidePanel");
                refBtnMenu.current.classList.toggle("is-active");
              }}
              ref={refBtnMenu}
              className="hamburger hamburger--arrow-r is-active"
              type="button"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                setHidePanel(true);
                refPanelPokeball.current.classList.add("is-hidePanel");
                refPanel.current.classList.add("is-hidePanel");
                refBtnMenu.current.classList.toggle("is-active");
              }}
              ref={refBtnMenu}
              className="hamburger hamburger--arrow-r is-active"
              type="button"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          )}
          <button onClick={handleReload}> RELOAD </button>
        </div>
        <div>
          <div>
            <h3>Powered by</h3>
            <img src={pokeapi} alt="" />
          </div>
          <h3>© AAM</h3>
        </div>
      </div>
      <div ref={refPanel}>
        <div>
          <div>
            <h3>Select the generations you will play with</h3>
          </div>
          <div>
            <button slot="151" onClick={handleBtnGeneration}>
              {" "}
              1° <br /> Generation{" "}
            </button>
            <button slot="100" onClick={handleBtnGeneration}>
              {" "}
              2° Generation{" "}
            </button>
            <button slot="135" onClick={handleBtnGeneration}>
              {" "}
              3° Generation{" "}
            </button>
            <button slot="107" onClick={handleBtnGeneration}>
              {" "}
              4° Generation{" "}
            </button>
            <button slot="156" onClick={handleBtnGeneration}>
              {" "}
              5° Generation{" "}
            </button>
            <button slot="72" onClick={handleBtnGeneration}>
              {" "}
              6° Generation{" "}
            </button>
            <button slot="88" onClick={handleBtnGeneration}>
              {" "}
              7° Generation{" "}
            </button>
            <button slot="89" onClick={handleBtnGeneration}>
              {" "}
              8° Generation{" "}
            </button>
          </div>
          <div>
            <button onClick={handleSend}>START</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudApi;
