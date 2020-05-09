export class GameTransporter {
    static pack({ treasure, players }) {
        return {
            p: players.map(p => ({
                i: p.id,
                n: p.name,
                c: p.color,
                p: { ...p.position },
                s: p.score,
                cn: p.isConnected
            })),
            t: { ...treasure }
        }
    }

    static unpack({ p, t }) {
        return {
            players: p.map(player => ({
                id: player.i,
                name: player.n,
                color: player.c,
                position: { ...player.p },
                score: player.s,
                isConnected: player.cn
            })),
            treasure: { ...t }
        }
    }
}
