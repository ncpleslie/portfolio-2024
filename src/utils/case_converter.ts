export type SnakeCaseObject<T> = {
  [K in keyof T as Uncapitalize<
    string & CamelCase<K & string>
  >]: T[K] extends object
    ? T[K] extends Array<string>
      ? string[]
      : SnakeCaseObject<T[K]>
    : T[K];
};

export type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Uncapitalize<P1>}${Capitalize<P2>}${CamelCase<P3>}`
    : Uncapitalize<S>;

export function convertKeys<T>(jsonObj: T): SnakeCaseObject<T> {
  const result: any = {};

  for (const key in jsonObj) {
    if (jsonObj?.hasOwnProperty(key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, group) =>
        group.toUpperCase(),
      ) as keyof T;
      if (
        typeof jsonObj[key] === "object" &&
        jsonObj[key] !== null &&
        !Array.isArray(jsonObj[key])
      ) {
        result[camelCaseKey] = convertKeys(jsonObj[key]);
      } else if (Array.isArray(jsonObj[key])) {
        result[camelCaseKey] = jsonObj[key] as string[];
      } else {
        result[camelCaseKey] = jsonObj[key];
      }
    }
  }

  return result as SnakeCaseObject<T>;
}
