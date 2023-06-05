import express from "express";

export class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
  static endResponse(error: HttpError, res: express.Response) {
    res.status(error.statusCode || 500);
    res.json({ error: String(error) });
  }
}
