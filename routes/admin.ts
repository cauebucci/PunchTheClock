import app = require("teem");

//**********************************************************************************
// Se por acaso ocorrer algum problema de conexão, autenticação com o MySQL,
// por favor, execute este código abaixo no MySQL e tente novamente!
//
// ALTER USER 'USUÁRIO'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SENHA';
//
// * Assumindo que o usuário seja root e a senha root, o comando ficaria assim:
//
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
//
//**********************************************************************************

class AdminRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("admin/index", {
			titulo: "Admin"
		});
	}
	public async cadastro(req: app.Request, res: app.Response) {
		res.render("admin/cadastro");
	}
}

export = AdminRoute;
