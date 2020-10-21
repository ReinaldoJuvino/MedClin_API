module.exports = app => {

    const save = async (request,response) => {

        const {existOrError, notExistOrError} = app.src.api.validation
        const pacient = request.body
        
        if(request.params.id) pacient.id = request.params.id

        try {
            existOrError(pacient.comorbidities,"Comorbidades não informado")
            existOrError(pacient.healthplan, "Numero do plano de saúde não informado")

            // const pacientFromDB = await app.db('users')
            //      .where({id: request.body.userId}).first()
            // console.log(pacientFromDB)
            
            // if(!pacientFromDB.id === request.body.userId){
            //     notExistOrError(pacientFromDB, "Usuário não encontrado")
            // }

        } catch (msg) {

            return response.status(400).json(msg);
        }
        if(pacient.id) {
            app.db('pacient')
                .update(pacient)
                .where({ id: pacient.id })
                .then(_ => response.status(204).send())
                .catch(err => response.status(500).send(err))
        } else {
            app.db('pacient')
                .insert(pacient)
                .then(_ => response.status(204).send())
                .catch(err => response.status(500).send(err))
            
        }

    }

    const get = (request,response)=>{
        app.db('pacient')
            .select('id','comorbidities','healthplan','userId')
            .then(users => response.json(users))
            .catch(err => response.status(500).send(err))
    }
    const getUserByUserId = (request,response) => {
        app.db('users')
            .select()
            .where({id: request.params.id})
            .then(endereco => response.json(endereco))
            .catch(err => response.status(500).send(err))

    }

    return { save, get, getUserByUserId }
}