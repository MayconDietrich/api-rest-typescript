import { AppDataSource } from "../data-source";
import { Video } from "../entities/Videos";

export const videoRepository = AppDataSource.getRepository(Video);