/**
 * Function to validate empty fields, 
 * this function avoids the submit
 * of empty fields by aplying the return and ussing 
 * the trim method to avoid empty space after or before
 */

// empty fields validation
export default function EmptyFields(params){
    // for in fo going through all the keys of the object
    for (const key in params){
        if (params[key].trim() === ""){
            return true;
        }

    }
    return false;
}