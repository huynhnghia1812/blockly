'use strict';

goog.provide('Blockly.Swift.variables');

goog.require('Blockly.Swift');

// Swift is dynamically typed.
Blockly.Swift['variables_get_dynamic'] = function(block) {
  // Variable getter.
  var code = Blockly.Swift.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Swift.ORDER_ATOMIC];
};
    
Blockly.Swift['variables_set_dynamic'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Swift.valueToCode(block, 'VALUE',
      Blockly.Swift.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Swift.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};
