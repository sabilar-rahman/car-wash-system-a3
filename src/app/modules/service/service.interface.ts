/* eslint-disable no-unused-vars */

import { Model } from "mongoose";

export type TService = {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
};

export interface ServiceModel extends Model<TService> {
  isServiceExists(id: string): Promise<TService>
}
