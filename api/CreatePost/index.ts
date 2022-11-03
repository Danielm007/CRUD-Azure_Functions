import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Post } from "../entities/Post.entity";
import { AppDataSource } from "../services/dbConnection";
const { insertEntity } = require("../services/tableService");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
    if (!req.body) {
      context.res = {
        status: 400 /* Defaults to 200 */,
        body: "Please add a request body",
      };
      return;
    }
    const { title, content } = req.body;
    if (!title || !content) {
      context.res = {
        status: 400 /* Defaults to 200 */,
        body: "Please pass blog, title and content",
      };
      return;
    }

    const post = new Post();
    post.title = title;
    post.content = content;
    const res = await post.save();
    console.log(res);
    await AppDataSource.destroy();
    const entity = {
      PartitionKey: { _: "Daniel Dev" },
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
