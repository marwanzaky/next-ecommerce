export function convertIdToName(str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function convertNameToId(str) {
    return str.split(' ').map(word => word.toLowerCase()).join('-');
}