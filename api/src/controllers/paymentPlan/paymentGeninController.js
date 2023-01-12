const { defineCategoryGenin } = require("../../services/userServices");
const axios = require("axios");

const CLIENT_ID =
  "AUqGcl4VaguN5OrNNkWIeKtQmRTouEl_sV-HlxUZ0eZyDf5J3N8X2XW7r4v5PLySdX9U6Q-3SLZRvRXu";
const SECRET =
  "EC0cX-9AWCvFbBqLhE2wX_DY8-sMPFrtTjEhvclO3RBWBnGrE89PajplcktQsrZmWkQnV4EQ7l-jZOak";
const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // Live https://api-m.paypal.com

const auth = { user: CLIENT_ID, pass: SECRET };

const createPaymentGenin = async (req, res) => {
  const { id } = req.body;

  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD", //https://developer.paypal.com/docs/api/reference/currency-codes/
          value: "1.50",
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

const geninToken = async (req, res) => {
  try {
    const { id, token } = req.body;

    defineCategoryGenin(id, token);
  } catch (e) {
    throw new Error(e.message);
    // console.log(e.message);
  }
  res.send("token sended");
};

const executePaymentGenin = async (req, res, next) => {
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
  createPaymentGenin,
  executePaymentGenin,
  geninToken,
};
