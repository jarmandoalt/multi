const Server = require("../db/schemaServer");

async function addServer(req, res) {
  try {
    const { name, generations, creatorId, countMembers} = req.query;

    const server = Server({
      name,
      generations,
      creatorId,
      countMembers
    });

    const servers = await server.save();
    res.status(201).send({ servers });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

async function getServer(req, res) {
  const findServers = await Server.find().lean().exec();
  res.status(200).send({ findServers });
}

async function getServerName(req, res) {
  let name = req.query.name
  const server = await Server.find({ name: `${name}` })
  res.status(200).send({ server });
}

async function getServerUpdateCountMembers(req, res) {
  let id = req.query.id,
    members = req.query.members
    console.log(id,members);
  const server = await Server.findByIdAndUpdate( id, {countMembers: members })
  res.status(200).send({ server });
}

async function deleteServer(req, res) {
  const name = req.query.name;
  console.log(name);
    try {
      const result = await Server.deleteMany({ name: name });
      if (result) {
        res.json({
          estado: true,
          message: "eliminado",
        });
      } else {
        res.json({
          estado: false,
          message: "Fallo eliminar",
        });
      }
    } catch (error) {
      console.log(error);
    } 
}

module.exports = {
  addServer,
  getServer,
  getServerName,
  getServerUpdateCountMembers,
  deleteServer
};
