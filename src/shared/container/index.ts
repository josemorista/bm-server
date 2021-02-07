import { container } from 'tsyringe';
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

// Repositories
container.register<IUsersRepository>('UsersRepository', UsersRepository);
container.register<IPatientsRepository>('PatientsRepository', PatientsRepository);