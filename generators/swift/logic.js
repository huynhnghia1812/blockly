'use strict';

goog.provide('Blockly.Swift.logic');

goog.require('Blockly.Swift');

Blockly.Swift['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Swift.ORDER_ATOMIC];
};

Blockly.Swift['logic_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Swift.valueToCode(block, 'IF' + n,
      Blockly.Swift.ORDER_NONE) || 'false';
    branchCode = Blockly.Swift.statementToCode(block, 'DO' + n);
    code += (n > 0 ? ' else ' : '') +
        'if (' + conditionCode + ') {\n' + branchCode + '}';

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Swift.statementToCode(block, 'ELSE');
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

Blockly.Swift['logic_switch'] = function(block) {
  
  var code = '', branchCode, checkedValue, value;
  checkedValue = Blockly.Swift.valueToCode(block, 'switch', Blockly.Swift.ORDER_NONE) || '0';
  code += 'switch (' + checkedValue + ') {\n';

  var n = 1;
  while (block.getInput('case' + n)) {
    value = Blockly.Swift.valueToCode(block, 'case' + n, Blockly.Swift.ORDER_NONE) || '0';
    branchCode = Blockly.Swift.statementToCode(block, 'do' + n);

    code += 'case ' + value + ': \n' + branchCode;
    ++n;
  };

  if (block.getInput('default')) {
    branchCode = Blockly.Swift.statementToCode(block, 'default');
    code += 'default: \n' + branchCode;
  }
  return code + '}\n';
};

Blockly.Swift['logic_switch_fallthrough'] = function(block){
  return 'fallthrough\n';
}

Blockly.Swift['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Swift.ORDER_EQUALITY : Blockly.Swift.ORDER_RELATIONAL;
  var argument0 = Blockly.Swift.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Swift.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Swift['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Swift.ORDER_LOGICAL_AND :
      Blockly.Swift.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Swift.valueToCode(block, 'A', order);
  var argument1 = Blockly.Swift.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Swift['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.Swift.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.Swift.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '!' + argument0;
  return [code, order];
};