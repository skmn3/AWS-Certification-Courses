const express = require('express');
const redis = require('redis');
const PORT = process.env.PORT || 5000;

// 레디스 클라이언트 생성
const client = redis.createClient({
    host:"redis-server",
    port: 6379
})


const app = express();

//숫자는 0부터 시작
client.set("number", 0);
app.get('/', (req, res) => {
    client("number", (err, number) => {
        // 햔재 숫자를 가져온 후에 숫자를 1씩 올려줍니다
        client.set("number", parseInt(number) + 1);
        res.send("숫자가 1씩 올라갑니다. 숫자:" + number);
    })
})


app.listen(PORT, () => {
    console.log('Server is Running');
});