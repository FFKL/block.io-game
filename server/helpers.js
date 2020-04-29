export const log = {
    info(event, ...rest) {
        console.log(new Date().toISOString().white, event.green, ...rest);
    },
    err(event, ...rest) {
        console.error(new Date().toISOString().white, event.red, ...rest);
    }
}
