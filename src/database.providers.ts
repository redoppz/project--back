import { createConnection } from 'typeorm';
import { config } from './config/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
    }),
  },
];
