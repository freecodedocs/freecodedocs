import "server-only";

export type CompareRow = { label: string; a: string; b: string };
export type ComparisonPost = {
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
  subjectA: { name: string; tagline: string; docsHref?: string };
  subjectB: { name: string; tagline: string; docsHref?: string };
  intro: string;
  rows: CompareRow[];
  chooseA: string[];
  chooseB: string[];
  verdict: string;
  faq?: { q: string; a: string }[];
};

export const comparisons: ComparisonPost[] = [
  {
    slug: "react-vs-vue",
    title: "React vs Vue: Which Should You Learn in 2026?",
    description: "A practical comparison of React and Vue for developers deciding which framework to learn first — covering learning curve, ecosystem, performance, and job market.",
    date: "2026-09-22",
    tags: ["React", "Vue.js", "Comparison"],
    cover: "compare",
    subjectA: { name: "React", tagline: "A UI library maintained by Meta, built around components and JSX.", docsHref: "/docs/react" },
    subjectB: { name: "Vue.js", tagline: "A progressive framework built around single-file components and a template syntax closer to HTML.", docsHref: "/docs/vue~3" },
    intro: "Both React and Vue solve the same core problem — building UI out of reusable, reactive components — and both are mature, well-documented, and widely used in production. The real differences show up in how much JavaScript-first syntax you're comfortable with, how much structure you want a framework to impose, and which ecosystem you'll be working in day to day.",
    rows: [
      { label: "Syntax", a: "JSX — HTML-like syntax written inside JavaScript", b: "Templates — HTML-like syntax with directives, closer to plain HTML" },
      { label: "Learning curve", a: "Steeper at first; JSX and hooks take adjustment if you're new to React's mental model", b: "Gentler; templates read closer to standard HTML and CSS" },
      { label: "State management", a: "Built-in hooks (useState, useReducer); larger apps often add a separate library", b: "Built-in reactivity system (ref, reactive) that feels more automatic by default" },
      { label: "Ecosystem size", a: "Larger — more third-party libraries, more Stack Overflow answers, more tutorials", b: "Smaller but well-curated; official libraries cover routing and state directly" },
      { label: "Governance", a: "Maintained by Meta, with community RFC process", b: "Maintained by an independent team led by its original creator" },
      { label: "Typical use case", a: "Large-scale apps, teams already in a JavaScript-heavy stack, mobile via React Native", b: "Apps that want less boilerplate, gradual adoption into existing HTML pages" },
    ],
    chooseA: [
      "You want the largest job market and library ecosystem",
      "Your team is already deep in the JavaScript/TypeScript ecosystem",
      "You might need React Native for mobile later",
    ],
    chooseB: [
      "You want a gentler learning curve, especially coming from plain HTML/CSS",
      "You're adding interactivity to an existing site incrementally, not building a full SPA from scratch",
      "You prefer more built-in conventions over assembling your own toolchain",
    ],
    verdict: "If you're optimizing for job availability and long-term ecosystem size, React is the safer default. If you're optimizing for how quickly you can become productive and enjoy writing the code day to day, Vue is very often the pleasanter experience. Neither is a wrong choice — both are used in large production systems, and skills in one transfer reasonably well to the other.",
    faq: [
      { q: "Is React or Vue better for beginners?", a: "Vue's template syntax is generally considered easier to pick up for developers coming from plain HTML and CSS, since it looks closer to markup you already know. React's JSX and hook-based patterns take a bit more adjustment." },
      { q: "Which pays more, React or Vue jobs?", a: "React roles are significantly more common, which tends to mean more open positions overall, though not necessarily a higher rate per role — Vue developers are in real demand too, especially in teams that already standardized on it." },
      { q: "Can I use React and Vue in the same project?", a: "Technically yes with enough effort, but it's not a common or recommended pattern — the two have different reactivity models and it adds real complexity for little benefit. Pick one per project." },
    ],
  },
  {
    slug: "rest-vs-graphql",
    title: "REST vs GraphQL: Choosing an API Style for Your Next Project",
    description: "A practical comparison of REST and GraphQL for API design — covering data fetching, caching, tooling, and which one fits which kind of project.",
    date: "2026-09-18",
    tags: ["API design", "GraphQL", "Comparison"],
    cover: "compare",
    subjectA: { name: "REST", tagline: "An architectural style using standard HTTP methods and resource-based URLs." },
    subjectB: { name: "GraphQL", tagline: "A query language that lets clients request exactly the fields they need from a single endpoint." },
    intro: "REST and GraphQL aren't really competitors in the way they're often framed — they're two different answers to the same question: how should a client ask a server for data? REST answers with fixed, resource-shaped endpoints; GraphQL answers by letting the client describe exactly what it wants. Which one fits depends heavily on how many different clients you're serving and how your data is shaped.",
    rows: [
      { label: "Endpoint structure", a: "Multiple endpoints, one per resource (/users, /posts)", b: "A single endpoint; the query itself determines what's returned" },
      { label: "Over-fetching / under-fetching", a: "Common — a fixed response shape often returns more or less than the client needs", b: "Minimized — the client specifies exactly the fields it wants" },
      { label: "Caching", a: "Simple — standard HTTP caching works out of the box per URL", b: "More involved — typically needs a client library (like Apollo or urql) for effective caching" },
      { label: "Versioning", a: "Usually via URL or header versioning (/v1/, /v2/)", b: "Typically avoided — fields are added and deprecated within a single schema" },
      { label: "Learning curve", a: "Lower if you already know HTTP", b: "Higher — a new query language and schema/type system to learn" },
      { label: "Best fit", a: "Simple CRUD APIs, public APIs, situations needing strong HTTP caching", b: "Multiple clients with different data needs (web, mobile) hitting the same backend" },
    ],
    chooseA: [
      "Your API is simple, resource-shaped, and mostly CRUD",
      "You want to lean on standard HTTP caching without extra tooling",
      "Your team and API consumers are more familiar with REST conventions",
    ],
    chooseB: [
      "Multiple clients (web, iOS, Android) need different subsets of the same data",
      "You want to reduce the number of round trips for nested/related data",
      "Your frontend team wants to move independently of backend endpoint changes",
    ],
    verdict: "REST remains the simpler, more broadly understood default, and it's usually the right call for straightforward APIs, especially public ones where caching and tooling simplicity matter. GraphQL earns its added complexity specifically when you have multiple different clients with different data needs hitting the same backend — that's the scenario it was built for, and it's noticeably worse than REST for simple, single-client APIs.",
    faq: [
      { q: "Is GraphQL replacing REST?", a: "No — both remain widely used, often in the same company for different purposes. GraphQL is common for complex, multi-client applications, while REST remains the default for simpler or public-facing APIs." },
      { q: "Is GraphQL harder to learn than REST?", a: "Generally yes, if you already know HTTP. GraphQL introduces its own type system, schema definition, and query language, which is real additional surface area beyond REST's use of standard HTTP methods." },
      { q: "Does GraphQL always perform better than REST?", a: "Not automatically. GraphQL reduces over-fetching, but a poorly designed GraphQL schema can introduce its own performance problems, like the N+1 query issue, that a well-designed REST API wouldn't have." },
    ],
  },
  {
    slug: "typescript-vs-javascript",
    title: "TypeScript vs JavaScript: Is TypeScript Worth It in 2026?",
    description: "A practical TypeScript vs JavaScript comparison — type safety, learning curve, tooling, performance, and whether you should learn TypeScript first or after JavaScript.",
    date: "2026-09-27",
    tags: ["TypeScript", "JavaScript", "Comparison"],
    cover: "compare",
    subjectA: { name: "TypeScript", tagline: "A typed superset of JavaScript that adds static types and compiles down to plain JavaScript.", docsHref: "/docs/typescript" },
    subjectB: { name: "JavaScript", tagline: "The dynamically typed language of the web, running natively in every browser and in Node.js.", docsHref: "/docs/javascript" },
    intro: "TypeScript isn't a replacement for JavaScript — it's JavaScript with a type system layered on top, and everything you write in TypeScript ends up as JavaScript before it runs. So the real question isn't which one is better, but whether the safety and tooling of static types are worth the extra setup and syntax for what you're building. For most team projects and any codebase that will live for years, the answer has increasingly been yes.",
    rows: [
      { label: "Typing", a: "Static — types are checked before the code runs", b: "Dynamic — types are only known at runtime" },
      { label: "Error detection", a: "Many mistakes (typos, wrong argument types, missing properties) are caught in the editor or at build time", b: "Most of those mistakes only surface when the code actually runs" },
      { label: "Learning curve", a: "Steeper — you need JavaScript first, plus generics, interfaces, and type narrowing", b: "Gentler — fewer concepts, and you can run code with no setup" },
      { label: "Tooling & autocomplete", a: "Excellent — types power accurate autocomplete, refactoring, and inline docs", b: "Good, but relies on inference and JSDoc comments for the same experience" },
      { label: "Build step", a: "Required in most setups, though recent Node.js versions can run simple TypeScript files by stripping types", b: "None — runs directly in the browser or Node.js" },
      { label: "Runtime performance", a: "Identical — types are removed at compile time and add no runtime cost", b: "Identical — it is the same JavaScript at runtime" },
      { label: "Best for", a: "Large codebases, teams, long-lived apps, and shared libraries", b: "Small scripts, prototypes, learning, and quick experiments" },
    ],
    chooseA: [
      "You're working in a team or on a codebase that will be maintained for years",
      "You want stronger autocomplete, safer refactoring, and fewer runtime surprises",
      "You're building a library or API that other developers will consume",
    ],
    chooseB: [
      "You're just learning to program for the web and want to focus on core concepts",
      "You're writing a quick script, prototype, or small site",
      "You want zero build tooling and the fastest path from idea to running code",
    ],
    verdict: "Learn JavaScript first — TypeScript assumes you understand it, and every TypeScript error message makes more sense once you do. After that, TypeScript is worth adopting for almost any project bigger than a script, because it catches a whole class of bugs before they reach users and makes large codebases far easier to change. Since it compiles to JavaScript, it costs you nothing at runtime.",
    faq: [
      { q: "Should I learn TypeScript or JavaScript first?", a: "JavaScript first. TypeScript is a superset, so all JavaScript is valid TypeScript, and understanding how JavaScript behaves makes TypeScript's types far easier to reason about. Most people become comfortable with JavaScript basics, then add TypeScript." },
      { q: "Is TypeScript faster than JavaScript?", a: "No. TypeScript is compiled to JavaScript, and the types are erased, so runtime speed is the same. The benefit is developer productivity and fewer bugs, not execution speed." },
      { q: "Can I migrate an existing JavaScript project to TypeScript gradually?", a: "Yes. You can enable the allowJs option, rename files from .js to .ts one at a time, and tighten the compiler's strictness settings as you go, so there's no need for a big-bang rewrite." },
    ],
  },
  {
    slug: "python-vs-javascript",
    title: "Python vs JavaScript: Which Should You Learn First?",
    description: "Python vs JavaScript compared for beginners — syntax, use cases, web development, data science, jobs, and which language fits your goals.",
    date: "2026-09-28",
    tags: ["Python", "JavaScript", "Comparison"],
    cover: "compare",
    subjectA: { name: "Python", tagline: "A general-purpose language known for readable syntax and dominance in data science, AI, and automation.", docsHref: "/docs/python~3.14" },
    subjectB: { name: "JavaScript", tagline: "The language of the web, running in every browser and, through Node.js, on the server too.", docsHref: "/docs/javascript" },
    intro: "Python and JavaScript are consistently two of the most widely used programming languages, and both are great first languages. They just point in different directions: Python leads in data science, machine learning, and scripting, while JavaScript is the only language that runs natively in the browser. The better first choice depends less on which is easier and more on what you want to build.",
    rows: [
      { label: "Syntax", a: "Clean and readable; indentation defines code blocks", b: "C-style syntax with curly braces and semicolons; more quirks to learn" },
      { label: "Learning curve", a: "Generally considered easier for absolute beginners", b: "Easy to start, but has more surprising behaviour, such as type coercion and asynchronous code" },
      { label: "Web development", a: "Backend only, using frameworks like Django, Flask, or FastAPI", b: "Frontend and backend — the only language that runs in the browser, plus Node.js on the server" },
      { label: "Data science & AI", a: "The default choice, with libraries like NumPy, pandas, PyTorch, and scikit-learn", b: "Possible, but far smaller ecosystem for data and machine learning work" },
      { label: "Mobile & desktop apps", a: "Limited; not a common choice for mobile", b: "Strong via React Native, Electron, and similar frameworks" },
      { label: "Automation & scripting", a: "Excellent — a standard choice for scripts, file handling, and DevOps tasks", b: "Capable through Node.js, but Python is more common for one-off scripts" },
      { label: "Execution speed", a: "Generally slower for CPU-heavy work; heavy libraries offload to C", b: "Generally faster for typical workloads thanks to modern JIT engines" },
    ],
    chooseA: [
      "You're interested in data science, machine learning, or AI",
      "You want the gentlest introduction to programming concepts",
      "You want to automate tasks or write scripts and backend services",
    ],
    chooseB: [
      "You want to build websites and web apps, and see results in a browser immediately",
      "You want one language for both frontend and backend",
      "You're interested in building mobile or desktop apps with web technologies",
    ],
    verdict: "Pick by goal, not by hype. If you want to work in data, AI, or automation, start with Python. If you want to build for the web, start with JavaScript — you can't avoid it there. If you're undecided, Python's readable syntax makes it a slightly smoother first step, and the concepts you learn transfer directly to JavaScript later.",
    faq: [
      { q: "Is Python or JavaScript better for beginners?", a: "Python is usually considered slightly easier for complete beginners because of its readable, minimal syntax. JavaScript gives faster visual feedback because you can build something interactive in a browser right away. Either is a fine first language." },
      { q: "Which pays more, Python or JavaScript?", a: "Salaries are broadly comparable and depend far more on role, location, and experience than on language. Python roles in machine learning and data engineering often sit at the higher end, while JavaScript has the larger number of web development openings." },
      { q: "Can I learn both Python and JavaScript?", a: "Yes, and many developers do. Once you know one, the core ideas — variables, functions, loops, data structures — carry over, so the second language is much faster to learn." },
    ],
  },
  {
    slug: "sql-vs-nosql",
    title: "SQL vs NoSQL Databases: How to Choose the Right One",
    description: "SQL vs NoSQL compared — data models, scaling, consistency, flexibility, and when to choose a relational database like PostgreSQL over a NoSQL database like MongoDB.",
    date: "2026-09-29",
    tags: ["Databases", "SQL", "NoSQL", "Comparison"],
    cover: "compare",
    subjectA: { name: "SQL (Relational)", tagline: "Databases that store data in tables with a fixed schema and query it with SQL, such as PostgreSQL and MySQL." },
    subjectB: { name: "NoSQL", tagline: "A family of non-relational databases — document, key-value, wide-column, and graph — with flexible data models, such as MongoDB and Redis." },
    intro: "The SQL vs NoSQL debate is often framed as old versus new, but it's really a question of data shape and access patterns. Relational databases excel when your data has clear relationships and you need strong consistency. NoSQL databases trade some of that structure for flexibility and, in many designs, easier horizontal scaling. Note that NoSQL is a broad umbrella, so the right comparison is often one specific database against another.",
    rows: [
      { label: "Data model", a: "Tables with rows and columns, linked by foreign keys", b: "Varies by type: documents, key-value pairs, wide columns, or graphs" },
      { label: "Schema", a: "Predefined and enforced; changes need migrations", b: "Flexible or schema-less; records in one collection can differ" },
      { label: "Relationships & joins", a: "First-class — JOINs are built for combining related tables", b: "Usually limited; data is often denormalised or embedded instead" },
      { label: "Consistency", a: "Strong ACID transactions are the default", b: "Varies — many offer tunable or eventual consistency, and some now support ACID transactions" },
      { label: "Scaling", a: "Traditionally scales vertically; horizontal scaling is possible but more complex", b: "Many are designed to scale horizontally across servers" },
      { label: "Query language", a: "Standard SQL, widely known and portable between systems", b: "Database-specific query APIs, which are less portable" },
      { label: "Best fit", a: "Financial systems, e-commerce orders, and anything with complex relationships and reporting needs", b: "Content catalogs, caching, real-time feeds, and rapidly changing or unstructured data" },
    ],
    chooseA: [
      "Your data is structured with clear relationships between entities",
      "You need strong transactional guarantees, such as payments or inventory",
      "You expect to run complex queries, joins, and reports",
    ],
    chooseB: [
      "Your data is unstructured or its shape changes frequently",
      "You need very high write throughput or horizontal scale across many servers",
      "Your access pattern is simple, such as fetching a whole document or value by key",
    ],
    verdict: "For most applications, start with a relational database. PostgreSQL in particular is flexible enough to handle structured data, JSON documents, and full-text search, and SQL is a skill that transfers everywhere. Reach for a NoSQL database when you have a specific need it serves well — extreme scale, a caching layer, or genuinely schema-less data — and plenty of production systems use both side by side.",
    faq: [
      { q: "Is NoSQL faster than SQL?", a: "Not inherently. Performance depends on the workload, indexing, and data model. NoSQL can be faster for simple lookups by key or for massive write volumes, while SQL databases are often faster for complex queries involving joins." },
      { q: "Can SQL databases scale?", a: "Yes. Techniques such as read replicas, partitioning, and sharding let relational databases handle very large workloads, and many modern SQL systems offer distributed options. It is typically more work than with databases designed for horizontal scale from the start." },
      { q: "Should I use MongoDB or PostgreSQL?", a: "If your data is relational or you need strong consistency, PostgreSQL is usually the safer default. MongoDB suits document-shaped data that you mostly read and write as a whole. PostgreSQL's JSON support also covers many cases people choose MongoDB for." },
    ],
  },
  {
    slug: "docker-vs-kubernetes",
    title: "Docker vs Kubernetes: What's the Difference and Do You Need Both?",
    description: "Docker vs Kubernetes explained — containers vs orchestration, how they work together, when Docker Compose is enough, and when you actually need Kubernetes.",
    date: "2026-09-20",
    tags: ["Docker", "Kubernetes", "DevOps", "Comparison"],
    cover: "compare",
    subjectA: { name: "Docker", tagline: "A platform for building, packaging, and running applications in containers.", docsHref: "/docs/docker" },
    subjectB: { name: "Kubernetes", tagline: "An open-source orchestration system that deploys, scales, and manages containers across a cluster of machines.", docsHref: "/docs/kubernetes" },
    intro: "Docker and Kubernetes are not alternatives — they solve different problems and are usually used together. Docker packages your application and its dependencies into a container image and runs it on one machine. Kubernetes takes many containers and manages them across many machines: scheduling, scaling, restarting failures, and rolling out updates. The useful question is not which to choose, but whether your project has grown to the point where you need orchestration.",
    rows: [
      { label: "What it is", a: "A container platform and toolset for building and running containers", b: "A container orchestration system for managing containers at scale" },
      { label: "Scope", a: "Typically a single host", b: "A cluster of many machines (nodes)" },
      { label: "Main job", a: "Package an app into an image and run it consistently anywhere", b: "Schedule, scale, heal, and update many containers automatically" },
      { label: "Scaling", a: "Manual, or basic with Docker Compose or Swarm", b: "Built in, including autoscaling based on load" },
      { label: "Self-healing", a: "Restart policies for individual containers", b: "Automatically replaces failed containers and reschedules them to healthy nodes" },
      { label: "Learning curve", a: "Approachable — a handful of commands covers most needs", b: "Steep — many concepts such as pods, deployments, services, and ingress" },
      { label: "Operational cost", a: "Low", b: "Higher, unless you use a managed service such as EKS, GKE, or AKS" },
    ],
    chooseA: [
      "You're running one app, or a few services, on a single server",
      "You want consistent local development and simple deployments",
      "Docker Compose already meets your needs, and you want to keep things simple",
    ],
    chooseB: [
      "You run many services across multiple servers and need automated scaling and recovery",
      "You need zero-downtime rolling updates and rollbacks at scale",
      "Your team has the operational capacity, or you'll use a managed Kubernetes service",
    ],
    verdict: "Learn Docker first — it's the foundation, and Kubernetes assumes you understand containers and images. Many small and mid-sized projects never need more than Docker and Docker Compose, and adopting Kubernetes too early adds significant complexity. Move to Kubernetes when scaling, resilience, and multi-server management become real problems, not before.",
    faq: [
      { q: "Do I need Docker to use Kubernetes?", a: "You need container images, and Docker is the most common way to build them. Kubernetes no longer uses Docker Engine as its runtime directly (it uses runtimes such as containerd), but images built with Docker run on Kubernetes without changes." },
      { q: "Is Docker Compose the same as Kubernetes?", a: "No. Docker Compose defines and runs multi-container applications, usually on one machine. Kubernetes orchestrates containers across a cluster with scaling, self-healing, and rolling updates." },
      { q: "Should I learn Docker or Kubernetes first?", a: "Docker. Kubernetes builds on container concepts, so understanding images, containers, volumes, and networking first makes Kubernetes far less confusing." },
    ],
  },
  {
    slug: "tailwind-vs-bootstrap",
    title: "Tailwind CSS vs Bootstrap: Which CSS Framework Should You Use?",
    description: "Tailwind CSS vs Bootstrap compared — utility classes vs prebuilt components, customisation, file size, learning curve, and which fits your project in 2026.",
    date: "2026-09-25",
    tags: ["CSS", "Tailwind CSS", "Bootstrap", "Comparison"],
    cover: "compare",
    subjectA: { name: "Tailwind CSS", tagline: "A utility-first framework where you build designs by composing small single-purpose classes in your markup.", docsHref: "/docs/tailwindcss" },
    subjectB: { name: "Bootstrap", tagline: "A component-based framework with prebuilt buttons, navbars, modals, and a responsive grid.", docsHref: "/docs/bootstrap~5" },
    intro: "Bootstrap and Tailwind CSS both speed up styling, but they take opposite approaches. Bootstrap hands you finished components with a recognisable look, while Tailwind gives you low-level utility classes and leaves the design entirely up to you. Bootstrap gets you a working interface faster; Tailwind gets you a distinctive one with fewer overrides.",
    rows: [
      { label: "Approach", a: "Utility-first — compose classes like flex, p-4, and text-lg directly in HTML", b: "Component-first — use prebuilt classes like btn and navbar" },
      { label: "Design", a: "No default look; every design is custom", b: "A recognisable default style unless you customise it" },
      { label: "Customisation", a: "Highly flexible through configuration and theme settings, with no overrides needed", b: "Customisable via Sass variables and CSS variables, but overriding defaults can get fiddly" },
      { label: "Learning curve", a: "Need to learn the utility class names and think in utilities", b: "Quick to start — copy component markup from the docs" },
      { label: "JavaScript components", a: "None included; pair with headless UI libraries or your own code", b: "Includes JavaScript for modals, dropdowns, carousels, and more" },
      { label: "File size", a: "Small in production — only the classes you use are generated", b: "Larger by default unless you import only the parts you need" },
      { label: "Markup", a: "Long class lists on elements, usually managed with components", b: "Shorter, more readable class names" },
    ],
    chooseA: [
      "You want a unique, custom design without fighting framework defaults",
      "You work with a component-based frontend such as React, Vue, or Svelte",
      "You want small production CSS and to keep styling next to your markup",
    ],
    chooseB: [
      "You need a working, responsive interface quickly, such as an admin panel or internal tool",
      "You want ready-made components and JavaScript behaviour out of the box",
      "Your team is more comfortable with traditional CSS class naming",
    ],
    verdict: "Choose Bootstrap when speed to a decent-looking interface matters more than a unique design — internal tools, prototypes, and admin dashboards. Choose Tailwind when you're building a custom brand experience or working in a component-driven framework, where long class lists are easy to reuse. Neither is objectively better; the right one matches your design needs and team habits.",
    faq: [
      { q: "Is Tailwind better than Bootstrap?", a: "Neither is universally better. Tailwind offers more design freedom and typically smaller production CSS, while Bootstrap offers faster setup with ready-made components. The best fit depends on whether you need a custom design or a quick standard one." },
      { q: "Is Tailwind or Bootstrap easier for beginners?", a: "Bootstrap is usually easier at first because you can copy prebuilt components and get a polished result quickly. Tailwind takes a little longer to learn but teaches you closer-to-the-metal CSS concepts along the way." },
      { q: "Can I use Tailwind and Bootstrap together?", a: "It's technically possible, but not recommended. Their styles can conflict and you'd ship redundant CSS. It's cleaner to pick one for a project." },
    ],
  },
];

export function allComparisons(): ComparisonPost[] {
  return [...comparisons].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
export function getComparison(slug: string): ComparisonPost | undefined {
  return comparisons.find((c) => c.slug === slug);
}