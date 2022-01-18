import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
@Injectable()
export class CacheService {
  public client;
  constructor(private redisService: RedisService) {
    this.getClient();
  }
  async getClient() {
    this.client = await this.redisService.getClient()
  }
  //设置值的方法
  async set(key: string, value: any, seconds?: number) {
    value = JSON.stringify(value);
    if (!this.client) {
      await this.getClient();
    }
    if (!seconds) {
      await this.client.set(key, value);
    } else {
      await this.client.set(key, value, 'EX', seconds);
    }
  }
  //获取值的方法
  async get(key: string) {
    if (!this.client) {
      await this.getClient();
    }
    var data = await this.client.get(key);
    if (!data) return;
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
}