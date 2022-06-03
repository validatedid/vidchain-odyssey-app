/**
 * @format
 */
import './shim.js'; // eslint-disable-line import/extensions
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'text-encoding-polyfill';
 import Joi from '@hapi/joi' // eslint-disable-line

AppRegistry.registerComponent(appName, () => App);
