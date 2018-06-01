'use strict';

goog.provide('Blockly.Blocks.textField');  // Deprecated
goog.provide('Blockly.Constants.textField');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Constants.textField.Colour = 160;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.Blocks['textField_set_text'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("String")
        .appendField("textField")
        .appendField(new Blockly.FieldDropdown(getComponentNameList("textField")), "txt_name")
        .appendField("set text to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Constants.textField.Colour);
  }
};

Blockly.Blocks['textField_get_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("textField")
        .appendField(new Blockly.FieldDropdown(getComponentNameList("textField")), "txt_name")
        .appendField("get text");
    this.setOutput(true, "String");
    this.setColour(Blockly.Constants.textField.Colour);
  }
};

