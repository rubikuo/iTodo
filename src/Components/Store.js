import { BehaviorSubject, identity } from "rxjs";

export const token$ = new BehaviorSubject(localStorage.getItem("token"));

export function updateToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
  token$.next(token);
}



export const checkItems$ = new BehaviorSubject(new Set(JSON.parse(localStorage.getItem("checkItems") || "[]")));
export function updateCheckItem(item){
  console.log(item);
  const newSet = new Set(Array.from(checkItems$.value));

  if (newSet.has(item)) {
    newSet.delete(item);
  } else {
    newSet.add(item);
  }
  localStorage.setItem("checkItems", JSON.stringify(Array.from(newSet)));
  checkItems$.next(newSet);
}