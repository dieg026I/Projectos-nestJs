import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusSend } from './entities/status_send.entity';

@Injectable()
export class StatusSendService {
  constructor(
    @InjectRepository(StatusSend)
    private statusSendRepository: Repository<StatusSend>,
  ) {}

  create(statusSend: StatusSend) {
    return this.statusSendRepository.save(statusSend);
  }

  findAll() {
    return this.statusSendRepository.find();
  }

  findOnebyid(id_status: string): Promise<StatusSend> {
    return this.statusSendRepository.findOne({ where: { id_status } });
  }

  update(id: string, statusSend: StatusSend) {
    return this.statusSendRepository.update(id, statusSend);
  }

  remove(id: string) {
    return this.statusSendRepository.delete(id);
  }
}
