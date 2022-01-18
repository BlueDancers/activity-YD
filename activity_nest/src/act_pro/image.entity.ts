
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity('pro_image')
export class  imageEntity{
    @PrimaryGeneratedColumn()
    _id:number;
    @Column()
    imageName:string
    @Column()
    image_type:Number
}
/*
  image_type 1 为上传图片 2为 封面图片
*/