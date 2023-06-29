import { ICCS_MOVE_COL_HELPER, ICCS_MOVE_ROW_HELPER, PIECE_TYPE_ADVISOR, PIECE_TYPE_BISHOP, PIECE_TYPE_CANNON, PIECE_TYPE_KING, PIECE_TYPE_KNIGHT, PIECE_TYPE_NONE, PIECE_TYPE_PAWN, PIECE_TYPE_ROOK } from "./Common"

export class Util {
}

export function getRankOfSolt(solt: number) {
	return (solt >> 4) - 3
}

export function getFileOfSolt(solt: number) {
	return (solt & 0x0f) - 3
}

export function getSoltByRankAndFile(rank: number, file: number) {
	return ((rank + 3) << 4) + (file + 3)
}

export function mirrorSolt(solt: number) {
	return getSoltByRankAndFile(getRankOfSolt(solt), 8 - getFileOfSolt(solt))
}

export function flipSolt(solt: number) {
    return 254 - solt
}

export function startOfMove(mv: number) {
	return (mv & 0xff)
}

export function endOfMove(mv: number) {
	return (mv >> 8)
}

export function getMove(start: number, end: number) {
	return (start | (end << 8))
}

export function reserseMove(mv: number) {
	return getMove(endOfMove(mv), startOfMove(mv))
}

export function mirrorMove(mv: number) {
	return (mirrorSolt(startOfMove(mv)) | (mirrorSolt(endOfMove(mv)) << 8))
}

// iccs move
export function iccsPosToPos(iccsFile: string, iccsRank: string) {
    let file = iccsFile.charCodeAt(0) - 'a'.charCodeAt(0)
    let rank = 9 - (iccsRank.charCodeAt(0) - '0'.charCodeAt(0))
	return getSoltByRankAndFile(rank, file)
}

export function iccsMoveToMove(iccsMove: number) {
	let start = iccsPosToPos(iccsMove[0], iccsMove[1])
	let end = iccsPosToPos(iccsMove[2], iccsMove[3])
	return getMove(start, end)
}

// 转换为Iccs（Internet Chinese Chess Server中国象棋互联网服务器）坐标
export function posToIccsPos(pos: number) {
	let file = getFileOfSolt(pos)
	let rank = getRankOfSolt(pos)

	return ICCS_MOVE_COL_HELPER[file] + ICCS_MOVE_ROW_HELPER[rank]
}

export function moveToIccsMove(mv: number) {
	return posToIccsPos(startOfMove(mv)) + posToIccsPos(endOfMove(mv));
}

export function getPieceType(c: string) {
    switch (c) {
        case 'K':
        case 'k':
            return PIECE_TYPE_KING
        case 'A':
        case 'a':
            return PIECE_TYPE_ADVISOR
        case 'B':
        case 'b':
            return PIECE_TYPE_BISHOP
        case 'N':
        case 'n':
            return PIECE_TYPE_KNIGHT
        case 'R':
        case 'r':
            return PIECE_TYPE_ROOK
        case 'C':
        case 'c':
            return PIECE_TYPE_CANNON
        case 'P':
        case 'p':
            return PIECE_TYPE_PAWN
        default:
            return PIECE_TYPE_NONE
    }
}