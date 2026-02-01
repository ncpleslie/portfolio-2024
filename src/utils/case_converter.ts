/**
 * Converts keys in a given object from snake_case to camelCase recursively.
 *
 * @typeParam T - The type of the input object.
 * @param jsonObj - The input object with snake_case keys.
 * @returns An object with camelCase keys.
 */
export function convertKeys<T>(jsonObj: T): CamelCaseObject<T> {
  const result: CamelCaseObject<T> = {} as CamelCaseObject<T>;

  for (const key in jsonObj) {
    if (Object.prototype.hasOwnProperty.call(jsonObj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, group) =>
        group.toUpperCase(),
      ) as keyof CamelCaseObject<T>;

      if (
        typeof jsonObj[key] === "object" &&
        jsonObj[key] !== null &&
        !Array.isArray(jsonObj[key])
      ) {
        result[camelCaseKey] = convertKeys(
          jsonObj[key],
        ) as CamelCaseObject<T>[keyof CamelCaseObject<T>];
      } else if (Array.isArray(jsonObj[key])) {
        result[camelCaseKey] = jsonObj[
          key
        ] as CamelCaseObject<T>[keyof CamelCaseObject<T>];
      } else {
        result[camelCaseKey] = jsonObj[
          key
        ] as CamelCaseObject<T>[keyof CamelCaseObject<T>];
      }
    }
  }

  return result as CamelCaseObject<T>;
}

/**
 * Represents an object with keys transformed from snake_case to camelCase.
 *
 * @typeParam T - The original type with snake_case keys.
 */
export type CamelCaseObject<T> = {
  [K in keyof T as Uncapitalize<
    string & CamelCase<K & string>
  >]: T[K] extends object
    ? T[K] extends Array<string>
      ? string[]
      : CamelCaseObject<T[K]>
    : T[K];
};

/**
 * Represents a type that transforms a string from snake_case to camelCase.
 *
 * @typeParam S - The original string in snake_case.
 */
export type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Uncapitalize<P1>}${Capitalize<P2>}${CamelCase<P3>}`
    : Uncapitalize<S>;
