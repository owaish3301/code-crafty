"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

// Error messages for different NextAuth error codes
const errorMessages: Record<string, string> = {
  OAuthSignInError: "There was a problem signing in with GitHub. Please try again.",
  OAuthAccountNotLinked: "This email is already associated with another account. Please sign in using your original account method.",
  OAuthCallbackError: "There was a problem with the GitHub callback. Please try again.",
  OAuthCreateAccountError: "There was a problem creating your account. Please try again.",
  EmailCreateError: "There was a problem creating your email. Please try again.",
  CallbackRouteError: "There was a problem with the callback URL. Please try again.",
  CredentialsSignin: "The credentials you provided are invalid. Please try again.",
  default: "An error occurred during authentication. Please try again.",
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [callbackUrl, setCallbackUrl] = useState<string>("/dashboard");

  useEffect(() => {
    const errorCode = searchParams.get("error");
    const callback = searchParams.get("callbackUrl");
    
    if (errorCode) {
      setError(errorCode);
    }
    
    if (callback) {
      setCallbackUrl(callback);
    }
  }, [searchParams]);

  const errorMessage = error ? errorMessages[error] || errorMessages.default : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Authentication Error</CardTitle>
          <CardDescription>
            There was a problem signing you in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <div className="flex">
                <div className="text-sm text-red-700 dark:text-red-400">
                  <p>{errorMessage}</p>                  {error === "OAuthAccountNotLinked" && (
                    <p className="mt-2">
                      If you&apos;re trying to use a new login method, please use your original sign-in method instead or contact support to link your accounts.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Go Home
          </Button>
          <Button onClick={() => signIn("github", { callbackUrl })}>
            Try Again
          </Button>
        </CardFooter>
      </Card>    </div>
  );
}

// Wrap the component that uses useSearchParams in Suspense
export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
