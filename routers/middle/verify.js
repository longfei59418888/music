/**
 * Created by DELL on 2017/6/23.
 */
var NodeRSA = require('node-rsa');
var private = 'MIICXQIBAAKBgQDgYVYLKUfxi2+1+O+uLpI3tU66m2k9o80AV5X9Brl1ZsyDAovKas' +
    '66XHhI8bvdAK3YRtguqFXTWSQzfmpAtJy4qjzRHMn+SRP//KmjpjuP+QCXhhYweCj98QoI4ArK3jAs' +
    'ZtEe+jB58A5vpS965i+cUaleFWNdYW1L+RuHmU2hvwIDAQABAoGAV1+P0ejRSw2xAntdWcZoyaigb6n04TvXq' +
    'Dpy/YSQ01akbJ+hL8FHnupDLKR1MyoAiCeOJx0Fzrb3kdW4KloqbEO2PZRbFPHTzMiNWcwpGQxR9BEfLcy8QcwfajA6Qx' +
    'mmCvpG1gVFamJngU0ySz6sai7NZJOyzW4VaDjx/0iPhIECQQDvuIPPXQHohtRG2lWNz1UM5IQvdoctEKjwmhFxlwEUAFCDcJv1' +
    'NW1VC6lCL7LCg840OMf9F9pH+W7TB98Lk05rAkEA754hN/38aH0icAzqAexrLc4RYaps/Fkwe9nVkbfOueJzZgHQGWj/C4DkWnTc/q3N' +
    'hV5qbXKArtnhLYSRqA/m/QJBAI8y7OI5UAOET1hH4qWEveymsWPc7SD5e8HGdzcgmk9FZNMvuKpBER+liKV18tYJgGtno+fHkOg/03kSkaXLi' +
    'CMCQQC2DO4wHEgpGumPOECSNY04v9d03IbxMtIjRt18WKo3kFUcq0PwClW757GXCDLfTC1ZpuI1RUl/jwoGCzKe/XYBAkA2QsoVkWgLuczVAqscogLk7' +
    'jmlc/4NWuxJmBoU3YsBTxJ2llbsgjh0bpJWyHSlzool4auOCQqNOU2Y/e/r0ios'
var private_pem = getPem(private,true) //加载公钥字符串
var key_pri = new NodeRSA(private_pem);   //创建私钥加密对象
module.exports =  function verify(req,res,next) {
    var header = req.headers
    if(!header.sign){
        console.error('校验失败')
        res.end(JSON.stringify({code:'0009', msg:'校验失败!', data:{}}))
    }
    var pri_data = key_pri.decrypt(header.sign,'utf8')//解密
    if(JSON.parse(pri_data).timestamp == header.timestamp){
        next()
    }else {
        console.error('校验失败')
        res.end(JSON.stringify({code:'0009', msg:'校验失败!', data:{}}))
    }
}

function getPem(data,type) {
    data = data+'\n';
    var data_pem=type ? '-----BEGIN RSA PRIVATE KEY-----\n':'-----BEGIN PUBLIC KEY-----\n';
    var data_array = []
    for(var i=0;i<Math.ceil(data.length/64);i++){
        data_array.push(data.slice(i*64,(i+1)*64));
    }
    data_pem +=data_array.join('\n')
    data_pem +=type ? '-----END RSA PRIVATE KEY-----':'-----END PUBLIC KEY-----';
    return data_pem;
}