'use strict';

goog.provide('Blockly.Blocks.button');  // Deprecated
goog.provide('Blockly.Constants.Button');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Constants.Button.Colour = 160;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.Blocks['button_set_text'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("String")
        .appendField("label")
        .appendField(new Blockly.FieldDropdown(getComponentNameList("button")), "btn_name")
        .appendField("set text to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Constants.Button.Colour);
  }
};

Blockly.Blocks['button_get_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("label")
        .appendField(new Blockly.FieldDropdown(getComponentNameList("button")), "btn_name")
        .appendField("get text");
    this.setOutput(true, "String");
    this.setColour(Blockly.Constants.Button.Colour);
  }
};

Blockly.Blocks['button_touch_up_inside'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("when clicking button")
        .appendField(new Blockly.FieldDropdown(getComponentNameList("button")), "btn_name");
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField("do");
    this.setInputsInline(false);
    this.setColour(Blockly.Constants.Button.Colour);
  }
};