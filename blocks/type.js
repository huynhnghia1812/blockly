'use strict';

goog.provide('Blockly.Blocks.type');
goog.provide('Blockly.Constants.Type');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Constants.Type.HUE = 20;
Blockly.Blocks.type.HUE = Blockly.Constants.Type.HUE;

Blockly.Blocks['type_int'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Int");
    this.setOutput(true, "Type");
    this.setColour(Blockly.Blocks.type.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['type_double'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Double");
    this.setOutput(true, "Type");
    this.setColour(Blockly.Blocks.type.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['type_bool'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Bool");
    this.setOutput(true, "Type");
    this.setColour(Blockly.Blocks.type.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['type_string'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("String");
    this.setOutput(true, "Type");
    this.setColour(Blockly.Blocks.type.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};