import { container } from 'tsyringe';
import { ExamsRepository } from '../../modules/exams/infra/typeorm/repositories/ExamsRepository';
import { PyDicomDicomClipAndConvertProvider } from '../../modules/exams/providers/DicomClipAndConvertProvider/implementations/PyDicomDicomClipAndConvertProvider';
import { IDicomClipAndConvertProvider } from '../../modules/exams/providers/DicomClipAndConvertProvider/models/IDicomClipAndConvertProvider';
import { ScipyMedianDenoiseProvider } from '../../modules/exams/providers/MedianDenoiseProvider/implementations/ScipyMedianDenoiseProvider/index.';
import { IMedianDenoiseProvider } from '../../modules/exams/providers/MedianDenoiseProvider/models/IMedianDenoiseProvider';
import { IExamsRepository } from '../../modules/exams/repositories/ExamsRepository/models/IExamsRepository';
import { PatientsRepository } from '../../modules/patients/infra/typeorm/repositories/PatientsRepository';
import { IPatientsRepository } from '../../modules/patients/repositories/PatientsRepository/models/IPatientsRepository';
import { UsersRepository } from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import { BCryptHashProvider } from '../../modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from '../../modules/users/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../../modules/users/repositories/models/IUsersRepository';
import { DiskStorageProvider } from '../providers/StorageProvider/implementations/DiskStorageProvider';
import { IStorageProvider } from '../providers/StorageProvider/models/IStorageProvider';

// Providers
container.register<IHashProvider>('HashProvider', BCryptHashProvider);
container.register<IStorageProvider>('StorageProvider', DiskStorageProvider);

container.register<IDicomClipAndConvertProvider>('DicomClipAndConvertProvider', PyDicomDicomClipAndConvertProvider);
container.register<IMedianDenoiseProvider>('MedianDenoiseProvider', ScipyMedianDenoiseProvider);

// Repositories
container.register<IUsersRepository>('UsersRepository', UsersRepository);
container.register<IPatientsRepository>('PatientsRepository', PatientsRepository);
container.register<IExamsRepository>('ExamsRepository', ExamsRepository);