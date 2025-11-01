function telephoneCheck(str) {
	const checkParen = str.match(/^1?\s*(\d\d\d[-\s]*)(\d\d\d[-\s]*)(\d\d\d\d)$/);
	const checkNonParen = str.match(
		/^1?\s*\(\s*(\d\d\d[-\s]*)\s*\)\s*(\d\d\d[-\s]*)(\d\d\d\d)$/,
	);
	return Boolean(checkParen || checkNonParen);
}

telephoneCheck("555-555-5555");
