'use strict';
const fs = require('fs'); // fs 프로미스가 있지만 직접 만들어 봄.


const isAccessCheck = async (getPath) => {
    return new Promise((resolve, reject) => {
        fs.access(getPath, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve(false)
                } else {
                    reject(err)
                }
            } else {
                resolve(true)
            }
        });
    })
}

const makeDir = async (getPath) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(getPath, (err) => {
            if (err) {
                reject(err)
            } else {
                console.log(getPath + ' make 성공');
                resolve()
            }
        });
    })
}

const makeFile = async (getPath) => {
    return new Promise((resolve, reject) => {
        fs.open(getPath, 'w', (err, fd) => {
            if (err) {
                reject(err)
            } else {
                console.log(getPath + ' make 성공');
                resolve()
            }
        });
    })
}

const writeFile = async (getPath, contents) => {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(getPath);

        // 이벤트 리스너
        writeStream.on('finish', () => { resolve() })
        writeStream.write(contents)
        writeStream.end();
    })
}

const readFile = async (getPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(getPath, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}


// ************************************************************************************* //

const dirPath = './src';
const fileName = 'readme.txt';

isAccessCheck(dirPath)
    .then((isAccess) => {
        console.log(dirPath + ' 존재 여부 : ' + isAccess);
        if (isAccess) {
            return
        } else {
            return makeDir(dirPath);
        }
    })
    .then(() => {
        return isAccessCheck(dirPath + '/' + fileName)
    })
    .then((isAccess) => {
        console.log(dirPath + '/' + fileName + ' 존재 여부 : ' + isAccess);
        if (isAccess) {
            return
        } else {
            return makeFile(dirPath + '/' + fileName);
        }
    })
    .then(() => {
        return writeFile(dirPath + '/' + fileName, '가나다라마바사\n아 자차카 타파하하')
    })
    .then(() => {
        return readFile(dirPath + '/' + fileName)
    })
    .then((data) => {
        console.log(dirPath + '/' + fileName + " 파일 읽기 :\n" + data.toString())
    })
    .catch((errData) => console.error(errData))