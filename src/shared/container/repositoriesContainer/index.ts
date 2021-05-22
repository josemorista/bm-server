import { container } from 'tsyringe';

import { ExamsRepository } from '../../../modules/exams/infra/typeorm/repositories/ExamsRepository';
import { SegmentedExamsRepository } from '../../../modules/exams/infra/typeorm/repositories/SegmentedExamsRepository';
import { NumpyPixelCounterProvider } from '../../../modules/exams/providers/PixelCounterProvider/implementations/NumpyPixelCounterProvider';
import { IPixelCounterProvider } from '../../../modules/exams/providers/PixelCounterProvider/models/IPixelCounterProvider';
import { IExamsRepository } from '../../../modules/exams/repositories/ExamsRepository/models/IExamsRepository';
import { ISegmentedExamsRepository } from '../../../modules/exams/repositories/SegmentedExamsRepository/models/ISegmentedExamsRepository';
import { PatientsRepository } from '../../../modules/patients/infra/typeorm/repositories/PatientsRepository';
import { IPatientsRepository } from '../../../modules/patients/repositories/PatientsRepository/models/IPatientsRepository';
import { UsersRepository } from '../../../modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../../../modules/users/repositories/models/IUsersRepository';

container.register<IUsersRepository>('UsersRepository', UsersRepository);
container.register<IPatientsRepository>('PatientsRepository', PatientsRepository);
container.register<IExamsRepository>('ExamsRepository', ExamsRepository);
container.register<ISegmentedExamsRepository>('SegmentedExamsRepository', SegmentedExamsRepository);
container.register<IPixelCounterProvider>('PixelCounterProvider', NumpyPixelCounterProvider);