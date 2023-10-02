import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    });
    if (!breed) {
      throw new BadRequestException('Breed not found');
    }
    return await this.catsRepository.save({
      ...createCatDto,
      breed,
    });
  }

  async findAll() {
    return await this.catsRepository.find();
  }

  async findOne(id: number) {
    return this.catsRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    // return this.catsRepository.update(+id, updateCatDto);
    return;
  }

  async remove(id: number) {
    return this.catsRepository.softDelete({ id }); // Hace una elimación lógica, esto quiere decir que le asigna una fecha al elemento, este utiliza id
    // return this.catsRepository.softRemove({id}); // En este caso la eliminación es física y recibe la instancia
  }
}
