import { container } from 'tsyringe';

import { ExamsRepository } from '../../../modules/exams/infra/typeorm/repositories/ExamsRepository';
import { SegmentedExamsRepository } from '../../../modules/exams/infra/typeorm/repositories/SegmentedExamsRepository';
import { IExamsRepository } from '../../../modules/exams/repositories/ExamsRepository/models/IExamsRepository';
import { ISegmentedExamsRepository } from '../../../modules/exams/repositories/SegmentedExamsRepository/models/ISegmentedExamsRepository';
import { PatientsRepository } from '../../../modules/patients/infra/typeorm/repositories/PatientsRepository';
import { IPatientsRepository } from '../../../modules/patients/repositories/PatientsRepository/models/IPatientsRepository';
import { UsersRepository } from '../../../modules/users/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '../../../modules/users/infra/typeorm/repositories/UsersTokensRepository';
import { IUsersRepository } from '../../../modules/users/repositories/models/IUsersRepository';
import { IUsersTokenRepository } from '../../../modules/users/repositories/models/IUsersTokenRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IPatientsRepository>('PatientsRepository', PatientsRepository);
container.registerSingleton<IExamsRepository>('ExamsRepository', ExamsRepository);
container.registerSingleton<ISegmentedExamsRepository>('SegmentedExamsRepository', SegmentedExamsRepository);
container.registerSingleton<IUsersTokenRepository>('UsersTokensRepository', UsersTokensRepository);