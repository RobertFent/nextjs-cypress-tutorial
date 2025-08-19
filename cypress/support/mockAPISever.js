import { getLocal } from 'mockttp';

/**
 * Class for a Mock API Server that allows setting up and managing mock responses for different routes and methods.
 * The server can be reset, started, stopped, and mock responses can be registered.
 * Only 'GET' and 'POST' methods are currently supported. With the later one throwing an error due to missing implementation
 * The server runs on a specific port and provides logs for server status and requests received.
 *
 * @class MockAPIServer
 */
class MockAPIServer {
	server;
	port;
	receivedData = [];

	constructor() {
		this.server = getLocal();
		this.port = 9000; // < Make sure this matches the port in your custom API_URL env url
	}

	/**
	 * Resets the server instance.
	 * Re-registers default handlers.
	 */
	reset() {
		this.server.reset();
		this.server.forGet('/').thenReply(200, 'Mock API server is up');
	}

	/**
	 * Starts the server and sets up default route.
	 */
	start() {
		this.server.start(this.port);
		this.server
			.forGet('/')
			.thenReply(200, 'Mock API server is up')
			.then(() => {
				console.info(
					`\n📡 Mock API server running on http://localhost:${this.port}\n`
				);
			});
	}

	/**
	 * Stops the server.
	 */
	stop() {
		this.server.stop().then(() => {
			console.info(`📡 Mock API server stopped`);
		});
	}

	/**
	 * Registers a mock response for a specified route and method with optional query parameters and logging of received data
	 *
	 * @param {string} route
	 * @param {('GET' | 'POST')} method
	 * @param {unknown} data
	 * @param {?Record<string, string>} [withQuery]
	 * @param {?boolean} [shouldLogReceivedData]
	 */
	mockResponse(
		route,
		method,
		data,
		withQuery,
		shouldLogReceivedData,
		idleTimeInMs = 100
	) {
		console.log(
			`Registering mock for route: ${route}; Method: ${method}${withQuery ? '; query: ' + withQuery : ''}`
		);

		if (method === 'GET') {
			if (withQuery) {
				this.server
					.forGet(route)
					.withQuery(withQuery)
					.thenCallback((req) => {
						return this.delayedResponse(
							req,
							data,
							idleTimeInMs,
							shouldLogReceivedData
						);
					});
			} else {
				this.server.forGet(route).thenCallback((req) => {
					return this.delayedResponse(
						req,
						data,
						idleTimeInMs,
						shouldLogReceivedData
					);
				});
			}
		} else if (method === 'POST') {
			this.server.forPost(route).thenCallback((req) => {
				return this.delayedResponse(
					req,
					data,
					idleTimeInMs,
					shouldLogReceivedData
				);
			});
		} else if (method === 'DELETE') {
			this.server.forDelete(route).thenCallback((req) => {
				return this.delayedResponse(
					req,
					data,
					idleTimeInMs,
					shouldLogReceivedData
				);
			});
		} else {
			throw Error('Only GET, POST and DELETE supported');
		}
	}

	/**
	 * Return an array of CompletedBody from the received data
	 *
	 * @returns {CompletedBody[]}
	 */
	getReceivedData() {
		return this.receivedData;
	}

	/**
	 * Handles an incoming request asynchronously.
	 * Logs the request path and optionally stores the received body.
	 * Waits for the specified idle time, then resolves with a 200 response containing the provided data.
	 *
	 * @param {CompletedRequest} req
	 * @param {unknown} data
	 * @param {number} idleTimeInMs
	 * @param {?boolean} [shouldLogReceivedData]
	 * @returns {MaybePromise<CallbackResponseResult>}
	 */
	delayedResponse = (req, data, idleTimeInMs, shouldLogReceivedData) => {
		return new Promise((resolve) => {
			console.log('Request received: ', req.path);
			if (shouldLogReceivedData) {
				this.receivedData.push(req.body);
			}
			setTimeout(() => {
				resolve({ statusCode: 200, json: data });
			}, idleTimeInMs);
		});
	};
}

const mockAPIServer = new MockAPIServer();
export default mockAPIServer;
