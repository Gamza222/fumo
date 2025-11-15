// src/infrastructure/providers/app-loading/lib/conditions/conditionsFactory.ts

import {
  AppLoadingConditionId,
  AppLoadingConditionName,
} from "../../model/enums/enums";
import { TIMEOUTS, PRIORITIES } from "../../model/constants/constants";
import { LoadingCondition } from "../../model/types/types";
import {
  checkDOMReady,
  checkCriticalCSS,
  checkThemeInitialized,
  checkCoreJavaScript,
  checkMediaBackground,
} from "./conditionChecks";

// ============================================================================
// CONDITIONS CONFIGURATION (Open/Closed - Easy to extend)
// ============================================================================

export const createLoadingConditions = (): LoadingCondition[] => [
  {
    id: AppLoadingConditionId.DOM_READY,
    name: AppLoadingConditionName.PREPARING_APPLICATION,
    priority: PRIORITIES[AppLoadingConditionId.DOM_READY],
    check: checkDOMReady,
    timeout: TIMEOUTS[AppLoadingConditionId.DOM_READY],
  },
  {
    id: AppLoadingConditionId.CRITICAL_CSS,
    name: AppLoadingConditionName.LOADING_STYLES,
    priority: PRIORITIES[AppLoadingConditionId.CRITICAL_CSS],
    check: checkCriticalCSS,
    timeout: TIMEOUTS[AppLoadingConditionId.CRITICAL_CSS],
  },
  {
    id: AppLoadingConditionId.THEME_INITIALIZED,
    name: AppLoadingConditionName.APPLYING_THEME,
    priority: PRIORITIES[AppLoadingConditionId.THEME_INITIALIZED],
    check: checkThemeInitialized,
    timeout: TIMEOUTS[AppLoadingConditionId.THEME_INITIALIZED],
  },
  {
    id: AppLoadingConditionId.CORE_JAVASCRIPT,
    name: AppLoadingConditionName.LOADING_CORE_FEATURES,
    priority: PRIORITIES[AppLoadingConditionId.CORE_JAVASCRIPT],
    check: checkCoreJavaScript,
    timeout: TIMEOUTS[AppLoadingConditionId.CORE_JAVASCRIPT],
  },
  {
    id: AppLoadingConditionId.MEDIA_BACKGROUND,
    name: AppLoadingConditionName.LOADING_BACKGROUND,
    priority: PRIORITIES[AppLoadingConditionId.MEDIA_BACKGROUND],
    check: checkMediaBackground,
    timeout: TIMEOUTS[AppLoadingConditionId.MEDIA_BACKGROUND],
  },
];
