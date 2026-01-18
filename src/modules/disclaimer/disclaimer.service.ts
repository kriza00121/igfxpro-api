import { Injectable } from '@nestjs/common';

@Injectable()
export class DisclaimerService {
  get() {
    return {
      text: 'CFD sono strumenti complessi e comportano un elevato rischio di perdita.',
    };
  }
}
