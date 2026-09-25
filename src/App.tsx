import { FormEvent, useState } from "react";
import { saveUser } from "./services/saveUser";
import { SupabaseUserRepository } from "./data/repositories/SupabaseUserRepository";

const userRepository = new SupabaseUserRepository();

export default function App() {
  const [username, setUsername] = useState("");
  const [savedUsername, setSavedUsername] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSaving(true);

    try {
      const user = await saveUser(userRepository, username);
      setSavedUsername(user.username);
      setUsername("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to save your name.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main>
      <h1>Recipe App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Your name</label>
        <input
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save name"}
        </button>
      </form>
      {savedUsername && <p>Hello, {savedUsername}!</p>}
      {errorMessage && <p role="alert">{errorMessage}</p>}
    </main>
  );
}
