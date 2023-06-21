const carsModel = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const existID = await carsModel.getById(req.params.id);
    if (!existID) {
      res
        .status(404)
        .json({ message: `${req.params.id} kimliğine sahip araba bulunamadı` });
    } else {
      req.currentCar = existID;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  try {
    const allFields = ["vin", "make", "model", "mileage"];
    let missedFields = [];
    for (let i = 0; i < allFields.length; i++) {
      const item = allFields[i];
      if (!req.body[item]) {
        missedFields.push(item);
      }
    }
    if (missedFields.length > 0) {
      res
        .status(400)
        .json({
          message: `${missedFields.toString()} ${
            missedFields.length == 1 ? "is" : "are"
          } missing`,
        });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinValid = async (req,res,next) => {
  try {
    const isValid = vinValidator.validate(req.body.vin);
    if(isValid){
      next()
    } else {
      res.status(400).json({message: `vin ${req.body.vin} is invalid`});
    }
  } catch (error) {
    next(error);
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existVin = await carsModel.getByVin(req.body.vin);
    if (existVin) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinValid
};
