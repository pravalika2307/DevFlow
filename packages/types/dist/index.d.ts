export interface UserProfile {
  avatar_url?: string;
  bio?: string;
  company?: string;
  location?: string;
}
export interface User {
  id: string;
  email: string;
  username: string;
  role: "ADMIN" | "MANAGER" | "DEVELOPER";
  is_active: boolean;
  github_id?: number | null;
  created_at: string;
  updated_at: string;
  profile?: UserProfile | null;
}
export interface Organization {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface Repository {
  id: string;
  organization_id: string;
  provider: "GITHUB" | "GITLAB" | "JIRA";
  external_repo_id: string;
  name: string;
  full_name: string;
  description?: string;
  url: string;
  primary_language?: string;
  default_branch: string;
  is_active: boolean;
  last_sync_at?: string;
  created_at: string;
  updated_at: string;
}
export interface PullRequest {
  id: string;
  repository_id: string;
  external_pr_id: string;
  number: number;
  title: string;
  state: "open" | "closed" | "merged";
  author_external_id: string;
  merge_commit_sha?: string;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  merged_at?: string;
}
export interface Issue {
  id: string;
  repository_id?: string;
  organization_id: string;
  provider: "GITHUB" | "GITLAB" | "JIRA";
  external_issue_id: string;
  number: string;
  title: string;
  state: "open" | "closed";
  creator_external_id: string;
  priority: string;
  difficulty?: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  closed_at?: string;
}
