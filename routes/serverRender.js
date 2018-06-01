var express = require('express');
var router = express.Router();

let htmlTemplate = `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
	</head>
	<body>
		render index html
	</body>
	</html>`

/* GET users listing. */
router.get('/rendIndex', function(req, res, next) {
	console.log('项目根目录:', __dirname)
  	res.send(htmlTemplate);
});

module.exports = router;
