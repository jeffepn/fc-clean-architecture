import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product  = new Product('123', 'Product test', 345.87);

const MockeRepository = () => {
    return {
        find: jest.fn().mockImplementation((id) => {
            if (id != '123') throw new Error("Product not found");
            return Promise.resolve(product);
        }),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

const input = {
    id: product.id,
    name: "Product updated",
    price: 29.99
}

describe("Unit update product use case", ()=> {
    it("Update a product with use case", async () => {
        const productRepository = MockeRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price,
        });
    })

    it("Update a product with use case", async () => {
        const productRepository = MockeRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        expect(() => {
           return usecase.execute({...input, ...{ name: '' }});
        }).rejects.toThrow("Name is required");
    })

    it("Update a product with use case", async () => {
        const productRepository = MockeRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        expect(() => {
           return usecase.execute({ ...input, ...{ price: -10 } });
        }).rejects.toThrow("Price must be greater than zero");
    })

    it("Update a product with use case when not found", async () => {
        const productRepository = MockeRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        expect(() => {
           return usecase.execute({ ...input, ...{ id: "1234" } });
        }).rejects.toThrow("Product not found");
    })
})