import { getEntry, type CollectionEntry } from "astro:content";

/**
 * Custom hook for accessing content-related data.
 *
 * @returns An object containing functions to retrieve content data.
 */
const useContent = () => {
  /**
   * Retrieves projects data.
   *
   * @returns An array of projects sorted by year.
   */
  const getProjects = async () => {
    const entry = await getEntry("projects", "projects");
    const projects = entry!.data;
    return projects.sort((a, b) => b.year - a.year);
  };

  /**
   * Retrieves showcase projects.
   *
   * @returns An array of showcase projects sorted by year.
   */
  const getShowcaseProjects = async () => {
    const entry = await getEntry("projects", "projects");
    const projects = entry!.data;
    return projects
      .filter((project) => project.showcase === true)
      .sort((a, b) => b.year - a.year);
  };

  /**
   * Retrieves work history data.
   *
   * @returns An array of work history items sorted by order.
   */
  const getWorkHistory = async () => {
    const entry = await getEntry("workHistory", "workHistory");
    const workHistory = entry!.data;
    return workHistory.sort((a, b) => a.order - b.order);
  };

  /**
   * Retrieves details data.
   *
   * @returns Details data.
   */
  const getDetails = async () => {
    const entry = await getEntry("details", "details");
    return entry!.data;
  };

  /**
   * Retrieves metadata data.
   *
   * @returns Metadata data.
   */
  const getMetadata = async () => {
    const entry = await getEntry("metadata", "metadata");
    return entry!.data;
  };

  /**
   * Retrieves resume data.
   *
   * @returns Resume data.
   */
  const getResume = async () => {
    const entry = await getEntry("resume", "resume");
    return entry!.data;
  };

  return {
    getProjects,
    getShowcaseProjects,
    getWorkHistory,
    getDetails,
    getMetadata,
    getResume,
  };
};

export type Project = CollectionEntry<"projects">["data"][number];
export type Metadata = Awaited<
  ReturnType<ReturnType<typeof useContent>["getMetadata"]>
>;
export type Details = Awaited<
  ReturnType<ReturnType<typeof useContent>["getDetails"]>
>;
export type Socials = Details["socials"];
export type WorkHistory = Awaited<
  ReturnType<ReturnType<typeof useContent>["getWorkHistory"]>
>[number];
export type Resume = Awaited<
  ReturnType<ReturnType<typeof useContent>["getResume"]>
>;
export default useContent;
