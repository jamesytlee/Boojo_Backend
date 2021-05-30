export function updateDailyLogPouch (db, log, callback) {
	console.log(log);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const dailyLogArr = doc.userObject.dailyLogs.filter(element => element.id != log.id);
			db.put({_id: "0000", _rev: doc._rev, dailyLogs: dailyLogArr.push(log)}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(res);
				}
			});
		}
	})
}