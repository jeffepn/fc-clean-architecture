import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Integration find product use case", ()=> {
    let sequelize: Sequelize;
    let productRepository: ProductRepository;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
        productRepository = new ProductRepository();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Find a product with use case", async () => {
        const usecase = new FindProductUseCase(productRepository);
        const product  = new Product('123', 'Product test', 345.87);
        await productRepository.create(product);
        
        const result = await usecase.execute({ id: product.id });

        expect(result).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    })

    it("Find a product with use case when not found", async () => {
        const usecase = new FindProductUseCase(productRepository);

        expect(async () => {
          return await usecase.execute({id: '1234'});
        }).rejects.toThrow("Product not found");
    })
})