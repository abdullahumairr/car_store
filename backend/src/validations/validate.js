import { ResponseError } from "../errors/responseError.js";

export default function validate(schema, request){
    const result =  schema.safeParse(request);

    if(!result.success){
        const message = result.error.issues[0].message;
        throw new ResponseError(400, message);
    }

    return result.data;
}
