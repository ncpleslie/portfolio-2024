import { work_history } from "../work_history.json";
import { convertKeys, type SnakeCaseObject } from "../utils/case_converter";

const useWorkHistory = () => {
  const getWorkHistory = () => {
    const snakeWorkHistory = work_history.map((history) =>
      // @ts-ignore
      convertKeys(history),
    );

    return snakeWorkHistory.sort((jobA, jobB) => jobA.order - jobB.order);
  };

  return { getWorkHistory };
};

export type WorkHistory = SnakeCaseObject<(typeof work_history)[0]>;
export default useWorkHistory;
