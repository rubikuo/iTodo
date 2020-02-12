import { BehaviorSubject } from "rxjs";

export const token$ = new BehaviorSubject(localStorage.getItem("token"));

export function updateToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
  token$.next(token);
}


// run load the page only once
export const checkItems$ = new BehaviorSubject(new Set(JSON.parse(localStorage.getItem("checkItems") || "[]")));
// run when you call it 
export function updateCheckItem(item){
  const newSet = new Set(Array.from(checkItems$.value));
  // checks if the id is existing
  if (newSet.has(item)) {
    newSet.delete(item);
  } else {
    newSet.add(item);
  }
  localStorage.setItem("checkItems", JSON.stringify(Array.from(newSet)));
  checkItems$.next(newSet);
}

export function removeCheckItem(item) { 
  
  console.log(checkItems$.value);
  const newSet = new Set(Array.from(checkItems$.value));
  newSet.delete(item);
  localStorage.setItem("checkItems", JSON.stringify(Array.from(newSet)));
  checkItems$.next(newSet);
}