import { Injectable } from '@nestjs/common';
import { Part } from 'src/@types';

@Injectable()
export class MwbService {
  content: string = '';

  // regex
  singNumber: RegExp = /.*Cântico\s(\d+)/gm;
  times: RegExp = /(\(\d+\s\w+\))/gm;
  startWithNum: RegExp = /^\d\.\s/gm;
  description: RegExp = /\(\d+\s\w+\)\s(.+)/gm;

  toLines() {
    return this.content.split('\n');
  }

  getSings() {
    const data = this.toLines();
    return data.filter((str) => this.singNumber.test(str));
  }

  getBiblicalBasis = (): string => {
    return this.toLines()[1];
  };

  getDate() {
    return this.toLines()[0];
  }

  getTreasures = () => {
    const start = this.content.indexOf('TESOUROS DA PALAVRA DE DEUS');
    const end = this.content.indexOf('FAÇA SEU MELHOR NO MINISTÉRIO');
    const section = this.content.substring(start, end).split('\n');

    const treasures: Part[] = [];

    section.map((line, index) => {
      if (/^\d\.\s/.test(line)) {
        treasures.push({
          title: line,
          duration: section[index + 1].match(this.times)[0],
          description: section[index + 1].split(this.description)[1],
        });
      }
    });

    return treasures;
  };

  getYourself() {
    const start = this.content.indexOf('FAÇA SEU MELHOR NO MINISTÉRIO');
    const end = this.content.indexOf('NOSSA VIDA CRISTÃ');
    const section = this.content.substring(start, end).split('\n');

    const yourself: Part[] = [];

    section.map((line, index) => {
      if (this.startWithNum.test(line)) {
        yourself.push({
          title: line,
          duration: section[index + 1].match(this.times)[0],
          description: section[index + 1].split(this.description)[1],
        });
      }
    });

    return yourself;
  }

  getLiving() {
    const start = this.content.indexOf('NOSSA VIDA CRISTÃ');
    const section = this.content.substring(start).split('\n');

    const living: Part[] = [];

    section.map((line, index) => {
      if (this.startWithNum.test(line)) {
        living.push({
          title: line,
          duration: section[index + 1].match(this.times)[0],
          description: section[index + 1].split(this.description)[1],
        });
      }
    });

    return living;
  }

  async parser(cnt: string) {
    this.content = cnt;

    return {
      info: {
        sings: this.getSings(),
        date: this.getDate(),
        biblicalBasis: this.getBiblicalBasis(),
      },
      treasures: this.getTreasures(),
      yourself: this.getYourself(),
      linving: this.getLiving(),
    };
  }
}
