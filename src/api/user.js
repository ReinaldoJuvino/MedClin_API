const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const {existOrError, notExistOrError, equalsOrError} = app.src.api.validation
    
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    const save = async (request, response) => {
        
        const {name,email,dateofbirth,cpf,sexo,password,confirmPassword} = request.body
        const user = {name,email,dateofbirth,cpf,sexo,password,confirmPassword}
        const endereco ={...request.body.endereco}

        if(request.params.id) user.id = request.params.id
        
        try {
            existOrError(user.name,"nome não informado")
            existOrError(user.email,"E-mail não informado")
            existOrError(user.password,"Senha não informada")
            existOrError(user.confirmPassword, "Confirmação de Senha Inválida")
            equalsOrError(user.password, user.confirmPassword, "Senhas não conferem")
            existOrError(user.dateofbirth, "Data de nascimento não informada")
            existOrError(user.cpf,"CPF não informado")
            existOrError(user.sexo, "Sexo não informado")

            const userFromEmailDB = await app.db('users')
                .where({email: user.email}).first()
            
            const userFromCPFDB = await app.db('users')
                .where({cpf: user.cpf}).first()
            
            if(!user.id){
                notExistOrError(userFromEmailDB, "Email já vinculado a um usuário")
                notExistOrError(userFromCPFDB, "Cpf já cadastrado em outro Usuário")
            }

        } catch (msg) {
            return response.status(400).json({error: msg});
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => response.status(204).send())
                .catch(err => response.status(500).send(err))
        } else {
            app.db('endereco')
            .insert(endereco)
            .returning('id')
            .then(function (id){
                user.enderecoId = id[0];
                app.db('users')
                    .insert(user)
                    .then(_ => response.status(204).send())
                    .catch(err => response.status(500).send(err))
            });
            
        }
    }
    const get = async (request,response)=>{
        app.db('users')
            .select('id','name','email','admin','dateofbirth','cpf','sexo','enderecoId')
            .then(users => response.json(users))
            .catch(err => response.status(500).send(err))
    }

    const getEnderecoById = async (request,response)=> {

        app.db('endereco')
            .select()
            .where({id: request.params.id})
            .then(endereco => response.json(endereco))
            .catch(err => response.status(500).send(err))
    }

    return { save, get, getEnderecoById }
}