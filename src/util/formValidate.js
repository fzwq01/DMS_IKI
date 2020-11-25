export const checkPin = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入PIN码！'))
    } else if (value.length < 8 ||
        value.length > 16 ||
        !/^[0-9a-zA-Z]{8,16}$/.test(value)) {
        callback(new Error('请输入正确的UKey PIN码'))
    } else {
        callback()
    }
}

export const checkOldCode = (rule, value, callback) => {
    let reg = /^[0-9a-zA-Z]{8,16}$/;
    if (value === '') {
        callback(new Error('请输入旧私钥访问控制码'));
    } else if ( value && ( value.length < 8 || value.length > 16 || !reg.test( value ) ) ){
        callback(new Error('请输入正确的访问码'));
    } else {
        callback();
    }
}

export const checkNewCode = (rule, value, callback) => {
    let reg = /^[0-9a-zA-Z]{8,16}$/;
    if (value === '') {
        callback(new Error('请输入新私钥访问控制码'));
    } else if ( value && ( value.length < 8 || value.length > 16 || !reg.test( value ) ) ){
        callback(new Error('访问码为8~16位字母和数字的组合'));
    } else {
        callback();
    }
}

// 检验ip
export const checkIP = (rule,value,callback) => {
    let reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
    if(value == ''){
        callback(new Error('请输入需要授权的IP'));
    }else if(!reg.test(value)){
        callback(new Error('请输入正确的IP地址'));
    }else{
        callback();
    }
}

// 子网掩码
export const checkNetMask = (rule,value,callback) => {
    let reg = /^((128|192)|2(24|4[08]|5[245]))(\.(0|(128|192)|2((24)|(4[08])|(5[245])))){3}$/;
    if(value == ''){
        callback(new Error('请输入子网掩码'));
    }else if(!reg.test(value)){
        callback(new Error('请输入正确的子网掩码'));
    }else{
        callback();
    }
}

export const checkGateWay = (rule,value,callback) => {
    let reg = /^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/;
    if(value == ''){
        callback(new Error('请输入默认网关'));
    }else if(!reg.test(value)){
        callback(new Error('请输入正确的默认网关'));
    }else{
        callback();
    }
}

export const validatorOldpin = (rule,value,callback) => {
    if (value === "") {
        callback(new Error('请输入旧PIN码'));
    } else {
        if (value != "") {
            if (
                value.length < 8 ||
                value.length > 16 ||
                !/^[0-9a-zA-Z]{8,16}$/.test(value)
            ) {
                callback(new Error('请输入正确的PIN码'));
            } else {
                callback();
            }
        }
    }
}
export const validatorNewpin = (rule,value,callback) => {
    if (value === "") {
        callback(new Error('请输入新PIN码'));
    } else {
        if (value != "") {
            if (
                value.length < 8 ||
                value.length > 16 ||
                !/^[0-9a-zA-Z]{8,16}$/.test(value)
            ) {
                callback(new Error('PIN码为8~16位字母和数字的组合'));
            } else {
                callback();
            }
        }
    }
}