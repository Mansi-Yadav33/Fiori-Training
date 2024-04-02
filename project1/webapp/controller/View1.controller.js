sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                var oModel= new sap.ui.model.odata.ODataModel("https://services.odata.org/V2/OData/OData.svc");

                this.getView().setModel(oModel);
            }
        });
    });
