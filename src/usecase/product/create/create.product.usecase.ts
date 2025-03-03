import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const productToRegister = ProductFactory.create('a', input.name, input.price);
        await this.productRepository.create(
            new Product(productToRegister.id, productToRegister.name, productToRegister.price)
        );

        return {
            id: productToRegister.id,
            name: productToRegister.name,
            price: productToRegister.price,
        };
    }
}