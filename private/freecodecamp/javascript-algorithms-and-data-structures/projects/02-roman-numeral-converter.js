function convertToRoman(num) {
	let decValue = num;
	let romanValue = "";
	const romanMap = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1,
	};
	for (const romanKey in romanMap) {
		if (Object.hasOwn(romanMap, romanKey)) {
			const romanVal = romanMap[romanKey];
			while (decValue >= romanVal) {
				romanValue += romanKey;
				decValue -= romanVal;
			}
		}
	}
	return romanValue;
}

convertToRoman(36);
