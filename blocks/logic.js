'use strict';

goog.provide('Blockly.Blocks.logic');
goog.provide('Blockly.Constants.Logic');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Constants.Logic.Colour = 260;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for boolean data type: true and false.
  {
    "type": "logic_boolean",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "BOOL",
        "options": [
          ["true", "TRUE"],
          ["false", "FALSE"]
        ]
      }
    ],
    "output": "Bool",
    "colour": Blockly.Constants.Logic.Colour
  },
  // Block for if/elseif/else condition.
  {
    "type": "logic_if",
    "message0": "if %1 do %2",
    "args0": [
      {
        "type": "input_value",
        "name": "IF0",
        "check": "Bool"
      },
      {
        "type": "input_statement",
        "name": "DO0"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Constants.Logic.Colour,
    "mutator": "controls_if_mutator",
    "extensions": ["controls_if_tooltip"]
  },
  // Block for comparison operator.
  {
    "type": "logic_compare",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["=", "EQ"],
          ["\u2260", "NEQ"],
          ["<", "LT"],
          ["\u2264", "LTE"],
          [">", "GT"],
          ["\u2265", "GTE"]
        ]
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "inputsInline": true,
    "output": "Bool",
    "colour": Blockly.Constants.Logic.Colour,
    "extensions": ["logic_compare", "logic_op_tooltip"]
  },
  // Block for logical operations: 'and', 'or'.
  {
    "type": "logic_operation",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Bool"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["and", "AND"],
          ["or", "OR"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Bool"
      }
    ],
    "inputsInline": true,
    "output": "Bool",
    "colour": Blockly.Constants.Logic.Colour,
    "extensions": ["logic_op_tooltip"]
  },
  // Block for negation.
  {
    "type": "logic_negate",
    "message0": "not %1",
    "args0": [
      {
        "type": "input_value",
        "name": "BOOL",
        "check": "Bool"
      }
    ],
    "output": "Bool",
    "colour": Blockly.Constants.Logic.Colour
  }
]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.defineBlocksWithJsonArray([ // Mutator blocks. Do not extract.
  // Block representing the if statement in the controls_if mutator.
  {
    "type": "controls_if_if",
    "message0": "if",
    "nextStatement": null,
    "enableContextMenu": false,
    "colour": Blockly.Constants.Logic.Colour
  },
  // Block representing the else-if statement in the controls_if mutator.
  {
    "type": "controls_if_elseif",
    "message0": "else if",
    "previousStatement": null,
    "nextStatement": null,
    "enableContextMenu": false,
    "colour": Blockly.Constants.Logic.Colour
  },
  // Block representing the else statement in the controls_if mutator.
  {
    "type": "controls_if_else",
    "message0": "else",
    "previousStatement": null,
    "enableContextMenu": false,
    "colour": Blockly.Constants.Logic.Colour
  }
]);

/**
 * Tooltip text, keyed by block OP value. Used by logic_compare and
 * logic_operation blocks.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.Logic.TOOLTIPS_BY_OP = {
  // logic_compare
  'EQ': '%{BKY_LOGIC_COMPARE_TOOLTIP_EQ}',
  'NEQ': '%{BKY_LOGIC_COMPARE_TOOLTIP_NEQ}',
  'LT': '%{BKY_LOGIC_COMPARE_TOOLTIP_LT}',
  'LTE': '%{BKY_LOGIC_COMPARE_TOOLTIP_LTE}',
  'GT': '%{BKY_LOGIC_COMPARE_TOOLTIP_GT}',
  'GTE': '%{BKY_LOGIC_COMPARE_TOOLTIP_GTE}',

  // logic_operation
  'AND': '%{BKY_LOGIC_OPERATION_TOOLTIP_AND}',
  'OR': '%{BKY_LOGIC_OPERATION_TOOLTIP_OR}'
};

Blockly.Extensions.register('logic_op_tooltip',
    Blockly.Extensions.buildTooltipForDropdown(
        'OP', Blockly.Constants.Logic.TOOLTIPS_BY_OP));

/**
 * Mutator methods added to controls_if blocks.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN = {
  elseifCount_: 0,
  elseCount_: 0,

  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('controls_if_if');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.elseifCount_; i++) {
      var elseifBlock = workspace.newBlock('controls_if_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = workspace.newBlock('controls_if_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    var valueConnections = [null];
    var statementConnections = [null];
    var elseStatementConnection = null;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          this.elseifCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          statementConnections.push(clauseBlock.statementConnection_);
          break;
        case 'controls_if_else':
          this.elseCount_++;
          elseStatementConnection = clauseBlock.statementConnection_;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          var inputIf = this.getInput('IF' + i);
          var inputDo = this.getInput('DO' + i);
          clauseBlock.valueConnection_ =
              inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        case 'controls_if_else':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this Blockly.Block
   * @private
   */
  updateShape_: function() {
    // Delete everything.
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
    }
    var i = 1;
    while (this.getInput('IF' + i)) {
      this.removeInput('IF' + i);
      this.removeInput('DO' + i);
      i++;
    }
    // Rebuild block.
    for (var i = 1; i <= this.elseifCount_; i++) {
      this.appendValueInput('IF' + i)
          .setCheck('Bool')
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
      this.appendStatementInput('DO' + i)
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE')
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    }
  }
};

Blockly.Extensions.registerMutator('controls_if_mutator',
    Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN, null,
    ['controls_if_elseif', 'controls_if_else']);

/**
 * "controls_if" extension function. Adds mutator, shape updating methods, and
 * dynamic tooltip to "controls_if" blocks.
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION = function() {

  this.setTooltip(function() {
    if (!this.elseifCount_ && !this.elseCount_) {
      return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
    } else if (!this.elseifCount_ && this.elseCount_) {
      return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
    } else if (this.elseifCount_ && !this.elseCount_) {
      return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
    } else if (this.elseifCount_ && this.elseCount_) {
      return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
    }
    return '';
  }.bind(this));
};

Blockly.Extensions.register('controls_if_tooltip',
    Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION);

/**
 * Corrects the logic_compare dropdown label with respect to language direction.
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.Logic.fixLogicCompareRtlOpLabels =
  function() {
    var rtlOpLabels = {
      'LT': '\u200F<\u200F',
      'LTE': '\u200F\u2264\u200F',
      'GT': '\u200F>\u200F',
      'GTE': '\u200F\u2265\u200F'
    };
    var opDropdown = this.getField('OP');
    if (opDropdown) {
      var options = opDropdown.getOptions();
      for (var i = 0; i < options.length; ++i) {
        var tuple = options[i];
        var op = tuple[1];
        var rtlLabel = rtlOpLabels[op];
        if (goog.isString(tuple[0]) && rtlLabel) {
          // Replace LTR text label
          tuple[0] = rtlLabel;
        }
      }
    }
  };

/**
 * Adds dynamic type validation for the left and right sides of a logic_compare block.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Logic.LOGIC_COMPARE_ONCHANGE_MIXIN = {
  prevBlocks_: [null, null],

  /**
   * Called whenever anything on the workspace changes.
   * Prevent mismatched types from being compared.
   * @param {!Blockly.Events.Abstract} e Change event.
   * @this Blockly.Block
   */
  onchange: function(e) {
    var blockA = this.getInputTargetBlock('A');
    var blockB = this.getInputTargetBlock('B');
    // Disconnect blocks that existed prior to this change if they don't match.
    if (blockA && blockB &&
        !blockA.outputConnection.checkType_(blockB.outputConnection)) {
      // Mismatch between two inputs.  Disconnect previous and bump it away.
      // Ensure that any disconnections are grouped with the causing event.
      Blockly.Events.setGroup(e.group);
      for (var i = 0; i < this.prevBlocks_.length; i++) {
        var block = this.prevBlocks_[i];
        if (block === blockA || block === blockB) {
          block.unplug();
          block.bumpNeighbours_();
        }
      }
      Blockly.Events.setGroup(false);
    }
    this.prevBlocks_[0] = blockA;
    this.prevBlocks_[1] = blockB;
  }
};

/**
 * "logic_compare" extension function. Corrects direction of operators in the
 * dropdown labels, and adds type left and right side type checking to
 * "logic_compare" blocks.
 * @this Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Logic.LOGIC_COMPARE_EXTENSION = function() {
  // Add onchange handler to ensure types are compatible.
  this.mixin(Blockly.Constants.Logic.LOGIC_COMPARE_ONCHANGE_MIXIN);
};

Blockly.Extensions.register('logic_compare',
    Blockly.Constants.Logic.LOGIC_COMPARE_EXTENSION);






//-----------------------------------------------logic switch------------------------------------
Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for if/elseif/else condition.
  {
    "type": "logic_switch",
    "message0": "switch %1",
    "args0": [
      {
        "type": "input_value",
        "name": "switch"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "260",
    "mutator": "logic_switch_mutator",
  }
]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.defineBlocksWithJsonArray([ // Mutator blocks for logic_switch. Do not extract.
  // Block representing the switch statement in the logic_switch mutator.
  {
    "type": "logic_switch_switch",
    "message0": "switch",
    "nextStatement": null,
    "enableContextMenu": false,
    "colour": "260",
  },
  // Block representing the case option in the logic_switch mutator.
  {
    "type": "logic_switch_case",
    "message0": "case",
    "previousStatement": null,
    "nextStatement": null,
    "enableContextMenu": false,
    "colour": "260",
  },
  // Block representing the default option in the logic_switch mutator.
  {
    "type": "logic_switch_default",
    "message0": "default",
    "previousStatement": null,
    "enableContextMenu": false,
    "colour": "260",
  }
]);

Blockly.Constants.Logic.LOGIC_SWITCH_MUTATOR_MIXIN = {
  caseCount_: 0,
  defaultCount_: 0,

  mutationToDom: function() {
    if (!this.caseCount_ && !this.defaultCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.caseCount_) {
      container.setAttribute('case_count', this.caseCount_);
    }
    if (this.defaultCount_) {
      container.setAttribute('default_count', 1);
    }
    return container;
  },
  
  domToMutation: function(xmlElement) {
    this.caseCount_ = parseInt(xmlElement.getAttribute('case_count'), 10) || 0;
    this.defaultCount_ = parseInt(xmlElement.getAttribute('default_count'), 10) || 0;
    this.updateShape_();
  },
  
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('logic_switch_switch');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.caseCount_; i++) {
      var caseBlock = workspace.newBlock('logic_switch_case');
      caseBlock.initSvg();
      connection.connect(caseBlock.previousConnection);
      connection = caseBlock.nextConnection;
    }
    if (this.defaultCount_) {
      var defaultBlock = workspace.newBlock('logic_switch_default');
      defaultBlock.initSvg();
      connection.connect(defaultBlock.previousConnection);
    }
    return containerBlock;
  },
  
  compose: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.caseCount_ = 0;
    this.defaultCount_ = 0;
    var valueConnections = [null];
    var statementConnections = [null];
    var defaultStatementConnection = null;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'logic_switch_case':
          this.caseCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          statementConnections.push(clauseBlock.statementConnection_);
          break;
        case 'logic_switch_default':
          this.defaultCount_++;
          defaultStatementConnection = clauseBlock.statementConnection_;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 1; i <= this.caseCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'case' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'do' + i);
    }
    Blockly.Mutator.reconnect(defaultStatementConnection, this, 'default');
  },
  
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'logic_switch_case':
          var inputCase = this.getInput('case' + i);
          var inputDo = this.getInput('do' + i);
          clauseBlock.valueConnection_ =
              inputCase && inputCase.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        case 'logic_switch_default':
          var inputDo = this.getInput('default');
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  
  updateShape_: function() {
    // Delete everything.
    if (this.getInput('default')) {
      this.removeInput('default');
    }
    var i = 1;
    while (this.getInput('case' + i)) {
      this.removeInput('case' + i);
      this.removeInput('do' + i);
      i++;
    }
    // Rebuild block.
    for (var i = 1; i <= this.caseCount_; i++) {
      this.appendValueInput('case' + i)
          //.setCheck('Bool')
          .setAlign(Blockly.ALIGN_RIGHT).appendField('case');
      this.appendStatementInput('do' + i)
          .setAlign(Blockly.ALIGN_RIGHT).appendField('do');
    }
    if (this.defaultCount_) {
      this.appendStatementInput('default')
          .setAlign(Blockly.ALIGN_RIGHT).appendField('default');
    }
  }
};

Blockly.Extensions.registerMutator('logic_switch_mutator',
  Blockly.Constants.Logic.LOGIC_SWITCH_MUTATOR_MIXIN, null, 
    ['logic_switch_case', 'logic_switch_default']);
//-----------------------------------------------------------------------------------------------

//-----------------------------------------------logic switch fallthrough------------------------
Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for if/elseif/else condition.
  {
    "type": "logic_switch_fallthrough",
    "message0": "continue checking next expression",
    "previousStatement": null,
    "colour": "260",
    "extensions": "logic_switch_fallthrough_in_switch_check"
  }
]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.Constants.Logic.LOGIC_SWITCH_FALLTHROUGH_IN_SWITCH_CHECK_MIXIN = {
  /**
   * List of block types that are loops and thus do not need warnings.
   * To add a new loop type add this to your code:
   * Blockly.Blocks['controls_flow_statements'].LOOP_TYPES.push('custom_loop');
   */
  SWITCH_TYPES: ['logic_switch'],

  /**
   * Called whenever anything on the workspace changes.
   * Add warning if this flow block is not nested inside a loop.
   * @param {!Blockly.Events.Abstract} e Change event.
   * @this Blockly.Block
   */
  onchange: function(/* e */) {
    if (!this.workspace.isDragging || this.workspace.isDragging()) {
      return;  // Don't change state at the start of a drag.
    }
    var legal = false;
    // Is the block nested in a loop?
    var block = this;
    do {
      if (this.SWITCH_TYPES.indexOf(block.type) != -1) {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
      if (!this.isInFlyout) {
        this.setDisabled(false);
      }
    } else {
      this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
      if (!this.isInFlyout && !this.getInheritedDisabled()) {
        this.setDisabled(true);
      }
    }
  }
};

Blockly.Extensions.registerMixin('logic_switch_fallthrough_in_switch_check',
  Blockly.Constants.Logic.LOGIC_SWITCH_FALLTHROUGH_IN_SWITCH_CHECK_MIXIN);
//-----------------------------------------------------------------------------------------------