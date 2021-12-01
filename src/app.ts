import express, {Express} from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import {UsersController} from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  usersController: UsersController;
  exeptionFilter: ExeptionFilter;

  constructor(
    logger: LoggerService,
    usersController: UsersController,
    exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
    this.exeptionFilter = exeptionFilter;
  }

  public useRoutes() {
    this.app.use('/users', this.usersController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
  }
}
