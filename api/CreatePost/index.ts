import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const { insertEntity } = require("../services/tableService");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    if (!req.body) {
      context.res = {
        status: 400 /* Defaults to 200 */,
        body: "Please add a request body",
      };
      return;
    }
    const { blog, title, content } = req.body;
    if (!blog || !title || !content) {
      context.res = {
        status: 400 /* Defaults to 200 */,
        body: "Please pass blog, title and content",
      };
      return;
    }

    const entity = {
      PartitionKey: { _: blog },
      RowKey: { _: new Date().getTime().toString() },
      title: { _: title },
      content: { _: content },
    };

    const result = await insertEntity("Posts", entity);

    context.res = {
      status: 200 /* Defaults to 200 */,
      body: result,
    };
  } catch (error) {
    context.res = {
      status: 500 /* Defaults to 200 */,
      body: error.message,
    };
  }
  //   context.log("HTTP trigger function processed a request.");
  //   const name = req.query.name || (req.body && req.body.name);
  //   const responseMessage = name
  //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
  //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
};

export default httpTrigger;
