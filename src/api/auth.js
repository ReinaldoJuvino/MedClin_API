// const {authSecret} =  require('../../.env');
const jwt = require ('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {

    const signin = async (request,response) =>{
        if (!request.body.email || !request.body.password) {
            return response.status(400).send('Informe usuário e senha');
        }

        const user =  await app.db('users')
            .where({email: request.body.email})
            .first();

    if (!user) return response.status(400).send('Usuário não encontrado');

        const isMatch = bcrypt.compareSync(request.body.password, user.password)
        if (!isMatch) return response.status(401).send('Email/Senha Inválidos!')


        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60*60*24)
            
        }
        response.json({
            ...payload,
            token: jwt.encode(payload, process.env.authSecret)
        })
    }
    const validateToken = async (request,response) =>{
        
        const userData = request.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.tokem, process.env.authSecret);
                if (new Date(token.exp * 1000)> new Date()) return response.send(true) 
            }
        } catch (err) {
        }
        response.send(false);

    }

    return { signin, validateToken}

}
