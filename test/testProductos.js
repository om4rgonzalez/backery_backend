const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server/server");

chai.should();
chai.use(chaiHttp);

describe("Testing Products module", () => {
    it("Handles GET request /products", done => {
        chai.request(app)
            .get('/products')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.ok.should.be.not.eq('ERROR');
                done();
            });
    });
});