import { container } from 'tsyringe';

import { ExamsDetectionsClassificationsRepository } from '../../../modules/exams/infra/typeorm/repositories/ExamsDetectionsClassificationsRepository';
import { ExamsDetectionsRepository } from '../../../modules/exams/infra/typeorm/repositories/ExamsDetectionsRepository';
import { ExamsRepository } from '../../../modules/exams/infra/typeorm/repositories/ExamsRepository';
import { IExamsDetectionsClassificationsRepository } from '../../../modules/exams/repositories/ExamsDetectionsClassificationsRepository/models/IExamsDetectionsClassificationsRepository';
import { IExamsDetectionsRepository } from '../../../modules/exams/repositories/ExamsDetectionsRepository/models/IExamsDetectionsRepository';
import { IExamsRepository } from '../../../modules/exams/repositories/ExamsRepository/models/IExamsRepository';
import { PatientsRepository } from '../../../modules/patients/infra/typeorm/repositories/PatientsRepository';
import { IPatientsRepository } from '../../../modules/patients/repositories/PatientsRepository/models/IPatientsRepository';
import { UsersRepository } from '../../../modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../../../modules/users/repositories/models/IUsersRepository';

container.register<IUsersRepository>('UsersRepository', UsersRepository);
container.register<IPatientsRepository>('PatientsRepository', PatientsRepository);
container.register<IExamsRepository>('ExamsRepository', ExamsRepository);
container.register<IExamsDetectionsRepository>('ExamsDetectionsRepository', ExamsDetectionsRepository);
container.register<IExamsDetectionsClassificationsRepository>('ExamsDetectionsClassificationsRepository', ExamsDetectionsClassificationsRepository);
