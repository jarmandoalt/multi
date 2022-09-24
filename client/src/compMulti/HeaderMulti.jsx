import { useEffect, useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const HeaderMulti = () => {
  const { dbPokemon1, dbPokemonSelect, dataServer } = useSelector(
      (state) => state.crud
    ),
    dispatch = useDispatch();

  return (
    <div id="header">
      {dataServer.countMembers == 1 ? (
        <div id="headerMulti">
          <div>
            <h1>{dataServer.nameAdmin}</h1>
            <h1>0</h1>
          </div>
        </div>
      ) : dataServer.countMembers == 2 ? (
        <div id="headerMulti">
          <div>
            <h1>{dataServer.nameAdmin}</h1>
            <h1>0</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember1}</h1>
            <h1>0</h1>
          </div>
        </div>
      ) : dataServer.countMembers == 3 ? (
        <div id="headerMulti">
          <div>
            <h1>{dataServer.nameAdmin}</h1>
            <h1>0</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember1}</h1>
            <h1>0</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember2}</h1>
            <h1>0</h1>
          </div>
        </div>
      ) : (
        <div id="headerMulti">
          <div>
            <h1>{dataServer.nameAdmin}</h1>
            <h1>0</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember1}</h1>
            <h1>0</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember2}</h1>
            <h1>0</h1>
          </div>
          <div>
            <h1>{dataServer.nameMember3}</h1>
            <h1>0</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMulti;
