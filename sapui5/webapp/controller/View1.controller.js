sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast" 
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("sapui5.controller.View1", {
            onInit: function () {

            },
            onButtonClick: function () {
                MessageToast.show("Hello you have created your first Fiori project.",{
                    at: "center"
                });
            }
        });
    });
