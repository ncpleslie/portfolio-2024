import { projects } from "../projects.json";
import { work_history } from "../work_history.json";
import { details } from "../description.json";
import { convertKeys, type SnakeCaseObject } from "../utils/case_converter";

const useContent = () => {
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

  const getWorkHistory = () => {
    const snakeWorkHistory = work_history.map((history) =>
      convertKeys(history),
    );

    return snakeWorkHistory.sort((jobA, jobB) => jobA.order - jobB.order);
  };

  const getDetails = () => {
    return convertKeys(details);
  };

  return { getProjects, getWorkHistory, getDetails };
};

export type Details = SnakeCaseObject<typeof details>;
export type Socials = SnakeCaseObject<typeof details.socials>;
export type Project = SnakeCaseObject<(typeof projects)[0]>;
export type WorkHistory = SnakeCaseObject<(typeof work_history)[0]>;
export default useContent;
