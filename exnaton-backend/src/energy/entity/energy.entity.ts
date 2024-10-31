import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Energy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  measurement: string;

  @Column()
  timestamp: Date;

  @Column()
  muid: string;

  @Column()
  quality: string;

  @Column('float')
  meterReading: number;
}
