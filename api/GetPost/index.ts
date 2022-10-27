import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const azure = require("azure-storage");
const { queryEntities } = require("../services/tableService");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { blog, id } = context.bindingData;
    const query = new azure.TableQuery().where(
      "PartitionKey eq ? and RowKey eq ?",
      blog,
      id.toString()
    );
    const result = await queryEntities("Posts", query);
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
};

export default httpTrigger;
