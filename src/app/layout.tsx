import "~/styles/globals.css";

import { Inter, Ubuntu } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";
import Nav from "~/components/base/nav";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Clarity | Your Local Classroom's Brain",
  description: "Your Local Classroom's Brain",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const user =
    (await api.user.get.query({ id: session?.user.id })) ?? undefined;

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        ></link>
      </head>
      <body className={`font-sans ${inter.variable}`}>
        <Nav session={session ?? undefined} user={user} />
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        <footer className="mt-4 p-3 py-6 text-center text-2xl">
          <div></div>
        </footer>
      </body>
    </html>
  );
}
