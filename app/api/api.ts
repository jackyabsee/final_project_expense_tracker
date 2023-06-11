import { apiOrigin } from "../env";
import { LoginInput, LoginResult } from "./types";

export async function loginFn(input: LoginInput) {
  return post<LoginResult>("/users/login", input);
}

export async function get<T>(url: string, token?: string) {
  try {
    let res = await fetch(apiOrigin + url, {
      headers: { Authorization: "Bearer " + token },
    });

    let json = await res.json();

    return json as T & { error?: string };
  } catch (error) {
    return { error: String(error) } as T & { error?: string };
  }
}

export async function post<T>(url: string, body: object) {
  try {
    console.log("api.ts posting");

    let res = await fetch(apiOrigin + url, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      method: "POST",
    });

    // let res = await fetch("http://192.168.80.87:8100/users/login", {
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    //   method: "POST",
    // });
    // console.log("res", res);

    let json = await res.json();
    console.log("json", json);

    return json as T & { error?: string };
  } catch (error) {
    return { error: String(error) } as T & { error?: string };
  }
}
