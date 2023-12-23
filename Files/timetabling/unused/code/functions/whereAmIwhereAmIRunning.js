function whereAmIRunning() {
  let hostName = window.location.hostname;
  let isLocalCoding = hostName === "localhost" || hostName === "127.0.0.1";
  let isGitHubPages = hostName.includes("github.io");
  let runningOn = {
    localhost: isLocalCoding,
    githubPages: isGitHubPages,
    somewhereElse: false,
  };
  if (!(isLocalCoding || isGitHubPages)) {
    runningOn.somewhereElse = true;
  }
  return runningOn;
}

let runningOn = whereAmIRunning();

export { runningOn };
