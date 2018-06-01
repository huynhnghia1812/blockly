'use strict';

goog.provide('Blockly.Swift.array');

goog.require('Blockly.Swift');

Blockly.Swift['array_create_empty'] = function(block) {
	var type = block.getFieldValue('type');
  var code = type + '()';
  return [code, Blockly.Swift.ORDER_NONE];
};

Blockly.Swift['array_create_repeat'] = function(block) {
	var value = Blockly.Swift.valueToCode(block, 'value', Blockly.Swift.ORDER_ATOMIC) || "0";
  var count = Blockly.Swift.valueToCode(block, 'count', Blockly.Swift.ORDER_ATOMIC) || "0";
  // TODO: Assemble Swift into code variable.
	var code = 'Array(repeating: ' + value + ', count: ' + count + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Swift.ORDER_NONE];
};

Blockly.Swift['array_concatenate'] = function(block) {
	var array1 = Blockly.Swift.valueToCode(block, 'array1', Blockly.Swift.ORDER_ATOMIC) || "[]";
  var array2 = Blockly.Swift.valueToCode(block, 'array2', Blockly.Swift.ORDER_ATOMIC) || "[]";
	// TODO: Assemble Swift into code variable.
  var code = array1 + ' + ' + array2;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Swift.ORDER_NONE];
};

Blockly.Swift['array_get_length'] = function(block) {
  var array = Blockly.Swift.valueToCode(block, 'array', Blockly.Swift.ORDER_ATOMIC) || "[]";
  // TODO: Assemble Swift into code variable.
  var code = array + '.count ';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Swift.ORDER_NONE];
};

Blockly.Swift['array_check_empty'] = function(block) {
  var array = Blockly.Swift.valueToCode(block, 'array', Blockly.Swift.ORDER_ATOMIC) || "[]";
  // TODO: Assemble Swift into code variable.
  var code = array + '.isEmpty()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Swift.ORDER_NONE];
};