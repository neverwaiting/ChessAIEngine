// ----------- side type ------------ //
export const SIDE_TYPE_RED = 0
export const SIDE_TYPE_BLACK = 1
export const SIDE_TYPE_NUM = 2

// ----------- piece type ------------ //
export const PIECE_TYPE_KING = 0
export const PIECE_TYPE_ADVISOR = 1
export const PIECE_TYPE_BISHOP = 2
export const PIECE_TYPE_KNIGHT = 3
export const PIECE_TYPE_ROOK = 4
export const PIECE_TYPE_CANNON = 5
export const PIECE_TYPE_PAWN = 6
export const PIECE_TYPE_NUM = 7
export const PIECE_TYPE_NONE = 8

// ----------- move result type ------------ //
export const MOVE_RES_REGULAR = 0
export const MOVE_RES_CAPATURED = 1
export const MOVE_RES_GENERAL = 2
export const MOVE_RES_ILLEGAL = 3
export const MOVE_RES_KILLED = 4
export const MOVE_RES_LORE = 5

// ----------- for iccs move and fen ------------ // 
export const PIECE_FEN_STRING = [
    ['K', 'A', 'B', 'N', 'R', 'C', 'P'],
    ['k', 'a', 'b', 'n', 'r', 'c', 'p']
]
export const ICCS_MOVE_ROW_HELPER = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
export const ICCS_MOVE_COL_HELPER = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

// ----------- for chinese move ------------ //
export const CHINESE_MOVE_NUMBER = [
    ["一", "二", "三", "四", "五", "六", "七", "八", "九"],
    ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
]
export const CHINESE_MOVE_PAWN_NUMBER = [
    ["前", "后"],
    ["前", "中", "后"],
    ["前", "二", "三", "后"],
    ["前", "二", "三", "四", "后"]
]
export const PIECE_NAME_STRING = [
    ['帅', '仕', '相', '马', '车', '炮', '兵'],
    ['将', '士', '象', '马', '车', '炮', '卒']
]

// ----------- for style ------------ // 
export const BOARD_STYLES = [
    // "url(" + config.boardStylePath + "CANVAS.JPG)",
    // "url(" + config.boardStylePath + "DROPS.JPG)",
    // "url(" + config.boardStylePath + "SHEET.JPG)",
    // "url(" + config.boardStylePath + "WHITE.JPG)",
    // "url(" + config.boardStylePath + "WOOD.JPG)"
]

export type PieceType = number
export type SideType = number