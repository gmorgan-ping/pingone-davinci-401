const companyId = "858682c2-a8eb-4373-925d-55adea99df3c";
const apiKey = "6b98aa4daa76381cd2842a56d6d8a6904d875f6a927d8002652a035c62f2a69b8066c9a6690ca69cc2313a6c10f91c75e17ae831ccb837a66181948677993afec59590a16a48d3df4e38bbc9fe2f91591bee275b3037c68986ae919b71d1310691246417abc08487173bff844301bf3cfe34c5936b072939c604bed4ca4f16f2";

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
