export function getRoomId() {
    const origin = document.location.origin;

    return fetch(`${origin}/roomId`)
        .then(res => {
            if (res.ok) return res;
            throw new Error('Something went wrong')
        })
        .then(res => res.text())
        .then(id => `${origin}/${id}`)
}
