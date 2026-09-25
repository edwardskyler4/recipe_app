import type { User } from "../domain/models/User";
import type { UserRepository } from "../domain/repositories/UserRepository";

export function saveUser(
  repository: UserRepository,
  username: string,
): Promise<User> {
  return repository.save(username);
}
