import { Controller, Get, Post, Put, Delete, Route, Request, Response } from 'tsoa';
import { UserService } from '../services/userService';

@Route('users')
export class UserController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Get('/')
  public async getAll(): Promise<any> {
    return await this.userService.getAllUser();
  }

  @Post('/')
  public async createUser(@Request() req: any): Promise<any> {
    const { username, email, password } = req.body;
    return await this.userService.addUser({ username, email, password });
  }

  @Get('/:userId')
  public async getById(userId: string): Promise<any> {
    return await this.userService.getById(userId);
  }

  @Put('/:userId')
  public async updateUser(userId: string, @Request() req: any): Promise<any> {
    const { username, email, password } = req.body;
    return await this.userService.updateUser(userId, { username, email, password });
  }

  @Delete('/:userId')
  public async deleteById(userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}

