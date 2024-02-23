export class con {
  public static ReturnRoute() {
    let route: string = ''
    //route = 'https://localhost:7030/api/'
    route = 'https://thelastbug.azurewebsites.net/api/'

    return route
  }

  public static GetToken() {
    let token: string =
      localStorage.getItem("token") != undefined
        ? localStorage.getItem("token")!.toString()
        : "";

    return token;
  }
}
