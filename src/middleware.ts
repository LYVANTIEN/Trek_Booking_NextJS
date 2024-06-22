import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("tokenSupplier");
  const roleName = request.cookies.get("roleName");

  if (!token || !roleName) {
    return NextResponse.redirect(new URL("/login_supplier?message=missingCredentials", request.url));
  }
  if (roleName.value !== "supplier") {
    return NextResponse.redirect(new URL("/?message=notAuthorized", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/supplier/:path*",
};