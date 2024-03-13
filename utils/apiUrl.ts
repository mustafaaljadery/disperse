export function apiUrl() {
  if (process.env.ENV as string == "DEV") {
    return "https://api.trydisperse.com/"
    //return process.env.DEV_ROUTE
  }
  else {
    return process.env.PRODUCTION_ROUTE
  }
}