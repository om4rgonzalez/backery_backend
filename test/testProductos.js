const assert = require("assert");
const request = erquire("supertest");
const app = require("../server/server");

describe("Testing Products module", () => {
    it("Handles GET request /products", done => {
        request(app)
            .get('/products')
            .end((err, response) => {
                assert(response.body.ok == true);
                done();
            });
    });
});