import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../prisma/gyms-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements GymsRepository {

  public gyms: Gym[] = [];

  async findById(gymId: string) {
    const gym = this.gyms.find(gym => gym.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }


  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title ?? null,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.gyms.push(gym);

    return gym;
  }

  async searchMany(query: string, page: number) {
    const gym = this.gyms.filter(gym => gym.title.includes(query))
      .splice((page - 1) * 20, page * 20)

    return gym
  }
}
