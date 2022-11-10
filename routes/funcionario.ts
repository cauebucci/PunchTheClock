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
        let funcionarios: any[];

        await app.sql.connect(async (sql: app.Sql) => {
			funcionarios = await sql.query("SELECT FuncNome from funcionario;");
		});
        
		res.render("funcionario/index", {
			titulo: "Funcionario",
			funcionarios: funcionarios
		});
	}

	public async getStatus(req: app.Request, res: app.Response) {
		let lista: any[];

		let id = parseInt(req.query["id"] as string);
		if (!id) {
			res.statusCode = 400;
			res.json("Id inválido");
			return;
		}

		await app.sql.connect(async (sql: app.Sql) => {
			lista = await sql.query("select HorarioIIntervalo ii, HorarioVIntervalo vi, HorarioSaida s from horarios where FuncID = ? and Data = date(now())", [id]);
		});

		res.json(lista);
	}

	public async baterPonto(req: app.Request, res: app.Response) {
		let id = parseInt(req.query["id"] as string);
		if (!id) {
			res.statusCode = 400;
			res.json("Id inválido");
			return;
		}

		await app.sql.connect(async (sql: app.Sql) => {
			const lista: any[] = await sql.query("select HorarioID id, HorarioIIntervalo ii, HorarioVIntervalo vi, HorarioSaida s from horarios where FuncID = ? and Data = date(now())", [id]);

			if (!lista.length) {
                await sql.query("insert into horarios (FuncID, Data, HorarioEntrada) values (?, date(now()), now())", [id]);
            } else {
                const ponto = lista[0];
                if (!ponto.ii) {
                    await sql.query("update horarios set HorarioIIntervalo = now() where HorarioID = ?", [ponto.id]);
                } else if (!ponto.vi) {
                    await sql.query("update horarios set HorarioVIntervalo = now() where HorarioID = ?", [ponto.id]);
                } else if (!ponto.s) {
                    await sql.query("update horarios set HorarioSaida = now() where HorarioID = ?", [ponto.id]);
                } else {
                    // já encerrou o dia!
					return;
                }
            }
		});

		res.json(true);
	}
}

export = FuncionarioRoute;
