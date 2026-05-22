const revoraRouter = require("express").Router();
const revoraController = require("./revoraFormController");

revoraRouter.post("/", async (req, res) => {
    let result = await revoraController.createdata(req, res);
    res.send(result);
});

module.exports = revoraRouter;