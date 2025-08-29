/**
 * Funciton to avoid the use of a not email value in the email 
 * section of the register form, used to iterate over the value given
 * and look for @ character, if @ not present declares it as no email
 */
export default function isEmail(email){
    for(const letter of email){
        if (letter === "@"){
            return true
        }
    }
    return false
}