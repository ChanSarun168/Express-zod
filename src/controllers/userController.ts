import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Request,
  Response,
  Body,
  Query,
  Path,
  Queries,
} from "tsoa";
import { UserService } from "../services/userService";
import { StatusCode } from "../utils/consts";

interface ErrorResponse {
  errorCode: number;
  errorMessage: string;
  errorDetails?: string;
}

interface User {
  username: string;
  email: string;
  password: string;
}

@Route("users")
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Get("/")
  @Response<ErrorResponse>(StatusCode.NoContent, "No Content", {
    errorCode: StatusCode.NoContent,
    errorMessage: "No Content",
    errorDetails:
      "The server successfully processed the request, but there is no content to return",
  })
  // error 403
  @Response<ErrorResponse>(StatusCode.Forbidden, "Permission Denied", {
    errorCode: StatusCode.Forbidden,
    errorMessage: "Permission Denied",
    errorDetails: "You do not have permission to perform this operation.",
  })
  // error 401
  @Response<ErrorResponse>(StatusCode.Unauthorized, "Unauthorized", {
    errorCode: StatusCode.Unauthorized,
    errorMessage: "Unauthorized",
    errorDetails: "Authentication credentials are missing or invalid.",
  })
  // error 500
  @Response<ErrorResponse>(
    StatusCode.InternalServerError,
    "Internal Server Error",
    {
      errorCode: StatusCode.InternalServerError,
      errorMessage: "Internal Server Error",
      errorDetails: "An unexpected error occurred while processing the request",
    }
  )
  public async getAll(@Queries() options?:{ page: number; perPage: number; }): Promise<any> {
    return await this.userService.getAllUser(options);
  }
  @Post("/")
  @Response<ErrorResponse>(StatusCode.BadRequest, "Bad Request", {
    errorCode: StatusCode.BadRequest,
    errorMessage: "Invalid user data",
    errorDetails: "Please provide valid username, email, and password",
  })
  // error 403
  @Response<ErrorResponse>(StatusCode.Forbidden, "Permission Denied", {
    errorCode: StatusCode.Forbidden,
    errorMessage: "Permission Denied",
    errorDetails: "You do not have permission to perform this operation.",
  })
  // error 401
  @Response<ErrorResponse>(StatusCode.Unauthorized, "Unauthorized", {
    errorCode: StatusCode.Unauthorized,
    errorMessage: "Unauthorized",
    errorDetails: "Authentication credentials are missing or invalid.",
  })
  // error 500
  @Response<ErrorResponse>(
    StatusCode.InternalServerError,
    "Internal Server Error",
    {
      errorCode: StatusCode.InternalServerError,
      errorMessage: "Internal Server Error",
      errorDetails: "An unexpected error occurred while processing the request",
    }
  )
  public async createUser(@Body() requestBody: User): Promise<any> {
    const { username, email, password } = requestBody;
    await this.userService.addUser({ username, email, password });
  }

  @Get("/:userId")
  public async getById(userId: string): Promise<any> {
    return await this.userService.getById(userId);
  }

  @Put("/:userId")
  // error 404
  @Response<ErrorResponse>(StatusCode.NotFound, "Not Found", {
    errorCode: StatusCode.NotFound,
    errorMessage: "User not found",
    errorDetails: "The requested user ID was not found in the system",
  })
  // error 500
  @Response<ErrorResponse>(
    StatusCode.InternalServerError,
    "Internal Server Error",
    {
      errorCode: StatusCode.InternalServerError,
      errorMessage: "Internal Server Error",
      errorDetails: "An unexpected error occurred while processing the request",
    }
  )
  // error 403
  @Response<ErrorResponse>(StatusCode.Forbidden, "Permission Denied", {
    errorCode: StatusCode.Forbidden,
    errorMessage: "Permission Denied",
    errorDetails: "You do not have permission to perform this operation.",
  })
  // error 401
  @Response<ErrorResponse>(StatusCode.Unauthorized, "Unauthorized", {
    errorCode: StatusCode.Unauthorized,
    errorMessage: "Unauthorized",
    errorDetails: "Authentication credentials are missing or invalid.",
  })
  public async updateUser(
    userId: string,
    @Body() requestBody: User
  ): Promise<any> {
    const { username, email, password } = requestBody;
    return await this.userService.updateUser(userId, {
      username,
      email,
      password,
    });
  }

  @Delete("/:userId")
  public async deleteById(userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
