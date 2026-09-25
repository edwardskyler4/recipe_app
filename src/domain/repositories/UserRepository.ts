import type { User } from "../models/User";

export interface UserRepository {
  save(username: string): Promise<User>;
}
