class TimeOuts {
	timeOuts() {
		(function () {
			global.timeOuts = {
				mini: 2000,
				small: 10000,
				average: 30000,
				large: 60000,
				veryLarge: 200000,
			};
		})();
	}
}

export { TimeOuts };
