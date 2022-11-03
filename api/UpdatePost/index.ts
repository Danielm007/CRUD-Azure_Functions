import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { AppDataSource } from "../services/dbConnection";
import { Post } from "../entities/Post.entity";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    await AppDataSource.initialize();
    if (!req.body) {
      context.res = {
        status: 400,
        body: "Please pass request body",
      };
      return;
    }
    const { title, content } = req.body;
    if (!title && !content) {
      context.res = {
        status: 400,
        body: "Please pass title or content",
      };
      return;
    }
    const { id } = context.bindingData;

    const res = await Post.findOneBy({ id });

    if (title) res.title = title;
    if (content) res.content = content;

    await res.save();
    await AppDataSource.destroy();

    context.res = {
      status: 200,
      body: "Successfully updated",
    };
  } catch (error) {
    context.res = {
      status: 500 /* Defaults to 200 */,
      body: error.message,
    };
  }
};

export default httpTrigger;
