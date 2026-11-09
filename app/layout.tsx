import Link from "next/link";
import NavBar from "./components/NavBar";
import AuthSessionProvider from "./components/SessionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AuthSessionProvider>
          <NavBar />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}

export function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthSessionProvider>
          <nav>
            <Link href='/'>home</Link>
            {" | "}
            <Link href='/notes'>notes</Link>
            {" | "}
            <Link href='/users'>Users</Link>
            {" | "}
            <Link href='/notes/new'>create new</Link>
          </nav>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
