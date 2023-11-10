/**
 * validates username
 * - must be 3-20 characters
 * - must start with a letter
 * - must contain only letters, numbers, and underscores
 *
 * @param input
 * @returns boolean
 */
export function validateUsername(input: string): boolean {
	const regex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/
	return regex.test(input)
}

/**
 * password must contain 1 number (0-9)
 * password must contain 1 uppercase letters
 * password must contain 1 lowercase letters
 * password must contain 1 non-alpha numeric number
 * password is between 8 to 50 characters with no space
 *
 * @param input
 */
export function validatePassword(input: string): boolean {
	const regex =
		/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){7,50}$/gm
	return regex.test(input)
}

/**
 * validates email address using regex
 * @param input
 */
export function validateEmail(input: string): boolean {
	// from: https://regex101.com/r/sI6yF5/1
	const longAssRegex =
		/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
	return longAssRegex.test(input)
}
