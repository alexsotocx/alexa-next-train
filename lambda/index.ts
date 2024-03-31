import { SkillBuilders } from "ask-sdk-core";
import { LaunchRequestHandler } from "./handlers/launch";
import { AskWeatherIntentHandler } from "./handlers/ask-weather";
import { HelpIntentHandler } from "./handlers/help";
import { CancelAndStopIntentHandler } from "./handlers/cancel-stop";
import { SessionEndedRequestHandler } from "./handlers/end-sesion";
import { ErrorHandler } from "./handlers/error";

exports.handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AskWeatherIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();