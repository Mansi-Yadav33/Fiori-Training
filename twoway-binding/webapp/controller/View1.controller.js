
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("twowaybinding.controller.View1", {
            onInit: function () {
                var oNewModel = new JSONModel();
                MessageToast.show("Default Binding Mode is: " + oNewModel.getDefaultBindingMode());
                this.getView().setModel(oNewModel, "oNewModel");
                oNewModel.setProperty("/FirstName", "Fiori Training");
            },

            onButtonPress: function (oEvent) {
                var oNewModel = this.getView().getModel("oNewModel");
                oNewModel.setProperty("/FirstName", "Two way binding");
            }
           
        });
    });