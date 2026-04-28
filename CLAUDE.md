# G2 Activate Prototype — Agent Context

> **Epic-specific context for the G2 Activate HTML prototype**  
> Last updated: 2026-04-23

---

## Overview

**G2 Activate** is a functional HTML prototype demonstrating a buyer intent product that transforms G2's buyer activity data into actionable leads. Users can browse prospects, unlock contact details for credits, and activate them via email or LinkedIn campaigns.

**Key Philosophy:**
- **Fully functional prototype** — not just mockups
- **Browser-based state** — uses localStorage, no server required
- **Elevate design system** — 1:1 fidelity with production design system
- **Multi-page persistence** — state maintained across page navigation

---

## Current State (What's Built)

### ✅ Completed Pages

1. **prospects-available.html** — Main page
   - Filterable table of 5 mock companies
   - Multi-select comboboxes for filtering (Departments, Management Levels, Job Functions, Location)
   - Employee count range filtering
   - Checkbox selection with bulk unlock
   - Sticky header with total credits calculation
   - Real-time filtering (filters work accurately)
   - Fully functional "Clear All" buttons per section

2. **prospect-details.html** — Detail view (template-based)
   - Dynamically populated from URL parameter (`?id=company-id`)
   - Company info, contacts, tech stack (locked/unlocked states)
   - Single company unlock flow

3. **activation-linkedin-ads.html** — Activation page
   - Static page with tabs, ready for content

4. **Templates**
   - `template-prospects.html` — Base for Prospects tab pages
   - `template-activation.html` — Base for Activation tab pages

### 📋 To-Do Pages (from roadmap)

- prospects-unlocked.html
- activation-emails.html  
- manage-plan-active.html
- manage-plan-canceled.html
- manage-plan-upgrade.html

---

## Architecture & Key Decisions

### State Management

**Location:** `/prototype-state.js`

Uses **localStorage** with key `g2ActivateState`. Structure:

```javascript
{
  credits: 150,
  plan: { type, status, price, monthlyCredits, renewDate },
  availableCompanies: [...],  // Companies not yet unlocked
  unlockedCompanies: [...]    // Companies user has unlocked
}
```

**Key Methods:**
- `G2ActivateState.get()` — Get current state
- `G2ActivateState.unlockCompany(id, cost)` — Move company from available → unlocked
- `G2ActivateState.updateCreditDisplay()` — Auto-update all `[data-credits]` elements
- `G2ActivateState.reset()` — Clear state (Shift+R keyboard shortcut)

**Data Structure per Company:**
```javascript
{
  id: 'company-id',
  name: 'Company Name',
  activityLevel: 'High' | 'Medium' | 'Low',
  employees: '875',          // Display string
  employeeCount: 875,        // Number for filtering
  location: 'City, State',
  revenue: '$21,400,000',
  contacts: 3,
  unlockCost: 50,
  industry: 'Software Publishers',
  departments: ['sales', 'marketing', 'engineering'],
  managementLevels: ['vp', 'director', 'manager'],
  jobFunctions: ['business-dev', 'demand-gen', 'software-eng']
}
```

### Filtering System

**Location:** `prospects-available.html` (lines ~1105-1200)

**How it works:**
1. `getFilterValues()` — Extracts current selections from comboboxes and range inputs
2. `filterCompanies(companies)` — Filters array based on current selections
3. `renderTable()` — Re-renders table with filtered results
4. Event listeners trigger `renderTable()` on every filter change

**Filter Logic:**
- **Multi-select filters** (Departments, Management, Functions) — Company must have at least ONE matching value
- **Location filter** — Maps country codes to city names (e.g., 'us' matches Austin, San Francisco, etc.)
- **Employee range** — Min/max numeric filtering
- **Empty state** — Shows different message if filters are active vs. no companies

**Clear All Buttons:**
- Scoped per section (Contact Filters / Company Filters)
- Disabled (gray) when nothing selected, enabled (purple) when filters active
- Clears all comboboxes + range inputs in their section

### Combobox Components

**Location:** `prospects-available.html` (ElevateCombobox class, lines ~1430-1736)

Multi-select comboboxes with:
- Search/filter functionality
- Chip-based selection display
- Keyboard navigation (arrows, enter, escape, backspace)
- Clear all button per combobox
- Full ARIA accessibility

**Data attribute:** `data-combobox` triggers auto-initialization

**Stored instances:** `comboboxInstances` Map allows programmatic access to clear/update selections

---

## Design System Integration

### Elevate Components Used

- **Buttons** — `.btn.btn--primary` with full Elevate specs (padding, states, focus ring)
- **Comboboxes** — Multi-select with chips (P10 background, P100 text)
- **Form inputs** — Text inputs with Elevate focus states (3px purple outline)
- **Tables** — Semantic structure with hover states
- **Tabs** — Primary and secondary tab patterns
- **Colors** — All using CSS tokens (`--bg-primary`, `--text-default`, etc.)
- **Typography** — Figtree font, no pure black
- **Spacing** — 4px grid system

### Key Styling Patterns

**Date Filters (segmented control):**
```css
.date-filter {
  background: var(--bg-neutral-5);  /* Default */
}
.date-filter.active {
  background: #ebe9f6;  /* P10 purple light */
}
```

**Credits Column:**
- Background: `var(--bg-neutral-5)` (#FAFAFA) for both header and cells
- Border-right: `0.5px solid var(--border-medium)`
- Width: 120px (narrow, content-based)
- Right-aligned text + star icon

**Button States:**
```css
.btn--primary {
  background: var(--bg-primary);     /* Purple #5746b2 */
  border-radius: 100px;              /* Fully rounded */
}
.btn--primary:hover {
  background: #6b59c3;               /* Lighter purple */
}
.btn--primary:focus {
  box-shadow: 0px 0px 0px 0.5px white, 0px 0px 0px 3px rgb(195, 189, 229);
}
```

---

## Known Issues

**Reference:** `.internal/elevate-qa-issues.md`

**Summary:**
- **Total:** 23 issues (8 critical, 15 minor)
- **Compliance:** ~85% Elevate-compliant
- **Estimated fix time:** 3-5 hours

**Critical Issues (Priority 1):**
1. Missing focus states on buttons, tabs, breadcrumbs
2. Form labels missing `for`/`id` associations
3. Select-all checkbox lacks ARIA label
4. Date filter buttons need descriptive ARIA labels
5. Inline styles need extraction to CSS classes

**Minor Issues (Priority 2):**
- Border widths: 0.5px → 1px (12 instances)
- Spacing off 4px grid (5 instances)
- Hardcoded intent badge colors
- Shadow opacity exceeds 12% max

**What's Already Correct:**
- Typography (Figtree, no pure black)
- Color tokens (~85% coverage)
- Border radius values
- Button structure and specs
- Semantic HTML

---

## Page Templates

### Using Templates

**Prospects pages:** Copy `pages/template-prospects.html`  
**Activation pages:** Copy `pages/template-activation.html`

**Steps:**
1. Copy template
2. Update `<title>` tag
3. Add `active` class to correct tab
4. Update section title and description
5. Add page-specific styles in `PAGE-SPECIFIC STYLES` section
6. Add content in `PAGE CONTENT` section

**Templates include:**
- MyG2 global header (with back button, logo, help, avatar)
- Breadcrumbs
- Page header with credits display
- Primary tabs (Prospects / Activation)
- Secondary tabs (tab-specific)
- Content area with proper Elevate background
- State management script reference

### State Management Integration

**Auto-included in templates:**
```html
<script src="../prototype-state.js"></script>
```

**Credits display (auto-updates):**
```html
<span data-credits>150</span>
```

**Unlock flow example:**
```javascript
const result = G2ActivateState.unlockCompany(companyId, 50);
if (result.success) {
  // Handle success
  G2ActivateState.updateCreditDisplay();
}
```

---

## Working with This Prototype

### Development Workflow

1. **Open any HTML file** — Just open in browser, no build step
2. **State persists** — Changes maintained across page refreshes
3. **Reset demo data** — Press `Shift+R` to clear localStorage
4. **Multi-user testing** — Each browser/profile has isolated state

### Testing Filters

**Available companies (5 total):**
1. Predictive — Sales/Marketing/Eng, 875 employees, Port Saint Lucie FL
2. InsightWave — Product/Eng/CS, 642 employees, Austin TX
3. AlgoStream — Eng/Ops/Finance, 1250 employees, San Francisco CA
4. DataVision — Sales/Marketing/Product, 450 employees, Boston MA
5. MetricPulse — Marketing/Sales/HR, 2100 employees, New York NY

**Filter tests:**
- Select "Sales" department → Shows 3 companies (Predictive, DataVision, MetricPulse)
- Select "United States" location → Shows all 5
- Set employee range 500-1000 → Shows 2 companies (InsightWave, Predictive)

### Common Tasks

**Add a new company:**
Edit `prototype-state.js` → `INITIAL_STATE.availableCompanies` array

**Change unlock cost:**
Update `unlockCost` field per company (currently all 50 credits)

**Add a new filter:**
1. Add combobox to HTML
2. Update `getFilterValues()` to read it
3. Update `filterCompanies()` to apply logic

**Fix a QA issue:**
Reference `.internal/elevate-qa-issues.md` for specific line numbers and fixes

---

## File Structure

```
g2-activate-prototype/
├── CLAUDE.md                      ← This file
├── PROTOTYPE-README.md            ← Developer guide
├── prototype-state.js             ← State management system
├── .internal/
│   ├── elevate-qa-issues.md       ← QA audit results
│   └── prospect-details-spec.md   ← Detail page specifications
├── pages/
│   ├── prospects-available.html   ← Main prospects page ✅
│   ├── prospect-details.html      ← Detail page (template) ✅
│   ├── activation-linkedin-ads.html ✅
│   ├── template-prospects.html    ← Base template
│   └── template-activation.html   ← Base template
└── assets/
    └── [future: screenshots, mockups]
```

---

## Design References

**Primary:**
- `/shared/elevate-lite/design-system/DESIGN.md` — Authoritative Elevate specs
- [Elevate Lookbook](https://www.g2.test/elevate/lookbook) — Visual component reference

**Figma:**
- Main design file: `figma.com/design/7tZuGDPePNGXddvLMr3gqb/G2-Activate`
- Available Prospects node: `4428:83829`
- Date filters node: `4590:287901`

---

## Next Steps

### Immediate Priorities

1. **Fix critical QA issues** (focus states, ARIA labels) — 2-3 hours
2. **Build prospects-unlocked.html** — Use template, show unlocked companies
3. **Build activation-emails.html** — Parallel to LinkedIn Ads page
4. **Build manage-plan pages** (active, canceled, upgrade)

### Future Enhancements

- Add more mock companies (currently 5)
- Add intent level filtering
- Add industry filtering
- Add sorting (by credits, intent, company size)
- Add date range picker for Custom date filter
- Export/download functionality
- Activity timeline visualization

---

## Questions & Troubleshooting

**Q: Filters not working?**  
A: Check browser console for errors. Ensure `comboboxInstances` is defined before `renderTable()` is called (initialization order matters).

**Q: State not persisting?**  
A: Check localStorage in DevTools. Clear if corrupted. Use Shift+R to reset.

**Q: Companies showing (0)?**  
A: Likely `renderTable()` called before comboboxes initialized. Moved to line ~1745 after initialization.

**Q: Table not rendering?**  
A: Check `G2ActivateState.get().availableCompanies` exists. Verify `prototype-state.js` loaded.

**Q: Styling looks wrong?**  
A: Verify all CSS files loaded:
- `../../../shared/elevate-lite/tokens/elevate.css`
- `../../../shared/elevate-lite/components/elevate.css`
- Material Symbols font (for combobox icons)

---

## Agent Handoff Notes

**This prototype is production-ready for demo purposes.** The filtering system is fully functional, state management is robust, and the design system compliance is high (~85%). 

**When iterating:**
- Maintain Elevate specs from DESIGN.md
- Keep filtering logic in sync if adding new filter types
- Use templates for new pages to maintain consistency
- Document new features in this CLAUDE.md
- Update QA doc if fixing issues

**When in doubt:**
- Reference DESIGN.md for component specs
- Use existing patterns from prospects-available.html
- Check Lookbook for visual confirmation
- Test filters with various combinations

**Key mantras:**
- Elevate first (don't invent UI patterns)
- Keep it functional (this isn't just mockups)
- Maintain state contract (don't break localStorage schema)
- 4px spacing grid always
