sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("fragments.controller.View1", {
            onInit: function () {

            },

            onOpenDialog() {
        

                var oView = this.getView();

                if (!this.byId("fragmentDialog")) {
                    Fragment.load(
                        {   
                            id: oView.getId(),
                            name: "fragments.view.Myfragment",
                            controller: this

                        }).then(function (oDialog) {
                            // oView.addDependent(oDialog);
                            oDialog.open();
                        }.bind(this));
                }
                else {
                    this.byId("fragmentDialog").open();
                }
            },
            onCloseDialog() {
                this.byId("fragmentDialog").close();
            }
        });
    });
