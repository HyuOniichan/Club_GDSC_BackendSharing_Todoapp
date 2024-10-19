

class homeController {
    
    show(req, res, next) {
        res.json({"msg": "hello world"})
    }

    showHome(req, res, next) {
		res.send('This is home page')
    }

    showSearch(req, res, next) {
        res.send(`
			<form method="POST"> 
				<label for="train">Nhap gia tri:</label> 
				<input id="train" name="loibaihat" /> 
				<button type="submit">
					Enter
				</button> 
			</form> 
		`)
    }

}

module.exports = new homeController() 

