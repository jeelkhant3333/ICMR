import { Autopsy } from "../Database/Autopsy.js";

const AutopsyConroller = (req, res) => {
  var { completeform } = req.body;

  completeform = JSON.parse(completeform);

  Autopsy.create(completeform)
    .then((response) => {
      res.status(200).json({
        success: "Data submitted successfully!",
        response: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error occured in saving data.",
      });
    });
};

export default AutopsyConroller;
