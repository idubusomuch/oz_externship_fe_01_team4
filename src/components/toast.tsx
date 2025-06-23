// components/Toast/CustomToast.tsx
import { X, Info, CheckCircle2, CircleAlert } from 'lucide-react'
import { toast } from 'react-hot-toast'
import clsx from 'clsx'
import React from 'react'

export type ToastType = 'default' | 'info' | 'success' | 'error' | 'warning'
export type ToastStyle = 'style1' | 'style2' | 'style3' | 'style4' | 'style5'

interface CustomToastProps {
  id: string
  message: string
  type?: ToastType
  style?: ToastStyle
  hasActionButton?: boolean
  actionLabel?: string
  onActionClick?: () => void
  hasCloseButton?: boolean
  hasIcon?: boolean
}

// 아이콘: 모든 아이콘 자체의 크기는 16x16px (w-4 h-4)로 통일
const iconMap: Record<ToastType, JSX.Element> = {
  default: <Info className="w-4 h-4" />,
  info: <Info className="w-4 h-4" />,
  success: <CheckCircle2 className="w-4 h-4" />,
  error: <CircleAlert className="w-4 h-4" />,
  warning: <CircleAlert className="w-4 h-4" />,
}

// 기본 레이아웃 스펙 반영: Width: Fixed (350px), Padding (12/16px), Radius (16px), Gap (12px)
const baseStyle =
  'w-[350px] px-4 py-3 rounded-2xl text-sm flex items-center justify-between gap-3 shadow-md flex-shrink-0'

export const CustomToast = ({
  id,
  message,
  type = 'default',
  style = 'style1',
  hasActionButton = false,
  actionLabel = 'BUTTON',
  onActionClick,
  hasCloseButton = true,
  hasIcon = true,
}: CustomToastProps) => {
  // ====================================================================
  // 스타일별 동적 조정 로직
  // ====================================================================
  let finalHasIcon = hasIcon
  let finalHasActionButton = hasActionButton
  let finalPaddingClasses = 'px-4 py-3'
  let finalTextClasses = 'text-sm'
  let finalToastBgColor = ''
  let finalToastTextColor = ''
  let finalToastBorderColor = ''
  let finalLeftBorderColor = ''

  let iconColorClass = '' // 일반 아이콘 색상 (Style 1, 2, 4)
  let closeButtonColorClass = ''
  let actionButtonClasses = ''
  let iconWrapperClasses = ''
  let closeButtonWrapperClasses = ''
  let style3IndicatorBgColor = '' // Style 3의 작은 사각형 배경색

  switch (type) {
    case 'default':
      iconColorClass =
        style === 'style1' ? 'text-toast-default-icon-light' : 'text-gray-500'
      closeButtonColorClass =
        style === 'style1' ? 'text-white' : 'text-gray-500'
      actionButtonClasses =
        style === 'style1'
          ? 'bg-toast-default-button-bg text-white'
          : 'border-gray-300 text-gray-700'
      finalLeftBorderColor = 'border-l-gray-500'
      style3IndicatorBgColor = 'bg-gray-400' // Style 3 default 색상 (임의)
      break
    case 'info':
      iconColorClass =
        style === 'style1' ? 'text-figma-blue' : 'text-figma-blue'
      closeButtonColorClass =
        style === 'style1' ? 'text-white' : 'text-figma-blue'
      actionButtonClasses =
        style === 'style1'
          ? 'bg-figma-blue text-white'
          : 'border-figma-blue text-figma-blue'
      finalLeftBorderColor = 'border-l-figma-blue'
      style3IndicatorBgColor = 'bg-figma-blue'
      break
    case 'success':
      iconColorClass =
        style === 'style1' ? 'text-figma-green' : 'text-figma-green'
      closeButtonColorClass =
        style === 'style1' ? 'text-white' : 'text-figma-green'
      actionButtonClasses =
        style === 'style1'
          ? 'bg-figma-green text-white'
          : 'border-figma-green text-figma-green'
      finalLeftBorderColor = 'border-l-figma-green'
      style3IndicatorBgColor = 'bg-figma-green'
      break
    case 'error':
      iconColorClass = style === 'style1' ? 'text-figma-red' : 'text-figma-red'
      closeButtonColorClass =
        style === 'style1' ? 'text-white' : 'text-figma-red'
      actionButtonClasses =
        style === 'style1'
          ? 'bg-figma-red text-white'
          : 'border-figma-red text-figma-red'
      finalLeftBorderColor = 'border-l-figma-red'
      style3IndicatorBgColor = 'bg-figma-red'
      break
    case 'warning':
      iconColorClass =
        style === 'style1' ? 'text-figma-yellow' : 'text-figma-yellow'
      closeButtonColorClass =
        style === 'style1' ? 'text-white' : 'text-figma-yellow'
      actionButtonClasses =
        style === 'style1'
          ? 'bg-figma-yellow text-white'
          : 'border-figma-yellow text-figma-yellow'
      finalLeftBorderColor = 'border-l-figma-yellow'
      style3IndicatorBgColor = 'bg-figma-yellow'
      break
  }

  switch (style) {
    case 'style1':
      finalHasIcon = true
      finalHasActionButton = true
      finalToastBgColor =
        type === 'default'
          ? 'bg-toast-default-bg'
          : `bg-${type === 'info' ? 'figma-blue' : type === 'success' ? 'figma-green' : type === 'error' ? 'figma-red' : 'figma-yellow'}`
      finalToastTextColor = 'text-white'
      iconWrapperClasses = finalToastBgColor
      closeButtonWrapperClasses = finalToastBgColor
      break
    case 'style2':
      finalHasIcon = true
      finalHasActionButton = true
      finalToastBgColor = 'bg-white'
      finalToastTextColor = 'text-text-on-light'
      finalToastBorderColor = 'border-border-light-gray'
      break
    case 'style3':
      // Style 3은 lucide-react 아이콘 대신 작은 사각형 표시를 가짐
      finalHasIcon = false // lucide 아이콘은 렌더링하지 않음
      finalHasActionButton = false
      finalPaddingClasses = 'px-3 py-2'
      finalTextClasses = 'text-xs'
      finalToastBgColor = 'bg-white'
      finalToastTextColor = 'text-text-on-light'
      finalToastBorderColor = 'border-border-light-gray'
      break
    case 'style4':
      finalHasIcon = true
      finalHasActionButton = true
      finalToastBgColor = 'bg-white'
      finalToastTextColor = 'text-text-on-light'
      finalToastBorderColor = 'border-border-light-gray'
      break
    case 'style5':
      finalHasIcon = false // 이미지상 style5에 아이콘 없음
      finalHasActionButton = false
      finalPaddingClasses = 'px-6 py-4'
      finalTextClasses = 'text-base font-bold'
      finalToastBgColor =
        type === 'default'
          ? 'bg-toast-default-bg'
          : `bg-${type === 'info' ? 'figma-blue' : type === 'success' ? 'figma-green' : type === 'error' ? 'figma-red' : 'figma-yellow'}`
      finalToastTextColor = 'text-white'
      break
    default:
      break
  }

  // ====================================================================
  // 최종 CSS 클래스 조합
  // ====================================================================
  const finalToastClasses = clsx(
    baseStyle,
    finalPaddingClasses,
    finalTextClasses,
    finalToastBgColor,
    finalToastTextColor,
    (style === 'style2' || style === 'style3') && finalToastBorderColor,
    style === 'style4' && `border-l-4 ${finalLeftBorderColor}`,
    style === 'style4' && finalToastBorderColor,
    style === 'style5' && 'w-auto max-w-md'
  )

  return (
    <div className={finalToastClasses}>
      <div className="flex items-center gap-3 flex-grow">
        {/* Style 3에만 특별한 작은 사각형 표시 */}
        {style === 'style3' && (
          <div
            className={clsx(
              'flex-shrink-0 w-2 h-2 rounded-md', // 8x8px (w-2 h-2)에 6px radius (rounded-md)
              style3IndicatorBgColor // type에 따른 배경색
            )}
          ></div>
        )}

        {/* 나머지 스타일에 일반 아이콘 렌더링 */}
        {style !== 'style3' &&
          finalHasIcon && ( // Style 3이 아닐 때만 일반 아이콘 렌더링
            <div
              className={clsx(
                'flex items-center justify-center flex-shrink-0',
                style === 'style1' ? 'w-8 h-8 rounded-full' : '', // Style 1만 32x32 원형 래퍼
                style === 'style1' && iconWrapperClasses
              )}
            >
              {React.cloneElement(iconMap[type], {
                className: clsx(
                  iconMap[type]?.props?.className,
                  iconColorClass
                ), // 아이콘 자체에 w-4 h-4 있으므로 추가
              })}
            </div>
          )}
        <span>{message}</span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {finalHasActionButton && (
          <button
            className={clsx(
              'text-xs font-bold px-2 py-1 rounded',
              actionButtonClasses,
              (style === 'style2' || style === 'style4') &&
                'border hover:opacity-80',
              style === 'style4' && 'px-3 py-1'
            )}
            onClick={() => {
              if (onActionClick) onActionClick()
              toast.dismiss(id)
            }}
          >
            {actionLabel}
          </button>
        )}
        {hasCloseButton && (
          <button
            onClick={() => toast.dismiss(id)}
            className={clsx(
              'p-1 rounded-full',
              closeButtonColorClass,
              (style === 'style2' ||
                style === 'style3' ||
                style === 'style4' ||
                style === 'style5') &&
                'hover:bg-gray-200',
              style === 'style1' &&
                `w-8 h-8 flex items-center justify-center ${closeButtonWrapperClasses}`
            )}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
