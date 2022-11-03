import { AzureFunction, Context, HttpRequest } from "@azure/functions";
// import { createConnection } from "typeorm";
import { Post } from "../entities/Post.entity";
import { AppDataSource } from "../services/dbConnection";
// const { queryEntities } = require("../services/tableService");
// const azure = require("azure-storage");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
    // Get all results for posts
    const results = await Post.find();
    console.log(results);
    await AppDataSource.destroy();
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: results,
    };
  } catch (error) {
    context.res = {
      status: 500 /* Defaults to 200 */,
      body: error.message,
    };
  }
};

export default httpTrigger;
