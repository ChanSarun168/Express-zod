import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Request,
  Response,
  Body
} from "tsoa";
import { UserService } from "../services/userService";
import { StatusCode } from "../utils/consts";

interface User{
  username:string,
  email: string,
  password: string
}

@Route("users")
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Get("/")
  public async getAll(): Promise<any> {
    return await this.userService.getAllUser();
  }

  @Post("/")
  @Response<Error>(StatusCode.InternalServerError, 'Internal Server Error')
  public async createUser(@Body() requestBody:User): Promise<any> {
    const { username, email, password } = requestBody;
    await this.userService.addUser({ username, email, password });
  }

  @Get("/:userId")
  public async getById(userId: string): Promise<any> {
    return await this.userService.getById(userId);
  }

  @Put("/:userId")
  @Response<Error>(StatusCode.InternalServerError, "Internal Server Error")
  @Response<Error>(StatusCode.NotFound, "User not found")
  public async updateUser(userId: string, @Body() requestBody:User): Promise<any> {
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
