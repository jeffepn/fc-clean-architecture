import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

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
    id: '123'
}

describe("Unit find product use case", ()=> {
    it("Find a product with use case", async () => {
        const productRepository = MockeRepository();
        const usecase = new FindProductUseCase(productRepository);

        const result = await usecase.execute(input);

        expect(result).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    })

    it("Find a product with use case when not found", async () => {
        const productRepository = MockeRepository();
        const usecase = new FindProductUseCase(productRepository);

        expect(() => {
          return usecase.execute({id: '1234'});
        }).rejects.toThrow("Product not found");
    })
})