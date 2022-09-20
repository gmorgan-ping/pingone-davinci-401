function loadwidget(policyId, renderComponent) {
  const tokenURL = "https://orchestrate-api.pingone.com";
  const flowURL = "https://auth.pingone.com/";
  const companyId = "ff4f6c34-2ed5-4210-9ad6-266b4f2412bd";
  const skApiKey =
    "f94829acebaec6f61c33fdf369a25adf6237c7e5f6142a7cbe5ba588ab134a01e30f43402446f1e5c591a90b073dbebe4d230af523cc4b2fc28ec7708a82dab323d4562554c470b4f6cebf0b256f55357ae46f1af27a15f8c9815bec37634644431451a4823c028eadc59390991ffcff7adb84e8f9288fd42ae7237c70e01cb4";

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
          policyId: policyId
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
