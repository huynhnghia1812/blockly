'use strict';

goog.provide('Blockly.Swift.view');

goog.require('Blockly.Swift');

Blockly.Swift['view_load'] = function(block) {
  //var btnName = block.getFieldValue('btn_name');
  var statements = Blockly.Swift.statementToCode(block, 'NAME');
  //var functionName = btnName +'_touch_up_inside';
  var code = 'override func viewDidLoad(){\n  super.viewDidLoad()\n' 
          + statements + '}\n';
  //addActionToComponents(btnName, functionName, "touchUpInside");
  return code;
};