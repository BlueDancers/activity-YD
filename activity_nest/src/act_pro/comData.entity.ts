
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity('com_data')
export class  comData{
    @PrimaryGeneratedColumn()
    _id:number;
    @Column()
    compName:string
    @Column()
    name:string
    @Column('text')
    css:string
    @Column()
    animation:string
    @Column('text')
    option:string
}
/*
compName: { type: String }, // 自定义组件名
    name: { type: String }, // dom元素映射关系
    text: { type: String }, // dom元素具体文字
    css: { type: Object }, // 数据
    animation: { type: Object }, // 动画
    option: { type: Object },
*/