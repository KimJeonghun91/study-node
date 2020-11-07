// ************************************
// ******* node restServer ************
// ************************************


const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.readFile('./restFront.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      }
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }


    } else if (req.method === 'POST') {
      if (req.url === '/plus') {
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => { body += data; });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { num1, num2 } = JSON.parse(body);
          const result = Number(num1) + Number(num2);
          res.end(String(result));
        });


      } else if (req.url === '/minus') {
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => { body += data; });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { num1, num2 } = JSON.parse(body);
          const result = Number(num1) - Number(num2);
          res.end(String(result));
        });


      } else if (req.url === '/multi') {
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => { body += data; });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { num1, num2 } = JSON.parse(body);
          const result = Number(num1) * Number(num2);
          res.end(String(result));
        });
      }

    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });
