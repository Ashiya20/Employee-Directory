const API_URL = "https://dummyjson.com/users?limit=0";

export async function getEmployeesFromAPI() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to fetch employee data");
  }

  const data = await response.json();
  return data.users;
}