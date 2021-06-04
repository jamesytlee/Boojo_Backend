export function deleteEventPouch(db, id, callback) {
	db.get("0000", (err, doc) => {
		if (err) {
			callback(err);
		} else {
			const eventArr = doc.events.filter(event => event.id == id);
			const block = null;
			if (eventArr.length > 0) {
				block = eventArr[0];
			}
			let userArr = [];
			Array.prototype.push.apply(userArr, doc.textBlocks);

			const newEvents = doc.events.filter(event => event.id != id);
			
			doc.events = newEvents;

			return db.put(
				{
					_id: "0000",
					_rev: doc._rev,
					email: doc.email,
					pwd: doc.pwd,
					index: doc.index,
					dailyLogs: doc.dailyLogs,
					monthlyLogs: doc.monthlyLogs,
					futureLogs: doc.futureLogs,
					collections: doc.collections,
					trackers: doc.trackers,
					textBlocks: doc.textBlocks,
					tasks: doc.tasks,
					events: doc.events,
					signifiers: doc.signifiers
				}
			);
		}
	})
}