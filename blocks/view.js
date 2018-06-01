'use strict';

goog.provide('Blockly.Blocks.view');  // Deprecated
goog.provide('Blockly.Constants.View');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Constants.View.Colour = 160;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.Blocks['view_load'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("when loading view");
        //.appendField(new Blockly.FieldDropdown(getComponentNameList("button")), "btn_name");
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField("do");
    this.setInputsInline(false);
    this.setColour(Blockly.Constants.View.Colour);
  }
};