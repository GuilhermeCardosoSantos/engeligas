import axios from "axios";
import {
  NextRequest,
  NextResponse,
} from "next/server";

const privateRoutes = [
  "/home",
  "/users",
  "/orders",
];

const publicRoutes = [
  "/signin",
  "/reset-password",
];

export async function middleware(
  request: NextRequest
) {
  const pathname =
    request.nextUrl.pathname;

  const sessionId =
    request.cookies.get("session_id")?.value;

  const isPublicRoute =
    publicRoutes.some((route) =>
      pathname.startsWith(route)
    );

  const isPrivateRoute =
    privateRoutes.some((route) =>
      pathname.startsWith(route)
    );

  if (!sessionId && isPrivateRoute) {
    return NextResponse.redirect(
      new URL("/signin", request.url)
    );
  }

  if (sessionId) {
    try {
      const response =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}auth/validate`,
          {
            headers: {
              Cookie: `session_id=${sessionId}`,
            },

            validateStatus: () => true,
          }
        );


      if (response.status !== 200) {
        const redirect =
          NextResponse.redirect(
            new URL(
              "/signin",
              request.url
            )
          );

        redirect.cookies.delete(
          "session_id"
        );

        redirect.cookies.delete(
          "user_id"
        );

        return redirect;
      }

      if (isPublicRoute) {
        return NextResponse.redirect(
          new URL("/home", request.url)
        );
      }
    } catch (error) {
      console.log(
        "AXIOS ERROR:"
      );

      console.log(error);

      const redirect =
        NextResponse.redirect(
          new URL(
            "/signin",
            request.url
          )
        );

      redirect.cookies.delete(
        "session_id"
      );

      redirect.cookies.delete(
        "user_id"
      );

      return redirect;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/users/:path*",
    "/orders/:path*",
    "/signin",
    "/reset-password",
  ],
};