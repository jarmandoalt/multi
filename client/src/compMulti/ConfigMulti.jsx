import { useEffect, useState } from "react";

const ConfigMulti = () => {
  const [arrGeneration, setArrGeneration] = useState([151]);

  const handleBtnGeneration = (e) => {
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
    setShowCorrect(false);
    setShowImg(false);
    for (let index = 0; index < arrGeneration.length; index++) {
      loadPokemon1(arrGeneration[index]);
    }
    let auxNum = Math.floor(Math.random() * (arrGeneration.length + 1 - 1 + 1));
    if (arrGeneration.length === 1) {
      loadselect(arrGeneration[0]);
    } else {
      loadselect(arrGeneration[auxNum - 1]);
    }
    refPanel.current.classList.add("is-hidePanel");
    refPanelPokeball.current.classList.add("is-hidePanel");
    if (showImg) {
      refImgSelect.current.classList.remove("is-correct");
    }
    setHidePanel(true);
    setDisableBtn(false);
  };

  return (
    <div id="configMulti" >
      <div>
        <h1>Configure the game</h1>
      </div>
      <div>
        <h2>Number of games </h2>
        <input type="number" min={0} max={10}/>
      </div>
      <div>
        <div>
          <h2>Select the generations you will play with</h2>
        </div>
        <div>
          <button slot="151" onClick={handleBtnGeneration}>
            {" "}
            1° Generation{" "}
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
  );
};

export default ConfigMulti;
