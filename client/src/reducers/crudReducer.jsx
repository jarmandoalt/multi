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
    myNumber: 0
  },
};

const crudReducer = createSlice({
  name: "crudReducer",
  initialState,
  reducers: {
    READ_ALL_DATA_1: (state, action) => {
      if (state.dbPokemon1.length === 0) {
        state.dbPokemon1.push(...state.dbPokemon1);
      }
      state.dbPokemon1.push(...action.payload);
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
      };
    },
  },
});

export const {
  READ_ALL_DATA_1,
  READ_ALL_DATA_2,
  DELETE_ALL_DATA,
  DELETE_POKEMON,
  DATA_SERVER,
  DELETE_DATA_SERVER
} = crudReducer.actions;

export default crudReducer.reducer;
