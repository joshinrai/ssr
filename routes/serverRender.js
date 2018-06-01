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
		template: '<div>耗时{{counter}}</div>',
		data: {
			counter: 0
		},
		created: function () {
			setInterval(function () {
				vm.counter++
			}, 1000)
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

		// 将vue实例呈现为字符串
		renderer.renderToString(vm, function (error, html) {
			console.log('vue server render html is:', JSON.stringify(html))
			res.send(layout.replace('<div class="myapp"></div>', html));
		})
		// 流模式呈现vue实例
		// const stream = renderer.renderToSTream(vm);

		// res.send(layout.replace('<div class="myapp"></div>', ul));
	})
});

module.exports = router;
