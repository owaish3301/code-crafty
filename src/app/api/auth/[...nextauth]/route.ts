// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET || process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          // Scopes for GitHub Apps integration
          // Required scopes for accessing repositories, pull requests, etc.
          scope: "repo user:email read:user contents:read metadata:read pull_request:write"
        }
      },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          githubUserId: profile.id.toString(),
          githubUsername: profile.login,
        };
      },
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 24 hours
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn({ user, account, profile: _profile, email: _email, credentials: _credentials }) {
      // Allow sign in if:
      // 1. This is a first time sign in
      // 2. The account has the same email
      if (account && account.provider === "github" && account.type === "oauth") {
        if (!user.email) {
          return true;
        }
        
        // Check if there's already a user with this email
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });
        
        // If no existing user, allow sign in
        if (!existingUser) {
          return true;
        }
        
        // If there is a user with this email but no GitHub account linked yet,
        // we need to link them
        const linkedGithubAccount = existingUser.accounts.find(
          (acc: { provider: string }) => acc.provider === "github"
        );
        
        if (!linkedGithubAccount && account.providerAccountId) {
          // Link this GitHub account to the existing user
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
            },
          });
        }
      }
      
      // Allow sign in
      return true;
    },    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and other important data
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.tokenType = account.token_type;
      }
      
      // Add user role to token if available
      if (user && typeof user === "object" && "role" in user) {
        // @ts-expect-error: user may not have role property in type
        token.role = user.role;
      }
      
      return token;
    },
    async session({ session, token }) {
      // Send access_token and other GitHub-specific data to the client
      if (token && session.user) {
        session.accessToken = token.accessToken;
        session.user.githubId = token.sub;
        session.user.role = token.role;
      }
      return session;
    }  },
  pages: {
    signIn: '/login',
    error: '/auth/error', // Redirect to our custom error page
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
