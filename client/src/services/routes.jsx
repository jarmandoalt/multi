import socket from "../socket/socket";
import Axios from "axios";

const baseUrl = "http://localhost:5052/v1";

export async function getServer() {
  try {
    const response = await Axios({
      url: `${baseUrl}/server`,
      method: "GET",
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getServerName(name) {
  try {
    const response = await Axios({
      url: `${baseUrl}/serverName`,
      method: "GET",
      params: {
        name: name,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function updateCountMembers(id, nomMember) {
  try {
    const response = await Axios({
      url: `${baseUrl}/serverUpdate`,
      method: "PUT",
      params: {
        id: id,
        members: nomMember
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteServer(name) {
  try {
    const response = await Axios({
      url: `${baseUrl}/serverDelete`,
      method: "DELETE",
      params: {
        name: name
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function saveServer(productData) {
  try {
    const response = await Axios({
      url: `${baseUrl}/server`,
      method: "POST",
      params: {
        name: productData.dataServer.nameServer,
        generations: productData.dataServer.generations,
        creatorId: socket.id,
        countMembers: productData.member
      },
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}
