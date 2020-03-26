export default {
  setCookie: (cname, cvalue) => {
    document.cookie = cname + "=" + cvalue + ";";
  },
  getCookie: (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    let cookieVal = '';
    ca.forEach(c => {
      while(c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if(c.indexOf(name) === 0) {
        cookieVal = c.substring(name.length, c.length);
        return c.substring(name.length, c.length);
      }
    });
    return cookieVal;
  }
}
