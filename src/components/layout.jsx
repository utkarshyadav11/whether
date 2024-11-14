import { Header } from "./header";

export function Layout({ children }) {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="container min-h-screen px-4 py-8 mx-auto">
        {children}
      </main>
    </div>
  );
}
