// {
//     "env": {
//         "browser": true,
//         "es6": true,
//         "amd": true
//     },
//     "extends": [
//         "eslint:recommended",
//         "plugin:react/recommended"
//     ],
//     "parser": "babel-eslint",
//     "parserOptions": {
//         "ecmaVersion": 2018,
//         "ecmaFeatures": {
//             "jsx": true
//         },
//         "sourceType": "module"
//     },
//     "plugins": [
//         "react",
//         "react-native"
//     ],
//     "rules": {
//         "react-native/no-unused-styles": 1,
//         "react/prop-types": 1,
//         "no-unused-vars": 1
//     }
// }

module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    quotes: 0,
    eqeqeq: 0,
    "comma-dangle": 0,
    curly: 0,
    "react-native/no-inline-styles": 0
  }
};
