export type RecursiveObject<T> = T extends Record<string, any>
  ? { [K in keyof T as CamelCase<string & K>]: T[K] | RecursiveObject<T[K]> }
  : T;

export type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Uncapitalize<P1>}${Capitalize<P2>}${CamelCase<P3>}`
    : Uncapitalize<S>;

export default function snakeToCamel<T>(obj: T): RecursiveObject<T> {
  if (obj === null || typeof obj !== "object") {
    return obj as RecursiveObject<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item)) as RecursiveObject<T>;
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, group) =>
      group.toUpperCase(),
    ) as keyof T;
    const value = obj[key as keyof T];

    if (value !== null && typeof value === "object") {
      // @ts-ignore - ignoring issue with camelKey not being a key of acc but it is valid
      acc[camelKey] = snakeToCamel(value) as T[keyof T];
    } else {
      // @ts-ignore - ignoring issue with camelKey not being a key of acc but it is valid
      acc[camelKey] = value as T[keyof T];
    }

    return acc;
  }, {} as RecursiveObject<T>);
}
