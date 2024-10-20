import { run, HandlerContext } from "@xmtp/message-kit";
import { handleSend } from "./handler/send.js";
import { handleEns } from "./handler/ens-name.js";

run(
  async (context: HandlerContext) => {
    const {
      message: {
        typeId,
        content: { content: text, command, params },
      },
    } = context;

    console.log("Received message", text);
    console.log("Received command", command);
    console.log("Received params", params);


    if (typeId !== "text") return;

    // if text is an ens name, ex reidj.eth then we perform handleEns
    if (text.endsWith(".eth")) {
      console.log("Ens name detected");
      await handleEns(context, text);
    } 

    else if (
      text.startsWith("/send") &&
      params.name &&
      params.amount
    ) {
      console.log("Sending tokens");
      await handleSend(context);
    }

    else {
    console.log("text", text);

      context.send("Hey! Good Morning! :)");
    }
  },
);