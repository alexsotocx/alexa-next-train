import { SkillBuilders } from "ask-sdk-core";
import { LaunchRequestHandler } from "./handlers/launch";
import { MyNextTrainHandler } from "./handlers/my-next-train";
import { HelpIntentHandler } from "./handlers/help";
import { CancelAndStopIntentHandler } from "./handlers/cancel-stop";
import { SessionEndedRequestHandler } from "./handlers/end-sesion";
import { ErrorHandler } from "./handlers/error";

export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    MyNextTrainHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();