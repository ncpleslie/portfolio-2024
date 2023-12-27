import { work_history } from "../work_history.json";
import snakeToCamel, { type RecursiveObject } from "../utils/case_converter";

const useWorkHistory = () => {
  const getWorkHistory = () => {
    const snakeWorkHistory = work_history.map((history) =>
      snakeToCamel(history),
    );

    return snakeWorkHistory.sort((jobA, jobB) => jobA.order - jobB.order);
  };

  return { getWorkHistory };
};

export type WorkHistory = RecursiveObject<(typeof work_history)[0]>;
export default useWorkHistory;
