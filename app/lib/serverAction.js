'use server';

/**
 * Fetches the /test endpoint from the API specified by the API_URL environment variable.
 * Returns the JSON response serialized as a string.
 * If the request fails, returns a JSON string containing an error message.
 *
 * @async
 * @returns {Promise<string>}
 */
export const getResponseBodyFromExample = async () => {
	try {
		const response = await fetch(`${process.env.API_URL}/test`);
		const body = await response.json();
		return JSON.stringify(body);
	} catch (error) {
		return JSON.stringify({ error: `An error occurred: ${error}` });
	}
};
