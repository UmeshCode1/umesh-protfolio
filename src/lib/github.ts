const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const GITHUB_USERNAME = 'UmeshCode1'; // Hardcoded for the portfolio owner

if (!GITHUB_TOKEN) {
  console.warn('⚠️ GITHUB_ACCESS_TOKEN is not set in environment variables. GitHub API requests may fail or be heavily rate-limited.');
}

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
};

// 1. Fetch Repositories
export async function getRepositories() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`, {
      headers: GITHUB_TOKEN ? headers : undefined,
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      console.error(`GitHub API Error (Repos): ${res.status} ${res.statusText}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error);
    return [];
  }
}

// 2. Fetch Recent Activity (Events)
export async function getRecentActivity() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`, {
      headers: GITHUB_TOKEN ? headers : undefined,
      next: { revalidate: 1800 } // Cache for 30 mins
    });
    
    if (!res.ok) {
      console.error(`GitHub API Error (Activity): ${res.status} ${res.statusText}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch GitHub activity:', error);
    return [];
  }
}

// 3. Fetch GitHub Projects (Requires GraphQL API)
// This fetches Projects V2 associated with a user or repository
export async function getProjects() {
  if (!GITHUB_TOKEN) {
    console.warn('⚠️ Skipping GitHub Projects fetch: GITHUB_ACCESS_TOKEN is required for GraphQL API.');
    return [];
  }
  
  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        projectsV2(first: 10) {
          nodes {
            id
            title
            shortDescription
            url
            closed
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.error(`GitHub GraphQL API Error: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.data?.user?.projectsV2?.nodes || [];
  } catch (error) {
    console.error('Failed to fetch GitHub projects:', error);
    return [];
  }
}

// 4. Fetch Wiki Page Content
// GitHub Wikis are essentially separate repositories. 
// We can fetch the raw Markdown content directly from the raw URL.
export async function getWikiPage(repoName: string, pageName: string = 'Home') {
  // URL pattern: https://raw.githubusercontent.com/wiki/{owner}/{repo}/{page}.md
  const url = `https://raw.githubusercontent.com/wiki/${GITHUB_USERNAME}/${repoName}/${pageName}.md`;
  
  try {
    // Note: We don't send the token here because raw.githubusercontent.com doesn't accept the Bearer token in the same way,
    // and it's for public wikis. For private wikis, we would need to use the GitHub API to fetch file contents.
    const res = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.error(`GitHub Wiki Error for ${repoName}/${pageName}: ${res.status} ${res.statusText}`);
      return null;
    }
    return await res.text(); // Returns raw MDX/Markdown
  } catch (error) {
    console.error(`Failed to fetch GitHub wiki page ${repoName}/${pageName}:`, error);
    return null;
  }
}
