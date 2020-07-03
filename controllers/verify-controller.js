const Response = require("../util/response_manager");
const HttpStatus = require("../util/http_status");
const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.use(require("body-parser").urlencoded({ extended: true }));
const messagebird = require("messagebird")("S2LorOevmKnSHrcS9KBXnVXyq"); //4505 test
// const messagebird = require('messagebird')('jXFk6Krvh8Lw24Xn1Kw0XjX4M');//production

module.exports = {
  //NOTE: both keys can only work with +2348145502505
  initialverification(req, res) {
    var params = {
      originator: "MyCustomer",
      template: "Your MyCustomer verification code is: %token"
    };
    messagebird.verify.create(req.body.phone, params, function (err, response) {
      if (err) {
        res.status(401).json({
          status: "Fail",
          message: err
        });
      } else {
        //Now we render a page to enter token
        //There should be a hidden input which will contain the id of the process
        res.status(200).json({
          status: "success",
          response: response
        });
      }
    });
  },
  verifyPhone(req, res) {
    try {
      const id = req.body.id;
      const token = req.body.token;
      const phone = req.body.phone;
      messagebird.verify.verify(id, token, (err, response) => {
        if (err) {
          res.status(err.statusCode).json({
            success: false,
            message: "Phone number could not be verified",
            error: err
          });
        } else {
          User.findOneAndUpdate(
            //   get the verified number fron the response from messagebird
            { phone_number: response.recipient },
            { $set: { is_active: 1 } },
            { new: true }
          )
            .then(result => {
              res.status(200).json({
                message: "Phone number successfully verified. Status updated",
                success: "true",
                data: response
              });
            })
            .catch(err => {
              res.status(500).json({
                success: false,
                message: "Could not update status "
              });
            });
        }
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
        error: {
          code: 500,
          message: err.message
        }
      });
    }
  }
};
