import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const { deleteEntity } = require("../services/tableService");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { blog, id } = context.bindingData;
    const entity = {
      PartitionKey: { _: blog },
      RowKey: { _: id.toString() },
    };

    await deleteEntity("Posts", entity);

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
