'use strict'; 

goog.provide('Blockly.Constants.Variables');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Constants.Variables.Colour = 65;

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
  // Block for variable getter.
  {
    "type": "variables_get_dynamic",
    "message0": "%1",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
    }],
    "output": null,
    "colour": Blockly.Constants.Variables.Colour,
    "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
    "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
    "extensions": ["contextMenu_variableDynamicSetterGetter"]
  },
  // Block for variable setter.
  {
    "type": "variables_set_dynamic",
    "message0": "%{BKY_VARIABLES_SET}",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
    },
    {
      "type": "input_value",
      "name": "VALUE"
    }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": Blockly.Constants.Variables.Colour,
    "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
    "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
    "extensions": ["contextMenu_variableDynamicSetterGetter"]
  }
]); // END JSON EXTRACT (Do not delete this comment.)

/**
 * Mixin to add context menu items to create getter/setter blocks for this
 * setter/getter.
 * Used by blocks 'variables_set_dynamic' and 'variables_get_dynamic'.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    // Getter blocks have the option to create a setter block, and vice versa.
    if (this.isInFlyout) {
      return;
    }
    var opposite_type;
    var contextMenuMsg;
    if (this.type == 'variables_get_dynamic') {
      opposite_type = 'variables_set_dynamic';
      contextMenuMsg = Blockly.Msg.VARIABLES_GET_CREATE_SET;
    } else {
      opposite_type = 'variables_get_dynamic';
      contextMenuMsg = Blockly.Msg.VARIABLES_SET_CREATE_GET;
    }

    var option = { enabled: this.workspace.remainingCapacity() > 0 };
    var name = this.getFieldValue('VAR');
    option.text = contextMenuMsg.replace('%1', name);
    var xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'VAR');
    var variableModel = this.workspace.getVariable(name);
    xmlField.setAttribute('variabletype', variableModel.type);
    var xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', opposite_type);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  },
  onchange: function() {
    var id = this.getFieldValue('VAR');
    var variableModel = this.workspace.getVariableById(id);
    if (this.type == 'variables_get_dynamic') {
      this.setOutput(true, variableModel.type);
    } else {
      this.getInput('VALUE').setCheck(variableModel.type);
    }
  }
};

Blockly.Extensions.registerMixin('contextMenu_variableDynamicSetterGetter',
    Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);
