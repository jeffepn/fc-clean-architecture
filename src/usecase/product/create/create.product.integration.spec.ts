import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

const input = {
    name: "New product",
    price: 29.99
}

describe("Integration create product use case", ()=> {
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

    it("Create a product with use case", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: "New product",
            price: 29.99,
        });
    })

    it("Create a product with use case", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        expect(() => {
           return usecase.execute({...input, ...{ name: '' }});
        }).rejects.toThrow("Name is required");
    })

    it("Create a product with use case", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        expect(() => {
           return usecase.execute({ ...input, ...{ price: -10 } });
        }).rejects.toThrow("Price must be greater than zero");
    })
})