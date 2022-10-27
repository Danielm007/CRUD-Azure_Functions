import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const { queryEntities } = require("../services/tableService");
const azure = require("azure-storage");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const blog = context.bindingData.blog;
    const query = new azure.TableQuery().where("PartitionKey eq ?", blog);
    const result = await queryEntities("Posts", query);
    context.res = {
      // status: 200, /* Defaults to 200 */
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
