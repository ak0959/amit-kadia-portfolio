import { ExperienceItem } from "@/types/portfolio";

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "horizontal-integration",
    role: "Senior Project Delivery Manager",
    company: "Horizontal Integration India Pvt. Ltd.",
    period: "August 2024 – June 2026",
    location: "Vadodara, Gujarat",
    accentColor: "#4F4A8A", // Indigo
    summary: "Led enterprise digital programmes across distributed teams, strengthening governance, stakeholder alignment, risk control, and delivery predictability.",
    bullets: [
      "Managed digital transformation programmes across cross-functional teams in India, UAE, and US locations.",
      "Reduced sprint spillovers by 25% through standardized Agile processes and proactive dependency tracking.",
      "Implemented RAID governance frameworks, dependency matrices, and executive status dashboards."
    ]
  },
  {
    id: "civica",
    role: "Delivery Manager",
    company: "CIVICA Resource India Pvt. Ltd.",
    period: "April 2022 – June 2024",
    location: "Vadodara, Gujarat",
    accentColor: "#4F8C8A", // Muted Teal
    summary: "Managed enterprise delivery across multiple teams, covering planning, forecasting, governance, stakeholder communication, and operational improvement.",
    bullets: [
      "Recovered at-risk project margins through strategic resource allocation and scope management.",
      "Achieved zero client escalations for 6 consecutive months across key enterprise accounts.",
      "Established risk management frameworks reducing project delivery delays by 20%."
    ]
  },
  {
    id: "exxat",
    role: "Senior Project Manager",
    company: "Exxat Systems",
    period: "October 2018 – March 2022",
    location: "Vadodara, Gujarat",
    accentColor: "#627FA3", // Dusty Blue
    summary: "Led SaaS product and project delivery for US clients across roadmap alignment, release planning, Agile execution, and production readiness.",
    bullets: [
      "Spearheaded Scrum and Kanban adoption across engineering teams, increasing delivery velocity by 30%.",
      "Managed key stakeholder relationships and release roadmaps for flagship SaaS product lines.",
      "Maintained 90% team utilization rate consistently across release cycles."
    ]
  },
  {
    id: "panamax",
    role: "Assistant Project Manager",
    company: "Panamax Infotech Ltd.",
    period: "April 2016 – August 2018",
    location: "Vadodara, Gujarat",
    accentColor: "#8C6AAE", // Mauve
    summary: "Coordinated fintech and telecom solution delivery across APAC, Africa, and the Middle East.",
    bullets: [
      "Oversaw delivery of fintech and telecom solutions for international enterprise clients.",
      "Coordinated alignment between technical development teams and global business stakeholders.",
      "Reduced deployment downtime by establishing CI/CD deployment best practices."
    ]
  },
  {
    id: "indianic",
    role: "Project Support Executive",
    company: "IndiaNIC Infotech Ltd.",
    period: "February 2014 – December 2015",
    location: "Vadodara, Gujarat",
    accentColor: "#B28A4A", // Muted Gold
    summary: "Supported PMO operations through planning, reporting, action tracking, billing coordination, and delivery documentation.",
    bullets: [
      "Assisted project managers in tracking sprint schedules, risks, and client deliverables.",
      "Maintained PMO documentation, resource allocation logs, and milestone status reports."
    ]
  },
  {
    id: "earlier-experience",
    role: "Operations & Quality Foundation",
    company: "Earlier Experience",
    period: "February 2004 – February 2014",
    location: "Vadodara & Ahmedabad, Gujarat",
    accentColor: "#C97872", // Soft Coral
    summary: "Built a strong foundation in operations, customer service, quality, compliance, process improvement, and stakeholder communication.",
    bullets: [
      "Vodafone India Services Pvt. Ltd. — Executive (February 2012 – February 2014)",
      "ICICI Prudential Life Insurance — Customer Service Associate (February 2007 – August 2010)",
      "Motif India Infotech Pvt. Ltd. — Process Specialist (April 2004 – January 2007)"
    ],
    groupedRoles: [
      { role: "Executive", company: "Vodafone India Services Pvt. Ltd.", period: "02/2012 – 02/2014" },
      { role: "Customer Service Associate", company: "ICICI Prudential Life Insurance", period: "02/2007 – 08/2010" },
      { role: "Process Specialist", company: "Motif India Infotech Pvt. Ltd.", period: "04/2004 – 01/2007" }
    ]
  }
];
