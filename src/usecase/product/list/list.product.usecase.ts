import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();

        return {
            products: products.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
            }))
        };
    }
}