class APIadapter {
  public baseURL: string;

  public url: string;

  constructor(baseURL = 'http://127.0.0.1:3000/') {
    this.baseURL = baseURL;
    this.url = this.baseURL;
  }
}

export default APIadapter;
