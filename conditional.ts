type IsString<T> = T extends string ? 'Это строка' : 'Не строка';

type A = IsString<'hello'>; // "Это строка"
type B = IsString<123>; // "Не строка"
type C = IsString<string | number>; // "Это строка" | "Не строка" (из‑за дистрибутивности, см. ниже)

type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type F = (x: number) => string;
type R = GetReturnType<F>; // string

// 1. Условное преобразование типа
type ToPromise<T> = T extends Promise<infer U> ? Promise<U> : Promise<T>;

type P1 = ToPromise<string>; // Promise<string>
type P2 = ToPromise<Promise<number>>; // Promise<number> (не Promise<Promise<...>>)

// 2. Фильтр union‑типов
type ExtractStrings<T> = T extends string ? T : never;
type OnlyStrings = ExtractStrings<string | number | string[] | 'ok'>; // "ok" | string (never отсекает неподходящие варианты)

type ExcludeNumbers<T> = Exclude<T, number>;

// 3. Условная логика для API
interface UserRequest {
  type: 'user';
  id: number;
}
interface PostRequest {
  type: 'post';
  id: number;
}

type ResponseOf<T> = T extends UserRequest
  ? { user: { id: number; name: string } }
  : T extends PostRequest
    ? { post: { id: number; title: string } }
    : never;

type U = ResponseOf<UserRequest>; // { user: ... }
type P = ResponseOf<PostRequest>; // { post: ... }
type PP = ResponseOf<{ type: 'user'; id: 5 }>;

// =========== Structural Typing =========== //
class Point1 {
  x: number = 0;
  у: number = 0;
}

class Point2 {
  x: number = 0;
  у: number = 0;
}

let p: Point1;
p = new Point2();
p.у = 7;

p = {
  x: 0,
  у: 8,
};
