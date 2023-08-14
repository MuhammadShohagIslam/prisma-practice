/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import handleZodValidationError from "../../errors/handleZodValidationError";
import { IGenericErrorMessage } from "../../interfaces/error";

// global error handler
const globalErrorHandler: ErrorRequestHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    config.env === "development"
        ? console.log(`global error handler~~~`, error)
        : console.log(`global error handler~~~`, error);

    let statusCode = 500;
    let message = "Something went wrong!";
    let errorMessages: IGenericErrorMessage[] = [];

    if (error instanceof ZodError) {
        const zodError = handleZodValidationError(error);
        statusCode = zodError?.statusCode;
        message = zodError?.message;
        errorMessages = zodError?.errorMessages;
    } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error?.message;
        errorMessages = error?.message
            ? [
                  {
                      path: "",
                      message: error?.message,
                  },
              ]
            : [];
    } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                  {
                      path: "",
                      message: error?.message,
                  },
              ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.env !== "production" ? error.stack : undefined,
    });
};

export default globalErrorHandler;
