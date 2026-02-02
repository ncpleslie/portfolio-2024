import { defineCollection, z } from "astro:content";

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  year: z.number(),
  technologies: z.array(z.string()),
  githubUrl: z.string().url().optional(),
  projectUrl: z.string().url().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().url().optional(),
  isVideo: z.boolean().default(false),
  showcase: z.boolean().default(false),
  company: z.string().optional(),
});

const projectsCollection = defineCollection({
  type: "data",
  schema: z.array(projectSchema),
});

const workHistorySchema = z.object({
  order: z.number(),
  from: z.string(),
  to: z.string(),
  positionTitle: z.string(),
  company: z.string(),
  companyUrl: z.string().url(),
  jobDescription: z.string(),
  technologies: z.array(z.string()),
});

const workHistoryCollection = defineCollection({
  type: "data",
  schema: z.array(workHistorySchema),
});

const detailsCollection = defineCollection({
  type: "data",
  schema: z.object({
    firstName: z.string(),
    fullName: z.string(),
    profession: z.string(),
    title: z.string(),
    pitch: z.string(),
    socials: z.object({
      linkedin: z.string().url(),
      github: z.string().url(),
    }),
    contactEmail: z.string().email(),
    keyTechnologies: z.array(z.string()).optional(),
    descriptionHtml: z.string(),
  }),
});

const metadataCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const resumeCollection = defineCollection({
  type: "data",
  schema: z.object({
    personal: z.object({
      fullName: z.string(),
      title: z.string(),
      location: z.string(),
      email: z.string().email(),
      website: z.string().url(),
      websiteDisplay: z.string(),
      linkedin: z.string().url(),
      linkedinDisplay: z.string(),
      github: z.string().url(),
      githubDisplay: z.string(),
    }),
    experience: z.array(
      z.object({
        company: z.string(),
        companyUrl: z.string().url(),
        positions: z.array(
          z.object({
            title: z.string(),
            startDate: z.string(),
            endDate: z.string(),
          }),
        ),
        responsibilities: z.array(z.string()),
        technologies: z.array(z.string()),
      }),
    ),
    projects: z.array(
      z.object({
        title: z.string(),
        technologies: z.array(z.string()),
        description: z.string(),
        projectUrl: z.string().url().optional(),
        githubUrl: z.string().url().optional(),
      }),
    ),
    skills: z.array(z.string()),
    education: z.array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        major: z.string(),
        achievement: z.string(),
      }),
    ),
  }),
});

export const collections = {
  projects: projectsCollection,
  workHistory: workHistoryCollection,
  details: detailsCollection,
  metadata: metadataCollection,
  resume: resumeCollection,
};
