export interface Project {
  id: string;
  title: string;
  category: string;
  categoryBadgeBg?: string;
  techStack: string[];
  description: string;
  commandSnippet: string[];
  outputSnippet: string[];
}

export const projectsData: Project[] = [
  {
    id: "workspace-escalation",
    title: "Bespoke Workspace Escalation & Laptop Tracker",
    category: "Automations",
    techStack: ["Google Apps Script", "Automated Workflows", "Education IT"],
    description: "Architected two custom, automated workflows within strict Google Workspace boundaries: a high-priority teacher help request system to upper management, and an end-to-end laptop loaning and asset tracking engine now daily used by staff.",
    commandSnippet: [
      "node apps-script-deploy.js --target workspace-prod",
      "apps_script --status --active-triggers"
    ],
    outputSnippet: [
      "• script_id ..... <span class='text-slate-200'>AKfycbx...9v2L</span>",
      "• triggers ...... <span class='text-emerald-400'>3 active time-driven</span>",
      "• deployment .... <span class='text-cyan-400'>SUCCESS</span>"
    ]
  },
  {
    id: "homelab-stack",
    title: "Monitored Self-Hosted Infrastructure Stack",
    category: "Homelab / Security",
    techStack: ["Proxmox VE", "Nginx / Reverse Proxy", "Docker"],
    description: "Configured an isolated container host stack running web services, Nginx reverse proxy with automated SSL renewal, network security tunneling, and continuous uptime monitoring for hosted applications.",
    commandSnippet: [
      "docker compose up -d --build",
      "cloudflared tunnel route ip infra-prod"
    ],
    outputSnippet: [
      "<span class='text-slate-500'>[+] Building containers (4/4) FINISHED</span>",
      "<span class='text-cyan-400'> => Container nginx-proxy    <span class='text-emerald-400'>Running</span></span>",
      "<span class='text-emerald-400'>✔ Stack deployment complete.</span>"
    ]
  },
  {
    id: "imac-suite",
    title: "iMac Suite Modernisation & Network Infrastructure Rebuild",
    category: "macOS Management & Networking",
    techStack: ["Jamf Pro MDM", "Ruckus vSZ", "VLAN Configuration", "Physical Cabling & Rack Cleanup"],
    description: "Full rebuild of a 16-iMac suite using Jamf Pro MDM and Ruckus vSZ. Streamlined deployment processes by stripping out obsolete profiles and policies, re-cabled the workstation setup, and restructured network switch VLAN configs to establish a clean, easily maintainable rack cabinet.",
    commandSnippet: [
      "jamf recon -profile 'Enterprise-Education-Base'",
      "ruckus_vsz vlan-sync --switch-rack 02"
    ],
    outputSnippet: [
      "<span class='text-slate-400'>• MDM profiles synced: 16/16 devices</span>",
      "<span class='text-emerald-400'>• VLAN trunk verification: OK</span>",
      "<span class='text-cyan-400'>[OK] Rack cabinet configuration updated.</span>"
    ]
  }
];