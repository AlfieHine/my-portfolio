export interface Project {
    id: string;
    title: string;
    category: string;             // Used on projects page (and home page card header)
    tag?: string;                 // Secondary label/ecosystem used on the home page (e.g., "Google Ecosystem")
    description: string;          // Full description used on projects page
    shortDescription?: string;    // Concise overview used on the home page cards (falls back to description if omitted)
    command: string;              // Terminal simulation command
    tech: string[];               // Technology badges
    metrics: string;              // High-level stat/metric (e.g., "16 Nodes / 0-Touch Deployment")
    outputJson: string[];         // Terminal simulation output lines
}

export const projects: Project[] = [
    {
        id: "workspace-automations",
        title: "Bespoke Workspace Escalation & Laptop Tracker",
        category: "Automations",
        tag: "Google Ecosystem",
        shortDescription: "Architected two custom, automated workflows within strict Google Workspace boundaries: a high-priority teacher help request system to upper management, and an end-to-end laptop loaning and asset tracking engine now daily used by staff.",
        description: "Architected two custom, automated workflows within strict Google Workspace boundaries: a high-priority teacher help request system to upper management, and an end-to-end laptop loaning and asset tracking engine now daily used by staff.",
        command: "clasp push && google-apps-script trigger run",
        tech: ["Google Apps Script", "Automated Workflows", "Education IT"],
        metrics: "2 Workflows / Active Daily Use",
        outputJson: [
            "<span class='text-cyan-400'>[GAS]</span> Connecting to Google Apps Script container bindings...",
            "<span class='text-emerald-400'>[SUCCESS]</span> Script deployment synchronized with Workspace environment.",
            "<span class='text-slate-300'>[TRIGGER]</span> High-priority escalation webhooks active for senior leadership.",
            "<span class='text-cyan-400'>[ASSETS]</span> Laptop loan tracking ledger initialized; database synched.",
            "<span class='text-emerald-400'>[COMPLETE]</span> All automated background triggers operational."
        ]
    },
    {
        id: "proxmox-homelab",
        title: "Monitored Self-Hosted Infrastructure Stack",
        category: "Homelab / Security",
        tag: "Proxmox / Docker",
        shortDescription: "Configured an isolated container host stack running web services, Nginx reverse proxy with automated SSL renewal, network security tunneling, and continuous uptime monitoring for hosted applications.",
        description: "Configured an isolated container host stack running web services, Nginx reverse proxy with automated SSL renewal, network security tunneling, and continuous uptime monitoring for hosted applications. Engineered a compact, highly structured 10-inch network rack hosting a multi-node Proxmox VE cluster with strict VLAN segmentation.",
        command: "pvesh get /cluster/resources --output-format json",
        tech: ["Proxmox VE", "Nginx / Reverse Proxy", "Docker"],
        metrics: "99.9% Uptime / Multi-VM Isolation",
        outputJson: [
            "<span class='text-cyan-400'>[CLUSTER]</span> Querying Proxmox Virtual Environment resource pool...",
            "<span class='text-slate-300'>[NODE-01]</span> CPU: Intel Core i5-12500T | RAM: 32GB ECC | Load: 0.14",
            "<span class='text-slate-300'>[CONTAINERS]</span> Active LXC instances: 12 running, 0 failed.",
            "<span class='text-cyan-400'>[PROXY]</span> Nginx reverse proxy routes verified; SSL/TLS termination active.",
            "<span class='text-emerald-400'>[HEALTH]</span> Storage pools healthy. ZFS scrub completed with 0 errors."
        ]
    },
    {
        id: "jamf-fleet",
        title: "iMac Suite Modernisation & Network Infrastructure Rebuild",
        category: "macOS Management & Networking",
        tag: "Jamf Pro / Ruckus vSZ",
        shortDescription: "Full rebuild of a 16-iMac suite using Jamf Pro MDM and Ruckus vSZ. Streamlined deployment processes by stripping out obsolete profiles and policies, re-cabled the workstation setup, and restructured network switch VLAN configs.",
        description: "Rebuilt and standardized a suite of sixteen iMacs across a public school environment using Jamf Pro and Ruckus vSZ architecture. Streamlined software distribution profiles, automated zero-touch enrollment, and optimized physical network topologies.",
        command: "jamf policy -event deploy-imac-fleet --verify-vlan",
        tech: ["Jamf Pro MDM", "Ruckus vSZ", "VLAN Configuration", "Physical Cabling & Rack Cleanup", "Bash"],
        metrics: "16 Nodes / 0-Touch Deployment",
        outputJson: [
            "<span class='text-cyan-400'>[INFO]</span> Initializing Jamf Pro MDM handshake...",
            "<span class='text-emerald-400'>[SUCCESS]</span> Verified secure connection to Ruckus vSZ controller.",
            "<span class='text-slate-300'>[DEPLOY]</span> Pushing configuration profiles and restricted software policies to 16 iMac nodes.",
            "<span class='text-cyan-400'>[NETWORK]</span> VLAN tagging verified across switch cabinets; gigabit throughput stable.",
            "<span class='text-emerald-400'>[COMPLETE]</span> Fleet deployment successful. All zero-touch enrollment triggers cleared."
        ]
    },
    {
        id: "portfolio-engine",
        title: "Terminal-Inspired Portfolio & Component Engine",
        category: "Web Development / Frontend",
        tag: "Astro / Tailwind v4",
        shortDescription: "Designed and built a custom static portfolio from scratch using Astro, Tailwind CSS, and TypeScript. Features an interactive terminal command palette, custom motion cursor states, and fluid animations.",
        description: "Designed and built a custom static portfolio from scratch using Astro, Tailwind CSS, and TypeScript. Features an interactive terminal command palette, custom motion cursor states, and fluid scroll-driven velocity typing animations.",
        command: "astro build && astro preview --port 4321",
        tech: ["Astro", "Tailwind CSS v4", "TypeScript", "ClientRouter", "Vite"],
        metrics: "100/100 Lighthouse Performance",
        outputJson: [
            "<span class='text-cyan-400'>[ASTRO]</span> Bundling application components and optimizing static assets...",
            "<span class='text-slate-300'>[TRANSFORM]</span> Tailwind CSS v4 pipeline compiled successfully with zero rule conflicts.",
            "<span class='text-cyan-400'>[SCRIPTS]</span> Custom cursor tracking and modal event listeners injected.",
            "<span class='text-emerald-400'>[BUILD]</span> Generation complete! Output directory: /dist (412 KB gzip).",
            "<span class='text-emerald-400'>[SERVER] `Local preview running at http://localhost:4321`</span>"
        ]
    }
];