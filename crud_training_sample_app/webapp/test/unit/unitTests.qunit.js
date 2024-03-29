/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"crud_training_sample_app/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
