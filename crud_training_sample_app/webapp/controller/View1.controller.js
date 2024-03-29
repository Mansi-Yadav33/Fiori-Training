sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Fragment) {
        "use strict";

        return Controller.extend("crudtrainingsampleapp.controller.View1", {
            onInit: function () {

                // Calling the method to read all products from the northwind service
                this.onReadAll();

            },

            onReadAll: function () {
                sap.ui.core.BusyIndicator.show();
                var that = this;
                var oModel = this.getOwnerComponent().getModel();

                //Way to read all products from the OData service
                oModel.read("/Products",
                    {
                        success: function (oData) {
                            console.log(oData);

                            // Creating a JSON model with the obtained data after reading
                            var jsonModel = new JSONModel(oData);

                            // Setting the JSON model to the table to display it over UI.
                            that.getView().byId("_IDProductsTable1").setModel(jsonModel);
                            sap.ui.core.BusyIndicator.hide();
                            MessageBox.success("Reading Data - Success");
                        }, error: function (oError) {
                            console.log(oError);
                            sap.ui.core.BusyIndicator.hide();
                            MessageBox.success("Reading Data - Error");
                        }
                    })

            },

            onAddProductPress: function (oEvent) {
                sap.ui.core.BusyIndicator.show();
                var that = this;
                var oDataModel = this.getOwnerComponent().getModel();
                var oRecord = {
                    "ID": 13,
                    "Name": "Chai",
                    "Description": "Chai",
                    "ReleaseDate": new Date(),
                    "Rating": '4',
                    "Price": '2.5',
                }
                oDataModel.setUseBatch(false);
                oDataModel.create("/Products", oRecord, {
                    success: function (oResult) {
                        that.updateModelAfterCRUD(oRecord, "add");
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.success("Data successfully created");


                    }.bind(this),
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.error("Error while creating the data");
                    }.bind(this)
                });
            },


            onEditProductPress: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext().getObject();



                if (!this.oDialog) {
                    this.loadFragment({
                        name: "crudtrainingsampleapp.view.update",
                    }).then(function (oDialog) {
                        this.oDialog = oDialog;
                        this.oDialog.open();
                        // Set data directly to input fields
                        this.byId("IdInput").setValue(oContext.ID);
                        this.byId("NameInput").setValue(oContext.Name);
                        this.byId("DescriptionInput").setValue(oContext.Description);
                        this.byId("ReleaseDateInput").setValue(oContext.ReleaseDate);
                        this.byId("RatingInput").setValue(oContext.Rating);
                        this.byId("PriceInput").setValue(oContext.Price);
                    }.bind(this)).catch(function (oError) {
                        console.error("Error loading fragment:", oError);
                    });
                } else {
                    this.oDialog.open();
                    this.byId("IdInput").setValue(oContext.ID);
                    this.byId("NameInput").setValue(oContext.Name);
                    this.byId("DescriptionInput").setValue(oContext.Description);
                    this.byId("ReleaseDateInput").setValue(oContext.ReleaseDate);
                    this.byId("RatingInput").setValue(oContext.Rating);
                    this.byId("PriceInput").setValue(oContext.Price);
                }
            },


            onPressSaveProduct: function () {
                sap.ui.core.BusyIndicator.show();
                var that = this;
                var oDataModel = this.getOwnerComponent().getModel();
                var oRecord = {
                    "ID": this.byId("IdInput").getValue(),
                    "Name": this.byId("NameInput").getValue(),
                    "Description": this.byId("DescriptionInput").getValue(),
                    "ReleaseDate": new Date(this.byId("ReleaseDateInput").getValue()), // Format ReleaseDate as Date object
                    "Rating": this.byId("RatingInput").getValue(),
                    "Price": this.byId("PriceInput").getValue(),
                };

                oDataModel.setUseBatch(false);
                oDataModel.update("/Products(" + oRecord.ID + ")", oRecord, {
                    success: function (oResult) {
                        sap.ui.core.BusyIndicator.hide();
                        that.oDialog.close();
                        that.updateModelAfterCRUD(oRecord, "update");
                        MessageBox.success("Successfully Updated");
                    },
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        console.log("update failed");
                        MessageBox.error("Error while updating the data");
                        that.oDialog.close();
                    }
                });
            },




            onPressCancel: function (oEvent) {
                this.oDialog.close();
            },

            onDeleteProductPress: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext().getObject()
                MessageBox.confirm("Are you sure you want to delete this record?", {
                    title: "Confirm",
                    onClose: function (sAction) {

                        if (sAction === 'OK') {
                            this.onDeleteRecord(oContext);
                        }

                    }.bind(this),
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL], emphasizedAction: sap.m.MessageBox.Action.OK
                });

            },

            onDeleteRecord: function (oRecord) {
                sap.ui.core.BusyIndicator.show();
                var that = this;
                var oDataModel = this.getOwnerComponent().getModel();
                oDataModel.setUseBatch(false);
                oDataModel.remove("/Products(" + oRecord.ID + ")", {
                    success: function (oResult) {
                        sap.ui.core.BusyIndicator.hide();
                        that.updateModelAfterCRUD(oRecord, "delete");
                        MessageBox.success("Deleted data");
                    }.bind(this),
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.error("Deletion failed: " + oError.responseText);
                    }.bind(this)
                });
            },

              // Function to update model after CRUD operation
        updateModelAfterCRUD: function (oRecord, action) {
            var oTable = this.getView().byId("_IDProductsTable1");
            var oModel = oTable.getModel();
            var aData = oModel.getProperty("/results");
            switch (action) {
                case "add":
                    aData.push(oRecord);
                    break;
                case "update":
                    for (var i = 0; i < aData.length; i++) {
                        if (aData[i].ID.toString() === oRecord.ID) {
                            aData[i] = oRecord;
                            break;
                        }
                    }
                    break;
                case "delete":
                    for (var i = 0; i < aData.length; i++) {
                        if (aData[i].ID === oRecord.ID) {
                            aData.splice(i, 1);
                            break;
                        }
                    }
                    break;
            }
            oModel.setProperty("/results", aData);
        }



        });
    });
