import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Integration update product use case", ()=> {
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

    afterAll(async () => {
        await sequelize.close();
    });

    it("Update a product with use case", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const product = new Product("123", "New Product", 31.50);
        await productRepository.create(product);
        const input = {
            id: product.id,
            name: "Product updated",
            price: 45.60,
        }

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: "Product updated",
            price: 45.60,
        });
    })

    it("Update a product with use case", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const product = new Product("123", "New Product", 31.50);
        await productRepository.create(product);
        
        const input = {
            id: product.id,
            name: "",
            price: 92.30,
        }

        expect(async () => {
            return await usecase.execute(input);
        }).rejects.toThrow("Name is required");
    })

    it("Update a product with use case", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const product = new Product("123", "New Product", 31.50);
        await productRepository.create(product);
        const input = {
            id: product.id,
            name: "Product updated",
            price: -15,
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Price must be greater than zero");
    })

    it("Update a product with use case when not found", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const product = new Product("123", "New Product", 31.50);
        await productRepository.create(product);
        const input = {
            id: "1234",
            name: "Product updated",
            price: 15,
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    })
})