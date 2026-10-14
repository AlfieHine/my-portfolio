export interface AboutInfo {
    name: string;
    imageUrl: any;
    basedIn: string;
    currentlyStudying: string;
    skillFocus: string;
    headline: string;
    bio: string[];
    philosophy: string;
    coreCompetencies: string[];
    personalInterests: string[];
}

import aboutPfp from "../assets/about_pfp.jpg";

export const aboutData: AboutInfo = {
    name: "Alfie Hine",
    imageUrl: aboutPfp.src,
    basedIn: "Somerset, United Kingdom",
    currentlyStudying: "CompTIA Network+ (N10-009)",
    skillFocus: "Systems Infrastructure & Automation",
    headline: "IT Technician building reliable networks, homelabs, and web automations.",
    bio: [
        "I'm an IT Support Technician interested in the infrastructure underneath the things people use every day. Most of my experience has come from working with school IT, where I've had to deal with everything from user support and hardware problems to Jamf, networking and Google Workspace automation.",
        "Outside work, I run a small homelab with Proxmox and Docker. It's where I experiment with Linux, networking and services that I wouldn't necessarily get to work with day-to-day.",
        "When I'm not doing something involving computers, I'm usually out hiking, camping or working on some sort of CAD/3D-printing project."
    ],
    philosophy: "I believe IT systems should be simple, well-documented, and dependable. Good design always beats over-complicated setups.",
    coreCompetencies: [
        "IT Infrastructure & Fleet Management",
        "Proxmox VE Hypervisors & Containerisation (LXC/KVM)",
        "Google Workspace Admin & Account Automation",
        "ZFS Storage Pool Configuration & Data Recovery",
        "Linux Server Administration (Debian / Ubuntu)",
        "Static Web Architecture (Astro, TypeScript, Tailwind CSS)"
    ],
    personalInterests: [
        "Multi-day Backpacking & Wild Camping",
        "CAD Modelling & 3D Printing",
        "Automated Home Lab Infrastructure",
        "Tactical & Strategy Gaming"
    ]
};