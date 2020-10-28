function geturl() {
　　
    //var server_url = 'http://192.168.5.106:3000/';  // local
    //var server_url = 'http://52.155.111.201:3100/';  // azure
    var server_url = 'http://18.180.137.199:3000/';  // aws
    return server_url;

}

var now_url = geturl();

console.log('starturl');
console.log(now_url);

module.exports = now_url;