import CreateProductUseCase from "./create.product.usecase";

const MockeRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

const input = {
    name: "New product",
    price: 29.99
}

describe("Unit create product use case", ()=> {
    it("Create a product with use case", async () => {
        const productRepository = MockeRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: "New product",
            price: 29.99,
        });
    })

    it("Create a product with use case when name is empty", async () => {
        const productRepository = MockeRepository();
        const usecase = new CreateProductUseCase(productRepository);

        expect(() => {
           return usecase.execute({...input, ...{ name: '' }});
        }).rejects.toThrow("product: Name is required");
    })

    it("Create a product with use case when price is negative", async () => {
        const productRepository = MockeRepository();
        const usecase = new CreateProductUseCase(productRepository);

        expect(() => {
           return usecase.execute({ ...input, ...{ price: -10 } });
        }).rejects.toThrow("product: Price must be greater than zero");
    })
})