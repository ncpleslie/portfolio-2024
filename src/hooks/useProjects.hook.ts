import { projects } from "../projects.json";

const useProject = () => {
  const getProjects = (showcase = false, take?: number) => {
    const projs = showcase
      ? projects.filter((project) => project.showcase)
      : projects;

    const slicedProjects = take ? projs.slice(0, take) : projs;

    return slicedProjects.sort(
      (projectA, projectB) => projectB.order - projectA.order,
    );
  };

  return { getProjects };
};

export type Project = (typeof projects)[0];
export default useProject;
