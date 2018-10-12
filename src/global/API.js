class API {
  constructor(props) {
    this.basePath = 'https://dev.fsbohandshake.com/api/';
    this.makeRequst = this.makeRequst.bind(this);
    const djangoToken = JSON.parse(localStorage.getItem("ecrypt_data"))
      ? JSON.parse(localStorage.getItem("ecrypt_data")).token
      : "";
    this.baseHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `token ${djangoToken}`
    };
  }
  makeRequst(url, options) {
console.log("baseHeaders",this.baseHeaders);
    console.log("check url",`${this.basePath}${url}`,options);
    return fetch(`${this.basePath}${url}`, {
      headers: this.baseHeaders,
      ...options
    })
  }

  GET(url, options) {
    return this.makeRequst(url, { method: 'GET', ...options });
  }

  POST(url, data) {
    return this.makeRequst(url, { method: 'POST', body: JSON.stringify(data) });
  }

  PATCH(url, data) {
    return this.makeRequst(url, { method: 'PATCH', body: JSON.stringify(data) });
  }

  PUT(url, data) {
    return this.makeRequst(url, { method: 'PUT', body: JSON.stringify(data) });
  }

  DELETE(url) {
    return this.makeRequst(url, { method: 'DELETE' });
  }
  // Will be required when an api did not need authorization token for post
  NOPOST(url, options) {
    return fetch(`${this.basePath}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    })
  }
  // Will be required when an api did not need authorization token for put
  NOPUT(url, options) {
    return fetch(`${this.basePath}${url}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    })
  }

  property(url, options) {
    return fetch(`${this.basePath}${url}`, {
      method: 'POST',
     headers: this.baseHeaders,
      body: JSON.stringify(options),
    })
  }
  DEL(url) {
    return fetch(`${this.basePath}${url}`, {
      method: 'DELETE',
     headers: this.baseHeaders,
      // body: JSON.stringify(options),
    })
  }
}

export default new API();
