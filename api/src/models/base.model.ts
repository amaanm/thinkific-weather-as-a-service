import { Application } from "express";

export class BaseModel {
  app: Application;

  constructor (app: Application) {
    this.app = app;
  }
}
