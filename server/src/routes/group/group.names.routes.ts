import { Router } from 'express';
import { createGroupName, getAllGroupNames, getGroupNameById, updateGroupName } from  '../../controllers/group/group.names.controller'

const groupNameRoutes = Router();

groupNameRoutes.post('/group-name', createGroupName);
groupNameRoutes.get('/group-name', getAllGroupNames);
groupNameRoutes.get('/group-name/:id', getGroupNameById);
groupNameRoutes.put('/group-name/:id', updateGroupName);

export default groupNameRoutes;