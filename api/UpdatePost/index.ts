import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const { updateEntity } = require("../services/tableService");

type entity = {
  _: string;
};

interface Object {
  PartitionKey: entity;
  RowKey: entity;
  title?: entity;
  content?: entity;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
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
    const { blog, id } = context.bindingData;

    const entity: Object = {
      PartitionKey: { _: blog },
      RowKey: { _: id.toString() },
    };

    if (title) entity.title = { _: title };
    if (content) entity.content = { _: content };

    await updateEntity("Posts", entity);
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
