# Initial App Loader Implementation

## Overview

Create initial loading screen that shows on every page reload until app is ready. This loader will be the first thing users see and must provide smooth, fast, and polished experience.

## Requirements

### Core Functionality

- [ ] Shows on every page reload (including cached loads)
- [ ] Waits for essential loading conditions:
  - [ ] DOM ready state
  - [ ] Critical CSS loaded
  - [ ] Theme initialized
  - [ ] Core JavaScript loaded
- [ ] Error handling: force complete after 2 seconds timeout
- [ ] Smooth progress bar with percentage
- [ ] Fade out animation when complete
- [ ] Mobile responsive design
- [ ] Dark theme support

### Performance Requirements

- [ ] Optimize for speed - loader itself must be fast
- [ ] Performance monitoring for loader component
- [ ] Performance monitoring for overall app load
- [ ] Cached loads should be significantly faster
- [ ] No performance impact on main app

### Code Quality Requirements

- [ ] Follow SOLID principles
- [ ] Use React best practices:
  - [ ] Proper use of useMemo, useCallback
  - [ ] Optimized re-renders
  - [ ] Proper dependency arrays
  - [ ] TypeScript strict typing
- [ ] Clean architecture (infrastructure + widgets separation)
- [ ] Comprehensive error boundaries

### Future Extensibility (Placeholders)

- [ ] Animation detection system structure (empty for now)
- [ ] Custom loading conditions framework
- [ ] Performance metrics collection
- [ ] Advanced error handling and retry logic

## Implementation Plan - Step by Step

### Phase 1: Infrastructure Layer (Step 1) ✅ COMPLETED

**Goal**: Create the foundation - types, loading conditions, and provider logic

#### Step 1.1: Create Directory Structure ✅

- [x] Create `src/infrastructure/providers/app-loading/` directory
- [x] Verify directory structure is correct

**Final Structure Created:**

```
src/infrastructure/providers/app-loading/
├── model/
│   ├── enums/
│   │   └── enums.ts              # AppLoadingConditionId, AppLoadingConditionName, AppLoadingPriority
│   ├── constants/
│   │   └── constants.ts          # Timeouts, priorities, selectors
│   └── types/
│       └── types.ts              # LoadingCondition, AppLoadingState, AppLoadingContextType
├── hooks/
│   ├── useAppLoading/
│   │   ├── useAppLoading.ts      # Core loading logic hook
│   │   └── useAppLoading.test.ts # Hook tests
│   └── useAppLoadingContext/
│       ├── useAppLoadingContext.ts      # Context consumption hook
│       └── useAppLoadingContext.test.tsx # Context tests
├── ui/
│   ├── AppLoadingProvider.tsx    # React Context provider
│   └── AppLoadingProvider.test.tsx # Provider tests
└── index.ts                      # Clean exports
```

#### Step 1.2: Define Types ✅

- [x] Create `types.ts` with LoadingCondition, AppLoadingState interfaces
- [x] Add proper TypeScript definitions
- [x] Export types cleanly

**Key Types Created:**

- `LoadingCondition` - Individual loading step definition
- `LoadingStep` - Step with completion status
- `AppLoadingState` - Current loading state
- `AppLoadingContextType` - Context interface
- `UseAppLoadingReturn` - Hook return type

#### Step 1.3: Enums & Constants ✅

- [x] Create `enums.ts` with AppLoadingConditionId, AppLoadingConditionName, AppLoadingPriority
- [x] Create `constants.ts` with timeouts, priorities, selectors
- [x] Use enums as keys in constants for type safety
- [x] No hardcoded values anywhere

**Key Enums Created:**

- `AppLoadingConditionId` - Unique identifiers for conditions
- `AppLoadingConditionName` - Human-readable names
- `AppLoadingPriority` - Loading priority levels

#### Step 1.4: Core Hook ✅

- [x] Create `useAppLoading.ts` hook with:
  - [x] State management for loading progress
  - [x] Memoized callbacks (useCallback)
  - [x] Error handling with 2-second timeout
  - [x] Progress calculation logic
  - [x] Individual condition check functions (SRP)
  - [x] useMemo for loading conditions
  - [x] SOLID principles compliance
- [x] Test hook in isolation

**Key Features:**

- DOM ready check
- Critical CSS check
- Theme initialization check
- Core JavaScript check
- Minimum display time
- Force complete & restart methods

#### Step 1.5: Context Provider ✅

- [x] Create `AppLoadingProvider.tsx` with:
  - [x] React Context setup
  - [x] Provider component (separated from context hook per FSD)
  - [x] Context hook with error handling
- [x] Create `useAppLoadingContext.ts` (separate file per FSD)
- [x] Add proper TypeScript context types
- [x] Test both provider and context hook

#### Step 1.6: Infrastructure Exports ⏳ NEXT

- [ ] Create `index.ts` with clean exports
- [ ] Update `src/infrastructure/providers/index.ts`
- [ ] Update `src/infrastructure/index.ts`
- [ ] Test exports work correctly

**Phase 1 Completion Criteria**:

- All infrastructure files created and working
- Types properly defined
- Hook and provider tested in isolation
- Clean exports working

---

### Phase 2: Widget Layer (Step 2)

**Goal**: Create the UI component that users will see

#### Step 2.1: Create Widget Structure

- [ ] Create `src/widgets/InitialLoader/` directory
- [ ] Create `ui/`, `lib/`, `types/` subdirectories

#### Step 2.2: Basic UI Component

- [ ] Create `ui/InitialLoader.tsx` with:
  - [ ] React.memo optimization
  - [ ] Progress bar display
  - [ ] Percentage display
  - [ ] Loading status text
  - [ ] Conditional rendering (only show when loading)
- [ ] Connect to useAppLoadingContext hook

#### Step 2.3: Styling

- [ ] Create `ui/InitialLoader.module.scss` with:
  - [ ] Full-screen overlay
  - [ ] Centered content
  - [ ] Progress bar styling
  - [ ] Basic responsive design
  - [ ] Dark theme support (placeholder)
- [ ] Test styling in isolation

#### Step 2.4: Widget Logic (if needed)

- [ ] Create `lib/loadingLogic.ts` for widget-specific logic
- [ ] Add any additional calculations or formatting
- [ ] Keep it minimal for MVP

#### Step 2.5: Widget Types

- [ ] Create `types/index.ts` for widget-specific types
- [ ] Export widget types

#### Step 2.6: Widget Exports

- [ ] Create `index.ts` with clean exports
- [ ] Test widget can be imported correctly

**Phase 2 Completion Criteria**:

- Widget component renders correctly
- Styling looks good on desktop
- Component is properly optimized with memo
- All exports working

---

### Phase 3: Integration (Step 3)

**Goal**: Connect everything together and test basic functionality

#### Step 3.1: Root Layout Integration

- [ ] Update `src/app/layout.tsx` to:
  - [ ] Import AppLoadingProvider
  - [ ] Import InitialLoader widget
  - [ ] Wrap app with provider
  - [ ] Add widget to render tree
- [ ] Ensure proper provider hierarchy

#### Step 3.2: Basic Testing

- [ ] Test app loads without errors
- [ ] Test loader appears on page refresh
- [ ] Test loader disappears when conditions met
- [ ] Check console for errors

#### Step 3.3: Provider Hierarchy Verification

- [ ] Verify provider order is correct
- [ ] Test context is available in components
- [ ] Ensure no context errors

#### Step 3.4: Basic Performance Check

- [ ] Check initial load time
- [ ] Verify no memory leaks in console
- [ ] Test multiple page refreshes

**Phase 3 Completion Criteria**:

- App loads without errors
- Loader shows and hides correctly
- No console errors
- Basic functionality working

---

### Phase 4: Testing & Optimization (Step 4)

**Goal**: Ensure performance and reliability

#### Step 4.1: Responsive Testing

- [ ] Test on mobile devices (simulate)
- [ ] Test on tablet devices
- [ ] Test on different screen sizes
- [ ] Adjust styles if needed

#### Step 4.2: Performance Profiling

- [ ] Measure loader component mount time
- [ ] Measure progress update performance
- [ ] Check for unnecessary re-renders
- [ ] Optimize if needed (useMemo, useCallback)

#### Step 4.3: Error Handling Testing

- [ ] Test timeout scenarios
- [ ] Test error conditions
- [ ] Verify graceful degradation
- [ ] Test force complete functionality

#### Step 4.4: Performance Targets Validation

- [ ] Verify < 3 second total load time
- [ ] Verify < 500ms cached load time
- [ ] Check bundle size impact
- [ ] Memory usage validation

**Phase 4 Completion Criteria**:

- All performance targets met
- Responsive design working
- Error handling working correctly
- No performance issues

---

### Phase 5: Documentation & Finalization (Step 5)

**Goal**: Document the implementation and prepare for merge

#### Step 5.1: Code Documentation

- [ ] Add JSDoc comments to all functions
- [ ] Add inline comments for complex logic
- [ ] Document all exported functions
- [ ] Update README if needed

#### Step 5.2: Architecture Documentation

- [ ] Update `documents/` folder with:
  - [ ] Loading system architecture overview
  - [ ] Usage examples
  - [ ] Performance guidelines
  - [ ] Future extension guide
- [ ] Create diagrams if helpful

#### Step 5.3: Git Preparation

- [ ] Ensure all files are properly committed
- [ ] Write clear commit messages
- [ ] Push to remote branch
- [ ] Prepare pull request description

#### Step 5.4: Final Testing

- [ ] Full end-to-end testing
- [ ] Test all scenarios from task requirements
- [ ] Verify success criteria are met
- [ ] Final code review

**Phase 5 Completion Criteria**:

- All documentation updated
- Code is clean and well-documented
- Ready for pull request
- All success criteria met

---

## Current Status

**Current Phase**: Phase 1 - Infrastructure Layer ✅ COMPLETED
**Next Step**: Step 1.6 - Infrastructure Exports (Create index.ts files)

## What We've Learned & Improved

### Architecture Decisions Made:

1. **FSD Compliance**: Separated provider UI from context consumption hook into different files
2. **Enums First**: Created enums before constants to ensure type safety and avoid magic strings
3. **Model Layer**: Organized enums, constants, and types in dedicated model folder
4. **SOLID Principles**: Each function has single responsibility (SRP), easy to extend (OCP)
5. **React Best Practices**: Used useMemo, useCallback, proper dependency arrays
6. **Testing Strategy**: Comprehensive unit tests for hooks and providers

### Key Improvements Made:

- **No Hardcoded Values**: All values come from enums/constants
- **Type Safety**: Enums used as keys in constants for compile-time safety
- **Clean Separation**: Infrastructure logic separate from UI widgets
- **Performance**: Memoized expensive operations and callbacks
- **Error Handling**: Proper context error handling with clear messages

## Technical Specifications

### Loading Conditions (MVP)

```typescript
const conditions = [
  { id: 'dom-ready', timeout: 2000 },
  { id: 'critical-css', timeout: 2000 },
  { id: 'theme-initialized', timeout: 2000 },
  { id: 'core-javascript', timeout: 2000 },
];
```

### Performance Targets

- Loader component mount: < 16ms
- Progress updates: < 8ms
- Total loading time: < 3 seconds (first load)
- Cached loads: < 500ms
- Memory usage: < 5MB additional

### Error Handling Strategy

- Individual condition timeout: 2 seconds
- Force complete after total timeout
- Graceful degradation
- Console warnings in development

## Future Extensions (Placeholders)

### Animation Detection

```typescript
// Placeholder structure - implement later
export const createAnimationLoadingSteps = (): LoadingCondition[] => [
  // TODO: Add animation completion detection
  // TODO: Add custom animation hooks
];
```

### Performance Metrics

```typescript
// Placeholder structure - implement later
export const trackLoadingPerformance = () => {
  // TODO: Add performance tracking
  // TODO: Add metrics collection
};
```

### Advanced Error Handling

```typescript
// Placeholder structure - implement later
export const createRetryLogic = () => {
  // TODO: Add retry mechanisms
  // TODO: Add fallback strategies
};
```

## Git Workflow

### Branch Management

- [ ] Work on `feat/initial-app-loader` branch
- [ ] Regular commits with clear messages
- [ ] Push to remote regularly
- [ ] Create pull request when complete
- [ ] Code review and testing
- [ ] Merge to master
- [ ] Delete feature branch

### Commit Message Format

```
feat(loading): add initial app loader infrastructure

- Add AppLoadingProvider with context
- Add loading conditions logic
- Add performance monitoring hooks
- Add TypeScript definitions

Closes #XXX
```

## Success Criteria

- [ ] Loader shows on every page reload
- [ ] Smooth progress indication
- [ ] Fast performance (< 3s first load, < 500ms cached)
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Dark theme support
- [ ] Clean, maintainable code
- [ ] Comprehensive documentation
- [ ] Ready for future extensions

## Notes

- Keep implementation simple for MVP
- Focus on performance and user experience
- Ensure easy extensibility for future features
- Follow existing project patterns and conventions
- Test thoroughly before merging to master
