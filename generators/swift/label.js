'use strict';

goog.provide('Blockly.Swift.label');

goog.require('Blockly.Swift');

Blockly.Swift['label_set_text'] = function(block) {
  var lblName = block.getFieldValue('lbl_name');
  var value = Blockly.Swift.valueToCode(block, 'value', Blockly.Swift.ORDER_ATOMIC) || "''";
  var code = lblName + '.text = ' + value + '\n';
  return code;
};

Blockly.Swift['label_get_text'] = function(block) {
  var lblName = block.getFieldValue('lbl_name');
  var code = lblName + '.text';
  return [code, Blockly.Swift.ORDER_ATOMIC];
};