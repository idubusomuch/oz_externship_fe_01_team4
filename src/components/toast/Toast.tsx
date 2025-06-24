import React from 'react'
import clsx from 'clsx'
import { toast } from 'react-hot-toast'

import Icon from '@components/Icon'
import { iconMap, type ToastStyle, type ToastType } from './IconMap'
import { closeIconMap } from './closeIconMap'
import { typeConfig } from './toastTypeconfig'

export type CustomToastProps = {
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

const baseStyle =
  'w-[350px] px-4 py-3 text-sm flex items-center justify-between gap-3 shadow-md rounded-2xl flex-shrink-0'

const translucentBgMap: Record<ToastType, string> = {
  default: '',
  info: 'bg-[rgba(0,123,255,0.15)]',
  success: 'bg-[rgba(40,167,69,0.15)]',
  error: 'bg-[rgba(220,53,69,0.15)]',
  warning: 'bg-[rgba(255,193,7,0.15)]',
}

export const CustomToast = ({
  id,
  message,
  type = 'default',
  style = 'style1',
  hasActionButton = true,
  actionLabel = 'BUTTON',
  onActionClick,
  hasCloseButton = true,
  hasIcon = true,
}: CustomToastProps) => {
  const config = typeConfig[type]
  const finalClasses = [baseStyle]

  const isWhiteBgStyle = ['style2', 'style3', 'style4'].includes(style)
  const isLeftBorderStyle = style === 'style4'
  const isBorderStyle = style === 'style3'

  if (style === 'style1') {
    finalClasses.push('bg-black', 'text-white')
  } else if (style === 'style5') {
    finalClasses.push(config.bgColor)
    finalClasses.push(type === 'default' ? 'text-black' : 'text-white')
  } else if (isWhiteBgStyle) {
    finalClasses.push('bg-white', 'text-black')

    if (style === 'style3' && type !== 'default') {
      finalClasses.push(translucentBgMap[type])
    }
  }

  if (isLeftBorderStyle) {
    finalClasses.push('border-l-4', config.leftBorderColor)
  }

  if (isBorderStyle) {
    finalClasses.push('border', config.toastBorderColor)
  }

  const ToastIcon = iconMap[type][style]
  const CloseIcon = closeIconMap[type][style]

  let actionButtonTextClass = ''
  if (style === 'style1') {
    actionButtonTextClass =
      type === 'default' ? 'text-white' : config.actionButtonTextColor
  } else if (style === 'style5') {
    actionButtonTextClass = type === 'default' ? 'text-black' : 'text-white'
  } else {
    actionButtonTextClass = config.actionButtonTextColor
  }

  return (
    <div className={clsx(finalClasses)}>
      <div className="flex flex-grow items-center gap-3">
        {hasIcon && ToastIcon && (
          <div className="flex flex-shrink-0 items-center justify-center">
            <Icon icon={ToastIcon} size={24} />
          </div>
        )}
        <span>{message}</span>
      </div>

      <div className="flex flex-shrink-0 items-center gap-2">
        {hasActionButton && (
          <button
            className={clsx(
              'rounded border-none bg-transparent px-2 py-1 text-xs font-bold',
              actionButtonTextClass
            )}
            onClick={() => {
              onActionClick?.()
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
              'rounded-full p-1',
              style !== 'style1' && 'hover:bg-gray-200'
            )}
            aria-label="Close"
          >
            <Icon
              icon={CloseIcon}
              size={16}
              color={
                style === 'style1' ? 'white' : config.actionButtonTextColor
              }
            />
          </button>
        )}
      </div>
    </div>
  )
}
