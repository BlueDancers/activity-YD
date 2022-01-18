
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { actPro } from './act_pro.entity';
@Entity('act_data')
export class  Act_Data{

    @PrimaryGeneratedColumn()
    _id:number;
    @Column()
    activityId:string
    @Column()
    name:string
    @Column()
    covName:string //图层用户定义的名字
    @Column('text')
    css:string
    @Column('text')
    option:string
    @Column()
    animation:string
    @Column()
    isShow:boolean
    @ManyToOne(type => actPro, pro => pro.doms)
    pro: actPro;
}

/*
    parentId: { type: String }, // 项目id
    parentRouterName: { type: String }, // 项目路由名
    activityId: { type: String }, // 组件id
    name: { type: String }, // dom元素映射关系
    text: { type: String }, // dom元素具体文字
    css: { type: Object }, // 样式集合
    option: { type: Object }, // 数据集合
    animation: { type: Object } // 动画集合
*/