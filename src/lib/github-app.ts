// src/lib/github-app.ts
import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

/**
 * Create an Octokit instance authenticated as a GitHub App
 */
export function createGitHubAppOctokit() {
  if (!process.env.GITHUB_APP_ID || !process.env.GITHUB_PRIVATE_KEY) {
    throw new Error("GitHub App credentials are not configured");
  }

  return new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_PRIVATE_KEY.replace(/\\n/g, "\n"),
      installationId: process.env.GITHUB_INSTALLATION_ID,
    },
  });
}

/**
 * Create an Octokit instance authenticated with a user's token
 */
export function createUserOctokit(accessToken: string) {
  return new Octokit({
    auth: accessToken,
  });
}

/**
 * Helper function to create a repository for a user
 */
export async function createRepositoryForUser(
  octokit: Octokit,
  repoName: string,
  description: string = "A repository created by Code Crafted",
  isPrivate: boolean = false
) {
  try {
    const response = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description,
      private: isPrivate,
      auto_init: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating repository:", error);
    throw error;
  }
}

/**
 * Helper function to create a pull request
 */
export async function createPullRequest(
  octokit: Octokit,
  owner: string,
  repo: string,
  title: string,
  head: string,
  base: string = "main",
  body: string = "Created by Code Crafted"
) {
  try {
    const response = await octokit.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
      body,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating pull request:", error);
    throw error;
  }
}
