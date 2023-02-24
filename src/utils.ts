export function objectifyForm(formArray: FormData) {
    //serialize data function
    var returnArray: Record<string, FormDataEntryValue> = {};
    [...formArray.entries()].forEach(([name, value], i) => {
        returnArray[name] = value;
    });
    return returnArray;
}