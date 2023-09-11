import { Signup } from "./SignUp";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";

export function Header() {
  return (
    <header>
      <h1> Grow Like Granny Plantcare</h1>
      <nav>
        <Signup />
        <Login />
        <LogoutLink />
      </nav>
    </header>
  );
}
