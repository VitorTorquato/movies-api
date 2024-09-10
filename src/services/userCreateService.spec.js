const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory  = require("../Repositories/UserRepositoryInMemory")

const AppError = require('../utils/AppError');

describe("UserCreateService" , () => {

    let userRepositoryInMemory = null;
    let userCreateService = null;

    beforeEach(() => {
        
        userRepositoryInMemory = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepositoryInMemory);
    });

    it("user should be create" , async () => {
    
        const user = {
            name: " user test",
            email: "user@test.com",
            password: " 123"
        };
    
        const userCreated =  await userCreateService.execute(user);
    
        
    
        expect(userCreated).toHaveProperty("id")
    }) ;

    it("User not should be created with the email that is already exist " , async () => {

        const user1 ={
            name:" User test 1",
            email: "user@test.com",
            password:"123"
        };

        const user2 ={
            name:" User test 2",
            email: "user@test.com",
            password:"1234"
        };

        


        await userCreateService.execute(user1);

        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError('This email already exist'));

    });
    



})


