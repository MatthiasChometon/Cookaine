import { User } from 'src/user/methods/user.methods'

type Headers = Request['headers'] & {
	authorization: string
}

export interface GraphqlRequest extends Request {
	headers: Headers
	user: User
}
