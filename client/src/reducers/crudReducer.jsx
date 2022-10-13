import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  dbPokemon1: [],
  dbPokemonSelect: {},
  dataServer: {
    adminId: "",
    nameServer: "",
    name: "",
    id: "",
    idServer: "",
    countMembers: 1,
    nameAdmin: "",
    scoreAdmin: 0,
    nameMember1: "",
    scoreMember1: 0,
    nameMember2: "",
    scoreMember2: 0,
    nameMember3: "",
    scoreMember3: 0,
    myNumber: 0,
    numberGames: 3,
    round: 1,
    timeShowShadow: 45,
    timeRes: 0,
    hitCounter: 0,
    timeSec: 0
  },
  showConfig: true,
  showMenu: false,
  countdown: false,
  noCorrect: false
};

const crudReducer = createSlice({
  name: "crudReducer",
  initialState,
  reducers: {
    READ_ALL_DATA_1: (state, action) => {
      if (state.dbPokemon1.length === 0) {
        state.dbPokemon1.push(...action.payload);
      }else {
        state.dbPokemon1.push(...action.payload);
      }
    },
    DELETE_ALL_DATA: (state, action) => {
      state.dbPokemon1 = [];
    },
    READ_ALL_DATA_2: (state, action) => {
      state.dbPokemonSelect = Object.assign(
        state.dbPokemonSelect,
        action.payload
      );
    },
    DELETE_POKEMON: (state, action) => {
      state.dbPokemon1 = state.dbPokemon1.filter(
        (item) => item.name !== action.payload
      );
    },
    DATA_SERVER: (state, action) => {
      console.log(action.payload);
      state.dataServer = Object.assign(state.dataServer, action.payload);
    },
    DELETE_DATA_SERVER: (state, action) => {
      state.dataServer = {
        adminId: "",
        nameAdmin: "",
        nameServer: "",
        name: "",
        id: "",
        idServer: "",
        countMembers: 1,
        scoreAdmin: 0,
        nameMember1: "",
        scoreMember1: 0,
        nameMember2: "",
        scoreMember2: 0,
        nameMember3: "",
        scoreMember3: 0,
        myNumber: 0,
        numberGames: 3,
        timeShowShadow: 45,
        timeRes: 0,
        timeSec: 0
      };
    },
    SHOW_CONFIG: (state, action) => {
      state.showConfig = action.payload
    },
    SHOW_MENU: (state, action) => {
      state.showMenu = action.payload
    },
    COUNTDOWN: (state, action) => {
      state.countdown = action.payload
    },
    NOCORRECT: (state, action) => {
      state.noCorrect = action.payload
      console.log(action.payload);
    },
  },
});

export const {
  READ_ALL_DATA_1,
  READ_ALL_DATA_2,
  DELETE_ALL_DATA,
  DELETE_POKEMON,
  DATA_SERVER,
  DELETE_DATA_SERVER,
  SHOW_CONFIG,
  SHOW_MENU,
  COUNTDOWN,
  NOCORRECT
} = crudReducer.actions;

export default crudReducer.reducer;
