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
        id: "portfolio-website",
        title: "Terminal-Style Portfolio Website",
        category: "Web Development",
        tag: "Astro / Tailwind v4",
        shortDescription: "Built a fast, static portfolio website from scratch using Astro, Tailwind CSS, and TypeScript with an interactive terminal preview.",
        description: "Built a fast static portfolio website from scratch using Astro, Tailwind CSS v4, and TypeScript. Includes an interactive terminal UI, custom motion states, and clean page routing.",
        command: "astro build && astro preview --port 4321",
        tech: ["Astro", "Tailwind CSS v4", "TypeScript", "Vite"],
        metrics: "100/100 Lighthouse Performance",
        outputJson: [
            "<span class='text-cyan-400'>[ASTRO]</span> Bundling application components and static assets...",
            "<span class='text-slate-300'>[TRANSFORM]</span> Tailwind CSS v4 pipeline compiled with zero errors.",
            "<span class='text-cyan-400'>[SCRIPTS]</span> Terminal event listeners and route handlers active.",
            "<span class='text-emerald-400'>[BUILD]</span> Build complete! Output directory: /dist (412 KB gzip).",
            "<span class='text-emerald-400'>[SERVER] Local preview running at http://localhost:4321</span>"
        ]
    },
    {
        id: "jamf-imac-rebuild",
        title: "iMac Suite Modernisation & Switch Cleanup",
        category: "macOS Management & Networking",
        tag: "Jamf Pro / Ruckus",
        shortDescription: "Factory reset 16 classroom iMacs, rebuilt enrollment policies in Jamf Pro, and re-cabled the network switch cabinet.",
        description: "Factory reset 16 classroom iMacs and streamlined their deployment pipeline using Jamf Pro MDM. Removed old, broken profiles and rewritten scripts to keep device management simple and reliable. Tore down the physical network switch cabinet and re-cabled it for easier long-term maintenance.",
        command: "jamf policy -event deploy-imac-suite --verify-vlan",
        tech: ["Jamf Pro MDM", "Ruckus vSZ", "VLAN Configuration", "Physical Cabling", "Bash"],
        metrics: "16 Devices / Cleaned Configs",
        outputJson: [
            "<span class='text-cyan-400'>[INFO]</span> Connecting to Jamf Pro MDM controller...",
            "<span class='text-emerald-400'>[SUCCESS]</span> Authentication complete. Connection verified.",
            "<span class='text-slate-300'>[DEPLOY]</span> Applying streamlined configuration profiles to 16 iMacs.",
            "<span class='text-cyan-400'>[NETWORK]</span> Switch cabinet VLAN configuration verified; 1Gbps link active.",
            "<span class='text-emerald-400'>[COMPLETE]</span> Suite modernised successfully."
        ]
    },
    {
        id: "proxmox-homelab",
        title: "Proxmox & Docker Self-Hosted Homelab",
        category: "Homelab & Systems",
        tag: "Proxmox / Docker",
        shortDescription: "Built a self-hosted server running Proxmox VE and Docker to host personal services and practice enterprise virtualization.",
        description: "Built a home lab server running Proxmox VE to host personal projects and self-teach system administration. Configured LXC Linux containers, Docker app deployments, Nginx reverse proxy routes, and automated SSL certificate renewals.",
        command: "pvesh get /cluster/resources --output-format json",
        tech: ["Proxmox VE", "Docker", "LXC Containers", "Nginx", "Linux"],
        metrics: "Proxmox VE / Multi-Container Host",
        outputJson: [
            "<span class='text-cyan-400'>[CLUSTER]</span> Querying Proxmox resource pools...",
            "<span class='text-slate-300'>[HOST]</span> CPU: Intel Core i5-12500T | RAM: 32GB ECC | Status: Healthy",
            "<span class='text-slate-300'>[CONTAINERS]</span> Active LXC instances: 12 running, 0 stopped.",
            "<span class='text-cyan-400'>[PROXY]</span> Nginx reverse proxy routing active; SSL valid.",
            "<span class='text-emerald-400'>[HEALTH]</span> ZFS pool scrub finished with 0 errors."
        ]
    },
    {
        id: "workspace-automations",
        title: "School Behaviour Escalation & Laptop Booking Tools",
        category: "Automations",
        tag: "Google Apps Script",
        shortDescription: "Built two custom tools using Google Apps Script to automate urgent behaviour alerts and staff laptop loan bookings.",
        description: "Created two automated workflows using Google Forms, Sheets, and Apps Script for daily use by school staff. The first is an urgent behaviour escalation tool that emails relevant staff based on student needs and logs incident data. The second is an automated laptop loan system that handles staff bookings, assigns devices, notifies IT, and sends automatic daily status reports.",
        command: "clasp push && google-apps-script trigger run",
        tech: ["Google Apps Script", "Google Workspace", "Automated Workflows"],
        metrics: "2 Systems / Active Daily Use",
        outputJson: [
            "<span class='text-cyan-400'>[GAS]</span> Syncing scripts with Google Workspace project...",
            "<span class='text-emerald-400'>[SUCCESS]</span> Script deployment completed successfully.",
            "<span class='text-slate-300'>[BEHAVIOUR]</span> Escalation routing active for senior staff alerts.",
            "<span class='text-cyan-400'>[LAPTOPS]</span> Asset assignment database and daily email triggers active.",
            "<span class='text-emerald-400'>[COMPLETE]</span> All background triggers functioning."
        ]
    }
];