import { Router } from 'express'
import { RoomController } from './controllers/RoomController';
import { SubjectController } from './controllers/SubjectController';

const routes = Router();

routes.post('/subject', new SubjectController().create);
routes.post('/room', new RoomController().create);
routes.post('/room/:roomId/create', new RoomController().createVideo);
routes.post('/room/:roomId/subject', new RoomController().roomSubject);
routes.get('/room', new RoomController().list);

export default routes