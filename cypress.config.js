import { defineConfig } from 'cypress';
import mockAPIServer from './cypress/support/mockAPISever.js';

export default defineConfig({
	e2e: {
		setupNodeEvents(on) {
			on('before:run', () => {
				mockAPIServer.start();
			});
			on('after:run', () => {
				mockAPIServer.stop();
			});
			on('task', {
				mockAPIResponse({
					route,
					method,
					data,
					withQuery,
					shouldLogReceivedData,
					idleTimeInMs
				}) {
					mockAPIServer.mockResponse(
						route,
						method,
						data,
						withQuery,
						shouldLogReceivedData,
						idleTimeInMs
					);
					return null; // important to return null from Cypress node event tasks to signal they're complete
				},

				// optional: not used in this tutorial
				getReceivedData() {
					return mockAPIServer.getReceivedData();
				},

				resetAPIMocks() {
					mockAPIServer.reset();
					return null;
				},

				log(message) {
					console.log(message);
					return null;
				}
			});
		},
		// this needs to be enabled for the mock server to work
		experimentalInteractiveRunEvents: true,
		specPattern: ['cypress/e2e/tests/**/*.cy.js']
	},
	supportFolder: 'cypress/support'
});
