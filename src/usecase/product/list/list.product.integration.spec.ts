import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration list product use case", ()=> {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it("List a product", async () => {        
        const product  = new Product('123', 'Product test', 345.87);
        const product2  = new Product('1234', 'Product test 2', 500.10);
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);
        productRepository.create(product);
        productRepository.create(product2);

        const output = await usecase.execute({});
        const { products } = output;

        expect(products.length).toBe(2);
        expect(products[0].id).toEqual(product.id);
        expect(products[0].name).toEqual(product.name);
        expect(products[0].price).toEqual(product.price);
        expect(products[1].id).toEqual(product2.id);
        expect(products[1].name).toEqual(product2.name);
        expect(products[1].price).toEqual(product2.price);
    })
})