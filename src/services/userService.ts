import { UserRepo } from "../database/repository/userRepo";

export class UserService {
  repo: UserRepo;

  constructor() {
    this.repo = new UserRepo();
  }

  // add user
  async addUser(userDetail:any): Promise<any> {
    return await this.repo.createUser(userDetail);
  }

  // select user by id
  async getById(id:string):Promise<any>{
    return await this.repo.getById(id);
  }

  // get all user
  async getAllUser():Promise<any>{
    return await this.repo.getall();
  }

  // Update user
  async updateUser(id:string,user:object):Promise<any>{
    return await this.repo.updateById(id,user);
  }

  // delete User
  async deleteUser(id:string):Promise<any>{
    return await this.repo.deleteById(id);
  }
} 
 