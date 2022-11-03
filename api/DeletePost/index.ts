import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Post } from "../entities/Post.entity";
import { AppDataSource } from "../services/dbConnection";
const { deleteEntity } = require("../services/tableService");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    await AppDataSource.initialize();
    const { id } = context.bindingData;
    const res = await Post.findOneBy({ id });
    if (!res) {
      context.res = {
        status: 404,
        body: "Post doesn't exists",
      };
      return;
    }

    await res.remove();
    await AppDataSource.destroy();

    context.res = {
      status: 200,
      body: "Deleted Successfully",
    };
  } catch (error) {
    context.res = {
      status: 500 /* Defaults to 200 */,
      body: error.message,
    };
  }
};

export default httpTrigger;
