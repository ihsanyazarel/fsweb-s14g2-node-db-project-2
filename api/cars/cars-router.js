const router = require("express").Router();
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinValid } = require("./cars-middleware");
const carsModel = require("./cars-model");

router.get("/", async (req, res, next) => {
    try {
        const allData = await carsModel.getAll();
        res.json(allData);
    } catch (error) {
        next(error);
    }
});

router.get("/:id",checkCarId, async (req, res, next) => {
    try {
        const data = await carsModel.getById(req.params.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post("/",checkCarPayload, checkVinValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const data = await carsModel.create(req.body);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;