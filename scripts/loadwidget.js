function loadwidget(policyId, renderComponent, flowInputVariables) {

  /*** Build the DaVinci Token URL. ***/
  const skGetTokenUrl = DAVINCI_TOKEN_URL + "/v1/company/" + DAVINCI_COMPANY_ID + "/sdktoken";

  //*** Add the API Key from your DaVinci Application. ***/
  var headers = new Headers();
  headers.append("X-SK-API-KEY", DAVINCI_POLICY_API_KEY);

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
          apiRoot: DAVINCI_FLOW_URL,
          accessToken: responseData.access_token,
          companyId: DAVINCI_COMPANY_ID,
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
