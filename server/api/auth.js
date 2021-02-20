
import jwt from 'jsonwebtoken'

//토큰 생성
const verifyJWT = (context) => {

    if (context.req && context.req.headers.authorization) {
        const token = context.req.headers.authorization.split('Bearer ')[1]
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            context.user = decodedToken
        })
    }
    return context;
}

export default verifyJWT;