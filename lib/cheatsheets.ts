import "server-only";

export type CheatSheetItem = { term: string; syntax: string; description: string };
export type CheatSheetSection = { heading: string; items: CheatSheetItem[] };
export type CheatSheet = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: 
  | "guide"
  | "speed"
  | "library"
  | "git"
  | "container"
  | "database"
  | "terminal"
  | "components"
  | "compare"
  | "network"
  | "layout";
  intro: string;
  sections: CheatSheetSection[];
  relatedDocs?: { label: string; href: string }[];
};

export const cheatsheets: CheatSheet[] = [
  {
    slug: "javascript-array-methods",
    title: "JavaScript Array Methods Cheat Sheet",
    description: "Every commonly used JavaScript array method in one scannable page — adding, removing, transforming, searching, and sorting, with syntax and a one-line explanation for each.",
    date: "2026-09-22",
    tags: ["JavaScript", "Cheat sheet"],
    cover: "network",
    intro: "Array methods are the most looked-up part of the JavaScript standard library — mostly because there are close to thirty of them, and it's easy to blank on whether you want splice or slice. This page groups them by what you're actually trying to do, so you can scan for the right one instead of reading the full reference each time.",
    relatedDocs: [{ label: "JavaScript documentation", href: "/docs/javascript" }],
    sections: [
      {
        heading: "Adding & removing",
        items: [
          { term: "push()", syntax: "arr.push(item)", description: "Adds one or more items to the end of the array. Mutates the array; returns the new length." },
          { term: "pop()", syntax: "arr.pop()", description: "Removes and returns the last item. Mutates the array." },
          { term: "unshift()", syntax: "arr.unshift(item)", description: "Adds one or more items to the start of the array. Mutates the array." },
          { term: "shift()", syntax: "arr.shift()", description: "Removes and returns the first item. Mutates the array." },
          { term: "splice()", syntax: "arr.splice(start, count, ...items)", description: "Removes count items starting at start, and can insert new items at the same position. Mutates the array." },
        ],
      },
      {
        heading: "Copying & transforming",
        items: [
          { term: "slice()", syntax: "arr.slice(start, end)", description: "Returns a shallow copy of a portion of the array. Does not mutate the original." },
          { term: "map()", syntax: "arr.map(fn)", description: "Returns a new array with the result of calling fn on every item." },
          { term: "filter()", syntax: "arr.filter(fn)", description: "Returns a new array containing only the items where fn returns true." },
          { term: "reduce()", syntax: "arr.reduce(fn, initial)", description: "Reduces the array to a single value by calling fn on an accumulator and each item." },
          { term: "flat()", syntax: "arr.flat(depth)", description: "Returns a new array with nested arrays flattened up to depth levels (default 1)." },
          { term: "concat()", syntax: "arr.concat(other)", description: "Returns a new array combining the original with one or more other arrays or values." },
        ],
      },
      {
        heading: "Searching & checking",
        items: [
          { term: "includes()", syntax: "arr.includes(value)", description: "Returns true if the array contains value. Uses strict equality." },
          { term: "indexOf()", syntax: "arr.indexOf(value)", description: "Returns the first index of value, or -1 if not found." },
          { term: "find()", syntax: "arr.find(fn)", description: "Returns the first item where fn returns true, or undefined if none match." },
          { term: "findIndex()", syntax: "arr.findIndex(fn)", description: "Returns the index of the first item where fn returns true, or -1." },
          { term: "some()", syntax: "arr.some(fn)", description: "Returns true if fn returns true for at least one item." },
          { term: "every()", syntax: "arr.every(fn)", description: "Returns true only if fn returns true for every item." },
        ],
      },
      {
        heading: "Iterating & ordering",
        items: [
          { term: "forEach()", syntax: "arr.forEach(fn)", description: "Calls fn on every item. Always returns undefined — use map() if you need a result." },
          { term: "sort()", syntax: "arr.sort(compareFn)", description: "Sorts the array in place. Without compareFn, sorts as strings — always pass one for numbers." },
          { term: "reverse()", syntax: "arr.reverse()", description: "Reverses the array in place." },
          { term: "join()", syntax: "arr.join(separator)", description: "Returns a string with every item joined by separator (default a comma)." },
        ],
      },
    ],
  },
  {
    slug: "git-commands",
    title: "Git Commands Cheat Sheet",
    description: "The Git commands developers actually use day to day — branching, committing, undoing mistakes, and syncing with a remote — grouped by task, not alphabetically.",
    date: "2026-09-24",
    tags: ["Git", "Cheat sheet"],
    cover: "git",
    intro: "Most developers use roughly twenty Git commands regularly and look everything else up when they need it. This groups those twenty by what you're trying to accomplish — starting work, saving it, undoing it, or sharing it — instead of Git's own somewhat historical command naming.",
    relatedDocs: [{ label: "Git documentation", href: "/docs/git" }],
    sections: [
      {
        heading: "Starting & inspecting",
        items: [
          { term: "git status", syntax: "git status", description: "Shows changed, staged, and untracked files in the working directory." },
          { term: "git log", syntax: "git log --oneline", description: "Shows commit history. --oneline compresses each commit to a single line." },
          { term: "git diff", syntax: "git diff", description: "Shows unstaged changes. Add --staged to see what's already staged for commit." },
          { term: "git clone", syntax: "git clone <url>", description: "Copies a remote repository to a new local directory." },
        ],
      },
      {
        heading: "Saving work",
        items: [
          { term: "git add", syntax: "git add <file>", description: "Stages a file's changes for the next commit. Use . to stage everything." },
          { term: "git commit", syntax: "git commit -m \"message\"", description: "Records the staged changes as a new commit with the given message." },
          { term: "git stash", syntax: "git stash", description: "Temporarily shelves uncommitted changes so you can switch context; restore with git stash pop." },
        ],
      },
      {
        heading: "Branching",
        items: [
          { term: "git branch", syntax: "git branch <name>", description: "Creates a new branch. With no name, lists existing branches." },
          { term: "git switch", syntax: "git switch <branch>", description: "Switches to an existing branch. Add -c to create and switch in one step." },
          { term: "git merge", syntax: "git merge <branch>", description: "Merges the named branch's history into the current branch." },
          { term: "git rebase", syntax: "git rebase <branch>", description: "Replays the current branch's commits on top of another branch, producing linear history." },
        ],
      },
      {
        heading: "Undoing things",
        items: [
          { term: "git restore", syntax: "git restore <file>", description: "Discards unstaged changes to a file, restoring it to the last commit." },
          { term: "git reset", syntax: "git reset --soft HEAD~1", description: "Moves the current branch pointer back, optionally keeping changes staged (--soft) or discarding them (--hard)." },
          { term: "git revert", syntax: "git revert <commit>", description: "Creates a new commit that undoes the changes from an earlier commit, without rewriting history." },
        ],
      },
      {
        heading: "Working with remotes",
        items: [
          { term: "git fetch", syntax: "git fetch", description: "Downloads commits and branches from the remote without merging them into your work." },
          { term: "git pull", syntax: "git pull", description: "Fetches from the remote and immediately merges (or rebases) into the current branch." },
          { term: "git push", syntax: "git push", description: "Uploads local commits on the current branch to the remote." },
        ],
      },
    ],
  },
  {
    slug: "docker-commands",
    title: "Docker Commands Cheat Sheet (Images, Containers & Compose)",
    description: "The Docker commands you actually need — build images, run and exec into containers, clean up disk space, and use Docker Compose — with syntax and a plain-English explanation for each.",
    date: "2026-09-26",
    tags: ["Docker", "DevOps", "Cheat sheet"],
    cover: "terminal",
    intro: "Docker has hundreds of flags, but day to day you use about twenty commands: build an image, run a container, look inside it, and clean up afterwards. This docker commands cheat sheet groups them by task, so you can find how to exec into a container or remove all stopped containers without reading the full CLI reference. Examples use the current docker compose syntax (with a space), not the older docker-compose binary.",
    relatedDocs: [{ label: "Docker documentation", href: "/docs/docker" }],
    sections: [
      {
        heading: "Images",
        items: [
          { term: "docker build", syntax: "docker build -t myapp:1.0 .", description: "Builds an image from the Dockerfile in the current directory and tags it with a name and version." },
          { term: "docker images", syntax: "docker images", description: "Lists images stored locally, with tag, ID, and size." },
          { term: "docker pull", syntax: "docker pull nginx:latest", description: "Downloads an image from a registry such as Docker Hub." },
          { term: "docker push", syntax: "docker push user/myapp:1.0", description: "Uploads a tagged image to a registry. Run docker login first." },
          { term: "docker rmi", syntax: "docker rmi <image>", description: "Deletes a local image. Fails if a container still uses it unless you add -f." },
        ],
      },
      {
        heading: "Running containers",
        items: [
          { term: "docker run", syntax: "docker run -d -p 8080:80 --name web nginx", description: "Creates and starts a container. -d runs it in the background, -p maps host port 8080 to container port 80." },
          { term: "docker ps", syntax: "docker ps -a", description: "Lists running containers. Add -a to include stopped ones." },
          { term: "docker stop", syntax: "docker stop <container>", description: "Gracefully stops a running container by sending SIGTERM, then SIGKILL after a timeout." },
          { term: "docker start", syntax: "docker start <container>", description: "Starts a stopped container again with its previous configuration." },
          { term: "docker restart", syntax: "docker restart <container>", description: "Stops and starts a container in one step." },
          { term: "docker rm", syntax: "docker rm <container>", description: "Removes a stopped container. Add -f to force-remove a running one." },
        ],
      },
      {
        heading: "Inspecting & debugging",
        items: [
          { term: "docker logs", syntax: "docker logs -f --tail 100 <container>", description: "Shows container output. -f follows new lines live, --tail limits how many old lines are printed." },
          { term: "docker exec", syntax: "docker exec -it <container> sh", description: "Opens an interactive shell inside a running container. Use bash if the image includes it." },
          { term: "docker inspect", syntax: "docker inspect <container>", description: "Returns low-level JSON details: IP address, mounts, environment variables, and config." },
          { term: "docker stats", syntax: "docker stats", description: "Live view of CPU, memory, and network usage for running containers." },
          { term: "docker cp", syntax: "docker cp <container>:/app/file.txt .", description: "Copies files between a container and the host, in either direction." },
        ],
      },
      {
        heading: "Docker Compose",
        items: [
          { term: "docker compose up", syntax: "docker compose up -d --build", description: "Creates and starts all services in compose.yaml. --build rebuilds images first, -d detaches." },
          { term: "docker compose down", syntax: "docker compose down -v", description: "Stops and removes the project's containers and networks. -v also deletes named volumes." },
          { term: "docker compose ps", syntax: "docker compose ps", description: "Lists the containers belonging to the current Compose project." },
          { term: "docker compose logs", syntax: "docker compose logs -f <service>", description: "Streams logs for one service, or all services if none is named." },
          { term: "docker compose exec", syntax: "docker compose exec <service> sh", description: "Runs a command in a running service container. Unlike run, it does not create a new one." },
        ],
      },
      {
        heading: "Cleaning up disk space",
        items: [
          { term: "docker system df", syntax: "docker system df", description: "Shows how much disk space images, containers, and volumes are using." },
          { term: "docker container prune", syntax: "docker container prune", description: "Removes all stopped containers." },
          { term: "docker image prune", syntax: "docker image prune -a", description: "Removes dangling images; -a removes every image not used by a container." },
          { term: "docker system prune", syntax: "docker system prune", description: "Removes stopped containers, unused networks, and dangling images. Add --volumes to include unused volumes — this deletes data." },
        ],
      },
    ],
  },
  {
    slug: "sql-cheat-sheet",
    title: "SQL Cheat Sheet: Queries, Joins & Aggregates Explained",
    description: "A practical SQL commands cheat sheet covering SELECT, WHERE vs HAVING, every JOIN type, GROUP BY aggregates, and INSERT/UPDATE/DELETE — with syntax and one-line explanations.",
    date: "2026-09-27",
    tags: ["SQL", "Databases", "Cheat sheet"],
    cover: "database",
    intro: "SQL hasn't changed much in decades, and that's why it stays one of the most searched skills in tech. This SQL cheat sheet covers the statements you'll use in real work: selecting and filtering rows, understanding inner join vs left join, aggregating with GROUP BY, and changing data safely. Syntax is standard SQL and works in PostgreSQL, MySQL, and SQL Server unless noted.",
    relatedDocs: [{ label: "PostgreSQL documentation", href: "/docs/postgresql~18" }],
    sections: [
      {
        heading: "Selecting & filtering",
        items: [
          { term: "SELECT", syntax: "SELECT col1, col2 FROM table", description: "Returns the chosen columns from a table. SELECT * returns every column." },
          { term: "WHERE", syntax: "SELECT * FROM users WHERE age > 30", description: "Filters rows before any grouping happens. Supports AND, OR, and NOT." },
          { term: "DISTINCT", syntax: "SELECT DISTINCT country FROM users", description: "Removes duplicate rows from the result." },
          { term: "ORDER BY", syntax: "ORDER BY created_at DESC", description: "Sorts results. Ascending is the default; add DESC to reverse." },
          { term: "LIMIT", syntax: "SELECT * FROM users LIMIT 10", description: "Returns at most N rows. SQL Server uses SELECT TOP 10 instead." },
          { term: "LIKE", syntax: "WHERE name LIKE 'A%'", description: "Pattern match: % matches any run of characters, _ matches exactly one." },
          { term: "IN / BETWEEN", syntax: "WHERE id IN (1, 2, 3)", description: "IN matches any value in a list; BETWEEN a AND b matches an inclusive range." },
          { term: "IS NULL", syntax: "WHERE email IS NULL", description: "Tests for missing values. Use this, not = NULL, which never matches." },
        ],
      },
      {
        heading: "Joins",
        items: [
          { term: "INNER JOIN", syntax: "FROM a INNER JOIN b ON a.id = b.a_id", description: "Returns only rows that have a match in both tables." },
          { term: "LEFT JOIN", syntax: "FROM a LEFT JOIN b ON a.id = b.a_id", description: "Returns every row from the left table, with NULLs where the right table has no match." },
          { term: "RIGHT JOIN", syntax: "FROM a RIGHT JOIN b ON a.id = b.a_id", description: "Returns every row from the right table, with NULLs where the left has no match. Most people swap the tables and use LEFT JOIN." },
          { term: "FULL OUTER JOIN", syntax: "FROM a FULL OUTER JOIN b ON a.id = b.a_id", description: "Returns all rows from both tables, matched where possible. Not supported in MySQL." },
          { term: "CROSS JOIN", syntax: "FROM a CROSS JOIN b", description: "Returns every combination of rows from both tables (a Cartesian product)." },
          { term: "Self join", syntax: "FROM employees e JOIN employees m ON e.manager_id = m.id", description: "Joins a table to itself using aliases, useful for hierarchies like employee and manager." },
        ],
      },
      {
        heading: "Aggregating & grouping",
        items: [
          { term: "COUNT / SUM / AVG", syntax: "SELECT COUNT(*), AVG(price) FROM orders", description: "Aggregate functions that collapse many rows into one value. COUNT(col) ignores NULLs; COUNT(*) does not." },
          { term: "MIN / MAX", syntax: "SELECT MAX(price) FROM orders", description: "Returns the smallest or largest value in a column." },
          { term: "GROUP BY", syntax: "SELECT country, COUNT(*) FROM users GROUP BY country", description: "Splits rows into groups so aggregates are calculated per group." },
          { term: "HAVING", syntax: "GROUP BY country HAVING COUNT(*) > 100", description: "Filters groups after aggregation. Use WHERE to filter rows, HAVING to filter groups." },
        ],
      },
      {
        heading: "Modifying data",
        items: [
          { term: "INSERT", syntax: "INSERT INTO users (name, age) VALUES ('Sam', 28)", description: "Adds a new row. List the columns explicitly so schema changes don't break it." },
          { term: "UPDATE", syntax: "UPDATE users SET age = 29 WHERE id = 1", description: "Changes existing rows. Without a WHERE clause it updates every row." },
          { term: "DELETE", syntax: "DELETE FROM users WHERE id = 1", description: "Removes matching rows. Without a WHERE clause it deletes all rows." },
          { term: "TRUNCATE", syntax: "TRUNCATE TABLE logs", description: "Removes all rows quickly and resets the table. Cannot be filtered with WHERE." },
        ],
      },
      {
        heading: "Subqueries & CTEs",
        items: [
          { term: "Subquery", syntax: "WHERE id IN (SELECT user_id FROM orders)", description: "A query nested inside another query, used to filter or compute values." },
          { term: "WITH (CTE)", syntax: "WITH recent AS (SELECT ...) SELECT * FROM recent", description: "Names a temporary result set so complex queries read top to bottom." },
          { term: "CASE", syntax: "CASE WHEN age >= 18 THEN 'adult' ELSE 'minor' END", description: "Conditional logic inside a query, like if/else for columns." },
          { term: "ROW_NUMBER()", syntax: "ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)", description: "Window function that numbers rows within each partition, often used to get the top N per group." },
        ],
      },
    ],
  },
  {
    slug: "linux-commands",
    title: "Linux Commands Cheat Sheet for Beginners & Developers",
    description: "Essential Linux terminal commands grouped by task — navigating, managing files, searching with grep and find, permissions with chmod, processes, and networking.",
    date: "2026-09-28",
    tags: ["Linux", "Terminal", "Cheat sheet"],
    cover: "terminal",
    intro: "Whether you're SSH-ing into a server, working in WSL, or using a Mac terminal, the same core Linux commands come up again and again. This Linux commands cheat sheet is organised by what you're trying to do — find a file, read a log, fix permissions, or kill a stuck process — rather than alphabetically, so you can answer the question in front of you fast.",
    relatedDocs: [{ label: "Linux man documentation", href: "/docs/man" }],
    sections: [
      {
        heading: "Navigating",
        items: [
          { term: "pwd", syntax: "pwd", description: "Prints the full path of the current directory." },
          { term: "ls", syntax: "ls -lah", description: "Lists directory contents. -l is long format, -a includes hidden files, -h shows human-readable sizes." },
          { term: "cd", syntax: "cd /var/log", description: "Changes directory. cd .. goes up one level, cd - returns to the previous directory, cd alone goes home." },
          { term: "tree", syntax: "tree -L 2", description: "Shows the directory structure as a tree, limited to 2 levels. May need installing." },
        ],
      },
      {
        heading: "Files & directories",
        items: [
          { term: "mkdir", syntax: "mkdir -p a/b/c", description: "Creates a directory. -p creates missing parent directories too." },
          { term: "touch", syntax: "touch file.txt", description: "Creates an empty file, or updates the timestamp of an existing one." },
          { term: "cp", syntax: "cp -r src/ dest/", description: "Copies files. -r is required for directories." },
          { term: "mv", syntax: "mv old.txt new.txt", description: "Moves or renames a file or directory." },
          { term: "rm", syntax: "rm -rf folder/", description: "Deletes files. -r recurses into directories and -f skips prompts. There is no recycle bin, so double-check the path." },
          { term: "ln", syntax: "ln -s target linkname", description: "Creates a symbolic link (shortcut) pointing at target." },
        ],
      },
      {
        heading: "Viewing & searching",
        items: [
          { term: "cat", syntax: "cat file.txt", description: "Prints a file's contents to the terminal." },
          { term: "less", syntax: "less file.log", description: "Scrollable file viewer. Press / to search and q to quit." },
          { term: "head / tail", syntax: "tail -f app.log", description: "head shows the first lines, tail the last. tail -f follows a file live, ideal for logs." },
          { term: "grep", syntax: "grep -rn \"error\" .", description: "Searches text for a pattern. -r searches recursively, -n shows line numbers, -i ignores case." },
          { term: "find", syntax: "find . -name \"*.js\"", description: "Finds files by name, type, size, or modified time, starting from a directory." },
          { term: "wc", syntax: "wc -l file.txt", description: "Counts lines (-l), words (-w), or bytes (-c)." },
        ],
      },
      {
        heading: "Permissions & ownership",
        items: [
          { term: "chmod", syntax: "chmod 755 script.sh", description: "Sets permissions. 755 means owner can read/write/execute; group and others can read/execute. chmod +x makes a file executable." },
          { term: "chown", syntax: "chown user:group file", description: "Changes a file's owner and group. Usually needs sudo." },
          { term: "sudo", syntax: "sudo <command>", description: "Runs a command with administrator (root) privileges." },
        ],
      },
      {
        heading: "Processes & system",
        items: [
          { term: "ps", syntax: "ps aux | grep node", description: "Lists running processes. Piping to grep finds a specific one." },
          { term: "top / htop", syntax: "top", description: "Live view of CPU and memory use per process. htop is a friendlier alternative if installed." },
          { term: "kill", syntax: "kill -9 <PID>", description: "Ends a process by ID. Plain kill asks it to exit; -9 forces it. Try the plain version first." },
          { term: "df", syntax: "df -h", description: "Shows free and used disk space for each mounted filesystem." },
          { term: "du", syntax: "du -sh *", description: "Shows the size of each item in the current directory." },
          { term: "free", syntax: "free -h", description: "Displays total, used, and available memory." },
        ],
      },
      {
        heading: "Networking & downloads",
        items: [
          { term: "curl", syntax: "curl -I https://example.com", description: "Makes HTTP requests from the terminal. -I fetches only the response headers." },
          { term: "wget", syntax: "wget <url>", description: "Downloads a file from a URL." },
          { term: "ssh", syntax: "ssh user@host", description: "Opens a secure shell session on a remote machine." },
          { term: "ping", syntax: "ping -c 4 example.com", description: "Tests connectivity to a host. -c limits the number of packets." },
          { term: "ss", syntax: "ss -tulpn", description: "Lists listening ports and the processes using them. Replaces the older netstat." },
        ],
      },
    ],
  },
  {
    slug: "react-hooks",
    title: "React Hooks Cheat Sheet (Including React 19 Hooks)",
    description: "Every React hook worth knowing — useState, useEffect, useRef, useMemo vs useCallback, plus React 19 additions like useActionState, useOptimistic, and use — with syntax and when to reach for each.",
    date: "2026-09-29",
    tags: ["React", "JavaScript", "Cheat sheet"],
    cover: "container",
    intro: "React hooks are where most React questions start: how does the useEffect dependency array work, when do you need useMemo vs useCallback, and what changed in React 19? This React hooks cheat sheet groups hooks by the problem they solve, and includes the newer hooks for actions, optimistic UI, and reading promises so it stays useful for modern codebases.",
    relatedDocs: [{ label: "React documentation", href: "/docs/react" }],
    sections: [
      {
        heading: "State",
        items: [
          { term: "useState", syntax: "const [count, setCount] = useState(0)", description: "Adds a piece of state to a component. Calling the setter re-renders it. Use setCount(c => c + 1) when the new value depends on the old one." },
          { term: "useReducer", syntax: "const [state, dispatch] = useReducer(reducer, initial)", description: "State managed by a reducer function. Better than useState when updates are complex or several values change together." },
          { term: "useContext", syntax: "const theme = useContext(ThemeContext)", description: "Reads the nearest value of a context, avoiding prop drilling through many layers." },
        ],
      },
      {
        heading: "Effects & lifecycle",
        items: [
          { term: "useEffect", syntax: "useEffect(() => { ... return cleanup }, [deps])", description: "Runs side effects after render. It re-runs when any dependency changes; an empty array runs once on mount. Return a function to clean up." },
          { term: "useLayoutEffect", syntax: "useLayoutEffect(() => { ... }, [deps])", description: "Like useEffect but fires synchronously after DOM updates and before paint. Use for measuring layout to avoid flicker." },
          { term: "useEffectEvent", syntax: "const onTick = useEffectEvent(() => { ... })", description: "Lets an effect read the latest props or state without re-running when they change. Available in React 19.2 and later." },
        ],
      },
      {
        heading: "Refs",
        items: [
          { term: "useRef", syntax: "const inputRef = useRef(null)", description: "Holds a mutable value that persists across renders without triggering one. Commonly used to reach a DOM element." },
          { term: "useImperativeHandle", syntax: "useImperativeHandle(ref, () => ({ focus }))", description: "Customises what a parent sees when it holds a ref to your component. Rarely needed." },
        ],
      },
      {
        heading: "Performance",
        items: [
          { term: "useMemo", syntax: "const value = useMemo(() => compute(a), [a])", description: "Caches the result of an expensive calculation between renders until dependencies change." },
          { term: "useCallback", syntax: "const fn = useCallback(() => { ... }, [dep])", description: "Caches a function's identity between renders. useMemo caches a value; useCallback caches a function." },
          { term: "useTransition", syntax: "const [isPending, startTransition] = useTransition()", description: "Marks a state update as non-urgent so the UI stays responsive during heavy renders." },
          { term: "useDeferredValue", syntax: "const deferred = useDeferredValue(query)", description: "Returns a lagging copy of a value, letting urgent updates like typing render first." },
        ],
      },
      {
        heading: "React 19 additions",
        items: [
          { term: "use", syntax: "const data = use(promiseOrContext)", description: "Reads a promise or context during render, suspending until a promise resolves. Unlike other hooks, it can be called inside conditions." },
          { term: "useActionState", syntax: "const [state, formAction, isPending] = useActionState(action, initial)", description: "Manages form state driven by an action function, including a pending flag." },
          { term: "useOptimistic", syntax: "const [optimistic, addOptimistic] = useOptimistic(state, updateFn)", description: "Shows an immediate, temporary UI update while an async action is still in flight." },
          { term: "useFormStatus", syntax: "const { pending } = useFormStatus()", description: "Reads the status of the parent form from a child component. Imported from react-dom." },
        ],
      },
      {
        heading: "Utility hooks",
        items: [
          { term: "useId", syntax: "const id = useId()", description: "Generates a stable unique ID, safe for server rendering. Ideal for linking labels to inputs." },
          { term: "useSyncExternalStore", syntax: "useSyncExternalStore(subscribe, getSnapshot)", description: "Subscribes to an external store, such as a state library or browser API, in a concurrent-safe way." },
          { term: "useDebugValue", syntax: "useDebugValue(value)", description: "Adds a label to a custom hook in React DevTools." },
        ],
      },
    ],
  },
  {
    slug: "python-cheat-sheet",
    title: "Python Cheat Sheet: List, Dict & String Methods",
    description: "A quick-reference Python cheat sheet for list methods, dictionary methods, string methods, and comprehensions — including append vs extend and sorted vs sort.",
    date: "2026-09-29",
    tags: ["Python", "Cheat sheet"],
    cover: "guide",
    intro: "Python's built-in types cover most everyday work, but the method names blur together: append or extend, sort or sorted, get or a bracket lookup. This Python cheat sheet lists the list methods, dictionary methods, and string methods you'll use most, with syntax, and notes on which ones change the original object.",
    relatedDocs: [{ label: "Python documentation", href: "/docs/python~3.14" }],
    sections: [
      {
        heading: "List methods",
        items: [
          { term: "append()", syntax: "lst.append(x)", description: "Adds one item to the end. Mutates the list; returns None." },
          { term: "extend()", syntax: "lst.extend(iterable)", description: "Adds every item from another iterable. append([1,2]) adds one nested list, extend([1,2]) adds two items." },
          { term: "insert()", syntax: "lst.insert(i, x)", description: "Inserts x before index i." },
          { term: "remove()", syntax: "lst.remove(x)", description: "Removes the first item equal to x. Raises ValueError if not found." },
          { term: "pop()", syntax: "lst.pop(i)", description: "Removes and returns the item at index i, or the last item if omitted." },
          { term: "index()", syntax: "lst.index(x)", description: "Returns the index of the first x. Raises ValueError if missing." },
          { term: "count()", syntax: "lst.count(x)", description: "Returns how many times x appears." },
          { term: "sort()", syntax: "lst.sort(key=len, reverse=True)", description: "Sorts the list in place and returns None. Use sorted(lst) to get a new list instead." },
          { term: "reverse()", syntax: "lst.reverse()", description: "Reverses the list in place." },
          { term: "copy()", syntax: "lst.copy()", description: "Returns a shallow copy. Nested objects are still shared." },
        ],
      },
      {
        heading: "Dictionary methods",
        items: [
          { term: "get()", syntax: "d.get(key, default)", description: "Returns the value for key, or default (None if omitted) instead of raising KeyError." },
          { term: "keys() / values() / items()", syntax: "for k, v in d.items()", description: "Return views of the keys, values, or (key, value) pairs. items() is the standard way to loop over a dict." },
          { term: "update()", syntax: "d.update(other)", description: "Merges another dict in, overwriting keys that already exist. The | operator does this into a new dict." },
          { term: "setdefault()", syntax: "d.setdefault(key, [])", description: "Returns the value for key, inserting the default first if the key is missing." },
          { term: "pop()", syntax: "d.pop(key, default)", description: "Removes key and returns its value. Raises KeyError if missing and no default is given." },
          { term: "dict comprehension", syntax: "{k: v for k, v in pairs}", description: "Builds a dict from any iterable in one expression." },
        ],
      },
      {
        heading: "String methods",
        items: [
          { term: "split()", syntax: "s.split(\",\")", description: "Splits a string into a list on a separator. With no argument it splits on whitespace." },
          { term: "join()", syntax: "\", \".join(items)", description: "Joins an iterable of strings using the string it's called on as the separator." },
          { term: "strip()", syntax: "s.strip()", description: "Removes leading and trailing whitespace. lstrip and rstrip do one side only." },
          { term: "replace()", syntax: "s.replace(old, new)", description: "Returns a copy with occurrences of old replaced. Strings are immutable, so assign the result." },
          { term: "startswith() / endswith()", syntax: "s.startswith(\"http\")", description: "Returns True if the string begins or ends with the given text, or any of a tuple of options." },
          { term: "find()", syntax: "s.find(sub)", description: "Returns the index of the first match, or -1. index() does the same but raises an error." },
          { term: "lower() / upper()", syntax: "s.lower()", description: "Returns the string in lower or upper case. Use casefold() for caseless comparison." },
          { term: "f-string", syntax: "f\"{name} is {age:>3}\"", description: "Embeds expressions in a string with optional formatting. The preferred way to build strings." },
        ],
      },
      {
        heading: "Comprehensions & built-ins",
        items: [
          { term: "List comprehension", syntax: "[x * 2 for x in nums if x > 0]", description: "Builds a new list by transforming and filtering an iterable in one line." },
          { term: "sorted()", syntax: "sorted(items, key=lambda x: x[1])", description: "Returns a new sorted list from any iterable and leaves the original untouched." },
          { term: "enumerate()", syntax: "for i, x in enumerate(lst)", description: "Yields index and item pairs while looping." },
          { term: "zip()", syntax: "zip(a, b)", description: "Pairs items from several iterables, stopping at the shortest." },
          { term: "any() / all()", syntax: "any(x > 5 for x in nums)", description: "any is True if at least one item is truthy; all is True only if every item is." },
        ],
      },
    ],
  },
];

export function allCheatSheets(): CheatSheet[] {
  return [...cheatsheets].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
export function getCheatSheet(slug: string): CheatSheet | undefined {
  return cheatsheets.find((c) => c.slug === slug);
}