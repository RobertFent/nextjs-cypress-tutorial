/// <reference types="cypress" />

describe('Test with mock API Server', () => {
	it('should start mock server', () => {
		cy.request('GET', 'http://localhost:9000').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.eq('Mock API server is up');
		});
	});

	it('should mock test endpoint and display result on main page', () => {
		const getResponse = {
			foo: 'bar'
		};
		cy.task('mockAPIResponse', {
			route: '/test',
			method: 'GET',
			data: getResponse
		});

		cy.request('GET', 'http://localhost:9000/test').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.deep.equal(getResponse);
		});

		cy.visit('http://localhost:3000');
		cy.get('main').contains('foo');
	});
});
