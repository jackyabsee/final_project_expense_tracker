import { Parser } from "cast.ts";
import { apiOrigin } from "../env";
import { HomeData, LoginInput, LoginResult, RegisterInput } from "./types";

export async function loginFn(body: LoginInput) {
  return post<LoginResult>("/users/login", { body });
}
export async function registerFn(body: RegisterInput) {
  return post<LoginResult>("/users/register", { body });
}

export async function getHomeData(token: string) {
  return get<{ items: Array<HomeData> }>("/users/current-expense", { token });
}

type AjaxOptions<T> = {
  method: string;
  url: string;
  token?: string | null;
  parser?: Parser<T>;
  body?: object;
};

async function ajax<T>(options: AjaxOptions<T>) {
  try {
    let headers: HeadersInit = {
      Authorization: "Bearer " + options?.token,
    };
    let init: RequestInit = {
      method: options.method,
      headers: headers,
    };
    if (options.body) {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(options.body);
    }
    console.log("fetch", { url: options.url, init });
    let res = await fetch(apiOrigin + options.url, init);

    const text = await res.text();
    console.log("fetch result:", text);

    let json;
    try {
      json = JSON.parse(text);
    } catch (error) {
      throw new Error("invalid json response: " + text);
    }

    if (!json.error && options?.parser) {
      json = options.parser.parse(json);
    }

    return json as T & { error?: string };
  } catch (error) {
    return { error: String(error) } as T & { error?: string };
  }
}

function genAjaxMethod(method: string) {
  return <T>(url: string, options?: Omit<AjaxOptions<T>, "method" | "url">) =>
    ajax({ url, method, ...options });
}

export let post = genAjaxMethod("POST");
export let get = genAjaxMethod("GET");
export let del = genAjaxMethod("DELETE");
