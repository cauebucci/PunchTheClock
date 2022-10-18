let tableLanguagePtBr = {
    emptyTable: "Nada para exibir \uD83D\uDE22",
    info: "Exibindo itens _START_ até _END_ de _TOTAL_",
    infoEmpty: "Exibindo 0 itens",
    infoFiltered: "(filtrado de _MAX_ itens no total)",
    infoPostFix: "",
    thousands: ".",
    lengthMenu: "Exibir _MENU_ itens por página",
    loadingRecords: "Carregando...",
    processing: "Processando...",
    search: "Filtro:",
    zeroRecords: "O filtro não retornou resultados \uD83D\uDE22",
    paginate: {
        first: "Primeira",
        last: "Última",
        previous: '<i class="fa fa-angle-left">',
        next: '<i class="fa fa-angle-right">'
    },
    aria: {
        sortAscending: ": clique para ordenar de modo crescente",
        sortDescending: ": clique para ordenar de modo decrescente"
    }
};

$.fn.dataTable.ext.type.order["customtime-pre"] = function (d) {
	if (!d)
		return -2147483648;
	var n = parseInt(d.replace(":", ""));
	return (isNaN(n) ? -2147483648 : n);
};

$.fn.dataTable.ext.type.order["customdateint-pre"] = function (d) {
	if (!d)
		return -2147483648;
	var s, s2, year, month, day;
	if ((s = d.indexOf(">")) > 0)
		d = d.substring(s + 1, d.lastIndexOf("<"));
	s = d.indexOf("/");
	s2 = d.lastIndexOf("/");
	if (s <= 0 || s2 <= s)
		return -2147483648;
	year = parseInt(d.substring(s2 + 1));
	month = parseInt(d.substring(s + 1, s2));
	day = parseInt(d.substring(0, s));
	return ((isNaN(year) || isNaN(month) || isNaN(day)) ? -2147483648 : ((year * 10000) + (month * 100) + day));
};

$.fn.dataTable.ext.type.order["customdatetimeint-pre"] = function (d) {
	if (!d)
		return -2147483648;
	var s, s2, year, month, day, hour = 0, minute = 0;
	if ((s = d.indexOf(">")) > 0)
		d = d.substring(s + 1, d.lastIndexOf("<"));
	s = d.indexOf("/");
	s2 = d.lastIndexOf("/");
	if (s <= 0 || s2 <= s)
		return -2147483648;
	year = parseInt(d.substring(s2 + 1));
	month = parseInt(d.substring(s + 1, s2));
	day = parseInt(d.substring(0, s));
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return -2147483648;
	s = d.lastIndexOf(" ");
	if (s >= s2) {
		s++;
		s2 = d.indexOf(":", s);
		if (s2 > s) {
			hour = parseInt(d.substring(s));
			minute = parseInt(d.substring(s2 + 1));
			if (isNaN(hour) || isNaN(minute)) {
				hour = 0;
				minute = 0;
			}
		}
	}
	return (year * 100000000) + (month * 1000000) + (day * 10000) + (hour * 100) + minute;
};
