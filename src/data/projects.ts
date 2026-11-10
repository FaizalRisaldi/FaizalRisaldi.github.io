export type Project = {
  number: string;
  name: string;
  category: string;
  summary: string;
  stack: string[];
  theme: "queue" | "menfess" | "rice";
};

export const projects: Project[] = [
  {
    number: "01",
    name: "BPS Online Queue System",
    category: "Full-stack application",
    summary:
      "A digital reservation and queue management experience designed to streamline public service operations.",
    stack: ["Laravel", "React", "MySQL", "Reverb"],
    theme: "queue",
  },
  {
    number: "02",
    name: "Menfess Pamekasan",
    category: "Automation & moderation",
    summary:
      "A submission workflow with admin moderation and publishing integrations for a community Instagram account.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Meta API"],
    theme: "menfess",
  },
  {
    number: "03",
    name: "Rice Detector",
    category: "Computer vision",
    summary:
      "An exploration of computer vision and machine learning applied to rice grain detection and classification.",
    stack: ["Python", "Computer Vision", "Machine Learning"],
    theme: "rice",
  },
];
