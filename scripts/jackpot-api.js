const jackpotBaseURL = "https://api.singularkey.com/v1";
const jackpotCompanyId = "04e094d2-69e6-4604-822f-fb52d702ce0c";
const jackpotPolicyId = "73af114539b732e7a115b2420cda9db5";
const jackpotAPIKey =
  "9e77969aafdabf8b5bb02c580ac1238a864a9d1e5d63715328952152d2e3a75dc0f8d5f7de5aeccb805e5421175e43b0b644ceabde63fd92eaa882054508bf147349404ff52224ef14808863dd2078145056e95d1566aa7cb903d532a31792dc9bb105a59d6dbb70cfa8c40c64b0b2e77f0e19403f88e224a08053e579b89598";

async function fetchJackpotData(callbackHandler) {
  var jackpotTokenUrl =
    jackpotBaseURL + "/company/" + jackpotCompanyId + "/sdkToken";
  var jackpotFlowURL = jackpotBaseURL + "/auth/" + jackpotCompanyId + "/policy/" +  jackpotPolicyId + "/start";

  console.log(`Jackpot Token URL: ${jackpotTokenUrl}`);
  console.log(`Jackpot URL: ${jackpotFlowURL}`);
  console.log(`API Key: ${jackpotAPIKey}`);

  //*** Add the API Key from your DaVinci Application. ***/
  var headers = new Headers();
  headers.append("X-SK-API-KEY", jackpotAPIKey);
  headers.append("Content-type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  //*** Retrieve DaVinci Token ***/
  fetch(jackpotTokenUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      const jackpotAccessToken = responseData.access_token;
      console.log(`jackpotAccessToken: ${jackpotAccessToken}`);

      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + jackpotAccessToken);
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
      //*** Call Jackpot flow to receieve country specific jackpot ***/
      fetch(jackpotFlowURL, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          var jsonData = JSON.parse(result);
          if (jsonData.additionalProperties.httpStatusCode === 200) {
            result = jsonData.additionalProperties;
            callbackHandler(result);
          } else {
            console.log("Error retriving jackpot data!");
          }
        })
        .catch((error) => console.log("error", error));
    })
    .catch((error) => console.log("error", error));
}
