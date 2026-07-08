/**
 * G2 Activate Product Walkthrough
 * Interactive onboarding tour with multi-page support
 */

const G2Walkthrough = (function() {
  const STORAGE_KEY = 'g2ActivateWalkthroughCompleted';
  const STORAGE_STEP_KEY = 'g2ActivateWalkthroughCurrentStep';

  let currentStep = 0;
  let isActive = false;

  // Define walkthrough steps
  const steps = [
    // Step 0: Welcome Modal
    {
      type: 'modal',
      title: 'Welcome to G2 Activate!',
      content: 'Transform G2 buyer intent data into revenue. Let\'s take a quick tour of the key features to help you get started.',
      page: 'prospects-available.html',
      primaryButton: 'Start Tour',
      secondaryButton: 'Skip'
    },

    // Step 1: Credits Display (full - text + number + star)
    {
      type: 'tooltip',
      target: '.credits-display',
      title: 'Your Credit Balance',
      content: 'Credits power your prospecting. Each company unlock costs 50 credits. Monitor your balance here.',
      position: 'bottom',
      page: 'prospects-available.html',
      displayStepNumber: 1
    },

    // Step 2a: Filters - Informational
    {
      type: 'tooltip',
      target: '.filters-sidebar',
      title: 'Smart Filters',
      content: 'Narrow down high-intent prospects by department, location, company size, and more to find your ideal customers.',
      position: 'right',
      page: 'prospects-available.html',
      displayStepNumber: 2
    },

    // Step 2b: Filters - Interactive (Try it!)
    {
      type: 'tooltip',
      target: '.filters-sidebar',
      title: 'Smart Filters',
      content: 'Now try selecting one or more filters below to narrow down your prospects.',
      position: 'right',
      page: 'prospects-available.html',
      interactive: true,
      requirement: 'filter-selection',
      requirementText: 'Select at least one filter to continue',
      displayStepNumber: 2
    },

    // Step 3a: Company Table - Informational
    {
      type: 'tooltip',
      target: '.prospects-table tbody tr:first-child',
      title: 'High-Intent Prospects',
      content: 'These companies are actively researching your market on G2. Select companies by clicking the checkbox on the left.',
      position: 'right',
      page: 'prospects-available.html',
      showArrow: true,
      arrowTarget: '.prospects-table tbody tr:first-child .company-checkbox',
      displayStepNumber: 3
    },

    // Step 3b: Company Selection - Interactive (Try it!)
    {
      type: 'tooltip',
      target: '.prospects-table tbody',
      title: 'High-Intent Prospects',
      content: 'Now try selecting one or more companies by clicking the checkbox next to them.',
      position: 'left',
      page: 'prospects-available.html',
      showArrow: true,
      arrowTarget: '.prospects-table tbody tr:first-child .company-checkbox',
      interactive: true,
      requirement: 'company-selection',
      requirementText: 'Select at least one company to continue',
      displayStepNumber: 3,
      scrollTarget: '.content-title',  // Scroll to "Companies" heading to keep it visible
      tooltipOffsetY: -150  // Move tooltip up 150px from default position
    },

    // Step 4a: Unlock Button - Informational
    {
      type: 'tooltip',
      target: '#unlockButton',
      title: 'Unlock Contact Details',
      content: 'Once selected, click UNLOCK to reveal company details, contact information, and more. Start your outreach immediately.',
      position: 'bottom',
      page: 'prospects-available.html',
      displayStepNumber: 4,
      noScroll: true
    },

    // Step 4b: Unlock Button - Interactive (Click it!)
    {
      type: 'tooltip',
      target: '#unlockButton',
      title: 'Unlock Contact Details',
      content: 'Now click the UNLOCK button to reveal your selected companies.',
      position: 'bottom',
      page: 'prospects-available.html',
      interactive: true,
      requirement: 'unlock-button-click',
      hideRequirement: true,  // Hide progress bar since clicking navigates away
      displayStepNumber: 4,
      noScroll: true
    },

    // Step 4c: Sidebar Panel - Informational (shown when 2+ companies unlocked)
    {
      type: 'tooltip',
      target: '.panel-company-row:first-child',
      spotlightTargetAll: '.panel-company-row',  // Spotlight covers all company rows
      title: 'Companies Unlocked!',
      content: 'Here are your unlocked companies with their contact details now revealed.',
      position: 'left',
      page: 'prospects-available.html',
      displayStepNumber: 4,
      conditional: 'multi-company-unlock',
      noScroll: true
    },

    // Step 4d: Details Button - Interactive (shown when 2+ companies unlocked)
    {
      type: 'tooltip',
      target: '.panel-company-row:first-child .btn--secondary',
      spotlightTargetAll: '.panel-company-row .btn--secondary',  // Spotlight covers all Details buttons
      title: 'View Company Details',
      content: 'Click on any Details button to view the full company profile and contact information.',
      position: 'left',
      page: 'prospects-available.html',
      interactive: true,
      requirement: 'details-button-click',
      hideRequirement: true,  // Hide progress bar since clicking navigates away
      displayStepNumber: 4,
      conditional: 'multi-company-unlock',
      noScroll: true
    },

    // Step 5a: Company Info Card (on details page)
    {
      type: 'tooltip',
      target: '.company-info-left',  // Target bottom element for tooltip positioning
      spotlightTargetAll: '.company-name-section, .company-info-left',
      title: 'Company Overview',
      content: 'View key company details including their activity level, description, and the G2 products they\'ve been researching.',
      position: 'bottom',
      page: 'prospect-details.html',
      displayStepNumber: 5,
      noScroll: true
    },

    // Step 5b: Contacts Section (on details page)
    {
      type: 'tooltip',
      target: '.contacts-row',
      title: 'Key Contacts',
      content: 'These are the decision-makers at this company. Use their details to start personalized outreach.',
      position: 'top',
      page: 'prospect-details.html',
      displayStepNumber: 5
    },

    // Step 5c: Unlock Tech Stack Button (on details page)
    {
      type: 'tooltip',
      target: '#unlockTechStackBtn',
      title: 'Unlock Tech Stack',
      content: 'Unlock their tech stack to personalize your outreach strategy and understand what tools they already use.',
      position: 'left',
      page: 'prospect-details.html',
      interactive: true,
      requirement: 'techstack-unlock',
      hideRequirement: true,
      displayStepNumber: 5
    },

    // Step 5d: Tech Stack Cards (shown after unlock)
    {
      type: 'tooltip',
      target: '#techStackUnlocked',
      title: 'Tech Stack Revealed',
      content: 'Here\'s the technology stack this company uses. Leverage these insights to tailor your pitch and find common ground.',
      position: 'top',
      page: 'prospect-details.html',
      displayStepNumber: 5
    },

    // Step 5e: Generate Emails Button (on details page)
    {
      type: 'tooltip',
      target: '.contacts-actions .btn--primary',
      title: 'Generate Personalized Emails',
      content: 'Use AI to generate personalized email outreach based on the company\'s activity and your product offerings.',
      position: 'bottom',
      page: 'prospect-details.html',
      interactive: true,
      requirement: 'generate-emails-click',
      hideRequirement: true,
      displayStepNumber: 5
    },

    // Step 6: Back to Unlocked Prospects (on details page)
    {
      type: 'tooltip',
      target: '#backToUnlockedBtn',
      title: 'View All Unlocked Prospects',
      content: 'Head back to see all your unlocked prospects and continue your outreach campaign.',
      position: 'bottom',
      page: 'prospect-details.html',
      interactive: true,
      requirement: 'back-to-unlocked-click',
      hideRequirement: true,
      displayStepNumber: 6,
      spotlightPadding: 4,
      scrollToTop: true
    },

    // Step 7: Unlocked Companies Table (on unlocked prospects page)
    {
      type: 'tooltip',
      target: '.prospects-table tbody',
      title: 'Your Unlocked Prospects',
      content: 'Here are all your unlocked companies. Click on any company to view their details, contacts, and tech stack.',
      position: 'top',
      page: 'prospects-unlocked.html',
      displayStepNumber: 7,
      scrollToTop: true
    },

    // Step 8: Available Prospects Tab (on unlocked prospects page)
    {
      type: 'tooltip',
      target: '#availableProspectsTab',
      title: 'Discover More Prospects',
      content: 'Head back to Available Prospects to discover and unlock more high-intent companies for your outreach.',
      position: 'bottom',
      page: 'prospects-unlocked.html',
      interactive: true,
      requirement: 'available-prospects-tab-click',
      hideRequirement: true,
      displayStepNumber: 8,
      spotlightPadding: 4
    },

    // Step 9: Completion Modal (on available prospects page)
    {
      type: 'completion-modal',
      title: 'You\'re All Set!',
      content: 'Now that you\'ve seen the tour, head to your actual G2 Activate account to start unlocking high-intent companies and supercharge your outreach.',
      primaryButton: 'Go to G2 Activate',
      primaryButtonLink: 'https://my.g2.com/~/intent_driven_leads',
      secondaryText: 'Need a refresher?',
      secondaryButton: 'Restart the tour',
      page: 'prospects-available.html',
      displayStepNumber: 9
    }
  ];

  // Create overlay backdrop
  function createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'walkthrough-backdrop';
    backdrop.id = 'walkthrough-backdrop';
    return backdrop;
  }

  // Create spotlight effect
  function createSpotlight(targetElement, step) {
    const spotlight = document.createElement('div');
    spotlight.className = 'walkthrough-spotlight';
    spotlight.id = 'walkthrough-spotlight';

    if (targetElement) {
      positionSpotlight(spotlight, targetElement, step);

      // Reposition on window resize
      window.addEventListener('resize', () => positionSpotlight(spotlight, targetElement, step));
    }

    return spotlight;
  }

  // Calculate bounding box for multiple elements
  function getCombinedBoundingRect(elements) {
    if (!elements || elements.length === 0) return null;

    let minTop = Infinity, minLeft = Infinity;
    let maxBottom = -Infinity, maxRight = -Infinity;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      minTop = Math.min(minTop, rect.top);
      minLeft = Math.min(minLeft, rect.left);
      maxBottom = Math.max(maxBottom, rect.bottom);
      maxRight = Math.max(maxRight, rect.right);
    });

    return {
      top: minTop,
      left: minLeft,
      bottom: maxBottom,
      right: maxRight,
      width: maxRight - minLeft,
      height: maxBottom - minTop
    };
  }

  // Position spotlight around target element(s)
  function positionSpotlight(spotlight, targetElement, step) {
    let rect;

    // If spotlightTargetAll is specified, calculate bounding box for all matching elements
    if (step?.spotlightTargetAll) {
      const elements = document.querySelectorAll(step.spotlightTargetAll);
      rect = getCombinedBoundingRect(elements);
      if (!rect) {
        rect = targetElement.getBoundingClientRect();
      }
    } else {
      rect = targetElement.getBoundingClientRect();
    }

    const padding = step?.spotlightPadding ?? 8; // Custom padding or default 8px

    // For panel steps, use fixed positioning (no scroll offset) since spotlight is inside fixed dialog
    if (step?.conditional === 'multi-company-unlock') {
      spotlight.style.position = 'fixed';
      spotlight.style.top = `${rect.top - padding}px`;
      spotlight.style.left = `${rect.left - padding}px`;
    } else {
      spotlight.style.top = `${rect.top - padding + window.scrollY}px`;
      spotlight.style.left = `${rect.left - padding}px`;
    }
    spotlight.style.width = `${rect.width + padding * 2}px`;
    spotlight.style.height = `${rect.height + padding * 2}px`;
  }

  // Create welcome modal
  function createWelcomeModal(step) {
    const modal = document.createElement('div');
    modal.className = 'walkthrough-modal';
    modal.id = 'walkthrough-modal';

    modal.innerHTML = `
      <div class="walkthrough-modal-content">
        <div class="walkthrough-modal-header">
          <h2 class="walkthrough-modal-title">${step.title}</h2>
        </div>
        <p class="walkthrough-modal-body">${step.content}</p>
        <div class="walkthrough-modal-footer">
          <button class="walkthrough-btn walkthrough-btn-text" onclick="G2Walkthrough.skip()">
            ${step.secondaryButton}
          </button>
          <button class="walkthrough-btn walkthrough-btn-primary" onclick="G2Walkthrough.next()">
            ${step.primaryButton}
          </button>
        </div>
      </div>
    `;

    return modal;
  }

  // Create completion modal (final step)
  function createCompletionModal(step) {
    const modal = document.createElement('div');
    modal.className = 'walkthrough-modal walkthrough-completion-modal';
    modal.id = 'walkthrough-modal';

    modal.innerHTML = `
      <div class="walkthrough-modal-content">
        <div class="walkthrough-completion-icon-large">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="walkthrough-modal-header">
          <h2 class="walkthrough-modal-title">${step.title}</h2>
        </div>
        <p class="walkthrough-modal-body">${step.content}</p>
        <div class="walkthrough-completion-actions">
          <a href="${step.primaryButtonLink}" class="walkthrough-btn walkthrough-btn-primary walkthrough-btn-large" onclick="G2Walkthrough.complete()">
            ${step.primaryButton}
          </a>
          <div class="walkthrough-completion-secondary">
            <span class="walkthrough-completion-secondary-text">${step.secondaryText}</span>
            <button class="walkthrough-btn walkthrough-btn-text-link" onclick="G2Walkthrough.restart()">
              ${step.secondaryButton}
            </button>
          </div>
        </div>
      </div>
    `;

    return modal;
  }

  // Create tooltip
  function createTooltip(step, stepNumber, totalSteps) {
    const tooltip = document.createElement('div');
    tooltip.className = 'walkthrough-tooltip';
    tooltip.id = 'walkthrough-tooltip';

    // Use custom displayStepNumber if provided, otherwise use stepNumber
    const displayNumber = step.displayStepNumber || stepNumber;
    const totalUniqueSteps = 9; // Credits, Filters, Companies, Unlock, Details Page, Back to Unlocked, Unlocked Page, Available Tab, Restart

    const isLastStep = stepNumber === totalSteps;
    const hasEnhancedArrow = step.showArrow === true;
    const isInteractive = step.interactive === true;
    const showRequirement = isInteractive && !step.hideRequirement;

    // Interactive requirement HTML (hidden if hideRequirement is true)
    const requirementHtml = showRequirement ? `
      <div class="walkthrough-requirement">
        <div class="walkthrough-requirement-icon">○</div>
        <div class="walkthrough-requirement-text">${step.requirementText}</div>
      </div>
    ` : '';

    tooltip.innerHTML = `
      <div class="walkthrough-tooltip-content">
        <h3 class="walkthrough-tooltip-title">${step.title}</h3>
        <p class="walkthrough-tooltip-body">${step.content}</p>
        ${requirementHtml}
        <div class="walkthrough-tooltip-footer">
          <span class="walkthrough-step-counter">${displayNumber} of ${totalUniqueSteps}</span>
          <div class="walkthrough-tooltip-actions">
            <button class="walkthrough-btn walkthrough-btn-text" onclick="G2Walkthrough.skip()">
              Skip
            </button>
            <button class="walkthrough-btn walkthrough-btn-primary" onclick="G2Walkthrough.next()" ${isInteractive ? 'disabled' : ''}>
              ${isLastStep ? 'Done' : 'Next'}
            </button>
          </div>
        </div>
      </div>
      <div class="walkthrough-tooltip-arrow"></div>
      ${hasEnhancedArrow ? '<div class="walkthrough-enhanced-arrow"></div>' : ''}
    `;

    return tooltip;
  }

  // Position tooltip relative to target
  function positionTooltip(tooltip, targetElement, position = 'bottom', step = {}) {
    const rect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const spacing = 16;

    // For panel steps, use fixed positioning (no scroll offset) since tooltip is inside fixed dialog
    const isPanelStep = step?.conditional === 'multi-company-unlock';
    const scrollY = isPanelStep ? 0 : window.scrollY;
    const scrollX = isPanelStep ? 0 : window.scrollX;

    // Set position style for panel steps
    if (isPanelStep) {
      tooltip.style.position = 'fixed';
    }

    let top, left;

    switch (position) {
      case 'top':
        top = rect.top + scrollY - tooltipRect.height - spacing;
        left = rect.left + scrollX + (rect.width / 2) - (tooltipRect.width / 2);
        tooltip.classList.add('position-top');
        break;

      case 'bottom':
        top = rect.bottom + scrollY + spacing;
        left = rect.left + scrollX + (rect.width / 2) - (tooltipRect.width / 2);
        tooltip.classList.add('position-bottom');
        break;

      case 'left':
        top = rect.top + scrollY + (rect.height / 2) - (tooltipRect.height / 2);
        left = rect.left + scrollX - tooltipRect.width - spacing;
        tooltip.classList.add('position-left');
        break;

      case 'right':
        top = rect.top + scrollY + (rect.height / 2) - (tooltipRect.height / 2);
        left = rect.right + scrollX + spacing;
        tooltip.classList.add('position-right');
        break;

      default:
        top = rect.bottom + scrollY + spacing;
        left = rect.left + scrollX + (rect.width / 2) - (tooltipRect.width / 2);
        tooltip.classList.add('position-bottom');
    }

    // Keep tooltip within viewport
    const viewportWidth = window.innerWidth;
    const maxLeft = viewportWidth - tooltipRect.width - 16;

    if (left < 16) left = 16;
    if (left > maxLeft) left = maxLeft;

    // Position arrow to point to center of target element BEFORE applying offset
    const arrow = tooltip.querySelector('.walkthrough-tooltip-arrow');
    if (arrow) {
      if (position === 'top' || position === 'bottom') {
        const targetCenterX = rect.left + scrollX + (rect.width / 2);
        const arrowLeft = targetCenterX - left;
        arrow.style.left = `${arrowLeft}px`;
        arrow.style.marginLeft = '0';
      } else if (position === 'left' || position === 'right') {
        const targetCenterY = rect.top + scrollY + (rect.height / 2);
        const arrowTop = targetCenterY - top;
        arrow.style.top = `${arrowTop}px`;
        arrow.style.marginTop = '0';
      }
    }

    // Apply custom vertical offset AFTER arrow positioning
    if (step.tooltipOffsetY) {
      top += step.tooltipOffsetY;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    // Scroll target into view if needed (unless noScroll is set)
    if (step.scrollToTop) {
      // Scroll to the very top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (!step.noScroll) {
      const scrollElement = step.scrollTarget ? document.querySelector(step.scrollTarget) : targetElement;
      const scrollBlock = step.interactive ? 'start' : 'center';

      if (scrollElement) {
        scrollElement.scrollIntoView({ behavior: 'smooth', block: scrollBlock });
      }
    }
  }

  // Position enhanced arrow to point to specific element
  function positionEnhancedArrow(tooltip, arrowTargetSelector) {
    const arrowElement = tooltip.querySelector('.walkthrough-enhanced-arrow');
    if (!arrowElement) return;

    const targetElement = document.querySelector(arrowTargetSelector);
    if (!targetElement) return;

    const tooltipRect = tooltip.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const tooltipTop = parseInt(tooltip.style.top);
    const tooltipLeft = parseInt(tooltip.style.left);

    // Determine arrow direction based on tooltip position
    const tooltipPosition = tooltip.classList.contains('position-right') ? 'right' :
                           tooltip.classList.contains('position-bottom') ? 'bottom' :
                           tooltip.classList.contains('position-left') ? 'left' : 'top';

    if (tooltipPosition === 'right') {
      // Tooltip is to the right, arrow points left to target's RIGHT edge
      const targetCenter = targetRect.top + scrollY + (targetRect.height / 2);
      const arrowHeight = 20;
      const arrowTop = targetCenter - tooltipTop - (arrowHeight / 2);
      const targetRightEdge = targetRect.right;
      const arrowLeft = targetRightEdge - tooltipLeft + 8;

      arrowElement.style.top = `${arrowTop}px`;
      arrowElement.style.left = `${arrowLeft}px`;
      arrowElement.className = 'walkthrough-enhanced-arrow arrow-left';

    } else if (tooltipPosition === 'bottom') {
      // Tooltip is below target - determine if arrow points up or right
      const targetBottom = targetRect.bottom + scrollY;

      // If target is above tooltip, arrow points UP
      if (targetBottom < tooltipTop) {
        const targetCenterX = targetRect.left + scrollX + (targetRect.width / 2);
        const arrowWidth = 20; // Total width of arrow borders
        const arrowLeft = targetCenterX - tooltipLeft - (arrowWidth / 2);
        const arrowTop = targetBottom - tooltipTop + 8; // 8px gap below target

        arrowElement.style.top = `${arrowTop}px`;
        arrowElement.style.left = `${arrowLeft}px`;
        arrowElement.className = 'walkthrough-enhanced-arrow arrow-up';

      } else {
        // Target is at same level, arrow points RIGHT to target's LEFT edge
        const targetCenter = targetRect.top + scrollY + (targetRect.height / 2);
        const arrowHeight = 20;
        const arrowTop = targetCenter - tooltipTop - (arrowHeight / 2);
        const targetLeftEdge = targetRect.left + scrollX;
        const arrowLeft = targetLeftEdge - tooltipLeft - 24;

        arrowElement.style.top = `${arrowTop}px`;
        arrowElement.style.left = `${arrowLeft}px`;
        arrowElement.className = 'walkthrough-enhanced-arrow arrow-right';
      }
    }

    arrowElement.style.marginTop = '0';
  }

  // Clean up existing walkthrough elements
  // If fullCleanup is false, keeps body classes so dialogs maintain z-index during step transitions
  function cleanup(fullCleanup = false) {
    // Clean up interactive step listeners
    if (stepCleanupFn) {
      stepCleanupFn();
    }

    // Remove interactive target class from all elements
    const interactiveTargets = document.querySelectorAll('.walkthrough-interactive-target');
    interactiveTargets.forEach(el => el.classList.remove('walkthrough-interactive-target'));

    const backdrop = document.getElementById('walkthrough-backdrop');
    const spotlight = document.getElementById('walkthrough-spotlight');
    const modal = document.getElementById('walkthrough-modal');
    const tooltip = document.getElementById('walkthrough-tooltip');

    if (backdrop) backdrop.remove();
    if (spotlight) spotlight.remove();
    if (modal) modal.remove();
    if (tooltip) tooltip.remove();

    // Only remove body classes on full cleanup (skip/complete), not between steps
    if (fullCleanup) {
      document.body.classList.remove('walkthrough-active');
      document.body.classList.remove('walkthrough-interactive');
    }
  }

  // Interactive step management
  let stepCleanupFn = null;

  // Mark requirement as completed
  function completeRequirement() {
    const tooltip = document.getElementById('walkthrough-tooltip');
    if (!tooltip) return;

    const nextBtn = tooltip.querySelector('.walkthrough-btn-primary');
    const icon = tooltip.querySelector('.walkthrough-requirement-icon');

    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.classList.add('enabled');
    }

    if (icon) {
      icon.textContent = '✓';
      icon.classList.add('completed');
    }
  }

  // Reset requirement to incomplete
  function resetRequirement() {
    const tooltip = document.getElementById('walkthrough-tooltip');
    if (!tooltip) return;

    const nextBtn = tooltip.querySelector('.walkthrough-btn-primary');
    const icon = tooltip.querySelector('.walkthrough-requirement-icon');

    if (nextBtn) {
      nextBtn.disabled = true;
      nextBtn.classList.remove('enabled');
    }

    if (icon) {
      icon.textContent = '○';
      icon.classList.remove('completed');
    }
  }

  // Setup interactive listeners for Step 2 (filter selection)
  function setupFilterSelectionListener() {
    const comboboxes = window.comboboxInstances;
    if (!comboboxes) {
      console.warn('Walkthrough: Combobox instances not found');
      return;
    }

    console.log('Walkthrough: Setting up filter selection listener', comboboxes);

    function checkFilterSelection() {
      let hasSelection = false;

      comboboxes.forEach((instance, id) => {
        console.log('Walkthrough: Checking combobox', id, instance.state?.selectedValues);
        if (instance.state?.selectedValues && instance.state.selectedValues.size > 0) {
          hasSelection = true;
        }
      });

      console.log('Walkthrough: Has selection?', hasSelection);

      if (hasSelection) {
        completeRequirement();
      } else {
        resetRequirement();
      }
    }

    // Hook into renderTable function (comboboxes call this when selections change)
    const originalRenderTable = window.renderTable;
    if (originalRenderTable) {
      window.renderTable = function() {
        originalRenderTable.apply(this, arguments);
        console.log('Walkthrough: renderTable called, checking filters');
        checkFilterSelection();
      };
    }

    // Store cleanup function
    stepCleanupFn = () => {
      if (originalRenderTable) {
        window.renderTable = originalRenderTable;
      }
      stepCleanupFn = null;
    };

    // Initial check (in case filters already selected)
    checkFilterSelection();
  }

  // Setup interactive listeners for Step 3 (company selection)
  function setupCompanySelectionListener() {
    const selectedCompanies = window.selectedCompanies;
    if (!selectedCompanies) {
      console.warn('Walkthrough: selectedCompanies not found');
      return;
    }

    console.log('Walkthrough: Setting up company selection listener');

    function checkCompanySelection() {
      const hasSelection = selectedCompanies.size > 0;
      console.log('Walkthrough: Has company selection?', hasSelection, 'Count:', selectedCompanies.size);

      if (hasSelection) {
        completeRequirement();
      } else {
        resetRequirement();
      }
    }

    // Hook into updateStickyHeader function (called when checkbox selection changes)
    const originalUpdateStickyHeader = window.updateStickyHeader;
    if (originalUpdateStickyHeader) {
      window.updateStickyHeader = function() {
        originalUpdateStickyHeader.apply(this, arguments);
        console.log('Walkthrough: updateStickyHeader called, checking companies');
        checkCompanySelection();
      };
    }

    // Store cleanup function
    stepCleanupFn = () => {
      if (originalUpdateStickyHeader) {
        window.updateStickyHeader = originalUpdateStickyHeader;
      }
      stepCleanupFn = null;
    };

    // Initial check (in case companies already selected)
    checkCompanySelection();
  }

  // Track how many companies were selected for conditional step logic
  let companiesUnlockedCount = 0;

  // Setup interactive listeners for Step 4b (unlock button click)
  function setupUnlockButtonListener() {
    const unlockButton = document.getElementById('unlockButton');
    if (!unlockButton) {
      console.warn('Walkthrough: Unlock button not found');
      return;
    }

    console.log('Walkthrough: Setting up unlock button listener');

    // Store the count of selected companies before unlock
    const selectedCompanies = window.selectedCompanies;
    if (selectedCompanies) {
      companiesUnlockedCount = selectedCompanies.size;
      console.log('Walkthrough: Companies to unlock:', companiesUnlockedCount);
    }

    const handleUnlockClick = () => {
      console.log('Walkthrough: Unlock button clicked!');
      console.log('Walkthrough: companiesUnlockedCount:', companiesUnlockedCount);
      console.log('Walkthrough: window.selectedCompanies.size:', window.selectedCompanies?.size);

      // Store unlock count for conditional step logic
      localStorage.setItem('g2WalkthroughUnlockCount', companiesUnlockedCount);
      console.log('Walkthrough: Stored unlock count in localStorage:', companiesUnlockedCount);

      // For single company, page will navigate away - store state to continue on details page
      if (companiesUnlockedCount === 1) {
        console.log('Walkthrough: Single company - storing state for details page');
        localStorage.setItem('g2WalkthroughContinueOnDetails', 'true');
        // Don't complete requirement - let the page navigate
        // The walkthrough will continue on the details page
      } else {
        // For multi-company, auto-advance to next step after sidebar opens
        console.log('Walkthrough: Multi-company - scheduling next() in 500ms');
        setTimeout(() => {
          console.log('Walkthrough: 500ms elapsed, calling next()');
          G2Walkthrough.next();
        }, 500); // Small delay to let sidebar open
      }
    };

    unlockButton.addEventListener('click', handleUnlockClick);

    // Store cleanup function
    stepCleanupFn = () => {
      unlockButton.removeEventListener('click', handleUnlockClick);
      stepCleanupFn = null;
    };
  }

  // Setup interactive listeners for Step 4d (details button click)
  function setupDetailsButtonListener() {
    const panel = document.getElementById('unlock-panel');
    if (!panel) {
      console.warn('Walkthrough: Unlock panel not found');
      return;
    }

    console.log('Walkthrough: Setting up details button listener');

    const handleDetailsClick = (e) => {
      // Check if clicked element or parent is a details button
      const detailsBtn = e.target.closest('.btn--secondary');
      if (detailsBtn && detailsBtn.textContent.includes('Details')) {
        console.log('Walkthrough: Details button clicked - setting continue flag');
        // Set flag to continue walkthrough on details page
        localStorage.setItem('g2WalkthroughContinueOnDetails', 'true');
        // The page will navigate, and walkthrough will continue on details page
      }
    };

    panel.addEventListener('click', handleDetailsClick);

    // Store cleanup function
    stepCleanupFn = () => {
      panel.removeEventListener('click', handleDetailsClick);
      stepCleanupFn = null;
    };
  }

  // Setup interactive listeners for Step 5c (tech stack unlock button)
  function setupTechStackUnlockListener() {
    const unlockBtn = document.getElementById('unlockTechStackBtn');
    if (!unlockBtn) {
      console.warn('Walkthrough: Tech stack unlock button not found');
      return;
    }

    console.log('Walkthrough: Setting up tech stack unlock listener');

    const handleTechStackUnlock = () => {
      console.log('Walkthrough: Tech stack unlock button clicked');
      // Advance to next step (Tech Stack Cards) after unlock animation completes
      completeRequirement();
      setTimeout(() => G2Walkthrough.next(), 600);  // Longer delay for unlock animation
    };

    unlockBtn.addEventListener('click', handleTechStackUnlock);

    // Store cleanup function
    stepCleanupFn = () => {
      unlockBtn.removeEventListener('click', handleTechStackUnlock);
      stepCleanupFn = null;
    };
  }

  // Setup interactive listeners for Step 5d (generate emails button)
  function setupGenerateEmailsListener() {
    const generateBtn = document.querySelector('.contacts-actions .btn--primary');
    if (!generateBtn) {
      console.warn('Walkthrough: Generate Emails button not found');
      return;
    }

    console.log('Walkthrough: Setting up generate emails listener');

    const handleGenerateEmails = () => {
      console.log('Walkthrough: Generate Emails button clicked');
      // Advance to next step (Back to Unlocked)
      completeRequirement();
      setTimeout(() => G2Walkthrough.next(), 300);
    };

    generateBtn.addEventListener('click', handleGenerateEmails);

    // Store cleanup function
    stepCleanupFn = () => {
      generateBtn.removeEventListener('click', handleGenerateEmails);
      stepCleanupFn = null;
    };
  }

  // Setup interactive listeners for Step 8 (available prospects tab)
  function setupAvailableProspectsTabListener() {
    const tab = document.getElementById('availableProspectsTab');
    if (!tab) {
      console.warn('Walkthrough: Available Prospects tab not found');
      return;
    }

    console.log('Walkthrough: Setting up available prospects tab listener');

    const handleTabClick = () => {
      console.log('Walkthrough: Available Prospects tab clicked - setting continue flag');
      // Set flag to continue walkthrough on available prospects page
      localStorage.setItem('g2WalkthroughContinueOnAvailable', 'true');
      // The page will navigate, and walkthrough will continue
    };

    tab.addEventListener('click', handleTabClick);

    // Store cleanup function
    stepCleanupFn = () => {
      tab.removeEventListener('click', handleTabClick);
      stepCleanupFn = null;
    };
  }

  // Setup interactive listeners for Step 6 (back to unlocked button)
  function setupBackToUnlockedListener() {
    const backBtn = document.getElementById('backToUnlockedBtn');
    if (!backBtn) {
      console.warn('Walkthrough: Back to Unlocked button not found');
      return;
    }

    console.log('Walkthrough: Setting up back to unlocked listener');

    const handleBackToUnlocked = () => {
      console.log('Walkthrough: Back to Unlocked button clicked - setting continue flag');
      // Set flag to continue walkthrough on unlocked prospects page
      localStorage.setItem('g2WalkthroughContinueOnUnlocked', 'true');
      // The page will navigate, and walkthrough will continue on unlocked page
    };

    backBtn.addEventListener('click', handleBackToUnlocked);

    // Store cleanup function
    stepCleanupFn = () => {
      backBtn.removeEventListener('click', handleBackToUnlocked);
      stepCleanupFn = null;
    };
  }

  // Internal complete function
  function completeWalkthrough() {
    cleanup(true);  // Full cleanup - remove body classes
    isActive = false;
    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.removeItem(STORAGE_STEP_KEY);
    showCompletionMessage();
  }

  // Show specific step
  function showStep(stepIndex) {
    console.log('Walkthrough: showStep called with stepIndex:', stepIndex);
    cleanup();

    if (stepIndex >= steps.length) {
      console.log('Walkthrough: stepIndex >= steps.length, completing walkthrough');
      completeWalkthrough();
      return;
    }

    const step = steps[stepIndex];
    console.log('Walkthrough: Showing step:', step.title, 'type:', step.type, 'target:', step.target);
    currentStep = stepIndex;

    // Save current step to localStorage
    localStorage.setItem(STORAGE_STEP_KEY, stepIndex);

    // Add backdrop
    const backdrop = createBackdrop();
    document.body.appendChild(backdrop);
    document.body.classList.add('walkthrough-active');

    // Allow scrolling for interactive steps
    if (step.interactive) {
      document.body.classList.add('walkthrough-interactive');
    }

    // Trigger fade-in animation
    setTimeout(() => backdrop.classList.add('active'), 10);

    if (step.type === 'modal') {
      // Show welcome modal
      const modal = createWelcomeModal(step);
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('active'), 10);

    } else if (step.type === 'completion-modal') {
      // Show completion modal (final step)
      const modal = createCompletionModal(step);
      document.body.appendChild(modal);
      setTimeout(() => modal.classList.add('active'), 10);

    } else if (step.type === 'tooltip') {
      // Show tooltip with spotlight
      let targetElement = document.querySelector(step.target);

      // For panel-related steps, check if the panel is open
      if (step.conditional === 'multi-company-unlock') {
        const panel = document.getElementById('unlock-panel');
        console.log('Walkthrough: Checking panel for multi-company step. Panel:', panel, 'panel.open:', panel?.open);
        if (!panel || !panel.open) {
          console.warn('Walkthrough: Panel not open yet. Waiting 200ms...');
          // Wait a bit and retry
          setTimeout(() => showStep(stepIndex), 200);
          return;
        }
        console.log('Walkthrough: Panel is open, proceeding with step');
      }

      console.log('Walkthrough: Target element for step:', step.target, '=', targetElement);
      if (!targetElement) {
        console.warn(`Walkthrough: Target element "${step.target}" not found. Skipping step.`);
        next();
        return;
      }

      // Make target interactive if this is an interactive step
      if (step.interactive) {
        targetElement.classList.add('walkthrough-interactive-target');
      }

      // Determine spotlight target (can be different from tooltip target)
      let spotlightElement = targetElement;
      if (step.spotlightTargetAll) {
        // For multiple targets, use the first one as the base element but calculate combined bounds
        const allTargets = document.querySelectorAll(step.spotlightTargetAll);
        if (allTargets.length > 0) {
          spotlightElement = allTargets[0];
          // Make all targets interactive so all buttons are clickable
          if (step.interactive) {
            allTargets.forEach(el => el.classList.add('walkthrough-interactive-target'));
          }
        }
      } else if (step.spotlightTarget) {
        const customSpotlight = document.querySelector(step.spotlightTarget);
        if (customSpotlight) {
          spotlightElement = customSpotlight;
          // Also make spotlight target interactive so all buttons inside are clickable
          if (step.interactive) {
            customSpotlight.classList.add('walkthrough-interactive-target');
          }
        }
      }

      // Create spotlight
      const spotlight = createSpotlight(spotlightElement, step);

      // For panel steps, append spotlight inside the dialog so it's visible in the top layer
      if (step.conditional === 'multi-company-unlock') {
        const panel = document.getElementById('unlock-panel');
        if (panel) {
          panel.appendChild(spotlight);
        } else {
          document.body.appendChild(spotlight);
        }
      } else {
        document.body.appendChild(spotlight);
      }
      setTimeout(() => spotlight.classList.add('active'), 10);

      // Create tooltip
      const tooltipStepNumber = stepIndex; // Don't count welcome modal
      const totalTooltipSteps = steps.filter(s => s.type === 'tooltip').length;
      const tooltip = createTooltip(step, tooltipStepNumber, totalTooltipSteps);

      // For panel steps, append tooltip inside the dialog so it's in the same "top layer"
      // (modal dialogs create a top layer that ignores z-index)
      if (step.conditional === 'multi-company-unlock') {
        const panel = document.getElementById('unlock-panel');
        if (panel) {
          panel.appendChild(tooltip);
        } else {
          document.body.appendChild(tooltip);
        }
      } else {
        document.body.appendChild(tooltip);
      }

      // Position after render
      setTimeout(() => {
        positionTooltip(tooltip, targetElement, step.position, step);

        // Position enhanced arrow if needed
        if (step.showArrow && step.arrowTarget) {
          positionEnhancedArrow(tooltip, step.arrowTarget);
        }

        tooltip.classList.add('active');

        // Setup interactive listeners if needed
        if (step.interactive) {
          if (step.requirement === 'filter-selection') {
            setupFilterSelectionListener();
          } else if (step.requirement === 'company-selection') {
            setupCompanySelectionListener();
          } else if (step.requirement === 'unlock-button-click') {
            setupUnlockButtonListener();
          } else if (step.requirement === 'details-button-click') {
            setupDetailsButtonListener();
          } else if (step.requirement === 'techstack-unlock') {
            setupTechStackUnlockListener();
          } else if (step.requirement === 'generate-emails-click') {
            setupGenerateEmailsListener();
          } else if (step.requirement === 'back-to-unlocked-click') {
            setupBackToUnlockedListener();
          } else if (step.requirement === 'available-prospects-tab-click') {
            setupAvailableProspectsTabListener();
          }
        }
      }, 10);
    }
  }

  // Public API
  return {
    // Start the walkthrough
    start() {
      if (isActive) return;

      isActive = true;
      currentStep = 0;
      localStorage.removeItem(STORAGE_STEP_KEY);
      showStep(0);
    },

    // Go to next step
    next() {
      console.log('Walkthrough: next() called, currentStep:', currentStep);

      // Mark as seen when user clicks "Start Tour" (moving from welcome modal to first step)
      if (currentStep === 0) {
        localStorage.setItem(STORAGE_KEY, 'true');
      }

      // Find the next step, skipping conditional steps that don't apply
      let nextIndex = currentStep + 1;
      console.log('Walkthrough: Starting search from nextIndex:', nextIndex);

      while (nextIndex < steps.length) {
        const nextStep = steps[nextIndex];
        console.log('Walkthrough: Evaluating step', nextIndex, ':', nextStep.title, 'conditional:', nextStep.conditional);

        // Check if this step should be skipped based on conditions
        if (nextStep.conditional === 'multi-company-unlock') {
          const unlockCount = parseInt(localStorage.getItem('g2WalkthroughUnlockCount') || '0');
          console.log('Walkthrough: Multi-company check - unlock count:', unlockCount);

          if (unlockCount < 2) {
            console.log('Walkthrough: Skipping multi-company step (only', unlockCount, 'company)');
            nextIndex++;
            continue;
          } else {
            console.log('Walkthrough: NOT skipping - showing multi-company step');
          }
        }

        // This step should be shown
        break;
      }

      console.log('Walkthrough: Final nextIndex:', nextIndex, 'calling showStep');
      showStep(nextIndex);
    },

    // Skip walkthrough
    skip() {
      cleanup(true);  // Full cleanup - remove body classes
      isActive = false;
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.removeItem(STORAGE_STEP_KEY);
    },

    // Complete walkthrough
    complete() {
      completeWalkthrough();
    },

    // Reset walkthrough (for testing)
    reset() {
      cleanup();
      isActive = false;
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_STEP_KEY);
      console.log('Walkthrough reset. Refresh the page to see it again.');
    },

    // Restart walkthrough from beginning
    restart() {
      cleanup(true);
      isActive = true;
      currentStep = 0;
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_STEP_KEY);
      showStep(0);
    },

    // Check if walkthrough has been completed
    isCompleted() {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    },

    // Continue walkthrough on details page
    continueOnDetailsPage() {
      console.log('Walkthrough: Continuing on details page');
      isActive = true;

      // Find the first step for prospect-details.html
      const detailsStepIndex = steps.findIndex(s => s.page === 'prospect-details.html');
      if (detailsStepIndex === -1) {
        console.warn('Walkthrough: No steps found for details page');
        return;
      }

      console.log('Walkthrough: Starting from step index', detailsStepIndex);
      currentStep = detailsStepIndex;
      showStep(detailsStepIndex);
    },

    // Continue walkthrough on unlocked prospects page
    continueOnUnlockedPage() {
      console.log('Walkthrough: Continuing on unlocked prospects page');
      isActive = true;

      // Find the first step for prospects-unlocked.html
      const unlockedStepIndex = steps.findIndex(s => s.page === 'prospects-unlocked.html');
      if (unlockedStepIndex === -1) {
        console.warn('Walkthrough: No steps found for unlocked page');
        return;
      }

      console.log('Walkthrough: Starting from step index', unlockedStepIndex);
      currentStep = unlockedStepIndex;
      showStep(unlockedStepIndex);
    },

    // Continue walkthrough on available prospects page (final step)
    continueOnAvailablePage() {
      console.log('Walkthrough: Continuing on available prospects page');
      isActive = true;

      // Find the completion modal step (last step)
      const completionStepIndex = steps.findIndex(s => s.type === 'completion-modal');
      if (completionStepIndex === -1) {
        console.warn('Walkthrough: Completion modal step not found');
        return;
      }

      console.log('Walkthrough: Starting from step index', completionStepIndex);
      currentStep = completionStepIndex;
      showStep(completionStepIndex);
    }
  };

  // Show completion message
  function showCompletionMessage() {
    const message = document.createElement('div');
    message.className = 'walkthrough-completion';
    message.innerHTML = `
      <div class="walkthrough-completion-content">
        <div class="walkthrough-completion-icon">✓</div>
        <h3>You're all set!</h3>
        <p>Start unlocking high-intent prospects and activate your pipeline.</p>
      </div>
    `;

    document.body.appendChild(message);
    setTimeout(() => message.classList.add('active'), 10);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      message.classList.remove('active');
      setTimeout(() => message.remove(), 300);
    }, 3000);
  }

})();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Shift + W to reset walkthrough
  if (e.shiftKey && e.key === 'W') {
    e.preventDefault();
    G2Walkthrough.reset();
  }

  // Escape to skip
  if (e.key === 'Escape' && document.body.classList.contains('walkthrough-active')) {
    e.preventDefault();
    G2Walkthrough.skip();
  }
});
