/**
 * G2 Activate Prototype - State Management
 *
 * Uses localStorage to persist state across pages and sessions.
 * No cookies, no server required. Each user's browser maintains isolated state.
 *
 * Usage:
 *   <script src="../prototype-state.js"></script>
 *
 *   // Get current state
 *   const state = G2ActivateState.get();
 *
 *   // Unlock a company
 *   G2ActivateState.unlockCompany('company-id', 10);
 *
 *   // Add credits
 *   G2ActivateState.addCredits(100);
 */

const G2ActivateState = (function() {
  const STORAGE_KEY = 'g2ActivateState';

  // Initial mock data
  const INITIAL_STATE = {
    credits: 150,
    plan: {
      type: 'G2 Activate Pro',
      status: 'inactive',
      price: 499,
      monthlyCredits: 5000,
      renewDate: '2026-05-15'
    },
    unlockedCompanies: [],
    availableCompanies: [
      {
        id: 'predictive-001',
        name: 'Predictive',
        activityLevel: 'High',
        employees: '875',
        employeeCount: 875,
        location: 'Port Saint Lucie, FL',
        revenue: '$21,400,000',
        contacts: 3,
        unlockCost: 50,
        industry: 'Software Publishers',
        departments: ['sales', 'marketing', 'engineering'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen', 'software-eng']
      },
      {
        id: 'insightwave-002',
        name: 'InsightWave',
        activityLevel: 'High',
        employees: '642',
        employeeCount: 642,
        location: 'Austin, TX',
        revenue: '$17,560,000',
        contacts: 2,
        unlockCost: 50,
        industry: 'Data Analytics',
        departments: ['product', 'engineering', 'cs'],
        managementLevels: ['c-level', 'vp', 'director'],
        jobFunctions: ['product-mgmt', 'software-eng', 'customer-support']
      },
      {
        id: 'algostream-003',
        name: 'AlgoStream',
        activityLevel: 'High',
        employees: '1250',
        employeeCount: 1250,
        location: 'San Francisco, CA',
        revenue: '$15,240,000',
        contacts: 3,
        unlockCost: 50,
        industry: 'Software Publishers',
        departments: ['engineering', 'operations', 'finance'],
        managementLevels: ['director', 'manager', 'individual'],
        jobFunctions: ['software-eng', 'data-analytics', 'account-exec']
      },
      {
        id: 'datavision-004',
        name: 'DataVision',
        activityLevel: 'Medium',
        employees: '450',
        employeeCount: 450,
        location: 'Boston, MA',
        revenue: '$15,240,000',
        contacts: 3,
        unlockCost: 50,
        industry: 'Business Intelligence',
        departments: ['sales', 'marketing', 'product'],
        managementLevels: ['vp', 'manager', 'individual'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt']
      },
      {
        id: 'metricpulse-005',
        name: 'MetricPulse',
        activityLevel: 'Medium',
        employees: '2100',
        employeeCount: 2100,
        location: 'New York, NY',
        revenue: '$17,560,000',
        contacts: 3,
        unlockCost: 50,
        industry: 'Software Publishers',
        departments: ['marketing', 'sales', 'hr'],
        managementLevels: ['c-level', 'vp', 'director'],
        jobFunctions: ['demand-gen', 'account-exec', 'business-dev']
      }
    ]
  };

  /**
   * Initialize state if it doesn't exist
   */
  function init() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STATE));
    }
  }

  /**
   * Get current state
   */
  function get() {
    init();
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  }

  /**
   * Save state
   */
  function save(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    // Dispatch custom event so other pages can listen
    window.dispatchEvent(new CustomEvent('g2ActivateStateChange', {
      detail: state
    }));
  }

  /**
   * Reset to initial state (for testing)
   */
  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('g2ActivatePaymentMethodSaved');
    init();
    window.location.reload();
  }

  /**
   * Unlock a company
   */
  function unlockCompany(companyId, cost = 50) {
    const state = get();

    // Check if enough credits
    if (state.credits < cost) {
      return {
        success: false,
        message: 'Insufficient credits',
        credits: state.credits
      };
    }

    // Find company in available list
    const companyIndex = state.availableCompanies.findIndex(c => c.id === companyId);
    if (companyIndex === -1) {
      return {
        success: false,
        message: 'Company not found'
      };
    }

    const company = state.availableCompanies[companyIndex];

    // Deduct credits
    state.credits -= cost;

    // Move to unlocked
    state.unlockedCompanies.push({
      ...company,
      unlockedDate: new Date().toISOString(),
      unlockCost: cost
    });

    // Remove from available
    state.availableCompanies.splice(companyIndex, 1);

    // Save
    save(state);

    return {
      success: true,
      message: `${company.name} unlocked!`,
      credits: state.credits,
      company: company
    };
  }

  /**
   * Add credits to balance
   */
  function addCredits(amount) {
    const state = get();
    state.credits += amount;
    save(state);

    return {
      success: true,
      credits: state.credits,
      added: amount
    };
  }

  /**
   * Update plan status
   */
  function updatePlanStatus(status) {
    const state = get();
    state.plan.status = status;
    save(state);
  }

  /**
   * Get credits balance
   */
  function getCredits() {
    return get().credits;
  }

  /**
   * Get available companies (with optional filtering)
   */
  function getAvailableCompanies(filters = {}) {
    const state = get();
    let companies = [...state.availableCompanies];

    // Apply filters if provided
    if (filters.activityLevel) {
      companies = companies.filter(c => c.activityLevel === filters.activityLevel);
    }

    return companies;
  }

  /**
   * Get unlocked companies (with optional filtering)
   */
  function getUnlockedCompanies(filters = {}) {
    const state = get();
    let companies = [...state.unlockedCompanies];

    // Sort by unlock date (most recent first) by default
    companies.sort((a, b) => new Date(b.unlockedDate) - new Date(a.unlockedDate));

    return companies;
  }

  /**
   * Get plan info
   */
  function getPlan() {
    return get().plan;
  }

  /**
   * Update credit balance display across UI
   */
  function updateCreditDisplay() {
    const credits = getCredits();
    const creditElements = document.querySelectorAll('[data-credits]');
    creditElements.forEach(el => {
      el.textContent = credits.toLocaleString();
    });
  }

  // Initialize on load
  init();

  // Keyboard shortcut: Shift+R to reset demo
  document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'R') {
      if (confirm('Reset demo data? This will clear all unlocked companies and reset credits to 150.')) {
        reset();
        window.location.href = 'prospects-available.html';
      }
    }
  });

  // Public API
  return {
    get,
    save,
    reset,
    unlockCompany,
    addCredits,
    updatePlanStatus,
    getCredits,
    getAvailableCompanies,
    getUnlockedCompanies,
    getPlan,
    updateCreditDisplay
  };
})();

// Initialize credit displays on page load
document.addEventListener('DOMContentLoaded', () => {
  G2ActivateState.updateCreditDisplay();
});
