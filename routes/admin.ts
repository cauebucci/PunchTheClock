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
		let dados, funcionarios;
		// let dados = [
        //     { id: 1, funcionario: "Cauê Lucas Bucci Bandeira", entrada: "13/10/2022 08:30", iintervalo: "13/10/2022 15:32",  fintervalo: "13/10/2022 16:30", saida: "13/10/2022 18:33", tintervalo: "01:12:34", ttrabalho: "12:08:22"},
        //     { id: 2, funcionario: "Cauê Lucas Bucci Bandeira", entrada: "13/10/2022 08:30", iintervalo: "13/10/2022 15:32",  fintervalo: "13/10/2022 16:30", saida: "13/10/2022 18:33", tintervalo: "01:12:34", ttrabalho: "12:08:22"},
        //     { id: 3, funcionario: "Cauê Lucas Bucci Bandeira", entrada: "13/10/2022 08:30", iintervalo: "13/10/2022 15:32",  fintervalo: "13/10/2022 16:30", saida: "13/10/2022 18:33", tintervalo: "01:12:34", ttrabalho: "12:08:22"},
        //     { id: 4, funcionario: "Gabriel Bastos Guimarões", entrada: "13/10/2022 08:37", iintervalo: "13/10/2022 11:56",  fintervalo: "13/10/2022 12:52", saida: "13/10/2022 17:58", tintervalo: "01:32:21", ttrabalho: "12:43:12"},
        //     { id: 5, funcionario: "Lucas da Silva", entrada: "13/10/2022 09:30", iintervalo: "13/10/2022 12:49",  fintervalo: "13/10/2022 13:43", saida: "13/10/2022 19:13", tintervalo: "01:43:32", ttrabalho: "12:18:22"},
        //     { id: 6, funcionario: "Lucas da Silva", entrada: "13/10/2022 09:30", iintervalo: "13/10/2022 12:49",  fintervalo: "13/10/2022 13:43", saida: "13/10/2022 19:13", tintervalo: "01:43:32", ttrabalho: "12:18:22"},
        //     { id: 7, funcionario: "Lucas da Silva", entrada: "13/10/2022 09:30", iintervalo: "13/10/2022 12:49",  fintervalo: "13/10/2022 13:43", saida: "13/10/2022 19:13", tintervalo: "01:43:32", ttrabalho: "12:18:22"},
        //     { id: 8, funcionario: "Lucas da Silva", entrada: "13/10/2022 09:30", iintervalo: "13/10/2022 12:49",  fintervalo: "13/10/2022 13:43", saida: "13/10/2022 19:13", tintervalo: "01:43:32", ttrabalho: "12:18:22"},
        //     { id: 9, funcionario: "Jonas Pedro Figueiredo", entrada: "11/09/2022 09:40", iintervalo: "11/09/2022 12:31",  fintervalo: "13/10/2022 13:35", saida: "11/09/2022 19:34", tintervalo: "01:00:23", ttrabalho: "10:28:02"},
        //     { id: 10, funcionario: "Jonas Pedro Figueiredo", entrada: "11/09/2022 09:40", iintervalo: "11/09/2022 12:31",  fintervalo: "13/10/2022 13:35", saida: "11/09/2022 19:34", tintervalo: "01:00:23", ttrabalho: "10:28:02"},
        //     { id: 11, funcionario: "Jonas Pedro Figueiredo", entrada: "11/09/2022 09:40", iintervalo: "11/09/2022 12:31",  fintervalo: "13/10/2022 13:35", saida: "11/09/2022 19:34", tintervalo: "01:00:23", ttrabalho: "10:28:02"},
        // ];

		//await app.sql.connect(async (sql: app.Sql) => {
		//	dados = await sql.query("SELECT HorarioID, F.FuncNome, HorarioEntrada, HorarioIIntervalo, HorarioVIntervalo, HorarioSaida from horarios H inner join funcionario F on H.FuncID = F.FuncID;");
		//});
		await app.sql.connect(async (sql: app.Sql) => {
			funcionarios = await sql.query("SELECT FuncNome from funcionario;");
		});

		res.render("admin/index", {
			titulo: "Admin",
			//dados: dados,
			funcionarios: funcionarios
		});
	}

	public async cadastro(req: app.Request, res: app.Response) {
		res.render("admin/cadastro");
	}

	@app.http.post()
	public async CadastrarFuncionario(req: app.Request, res: app.Response) {
		let funcionario = req.body;

		if (!funcionario) {
			res.statusCode = 400;
			res.json("Dados faltando");
			return;
		}

		if (!funcionario.nome) {
			res.statusCode = 400;
			res.json("Nome inválido");
			return;
		}

		if (!funcionario.email) {
			res.statusCode = 400;
			res.json("Email inválido");
			return;
		}

		if (!funcionario.niver) {
			res.statusCode = 400;
			res.json("Aniversario inválido");
			return;
		}

		if (!funcionario.tipo) {
			res.statusCode = 400;
			res.json("Tipo inválido");
			return;
		}
		await app.sql.connect(async (sql: app.Sql) => {
			await sql.query("INSERT INTO funcionario (FuncNome, FuncEmail, FuncNiver, TipoID) VALUES (?, ?, ?, ?)", [funcionario.nome, funcionario.email, funcionario.niver, funcionario.tipo]);
		});

		res.json(true);
	}
	
	public async filtrar(req: app.Request, res: app.Response) {
		let funcionario = parseInt(req.query["funcionario"] as string);
		let de = req.query["de"];
		let ate = req.query["ate"];

		let where = "";
		let parametros: any[] = [];


		if (funcionario) {
			if (where)
				where += " AND ";
			where += "F.FuncID = ?";
			parametros.push(funcionario);
		}

		if (de) {
			if (where)
				where += " AND ";
			where += "HorarioEntrada >= ?";
			parametros.push(de);
		}

		if (ate) {
			if (where)
				where += " AND ";
			where += "HorarioSaida <= ?";
			parametros.push(ate);
		}

		let dados: any[];

		if (where)
			where = " WHERE " + where;

		await app.sql.connect(async (sql: app.Sql) => {
			dados = await sql.query("SELECT H.FuncID, F.FuncEmail,date_format(F.FuncNiver, '%d/%m/%Y') FuncNiver, T.TipoNome,HorarioID, F.FuncNome, date_format(HorarioEntrada, '%d/%m/%Y %H:%i') HorarioEntrada, date_format(HorarioIIntervalo, '%d/%m/%Y %H:%i') HorarioIIntervalo, date_format(HorarioVIntervalo, '%d/%m/%Y %H:%i') HorarioVIntervalo, date_format(HorarioSaida, '%d/%m/%Y %H:%i') HorarioSaida, TIMESTAMPDIFF(minute, HorarioIIntervalo, HorarioVIntervalo) minutos_intervalo, (TIMESTAMPDIFF(minute, HorarioEntrada, HorarioIIntervalo) + TIMESTAMPDIFF(minute, HorarioVIntervalo, HorarioSaida)) minutos_trabalhados from horarios H inner join funcionario F on H.FuncID = F.FuncID inner join tipo T on F.TipoID = T.TipoID" + where, parametros);
		});

		res.json(dados);
	}

}

export = AdminRoute;
