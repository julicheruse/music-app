const axios = require("axios");
const qs = require("qs");

const getAuth = async () => {
  const clientId = "3efbd747662a4b2fbaf70456f529eb09";
  const clientSecret = "67c16de5b0b54807a2427c2860851909";

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };
  const data = {
    grant_type: "client_credentials",
  };

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(data),
      headers
    );
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAuth;
