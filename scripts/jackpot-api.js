const companyId = "2c38f340-0f6c-4d21-b690-d3b1cc87392c";
const apiKey = "b5be88f104c53db8918ecaeba2379b2860193cc1cdd97a005452f5031cd91a9531cfde34e4de409f092b1f424110c51c6ce732e8b1bd87f99f407245135d36fae6eb56d513a57825de89e1d32f8bb32ead847f1687deebefe25de6762954bcb5b705607134c16523b66da1d1aef04956e348489f3de0e0d21145b70ed676e213";

async function fetchJackpotData(policyId, callbackHandler) {
  const flowURL = `https://orchestrate-api.pingone.com/v1/company/${companyId}/policy/${policyId}/start`;
  console.log(`Flow URL: ${flowURL}`)
  console.log(`X-SK-API-KEY: ${apiKey}`)

  const myHeaders = new Headers();
  myHeaders.append("X-SK-API-KEY", apiKey);
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
