let express = require('express');
let router = express.Router();

let fs = require('fs');
let path = require('path');
let mysql = require('mysql');
const Vue = require('vue');
global.vue = Vue

let layout = fs.readFileSync('./template/serverRender.html', 'utf8');
let renderer = require('vue-server-renderer').createRenderer();

const vm = new Vue({
	render (h) {
		return h('div', 'hello')
	}
})

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

		console.log('router __dirname is:', __dirname)
		renderer.renderToString(vm, function (error, html) {
			console.log('vue server render html is:', JSON.stringify(html))
		})
		res.send(htmlTemplate);
		// console.log('result is:', result)
	})
  	// res.send(htmlTemplate);
});

module.exports = router;
