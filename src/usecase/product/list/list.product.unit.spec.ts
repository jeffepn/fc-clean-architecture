import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product  = new Product('123', 'Product test', 345.87);
const product2  = new Product('1234', 'Product test 2', 500.10);

const MockeRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue([product, product2]),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit list product use case", ()=> {
    it("List a product", async () => {
        const productRepository = MockeRepository();
        const usecase = new ListProductUseCase(productRepository);

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