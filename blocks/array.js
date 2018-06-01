'use strict';

goog.provide('Blockly.Blocks.array');  // Deprecated
goog.provide('Blockly.Constants.Array');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Constants.Array.Colour = 160;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  //array_create_empty
  {
    "type": "array_create_empty",
    "message0": "create empty %1 array",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "type",
            "options": [["Int","[Int]"],["Double","[Double]"],["Bool","[Bool]"],["String","[String]"]]
        }
    ],
    "inputsInline": true,
    "output": ["[Int]","[Double]","[Bool]","[String]"],
    "colour": Blockly.Constants.Array.Colour
  },
  //array_create_repeat
  {
    "type": "array_create_repeat",
    "message0": "create array with value %1 repeated %2 times",
    "args0": [
        {
          "type": "input_value",
          "name": "value" //need to updated
        },
        {
          "type": "input_value",
          "name": "count",
          "check": "Int"
        }
    ],
    "inputsInline": true,
    "output": ["[Int]","[Double]","[Bool]","[String]"],
    "colour": Blockly.Constants.Array.Colour
  },
  //array_concatenate
  {
    "type": "array_concatenate",
    "message0": "concatenate 2 arrays %1 and %2",
    "args0": [
        {
          "type": "input_value",
          "name": "array1",
          "check": ["[Int]","[Double]","[Bool]","[String]"]
        },
        {
          "type": "input_value",
          "name": "array2",
          "check": ["[Int]","[Double]","[Bool]","[String]"],
          "align": "RIGHT"
        }
    ], 
    "inputsInline": false,
    "output": ["[Int]","[Double]","[Bool]","[String]"],
    "colour": Blockly.Constants.Array.Colour
  },
  //array_get_length
  {
    "type": "array_get_length",
    "message0": "length of %1",
    "args0": [
      {
        "type": "input_value",
        "name": "array",
        "check": ["[Int]","[Double]","[Bool]","[String]"]
      }
    ],
    "inputsInline": false,
    "output": "Int", //need to updated
    "colour": Blockly.Constants.Array.Colour
  },
  //array_check_empty
  {
    "type": "array_check_empty",
    "message0": "%1 is empty",
    "args0": [
      {
        "type": "input_value",
        "name": "array",
        "check": ["[Int]","[Double]","[Bool]","[String]"]
      }
    ],
    "inputsInline": true,
    "output": "Bool",
    "colour": Blockly.Constants.Array.Colour
  }
]);  // END JSON EXTRACT (Do not delete this comment.)
