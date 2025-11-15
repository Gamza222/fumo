# Task Plan: Loader & Navigation System

## Overview

Implement a comprehensive loading and navigation system with Windows 95 aesthetics, including cache detection, conditional loading, and smooth transitions.

## Phase 1: Loader Improvements

✅ Task 1.1: InitialLoader Fade-out Animation - DONE
[x] Add Windows 95 style fade-out animation to InitialLoader
[x] Implement smooth opacity transition (0.3s ease-out)
[x] Remove loader from DOM after animation completes
[x] Add timeout fallback handler to clean up component

✅ Task 1.2: VideoBackground Fullscreen Positioning - DONE
[x] Set VideoBackground to position: fixed
[x] Apply top: 0, left: 0, width: 100vw, height: 100vh
[x] Add z-index: -1 to stay behind all content
[x] Ensure background doesn't scroll with content
[x] Test on different screen sizes
[x] Maintain aspect ratio with object-fit: cover

✅ Task 1.3: Performance Optimizations - DONE
[x] Reduced re-renders from 520 to ~60-80 (85% reduction)
[x] Throttled progress updates to 20fps while keeping 60fps animation
[x] Memoized context values and loading adapter
[x] Optimized component memo dependencies
[x] Fixed fade animation hook with useRef

## Phase 2: Cache Detection System

✅ Task 2.1: Enhanced Cache Detection - DONE
[x] Created `useSkipLoader()` hook with cache detection
[x] Check all loading conditions:

- DOM ready state
- Critical CSS loaded
- Core JavaScript loaded
- Theme initialized
- Media background loaded
  [x] Return boolean indicating if resources are cached
  [x] Synchronous initialization to prevent flash

✅ Task 2.2: Conditional Loader Logic - DONE
[x] **First visit/no cache**: Show InitialLoader on all pages ✓
[x] **Home page**: Always show InitialLoader (full experience) ✓
[x] **Other pages (cached)**: Skip InitialLoader entirely ✓
[x] Route-aware skip logic (HOME never skips)
[x] Guard clause prevents loading sequence when skipped
[x] No hydration errors with SSR compatibility

## Phase 3: Navigation & Components

### Task 3.1: Navbar Widget Structure - IN PROGRESS

**File Structure Setup:**

- [ ] Create `widgets/Navbar/` directory
- [ ] Create `model/types/types.ts` for interfaces
- [ ] Create `model/constants/constants.ts` for nav links configuration
- [ ] Create `hooks/useNavbarVisibility/useNavbarVisibility.ts` for visibility logic
- [ ] Create `lib/lib.ts` for utility functions
- [ ] Create `ui/` directory for components
- [ ] Create `index.ts` for exports

**Type Definitions:**

- [ ] Define `NavbarProps` interface (className)
- [ ] Define `NavLink` interface (href, label, icon?, isActive)
- [ ] Export types from model/types

**Constants Setup:**

- [ ] Create `getNavigationLinks()` function to read from route config
- [ ] Generate nav links dynamically from `routeConfigs` (AppRoute enum)
- [ ] Extract route titles from metadata (remove " - Fumo" suffix)
- [ ] Export `NAV_LINKS` constant
- [ ] Define z-index constant (visibility.index("lg") = 100)

### Task 3.2: Navbar Visibility Hook

**Create useNavbarVisibility hook:**

- [ ] Listen to `INITIAL_LOADER_HIDE_EVENT`
- [ ] Set visible state to true when event fires
- [ ] Check localStorage for `fumo_has_visited` flag
- [ ] Show navbar immediately if loader was skipped (cached non-HOME pages)
- [ ] Return `isVisible` boolean state
- [ ] Clean up event listener on unmount

**Hook API:**

```typescript
export const useNavbarVisibility = (): boolean => {
  // Implementation
  return isVisible;
};
```

### Task 3.3: Desktop Navbar Component

**Create NavbarDesktop.tsx:**

- [ ] Accept `className`, `currentPath`, `isVisible` props
- [ ] Import `NAV_LINKS` from constants
- [ ] Map through links and render as horizontal list
- [ ] Use Next.js `Link` component for navigation
- [ ] Apply active state styling based on `currentPath`
- [ ] Use `classNames` utility (NOT cva - too simple for cva)

**Desktop Styles (NavbarDesktop.module.scss):**

- [ ] Fixed positioning at top: 0
- [ ] Full width, height: 48px
- [ ] Windows 95 title bar background (`--color-window-title-bar-bg`)
- [ ] Border bottom: 2px solid (`--color-window-border`)
- [ ] Flexbox layout with gap
- [ ] Hidden on mobile/tablet (display: none)
- [ ] Visible on desktop (≥1024px)
- [ ] Smooth slide-down transition (opacity + translateY)
- [ ] z-index: 100 (visibility.index("lg"))

**NavLink Styling:**

- [ ] Windows 95 button style (raised border effect)
- [ ] Padding: 6px 12px
- [ ] Active state: inverted border (pressed effect)
- [ ] Hover state: lighter background
- [ ] Font: 14px, weight 500
- [ ] Min-width: 75px, centered text

### Task 3.4: Mobile Navbar Component

**Create NavbarMobile.tsx:**

- [ ] Accept `className`, `currentPath`, `isVisible`, `isOpen`, `onToggle` props
- [ ] Render hamburger button (always visible)
- [ ] Render full-screen overlay menu (conditional on `isOpen`)
- [ ] Close menu on link click
- [ ] Close menu on Escape key press
- [ ] Close menu on backdrop click
- [ ] Focus trap when menu is open

**Mobile Hamburger Button:**

- [ ] Fixed position: top-right (top: 12px, right: 16px)
- [ ] Size: 40x40px
- [ ] Three horizontal bars (classic hamburger icon)
- [ ] Windows 95 button styling
- [ ] Transform to X when open (optional animation)
- [ ] z-index: 101 (above overlay)

**Mobile Menu Overlay:**

- [ ] Full-screen (position: fixed, inset: 0)
- [ ] Background: blur backdrop + semi-transparent
- [ ] Flex center content
- [ ] Vertical nav links list
- [ ] Large touch targets (min 48px height)
- [ ] Slide-in animation from right
- [ ] z-index: 100

**Mobile Styles (NavbarMobile.module.scss):**

- [ ] Visible on mobile/tablet (< 1024px)
- [ ] Hidden on desktop (display: none)
- [ ] Overlay background: `backdrop-filter: blur(8px)`
- [ ] Animation: slideInRight 0.3s ease-out
- [ ] Active link: same pressed effect as desktop

### Task 3.5: Main Navbar Orchestrator

**Create Navbar.tsx (main component):**

- [ ] Use `useNavbarVisibility()` hook
- [ ] Use `useState` for mobile menu open/close
- [ ] Use `usePathname()` from Next.js for current route
- [ ] Get current route with `getCurrentRouteConfig(pathname)`
- [ ] Map nav links with active state
- [ ] Render both Desktop and Mobile components
- [ ] Desktop shows on ≥1024px (CSS media query)
- [ ] Mobile shows on <1024px (CSS media query)
- [ ] Pass visibility state to both

**Component Structure:**

```typescript
export const Navbar = ({ className }: NavbarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isVisible = useNavbarVisibility();
  const pathname = usePathname();
  const currentRouteInfo = getCurrentRouteConfig(pathname);

  const navbarMods: Mods = {
    [styles.visible]: isVisible,
  };

  return (
    <>
      <NavbarDesktop
        className={classNames(styles.navbar, navbarMods, [className])}
        currentPath={currentRouteInfo.route}
        isVisible={isVisible}
      />
      <NavbarMobile
        className={classNames(styles.navbar, navbarMods, [className])}
        currentPath={currentRouteInfo.route}
        isVisible={isVisible}
        isOpen={isMobileOpen}
        onToggle={() => setIsMobileOpen(!isMobileOpen)}
      />
    </>
  );
};
```

\*\*Main Navbar Styles (
