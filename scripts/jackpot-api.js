const companyId = "ff4f6c34-2ed5-4210-9ad6-266b4f2412bd";
const apiKey = "f94829acebaec6f61c33fdf369a25adf6237c7e5f6142a7cbe5ba588ab134a01e30f43402446f1e5c591a90b073dbebe4d230af523cc4b2fc28ec7708a82dab323d4562554c470b4f6cebf0b256f55357ae46f1af27a15f8c9815bec37634644431451a4823c028eadc59390991ffcff7adb84e8f9288fd42ae7237c70e01cb4";

async function fetchJackpotData(policyId, callbackHandler) {
  const flowURL = `https://orchestrate-api.pingone.com/v1/company/${companyId}/policy/${policyId}/start`;
  console.log(flowURL)
  console.log(apiKey)

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
      if (jsonData.additionalProperties.httpStatusCode === 200) {
        result = jsonData.additionalProperties;
        callbackHandler(result);
      } else {
        console.log("Error retriving jackpot data!");
      }
    })
    .catch((error) => console.log("error", error));
}
