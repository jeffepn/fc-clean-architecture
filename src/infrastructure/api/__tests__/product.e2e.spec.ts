import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all product", async () => {
    const productRepository = new ProductRepository();
    const product1 = ProductFactory.create('a', 'Product 1', 10.80);
    const product2 = ProductFactory.create('a', 'Product 2', 29.99);
    productRepository.create(new Product(product1.id, product1.name, product1.price));
    productRepository.create(new Product(product2.id, product2.name, product2.price));

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const productResponse1 = listResponse.body.products[0];
    expect(productResponse1.name).toBe("Product 1");
    expect(productResponse1.price).toBe(10.80);
    const productResponse2 = listResponse.body.products[1];
    expect(productResponse2.name).toBe("Product 2");
    expect(productResponse2.price).toBe(29.99);    
  });
});
