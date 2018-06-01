'use strict';

goog.provide('Blockly.Swift.textField');

goog.require('Blockly.Swift');

Blockly.Swift['textField_set_text'] = function(block) {
  var txtName = block.getFieldValue('txt_name');
  var value = Blockly.Swift.valueToCode(block, 'value', Blockly.Swift.ORDER_ATOMIC) || "''";
  var code = txtName + '.text = ' + value + '\n';
  return code;
};

Blockly.Swift['textField_get_text'] = function(block) {
  var txtName = block.getFieldValue('txt_name');
  var code = txtName + '.text';
  return [code, Blockly.Swift.ORDER_ATOMIC];
};