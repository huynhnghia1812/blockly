'use strict';

goog.provide('Blockly.Blocks.label');  // Deprecated
goog.provide('Blockly.Constants.Label');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Constants.Label.Colour = 160;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.Blocks['label_set_text'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("String")
        .appendField("label")
        .appendField(new Blockly.FieldDropdown(getComponentNameList("label")), "lbl_name")
        .appendField("set text to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Constants.Label.Colour);
  }
};

Blockly.Blocks['label_get_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("label")
        .appendField(new Blockly.FieldDropdown(getComponentNameList("label")), "lbl_name")
        .appendField("get text");
    this.setOutput(true, "String");
    this.setColour(Blockly.Constants.Label.Colour);
  }
};

Blockly.Blocks['label_get_property'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("label")
        .appendField(new Blockly.FieldDropdown(getComponentNameList("label")), "name")
        .appendField("get")
        .appendField(new Blockly.FieldDropdown(getPropertyList("label")), "property");
    this.setOutput(true, null);//["String", "Number"]);
    this.setColour(Blockly.Constants.Label.Colour);
  }
};