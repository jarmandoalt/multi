import socket from "../socket/socket";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, createRef } from "react";
import {
  getPokemonList,
  getPokemon,
  getPokemonSelect,
} from "../services/routesPokemon";
import { DATA_SERVER, DELETE_DATA_SERVER, SHOW_MENU } from "../reducers/crudReducer";
import { deleteServer, updateCountMembers } from "../services/routes";
import HeaderMulti from "../compMulti/HeaderMulti";
import ConfigMulti from "../compMulti/ConfigMulti";
import WaitMember from "../compMulti/WaitMember";
import config from "../assets/more-vertical.svg";
import ShowMenu from "../compMulti/ShowMenu";

const Room = () => {
  const [nameServer, setNameServer] = useState(""),
    { dbPokemon1, dbPokemonSelect, dataServer, showMenu } = useSelector(
      (state) => state.crud
    ),
    dispatch = useDispatch();

  //Listen Socket
  useEffect(() => {
    //Admin conection
    socket.on("create", (create) => {
      console.log(create);
      dispatch(DATA_SERVER({ idServer: create.create.idServer }));
      setNameServer(create.create.nameServer);
      adminConnection(create.create.tagName, create.create.nomMember);
    });

    //Join member
    socket.on("join", (join) => {
      console.log(join);
      dispatch(DATA_SERVER({ idServer: join.join.idServer }));
      memberConnection(join.join.tagName, join.join.nomMember);
    });

    //Desconnection member
    socket.on("exitMember", (exitMember) => {
      updateLastExitMember(exitMember);
    });

    //Update data members
    socket.on("updateData", (updateData) => {
      updateDataServer(updateData);
      if (!nameServer) {
        setNameServer(updateData.nameServer);
      }
    });
  }, [socket]);

  useEffect(() => {
    updateDataServerSocket(dataServer);
  }, [dataServer.countMembers]);

  const updateLastExitMember = (dataExit) => {
    if (dataServer.id == dataServer.adminId) {
      switch (dataExit.myNumber) {
        case 2:
          dispatch(
            DATA_SERVER({
              nameMember1: dataExit.nameMember2,
              nameMember2: dataExit.nameMember3,
              nameMember3: "",
              countMembers: dataExit.countMembers - 1,
            })
          );
          break;
        case 3:
          dispatch(
            DATA_SERVER({
              nameMember2: dataExit.nameMember3,
              nameMember3: "",
              countMembers: dataExit.countMembers - 1,
            })
          );
          break;

        case 4:
          dispatch(
            DATA_SERVER({
              nameMember3: "",
              countMembers: dataExit.countMembers - 1,
            })
          );
          break;

        default:
          break;
      }
    }
  };

  const updateDataServer = (dataServerAdmin) => {
    if (dataServer.id == dataServer.adminId) {
      console.log("admin");
    } else {
      let auxmyNumber = 0;
      if (dataServerAdmin.nameMember1 == dataServer.name) {
        auxmyNumber = 2;
      } else {
        if (dataServerAdmin.nameMember2 == dataServer.name) {
          auxmyNumber = 3;
        } else {
          if (dataServerAdmin.nameMember3 == dataServer.name) {
            auxmyNumber = 4;
          }
        }
      }
      dispatch(
        DATA_SERVER({
          nameServer: dataServerAdmin.nameServer,
          nameAdmin: dataServerAdmin.nameAdmin,
          nameMember1: dataServerAdmin.nameMember1,
          nameMember2: dataServerAdmin.nameMember2,
          nameMember3: dataServerAdmin.nameMember3,
          countMembers: dataServerAdmin.countMembers,
          idServer: dataServerAdmin.idServer,
          myNumber: auxmyNumber,
        })
      );
    }
  };

  const updateDataServerSocket = (dataServer) => {
    if (dataServer.id == dataServer.adminId) {
      socket.emit("updateData", {
        nameServer: dataServer.nameServer,
        nameAdmin: dataServer.nameAdmin,
        nameMember1: dataServer.nameMember1,
        nameMember2: dataServer.nameMember2,
        nameMember3: dataServer.nameMember3,
        countMembers: dataServer.countMembers,
        idServer: dataServer.idServer,
      });
    }
  };

  const adminConnection = (tagName) => {
    dispatch(DATA_SERVER({ nameAdmin: tagName }));
  };

  const memberConnection = (tagName, nomMember) => {
    switch (nomMember) {
      case 1:
        dispatch(DATA_SERVER({ nameMember1: tagName, countMembers: 2 }));
        break;
      case 2:
        dispatch(DATA_SERVER({ nameMember2: tagName, countMembers: 3 }));
        break;
      case 3:
        dispatch(DATA_SERVER({ nameMember3: tagName, countMembers: 4 }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <HeaderMulti></HeaderMulti>
      {
        dataServer.id == dataServer.adminId ? (
          <div>
            <ConfigMulti />
            <ShowMenu />
          </div>
        ) : (
          <div>
            <WaitMember />
            <ShowMenu />
          </div>
        )
        }
      <div id="divBtnExit">
        <button
          name={dataServer.name}
          value={dataServer.id}
          onClick={() => {showMenu ? dispatch(SHOW_MENU(false)): dispatch(SHOW_MENU(true))}}
        >
          {" "}
          <img src={config} alt="" />{" "}
        </button>
      </div>
    </div>
  );
};

export default Room;
