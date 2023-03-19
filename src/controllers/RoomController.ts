import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { subjectRepository } from "../repositories/subjectRepository";
import { videoRepository } from "../repositories/videoRepository";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const newRoom = roomRepository.create({ name, description });
      await roomRepository.save(newRoom);
      return res.status(201).json(newRoom)
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'internal server error'
      })
    }
  }

  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { roomId } = req.params;

    try {
      const room = await roomRepository.findOneBy({ id: Number(roomId) });
      if (!room) {
        return res.status(404).json({
          message: 'Aula não encontrada'
        })
      }
      const newVideo = videoRepository.create({ title, url, room })
      await videoRepository.save(newVideo);

      return res.status(201).json(newVideo);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'internal server error'
      })
    }
  }

  async roomSubject(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { roomId } = req.params;


    try {
      const room = await roomRepository.findOneBy({ id: Number(roomId) });
      if (!room) {
        return res.status(404).json({
          message: 'Aula não encontrada'
        })
      }
      const subject = await subjectRepository.findOneBy({ id: Number(subject_id) });

      if (!subject) {
        return res.status(404).json({
          message: 'Aula não encontrada'
        })
      }
      const roomUpdate = {
        ...room,
        subjects: [subject]
      }
      await roomRepository.save(roomUpdate);

      return res.status(204).send();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'internal server error'
      })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const rooms = await roomRepository.find({
        relations: {
          subjects: true,
          videos: true
        }
      });
      return res.json(rooms);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'internal server error'
      })
    }
  }
}