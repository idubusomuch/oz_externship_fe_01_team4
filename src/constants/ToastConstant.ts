import { type ToastType } from '@constants/IconMap'

// 상수를 정의하고 export 합니다.
export const TOAST_CONSTANTS = {
  // Prop 기본값
  DEFAULT_TYPE: 'default',
  DEFAULT_STYLE: 'style1',
  DEFAULT_ACTION_LABEL: 'BUTTON',

  // 스타일 이름 (의미를 부여하여 네이밍)
  STYLE: {
    SOLID_BLACK: 'style1',
    WHITE_CLEAN: 'style2',
    WHITE_BORDER: 'style3',
    WHITE_LEFT_BORDER: 'style4',
    SOLID_COLORED: 'style5',
  } as const,

  // 타입 이름 (모든 타입 정의)
  TYPE: {
    DEFAULT: 'default',
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
  },

  // CSS 클래스
  BASE_CLASSES:
    'w-[350px] px-4 py-3 text-sm flex items-center justify-between gap-3 shadow-md rounded-2xl flex-shrink-0',
  ACTION_BUTTON_BASE_CLASSES:
    'rounded border-none bg-transparent px-2 py-1 text-xs font-bold',
  CLOSE_BUTTON_BASE_CLASSES: 'rounded-full p-1',
  CLOSE_BUTTON_HOVER_CLASSES: 'hover:bg-gray-200',

  // 색상
  COLOR_WHITE: 'white',

  // 크기
  MAIN_ICON_SIZE: 24,
  CLOSE_ICON_SIZE: 16,

  // 접근성 (ARIA)
  CLOSE_BUTTON_ARIA_LABEL: 'Close',
} as const

// isWhiteBgStyle에 사용될 스타일 배열
export const WHITE_BG_STYLES = [
  TOAST_CONSTANTS.STYLE.WHITE_CLEAN,
  TOAST_CONSTANTS.STYLE.WHITE_BORDER,
  TOAST_CONSTANTS.STYLE.WHITE_LEFT_BORDER,
]

// 키 값을 상수로 사용하는 translucentBgMap도 함께 관리
export const translucentBgMap: Record<ToastType, string> = {
  [TOAST_CONSTANTS.TYPE.DEFAULT]: '',
  [TOAST_CONSTANTS.TYPE.INFO]: 'bg-[rgba(0,123,255,0.15)]',
  [TOAST_CONSTANTS.TYPE.SUCCESS]: 'bg-[rgba(40,167,69,0.15)]',
  [TOAST_CONSTANTS.TYPE.ERROR]: 'bg-[rgba(220,53,69,0.15)]',
  [TOAST_CONSTANTS.TYPE.WARNING]: 'bg-[rgba(255,193,7,0.15)]',
}
