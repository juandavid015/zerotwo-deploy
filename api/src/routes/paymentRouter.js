const { Router } = require("express");
const {
  createPaymentGenin,
  executePaymentGenin,
  geninToken,
} = require("../controllers/paymentPlan/paymentGeninController");
const {
  createPaymentChuunin,
  executePaymentChuunin,
  chuuninToken,
} = require("../controllers/paymentPlan/paymentChuuninController");
const {
  createPaymentJounin,
  executePaymentJounin,
  jouninToken,
} = require("../controllers/paymentPlan/paymentJouninController");

const paymentRouter = Router();

//---------------------------------------------- PAYPAL ---------------------------------------------------------

//    http://localhost:3001/create-paymentGenin [POST]
paymentRouter.post("/create-paymentGenin", createPaymentGenin);

//PAYMENT
paymentRouter.post("/execute-paymentGenin", executePaymentGenin, geninToken);

// //    http://localhost:3001/create-paymentChuunin[POST]
paymentRouter.post("/create-paymentChuunin", createPaymentChuunin);

// //PAYMENT
paymentRouter.post("/execute-paymentChuunin", executePaymentChuunin, chuuninToken);

// //    http://localhost:3001/create-paymentJounin[POST]
paymentRouter.post("/create-paymentJounin", createPaymentJounin);

// //PAYMENT
paymentRouter.post("/execute-paymentJounin", executePaymentJounin, jouninToken);

// //FUNCION PARA SETEAR TOKEN GENIN
// paymentRouter.put("/setTokenGenin", geninToken);

// //FUNCION PARA SETEAR TOKEN CHUUNIN
// paymentRouter.put("/setTokenChuunin", chuuninToken);

// //FUNCION PARA SETEAR TOKEN JOUNIN
// paymentRouter.put("/setTokenChuunin", jouninToken);

//CHANGE GENIN
// router.put('/apiGenin', apiGenin)

//CHANGE CHUUNIN
// router.put('/apiChuunin', apiChuunin)

//CHANGE JOUNIN
// router.put('/apiJounin', apiJounin)

module.exports = paymentRouter;
