import { projects } from "../projects.json";

const useProject = () => {
  const getProjects = (take?: number) => {
    return take ? projects.slice(0, take) : projects;
  };

  return { getProjects };
};

export type Project = (typeof projects)[0];
export default useProject;
