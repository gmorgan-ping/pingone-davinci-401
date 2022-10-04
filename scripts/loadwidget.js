function loadwidget(policyId, renderComponent, flowInputVariables) {
  const tokenURL = "https://orchestrate-api.pingone.com";
  const flowURL = "https://auth.pingone.com/";
  const companyId = "2c38f340-0f6c-4d21-b690-d3b1cc87392c";
  const skApiKey =
    "b5be88f104c53db8918ecaeba2379b2860193cc1cdd97a005452f5031cd91a9531cfde34e4de409f092b1f424110c51c6ce732e8b1bd87f99f407245135d36fae6eb56d513a57825de89e1d32f8bb32ead847f1687deebefe25de6762954bcb5b705607134c16523b66da1d1aef04956e348489f3de0e0d21145b70ed676e213";

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
          parameters: flowInputVariables,
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
