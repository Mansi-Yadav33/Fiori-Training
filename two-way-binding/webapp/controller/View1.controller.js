sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("twowaybinding.controller.View1", {
            onInit: function () {

                var oNewModel = new JSONModel();
                this.getView().setModel(oNewModel, "oNewModel");
                oNewModel.setProperty("/FirstName", "Fiori Training");


            },
            onButtonPress: function (oEvent) {
                var oNewModel = this.getView().getModel("oNewModel");
                oNewModel.setProperty("/FirstName", "Two way binding");
            },
            onChange: function (oEvent) {
                var name = oEvent.getParameter("/FirstName");
                this.getView().getModel("oNewModel").setProperty("/FirstName", name);
                
            }
        });
    });

