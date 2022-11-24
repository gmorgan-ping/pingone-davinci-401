
async function fetchJackpotData(policyId, callbackHandler) {
  const flowURL = `${DAVINCI_TOKEN_URL}/v1/company/${DAVINCI_COMPANY_ID}/policy/${policyId}/start`;
  console.log(`Flow URL: ${flowURL}`)

  const myHeaders = new Headers();
  myHeaders.append("X-SK-API-KEY", DAVINCI_POLICY_API_KEY);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };
  //*** Call Jackpot flow to receieve country specific jackpot ***/
  fetch(flowURL, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      var jsonData = JSON.parse(result);
      if (jsonData.additionalProperties && jsonData.additionalProperties.httpStatusCode === 200) {
        result = jsonData.additionalProperties;
        callbackHandler(result);
      } else {
        console.log("Error retriving jackpot data!");
      }
    })
    .catch((error) => console.log("error", error));
}
