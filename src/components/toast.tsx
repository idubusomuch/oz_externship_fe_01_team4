// ./CustomToast.tsx (또는 @components/Toast/CustomToast.tsx)

// 메인 아이콘 SVG 임포트 (실제 경로와 파일명에 맞춰주세요.)
import DefaultStyle1Icon from '@/assets/toast/default_style1.svg?react';
import InfoStyle1Icon from '@/assets/toast/info_style1.svg?react';
import SuccessStyle1Icon from '@/assets/toast/success_style1.svg?react';
import ErrorStyle1Icon from '@/assets/toast/error_style1.svg?react';
import WarningStyle1Icon from '@/assets/toast/warning_style1.svg?react';

import DefaultStyle2Icon from '@/assets/toast/default_style2.svg?react';
import InfoStyle2Icon from '@/assets/toast/info_style2.svg?react';
import SuccessStyle2Icon from '@/assets/toast/success_style2.svg?react';
import ErrorStyle2Icon from '@/assets/toast/error_style2.svg?react';
import WarningStyle2Icon from '@/assets/toast/warning_style2.svg?react';

import DefaultStyle3Icon from '@/assets/toast/default_style3.svg?react';
import InfoStyle3Icon from '@/assets/toast/info_style3.svg?react';
import SuccessStyle3Icon from '@/assets/toast/success_style3.svg?react';
import ErrorStyle3Icon from '@/assets/toast/error_style3.svg?react';
import WarningStyle3Icon from '@/assets/toast/warning_style3.svg?react';

import DefaultStyle4Icon from '@/assets/toast/default_style4.svg?react';
import InfoStyle4Icon from '@/assets/toast/info_style4.svg?react';
import SuccessStyle4Icon from '@/assets/toast/success_style4.svg?react';
import ErrorStyle4Icon from '@/assets/toast/error_style4.svg?react';
import WarningStyle4Icon from '@/assets/toast/warning_style4.svg?react';

import DefaultStyle5Icon from '@/assets/toast/default_style5.svg?react';
import InfoStyle5Icon from '@/assets/toast/info_style5.svg?react';
import SuccessStyle5Icon from '@/assets/toast/success_style5.svg?react';
import ErrorStyle5Icon from '@/assets/toast/error_style5.svg?react';
import WarningStyle5Icon from '@/assets/toast/warning_style5.svg?react';

// 닫기 아이콘 SVG 임포트 (실제 경로와 파일명에 맞춰주세요.)
import CloseWhiteIcon from '@/assets/toast/close_white.svg?react';
import CloseBlackIcon from '@/assets/toast/close_black.svg?react';
import CloseBlueIcon from '@/assets/toast/close_blue.svg?react';
import CloseGreenIcon from '@/assets/toast/close_green.svg?react';
import CloseRedIcon from '@/assets/toast/close_red.svg?react';
import CloseYellowIcon from '@/assets/toast/close_yellow.svg?react';

import { toast } from "react-hot-toast";
import clsx from "clsx";
import React from 'react';

import Icon from './Icon'; // Icon 컴포넌트 경로에 맞게 수정해주세요.

export type ToastType = "default" | "info" | "success" | "error" | "warning";
export type ToastStyle = "style1" | "style2" | "style3" | "style4" | "style5";

interface CustomToastProps {
  id: string;
  message: string;
  type?: ToastType;
  style?: ToastStyle;
  hasActionButton?: boolean;
  actionLabel?: string;
  onActionClick?: () => void;
  hasCloseButton?: boolean;
  hasIcon?: boolean;
}

// 아이콘 매핑: 타입과 스타일에 따라 아이콘을 선택
const iconMap: Record<ToastType, Record<ToastStyle, React.ElementType>> = {
  default: {
    style1: DefaultStyle1Icon, style2: DefaultStyle2Icon, style3: DefaultStyle3Icon, style4: DefaultStyle4Icon, style5: DefaultStyle5Icon,
  },
  info: {
    style1: InfoStyle1Icon, style2: InfoStyle2Icon, style3: InfoStyle3Icon, style4: InfoStyle4Icon, style5: InfoStyle5Icon,
  },
  success: {
    style1: SuccessStyle1Icon, style2: SuccessStyle2Icon, style3: SuccessStyle3Icon, style4: SuccessStyle4Icon, style5: SuccessStyle5Icon,
  },
  error: {
    style1: ErrorStyle1Icon, style2: ErrorStyle2Icon, style3: ErrorStyle3Icon, style4: ErrorStyle4Icon, style5: ErrorStyle5Icon,
  },
  warning: {
    style1: WarningStyle1Icon, style2: WarningStyle2Icon, style3: WarningStyle3Icon, style4: WarningStyle4Icon, style5: WarningStyle5Icon,
  },
};

// 닫기 아이콘 매핑
const closeIconMap: Record<ToastType, Record<ToastStyle, React.ElementType>> = {
  default: {
    style1: CloseWhiteIcon,
    style2: CloseBlackIcon,
    style3: CloseBlackIcon,  // CloseGrayIcon 대신 CloseBlackIcon
    style4: CloseBlackIcon,
    style5: CloseWhiteIcon,
  },
  info: {
    style1: CloseWhiteIcon,
    style2: CloseBlueIcon,
    style3: CloseBlueIcon,
    style4: CloseBlueIcon,
    style5: CloseWhiteIcon,
  },
  success: {
    style1: CloseWhiteIcon,
    style2: CloseGreenIcon,
    style3: CloseGreenIcon,
    style4: CloseGreenIcon,
    style5: CloseWhiteIcon,
  },
  error: {
    style1: CloseWhiteIcon,
    style2: CloseRedIcon,
    style3: CloseRedIcon,
    style4: CloseRedIcon,
    style5: CloseWhiteIcon,
  },
  warning: {
    style1: CloseWhiteIcon,
    style2: CloseYellowIcon,
    style3: CloseYellowIcon,
    style4: CloseYellowIcon,
    style5: CloseWhiteIcon,
  },
};

// ====================================================================
// [REFACTOR] 타입별 설정을 객체로 분리하여 중복 제거
// ====================================================================
const typeConfig = {
  default: {
    actionButtonBg: "bg-toast-default-button-bg",
    actionButtonText: "text-white",
    actionButtonBorder: "border-gray-300",
    actionButtonTextColor: "text-gray-700",
    toastTextColor: "text-text-on-light",
    toastBorderColor: "border-border-light-gray",
    leftBorderColor: "border-l-gray-500",
    bgColor: "bg-toast-default-bg",
  },
  info: {
    actionButtonBg: "bg-figma-blue",
    actionButtonText: "text-white",
    actionButtonBorder: "border-figma-blue",
    actionButtonTextColor: "text-figma-blue",
    toastTextColor: "text-figma-blue",
    toastBorderColor: "border-figma-blue",
    leftBorderColor: "border-l-figma-blue",
    bgColor: "bg-figma-blue",
  },
  success: {
    actionButtonBg: "bg-figma-green",
    actionButtonText: "text-white",
    actionButtonBorder: "border-figma-green",
    actionButtonTextColor: "text-figma-green",
    toastTextColor: "text-figma-green",
    toastBorderColor: "border-figma-green",
    leftBorderColor: "border-l-figma-green",
    bgColor: "bg-figma-green",
  },
  error: {
    actionButtonBg: "bg-figma-red",
    actionButtonText: "text-white",
    actionButtonBorder: "border-figma-red",
    actionButtonTextColor: "text-figma-red",
    toastTextColor: "text-figma-red",
    toastBorderColor: "border-figma-red",
    leftBorderColor: "border-l-figma-red",
    bgColor: "bg-figma-red",
  },
  warning: {
    actionButtonBg: "bg-figma-yellow",
    actionButtonText: "text-white",
    actionButtonBorder: "border-figma-yellow",
    actionButtonTextColor: "text-figma-yellow",
    toastTextColor: "text-figma-yellow",
    toastBorderColor: "border-figma-yellow",
    leftBorderColor: "border-l-figma-yellow",
    bgColor: "bg-figma-yellow",
  },
};

// 기본 레이아웃 스펙
const baseStyle = "w-[350px] text-sm flex items-center justify-between gap-3 shadow-md flex-shrink-0";

export const CustomToast = ({
  id,
  message,
  type = "default",
  style = "style1",
  hasActionButton = true,
  actionLabel = "BUTTON",
  onActionClick,
  hasCloseButton = true,
  hasIcon = true,
}: CustomToastProps) => {

  const config = typeConfig[type];

  // 스타일별 동적 조정 로직
  let finalClasses = [baseStyle, "px-4 py-3", "rounded-2xl"];
  let currentActionButtonClasses = "";
  let iconWrapperClasses = "";
  let closeButtonWrapperClasses = "";
  let iconSize = 24; // 기본 아이콘 크기 24x24px

  // Action Button 기본 스타일 설정 (Style 1, 5)
  const defaultActionButtonClasses = clsx("text-xs font-bold px-2 py-1 rounded", config.actionButtonBg, config.actionButtonText);
  // Bordered Action Button 기본 스타일 설정 (Style 2, 4)
  const borderedActionButtonClasses = clsx("text-xs font-bold px-2 py-1 rounded border hover:opacity-80", config.actionButtonBorder, config.actionButtonTextColor);

  switch (style) {
    case 'style1':
      currentActionButtonClasses = defaultActionButtonClasses;
      iconWrapperClasses = clsx("w-8 h-8 rounded-full", config.bgColor); // 32x32px 래퍼
      closeButtonWrapperClasses = config.bgColor;
      finalClasses.push("text-white", config.bgColor);
      break;

    case 'style2':
      currentActionButtonClasses = borderedActionButtonClasses;
      finalClasses.push("bg-white", config.toastTextColor, config.toastBorderColor);
      break;

    case 'style3':
      currentActionButtonClasses = borderedActionButtonClasses;
      iconSize = 8; // Style 3 아이콘 크기 8x8px
      finalClasses = [baseStyle, "px-3 py-2", "rounded-2xl", "text-xs", config.toastTextColor, config.toastBorderColor, "bg-white"];
      break;

    case 'style4':
      currentActionButtonClasses = clsx("text-xs font-bold px-3 py-1 rounded border hover:opacity-80", config.actionButtonBorder, config.actionButtonTextColor);
      finalClasses.push("bg-white", config.toastTextColor, "border-l-4", config.leftBorderColor, config.toastBorderColor);
      break;

    case 'style5':
      currentActionButtonClasses = defaultActionButtonClasses;
      finalClasses.push("w-auto max-w-md", "px-6 py-4", "text-base font-bold", "text-white", config.bgColor);
      break;
  }

  // 동적으로 선택된 메인 아이콘 컴포넌트
  const ToastIconComponent = iconMap[type][style];
  // 동적으로 선택된 닫기 아이콘 컴포넌트
  const CloseIconComponent = closeIconMap[type][style];

  return (
    <div className={clsx(finalClasses)}>
      <div className="flex items-center gap-3 flex-grow">
        {hasIcon && (
          <div className={clsx("flex items-center justify-center flex-shrink-0", iconWrapperClasses)}>
            <Icon
              icon={ToastIconComponent}
              size={iconSize}
            />
          </div>
        )}
        <span>{message}</span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {hasActionButton && (
          <button
            className={currentActionButtonClasses}
            onClick={() => {
              if (onActionClick) onActionClick();
              toast.dismiss(id);
            }}
          >
            {actionLabel}
          </button>
        )}
        {hasCloseButton && (
          <button
            onClick={() => toast.dismiss(id)}
            className={clsx(
              "p-1 rounded-full",
              style !== 'style1' && 'hover:bg-gray-200',
              style === 'style1' && `w-8 h-8 flex items-center justify-center ${closeButtonWrapperClasses}`
            )}
            aria-label="Close"
          >
            <Icon icon={CloseIconComponent} size={16} /> {/* 닫기 아이콘 크기 16x16px */}
          </button>
        )}
      </div>
    </div>
  );
};
