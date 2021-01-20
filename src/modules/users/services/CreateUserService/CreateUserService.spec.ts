import { CreateUserService } from '.';
import { AppError } from '../../../../shared/errors/AppError';
import { FakeHashProvider } from '../../providers/HashProvider/fakes/FakeHashProvider';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { IUsersRepository } from '../../repositories/models/IUsersRepository';

let usersRepository: IUsersRepository;
let hashProvider: IHashProvider;
let createUserService: CreateUserService;

describe('Unit: CreateUserService', () => {

	beforeEach(() => {
		usersRepository = new FakeUsersRepository();
		hashProvider = new FakeHashProvider();
		createUserService = new CreateUserService(usersRepository, hashProvider);
	});

	it('should be able to create an user', async () => {

		const userData = {
			email: 'test@gmail.com',
			password: '123',
			cpfOrCnpj: '123456',
			firstName: 'user',
			lastName: 'userLastName'
		};

		const user = await createUserService.execute(userData, '1');

		expect(user).toMatchObject({ ...userData, id: '1' });

	});

	it('should not be able to create user with duplicate email', async () => {

		const userData = {
			email: 'test@gmail.com',
			password: '123',
			cpfOrCnpj: '123456',
			firstName: 'user',
			lastName: 'userLastName'
		};

		await createUserService.execute(userData, '1');

		try {
			await createUserService.execute(userData, '2');
		} catch (error) {
			expect(error).toBeInstanceOf(AppError);
			expect(error.message).toBe('user already exists');
		}

	});

});