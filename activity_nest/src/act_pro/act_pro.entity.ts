
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Act_Data } from './activityData.entity';
@Entity('act_pro')
export class  actPro{
    @PrimaryGeneratedColumn()
    _id:number;
    @Column()
    textName:string
    @Column()
    name:string
    @Column()
    titlePage:string
    @Column()
    author:string
    @Column()
    disp:string
    @Column()
    height:Number
    @Column()
    background:string
    @Column()
    password:string
    @Column('longtext')
    initSet:string//动态组件内容设定
    @Column()
    time:string
    @Column()
    proType:string
    @OneToMany(type => Act_Data, doms => doms.pro)
    doms: Act_Data[];
    @Column()
    belongId:number
}
/*
    textName: { type: String }, // 项目中文名
    name: { type: String }, // 项目路由名
    titlePage: { type: String }, // 项目缩略图
    disp: { type: String }, // 项目描述
    height: { type: Number }, // 页面高度
    background: { type: String }, // 项目背景色
    password: { type: Number }, // 项目密码
    defaultLeft: { type: String }, // 项目生命周期
    time: { type: Number }, // 项目创建的时间
*/