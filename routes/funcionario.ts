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

class FuncionarioRoute {
	public async index(req: app.Request, res: app.Response) {
        let funcionarios;

        await app.sql.connect(async (sql: app.Sql) => {
			funcionarios = await sql.query("SELECT FuncNome from funcionario;");
		});
        
		res.render("funcionario/index", {
			titulo: "Funcionario",
			funcionarios: funcionarios
		});

        
	}

}

export = FuncionarioRoute;
