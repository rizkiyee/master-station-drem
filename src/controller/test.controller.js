const testModel = require("../model/test.model");

const testController = {
  get: (req, res) => {
    return testModel
      .get(req.query)
      .then((result) => {
        return res
          .status(200)
          .send({ message: "success", data: result, status: 200 });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  add: (req, res) => {
    console.log(req.body);
    if (
      req.body.id != null &&
      req.body.nama != null &&
      req.body.umur != null
      // req.body.title
    ) {
      const request = {
        ...req.body,
        // file: req.files, //uncomment if multiple
        // img: req.file.filename, //uncomment if single
        //depend on product.route, formUpload.single or formUpload.array
      };
      // console.log(req.files) //multiple
      // console.log(req.file) //(single)
      // console.log(req.body);

      return testModel
        .add(request)
        .then((result) => {
          return res.status(201).send({ message: "succes", data: result });
        })
        .catch((error) => {
          return res.status(500).send({ message: error });
        });
    } else {
      return res.status(400).send({ message: "Field cannot be empty!" });
    }
  }
}

module.exports = testController;