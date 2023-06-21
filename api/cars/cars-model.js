const dB = require("../../data/db-config");

const getAll = () => {
  return dB("cars");
}

const getById = (id) => {
  return dB("cars").where("id", id).first();
}

const getByVin = (vin) => {
  return dB("cars").where("vin", vin).first();
}

const create = async (car) => {
  const [id] = await dB("cars").insert(car);
  return getById(id);
}

module.exports = {getAll, getById, create, getByVin};