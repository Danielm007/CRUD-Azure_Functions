import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "../entities/Post.entity";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "nodejs-api-server.database.windows.net",
  port: 1433,
  username: "testLogin1",
  password: "Admin123",
  name: "master",
  extra: {
    trustServerCertificate: true,
  },
  entities: [Post],
  logging: false,
  synchronize: true,
});
