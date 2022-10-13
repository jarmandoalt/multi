import socket from "../socket/socket";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, createRef } from "react";
import { DATA_SERVER, DELETE_DATA_SERVER } from "../reducers/crudReducer";
import { deleteServer, updateCountMembers } from "../services/routes";
import { useNavigate } from "react-router-dom";

const ShowMenu = () => {
  const navigate = useNavigate(),
    { dbPokemon1, dbPokemonSelect, dataServer, showMenu } = useSelector(
      (state) => state.crud
    ),
    dispatch = useDispatch(),
    refDivMenu = createRef()

  const exitServer = async (e) => {
    if (e.target.value == dataServer.adminId) {
      await deleteServer(dataServer.nameServer);
      dispatch(DELETE_DATA_SERVER());
      navigate("/home");
    } else {
      //exit member
      await updateCountMembers(
        // update number members DB
        dataServer.idServer,
        dataServer.countMembers - 1
      );
      dispatch(DELETE_DATA_SERVER()); //delete data server
      socket.emit("exitMember", {
        nameMember: dataServer.name,
        nameServer: dataServer.nameServer,
        nameMember1: dataServer.nameMember1,
        nameMember2: dataServer.nameMember2,
        nameMember3: dataServer.nameMember3,
        countMembers: dataServer.countMembers,
        myNumber: dataServer.myNumber,
      });
      navigate("/home"); //Return menu
    }
  };

  useEffect(() => {
    showMenu
    ? refDivMenu.current.classList.add("is-active")
    : refDivMenu.current.classList.remove("is-active")
  
  }, [showMenu])
  

  return (
    <div id="divMenu" ref={refDivMenu}>
      {dataServer.id == dataServer.adminId ? (
        <div>
          <div>
            <h1>Menu</h1>
          </div>
          <div>
            <button>Settings</button>
          </div>
          <div>
          <button> Restart </button>
          </div>
          <div>
            <button onClick={exitServer}>Exit</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h1>Menu</h1>
          </div>
          <div>
            <button>Settings</button>
          </div>
          <div>
            <button onClick={exitServer}>Exit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowMenu;
