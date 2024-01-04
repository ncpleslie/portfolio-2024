import { projects } from "../projects.json";
import { work_history } from "../work_history.json";
import { details, metadata } from "../description.json";
import { convertKeys, type CamelCaseObject } from "../utils/case_converter";

/**
 * Custom hook for accessing content-related data.
 *
 * @returns An object containing functions to retrieve content data.
 */
const useContent = () => {
  /**
   * Retrieves projects data.
   *
   * @param showcase - Flag indicating whether to filter showcase projects.
   * @param take - Optional parameter to limit the number of projects returned.
   * @returns An array of projects with camelCase keys, sorted by year.
   */
  const getProjects = (showcase = false, take?: number) => {
    const projs = showcase
      ? projects.filter((project) => project.showcase)
      : projects;

    const slicedProjects = take ? projs.slice(0, take) : projs;

    const sortedProjects = slicedProjects.sort(
      (projectA, projectB) => projectB.year - projectA.year,
    );

    return sortedProjects.map(convertKeys);
  };

  /**
   * Retrieves work history data.
   *
   * @returns An array of work history items sorted by order.
   */
  const getWorkHistory = () => {
    const snakeWorkHistory = work_history.map((history) =>
      convertKeys(history),
    );

    return snakeWorkHistory.sort((jobA, jobB) => jobA.order - jobB.order);
  };

  /**
   * Retrieves details data.
   *
   * @returns Details data.
   */
  const getDetails = () => {
    return convertKeys(details);
  };

  /**
   * Retrieves metadata data.
   *
   * @returns Metadata data keys.
   */
  const getMetadata = () => {
    return convertKeys(metadata);
  };

  return { getProjects, getWorkHistory, getDetails, getMetadata };
};

export type Metadata = CamelCaseObject<typeof metadata>;
export type Details = CamelCaseObject<typeof details>;
export type Socials = CamelCaseObject<typeof details.socials>;
export type Project = CamelCaseObject<(typeof projects)[0]>;
export type WorkHistory = CamelCaseObject<(typeof work_history)[0]>;
export default useContent;
