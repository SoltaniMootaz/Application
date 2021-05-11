function SetTop5Values(array) {
	var arr = [];
	array.filter((item) => {
        if(item)
            arr.push(item.cnt)
    });
	return arr;
}
function SetTop5Labels(array) {
	var arr = [];
	array.filter((item) => {
        if(item)
            arr.push(item.libelle)
    });
	return arr;
}

function SetFAchat(array) {
	var arr = [];
	array.filter((item) => arr.push(item.cnt2));
	return arr;
}
function SetFournisseurs(array) {
	var arr = [];
	array.filter((item) => arr.push(item.nom));
	return arr;
}
function SetData(data, dates) {
	var array = [];
	var test;
	if (data && dates) {
		for (var i = 0; i < dates.length; i++) {
			test = false;
			for (var j = 0; j < data.length; j++) {
				var dateTmp = new Date(data[j].date);
				dateTmp.setHours(0, 0, 0, 0);

				if (
					dateTmp.toISOString().split("T")[0] ==
					dates[i].toISOString().split("T")[0]
				) {
					test = true;
					array.push(data[j].sum);
					break;
				}
			}
			if (test == false) array.push(0);
		}
	}
	return array;
}
function SetBarData(data, dates) {
	console.log(dates);
	var array = [];
	var test;
	if (data && dates) {
		for (var i = 0; i < dates.length; i++) {
			test = false;
			for (var j = 0; j < data.length; j++) {
				var dateTmp = new Date(data[j].date);
				dateTmp.setHours(0, 0, 0, 0);

				if (
					dateTmp.toISOString().split("T")[0] ==
					dates[i].toISOString().split("T")[0]
				) {
					test = true;
					array.push(data[j].sum.toFixed(3));
					break;
				}
			}
			if (test == false) array.push(0);
		}
	}
	return array;
}
export {
	SetTop5Labels,
	SetTop5Values,
	SetFAchat,
	SetFournisseurs,
	SetData,
	SetBarData,
};
