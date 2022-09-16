/// <reference types="multer" />
import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    uploadFile(file: Express.Multer.File): void;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateImageDto: UpdateImageDto): string;
    remove(id: string): string;
}
