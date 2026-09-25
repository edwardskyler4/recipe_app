import { describe, expect, it } from "vitest";
import { saveUser } from "../../src/services/saveUser";
import type { UserRepository } from "../../src/domain/repositories/UserRepository";

describe("saveUser", () => {
  it("saves a username and returns the saved user", async () => {
    const savedUsers: string[] = [];
    const repository: UserRepository = {
      async save(username) {
        savedUsers.push(username);
        return { id: 1, username };
      },
    };

    const result = await saveUser(repository, "Evan");

    expect(savedUsers).toEqual(["Evan"]);
    expect(result).toEqual({ id: 1, username: "Evan" });
  });
});
