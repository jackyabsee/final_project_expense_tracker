import { Parser } from "cast.ts";
import { apiOrigin } from "../env";
import {
  ExtraData,
  HistoryData,
  HomeData,
  LoginInput,
  LoginResult,
  RegisterInput,
} from "./types";

export async function loginFn(body: LoginInput) {
  return post<LoginResult>("/users/login", { body });
}
export async function registerFn(body: RegisterInput) {
  return post<LoginResult>("/users/register", { body });
}

export async function getHomeData(token: string) {
  return get<{ items: Array<HomeData> }>("/users/current-expense", { token });
}
export async function getExtraData() {
  return get<{ items: Array<ExtraData> }>("/users/extra-data");
}
export async function getHistory(token: string) {
  return get<{ items: Array<HistoryData> }>("/users/history", { token });
}
export async function deleteHistoryItem(id: number, token: string) {
  return post<{ success: boolean }>("/users/delete-history-item", {
    token,
    body: { id },
  });
}
export async function deleteAccount(token: string) {
  return post<{ success: boolean }>("/users/delete-account", { token });
}
type AjaxOptions<T> = {
  method: string;
  url: string;
  token?: string | null;
  parser?: Parser<T>;
  body?: object;
  params?: object;
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
      init["body"] = JSON.stringify(options.body);
    }

    // console.log("fetch:", { url: options.url, init });

    const res = await fetch(`${apiOrigin}${options.url}`, init);

    // console.log(
    //   "fetch response:",
    //   res.status,
    //   res.statusText,
    //   "len: " + res.headers.get("Content-Length")
    // );

    // try {
    //   const text = await res.json();
    //   console.log("fetch result:", text);
    // } catch (error) {
    //   console.log("ERROR", error);
    // }

    // console.log(res);

    const json = await res.json();
    // console.log("fetch result:", json);

    // let json;
    // try {
    //   json = JSON.parse(text);
    //   console.log("fetch received json:", json);
    // } catch (error) {
    //   throw new Error("invalid json response: " + text);
    // }

    // if (!json.error && options?.parser) {
    //   json = options.parser.parse(json);
    // }

    return json as T & { error?: string };
  } catch (error) {
    console.log("fetch error:", error);
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
