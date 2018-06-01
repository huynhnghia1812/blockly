'use strict';

goog.provide('Blockly.Swift.button');

goog.require('Blockly.Swift');

Blockly.Swift['button_touch_up_inside'] = function(block) {
	var btnName = block.getFieldValue('btn_name');
  	var statements = Blockly.Swift.statementToCode(block, 'NAME');
  	var functionName = btnName +'_touch_up_inside';
  	var code = '@IBAction func '+ functionName +'(_ sender: AnyObject){\n'+ statements +'}\n';
  	addActionToComponents(btnName, functionName, "touchUpInside");
  	return code;
};

Blockly.Swift['button_set_text'] = function(block) {
  var btnName = block.getFieldValue('btn_name');
  var value = Blockly.Swift.valueToCode(block, 'value', Blockly.Swift.ORDER_ATOMIC) || "''";
  var code = btnName + '.text = ' + value + '\n';
  return code;
};

Blockly.Swift['button_get_text'] = function(block) {
  var btnName = block.getFieldValue('btn_name');
  var code = btnName + '.text';
  return [code, Blockly.Swift.ORDER_ATOMIC];
};