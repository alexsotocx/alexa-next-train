"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const launch_1 = require("./handlers/launch");
const my_next_train_1 = require("./handlers/my-next-train");
const help_1 = require("./handlers/help");
const cancel_stop_1 = require("./handlers/cancel-stop");
const end_sesion_1 = require("./handlers/end-sesion");
const error_1 = require("./handlers/error");
exports.handler = ask_sdk_core_1.SkillBuilders.custom()
    .addRequestHandlers(launch_1.LaunchRequestHandler, my_next_train_1.MyNextTrainHandler, help_1.HelpIntentHandler, cancel_stop_1.CancelAndStopIntentHandler, end_sesion_1.SessionEndedRequestHandler)
    .addErrorHandlers(error_1.ErrorHandler)
    .lambda();
