import { CreateUserSessionService } from '.';
import { AppError } from '../../../../shared/errors/AppError';
import { FakeHashProvider } from '../../providers/HashProvider/fakes/FakeHashProvider';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { IUsersRepository } from '../../repositories/models/IUsersRepository';

let usersRepository: IUsersRepository;
let hashProvider: IHashProvider;
let createUserSessionService: CreateUserSessionService;

describe('Unit: CreateUserSessionService', () => {

	beforeEach(() => {
		usersRepository = new FakeUsersRepository();
		usersRepository.create({
			id: '1',
			email: 'test@gmail.com',
			password: '123',
			firstName: 'user',
			lastName: 'userLastName',
			avatar: null
		});
		hashProvider = new FakeHashProvider();
		createUserSessionService = new CreateUserSessionService(usersRepository, hashProvider);
	});

	it('should be able to create an user session with valid credentials', async () => {

		const session = await createUserSessionService.execute({
			email: 'test@gmail.com',
			password: '123'
		});

		expect(session).toHaveProperty('token');

	});

	it('should not be able to create an user session with user that does not exists', async () => {

		try {
			await createUserSessionService.execute({
				email: 'test2@gmail.com',
				password: '123'
			});
		} catch (error) {
			expect(error).toBeInstanceOf(AppError);
			expect(error.message).toBe('user not found');
		}

	});

	it('should not be able to create an user session with wrong credentials', async () => {

		try {
			await createUserSessionService.execute({
				email: 'test@gmail.com',
				password: '123'
			});
		} catch (error) {
			expect(error).toBeInstanceOf(AppError);
			expect(error.message).toBe('wrong password');
		}

	});

});