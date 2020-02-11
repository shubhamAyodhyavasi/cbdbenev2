const checkAddressDuplicate = (address, allAddresses) => {
    const checkAdd = allAddresses.some(el => {
        const {
            id,
            addressType,
            isDefault,
            ...rest
        } = el;
        return Object.keys({...rest}).every(elx => {
            return el[elx].toLowerCase().trim() === address[elx].toLowerCase().trim();
        });
    })
    return checkAdd
}

export default checkAddressDuplicate