import authTestController from '../../test/auth/AuthTestController';
import { getReasonPhrase } from 'http-status-codes';
import { user1 } from '../../test/constants/auth';

describe('Register', (): void => {
    describe('POST /api/v1/register (Register)', (): void => {
        it('Should Register a User', async (): Promise<void> => {
            const response = await authTestController.register();

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(201);
            expect(response.body.status).toEqual(201);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result.token).toBeTruthy();
        });

        it('Should Register a User (with trimmed email)', async (): Promise<void> => {
            const data = {
                email: '  test@test.com',
                password: user1.password,
            };
            const response = await authTestController.register(data);

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(201);
            expect(response.body.status).toEqual(201);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result.token).toBeTruthy();
        });

        it('Should Register a User (with trimmed password)', async (): Promise<void> => {
            const data = {
                email: user1.email,
                password: '     12345678',
            };
            const response = await authTestController.register(data);

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(201);
            expect(response.body.status).toEqual(201);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result.token).toBeTruthy();
        });

        it('Should Fail Register Please enter a valid email (email is empty)', async (): Promise<void> => {
            const data = {
                password: user1.password,
            };
            const response = await authTestController.register(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail Register Please enter a valid email (email not Validate)', async (): Promise<void> => {
            const data = {
                email: 'notvalidemail',
                password: user1.password,
            };
            const response = await authTestController.register(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail Register Password must be at least 6 characters long (password is empty)', async (): Promise<void> => {
            const data = {
                email: user1.email,
            };
            const response = await authTestController.register(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail Register Password must be at least 6 characters long (short password)', async (): Promise<void> => {
            const data = {
                email: user1.email,
                password: 'short',
            };
            const response = await authTestController.register(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail Register This Email Registered Before', async (): Promise<void> => {
            await authTestController.register();
            const response = await authTestController.register();

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(409);
            expect(response.body.status).toEqual(409);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });
    });
});
