let express = require('express');
let router = express.Router();

let fs = require('fs');
let mysql = require('mysql');
global.vue = require('vue');

let layout = fs.readFileSync('./template/serverRender.html', 'utf8');
let renderer = require('vue-server-renderer').createRenderer();

//创建连接
let connection = mysql.createConnection({
	host     : '172.16.40.6',
	user     : 'root',
	password : '123456',
	database : 'prj_shangye'
});

// 执行创建连接
connection.connect();

let sql = 'SELECT nickName FROM tb_user'

/* GET users listing. */
router.get('/rendIndex', function(req, res, next) {
	connection.query(sql, function (err, result) {
		console.log('err is:', err)
		let nameList = JSON.parse(JSON.stringify(result))
		let list = []
		for (let i in nameList) {
			let item = result[i]
			list.push(`<li>${item.nickName}</li>`)
		}
		let ul = `<ul>${list.join('')}</ul>`
		// <ul>${list.join('')}</ul>
		let htmlTemplate = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>Document</title>
			</head>
			<body>
				render index html ...
				${ul}
				<script>
					document.getElementsByTagName('ul')[0].addEventListener('click', function (event) {
						if (event.target.nodeName.toUpperCase() === 'LI') {
							console.log('this is ul ...', event.target.innerText)
						}
					})
				</script>
			</body>
			</html>`
		res.send(htmlTemplate);
		// console.log('result is:', result)
	})
  	// res.send(htmlTemplate);
});

module.exports = router;
