const { defineCategoryChuunin } = require("../../services/userServices");
const axios = require("axios");

const CLIENT_ID =
  "ATmoUxMVoAJD16IwOuocZjDV3npTr5aOzpZSKC2zstxKV8HG7OGnK_ZRhcQsvmueaZ6CB1p9HZEg258G";
const SECRET =
  "EAE5bs8qC4Nc8CoKmA4yyVwGaty30m7SVtcOTS2s6yqW0B__5sZiMKSafyScmMbd82Sj-twy9nhcZU9q";
const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // Live https://api-m.paypal.com

const auth = { user: CLIENT_ID, pass: SECRET };

const createPaymentChuunin = async (req, res) => {
  const { id } = req.body;

  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD", //https://developer.paypal.com/docs/api/reference/currency-codes/
          value: "3.00",
        },
      },
    ],
    application_context: {
      brand_name: `ZeroTwo.com`,
      landing_page: "NO_PREFERENCE", // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
      user_action: "PAY_NOW", // Accion para que en paypal muestre el monto del pago
      return_url: `http://localhost:3000/profile/plan`, // Url despues de realizar el pago
      cancel_url: `http://localhost:3000/home`, // Url despues de realizar el pago
    },
  };

  const result = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, body, {
    auth: {
      username: CLIENT_ID,
      password: SECRET,
    },
  });

  console.log(result.data);
  res.json({ data: result.data.links[1].href });

  //res.send("Creating order");
};

const chuuninToken = async (req, res) => {
  try {
    const { id, token } = req.body;

    defineCategoryChuunin(id, token);
  } catch (e) {
    throw new Error(e.message);
  }
  res.send("token sended");
};

const executePaymentChuunin = async (req, res, next) => {
  const { token } = req.query;

  // http://localhost:3001/execute-paymentGenin?token=2JG20658CT6958613

  try {
    await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: CLIENT_ID,
          password: SECRET,
        },
      }
    );
    next();
  } catch (error) {
    // console.log(error)
    res.status(404).send("Invalid payment");
  }
};

module.exports = {
  createPaymentChuunin,
  executePaymentChuunin,
  chuuninToken,
};
