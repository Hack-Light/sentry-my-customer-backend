const User = require("../models/user");
const Store = require("../models/store");

exports.create = async (req, res) => {
  try {
    // find user by id
    let user = await User.findById(req.params.id);

    // find the user's store using email which is a unique field
    let store = await Store.find({ email: user.email });

    // create an Object which will be sent back to the client/frontend

    let data = {
      firstname: user.first_name,
      lastname: user.last_name,
      email: user.email,
      storeAddress: store.shop_address
    };

    // set staus
    res.status(200);

    // send data as json
    res.json(data);
  } catch (err) {
    //handl error
    console.log(err);
    res.status(500).send({
      message: "Error occured while creating business card"
    });
  }
};
