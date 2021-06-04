export function updateTaskPouch (db, task, callback) {
	console.log(task);
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			let taskArr = doc.tasks.filter(element => element.id != task.id);
			taskArr.push(task);
			
			db.put({_id: "0000", 
			_rev: doc._rev,
			email: doc.email,
			pwd: doc.pwd,
			index: doc.index,
			dailyLogs: doc.dailyLogs,
			monthlyLogs: doc.monthlyLogs,
			futureLogs: doc.futureLogs,
			trackers: doc.trackers,
			collections: doc.collections,
			textBlocks: doc.textBlocks,
			tasks: taskArr,
			events: doc.events,
			signifiers: doc.signifiers}, (err, res) => {
				if (err) {
					callback(err);
				} else {
					callback(null);
				}
			});
		}
	})
}