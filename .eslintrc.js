module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  "extends": "airbnb-base",
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".ts",
        ]
      }
    },
    "import/parsers": {
      "typescript-eslint-parser": [ ".ts" ]
    }
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins": [
    "typescript", "jest", "prettier"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-plusplus": [
      "error", 
      { "allowForLoopAfterthoughts": true }
    ]
  },
  "parser": "typescript-eslint-parser",
};