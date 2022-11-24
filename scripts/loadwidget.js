function loadwidget(policyId, renderComponent, flowInputVariables) {
  const tokenURL = "https://orchestrate-api.pingone.com";
  const flowURL = "https://auth.pingone.com/";
  const companyId = "858682c2-a8eb-4373-925d-55adea99df3c";
  const skApiKey =
    "6b98aa4daa76381cd2842a56d6d8a6904d875f6a927d8002652a035c62f2a69b8066c9a6690ca69cc2313a6c10f91c75e17ae831ccb837a66181948677993afec59590a16a48d3df4e38bbc9fe2f91591bee275b3037c68986ae919b71d1310691246417abc08487173bff844301bf3cfe34c5936b072939c604bed4ca4f16f2";

  /*** Build the DaVinci Token URL. ***/
  const skGetTokenUrl = tokenURL + "/v1/company/" + companyId + "/sdktoken";

  //*** Add the API Key from your DaVinci Application. ***/
  var headers = new Headers();
  headers.append("X-SK-API-KEY", skApiKey);

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  /*** Retrieve DaVinci Token ***/
  fetch(skGetTokenUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      var props = {
        config: {
          method: "runFlow",
          apiRoot: flowURL,
          accessToken: responseData.access_token,
          companyId: companyId,
          policyId: policyId,
          parameters: flowInputVariables
        },
        useModal: false,
        successCallback,
        errorCallback,
        onCloseModal,
      };
      /*** Invoke DaVinci Widget ****/
      console.log(props);
      davinci.skRenderScreen(document.getElementById(renderComponent), props);
    })
    .catch((error) => console.log("error", error));

  function successCallback(response) {
    console.log(response);
  }

  function errorCallback(error) {
    console.log(error);
  }

  function onCloseModal() {
    console.log("onCloseModal");
  }
}
