/**
 * G2 Activate Prototype - State Management with Realistic Data
 * Generated: 2026-04-27
 * Based on real G2 database companies and BuyerCaddy enrichment patterns
 */

const G2ActivateState = (function() {
  const STORAGE_KEY = 'g2ActivateState';

  // Realistic data based on actual G2 database companies
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
        id: 'company-001',
        name: 'MileIQ',
        activityLevel: 'High',
        activityScore: 87,
        employees: '6',
        employeeCount: 6,
        location: 'Seattle, WA',
        revenue: '$1.6M',
        contacts: 2,
        unlockCost: 50,
        industry: 'Software Publishers',
        description: 'MileIQ is a software publishers company providing innovative solutions to businesses worldwide. With 6 employees across multiple locations, the company serves clients with cutting-edge technology and expert consultation.',
        domain: 'mileiq.com',
        status: 'acquired',
        departments: ['sales', 'marketing'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen']
      },
      {
        id: 'company-002',
        name: 'Hellweg Die Profi-Baumärkte',
        activityLevel: 'Medium',
        activityScore: 68,
        employees: '3.0k',
        employeeCount: 3000,
        location: 'Chicago, IL',
        revenue: '$590M',
        contacts: 7,
        unlockCost: 50,
        industry: 'E-commerce & Retail',
        description: 'Based in Chicago, IL, Hellweg Die Profi-Baumärkte specializes in e-commerce & retail solutions for mid-market and enterprise clients. The company\'s 3.0k-person team delivers scalable platforms and services to drive business growth.',
        domain: 'hellweg.de',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations', 'finance', 'hr', 'cs'],
        managementLevels: ['c-level', 'vp', 'director', 'manager', 'individual'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng', 'account-exec', 'customer-support', 'data-analytics']
      },
      {
        id: 'company-003',
        name: 'FresnoCo Schools',
        activityLevel: 'High',
        activityScore: 91,
        employees: '3.0k',
        employeeCount: 3000,
        location: 'Phoenix, AZ',
        revenue: '$276M',
        contacts: 7,
        unlockCost: 50,
        industry: 'Education',
        description: 'FresnoCo Schools is a leading provider in the education space, offering comprehensive solutions for modern enterprises. Headquartered in Phoenix, AZ, the company has grown to 3.0k employees serving customers globally.',
        domain: 'fcoe.org',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations', 'finance', 'hr', 'cs'],
        managementLevels: ['c-level', 'vp', 'director', 'manager', 'individual'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng', 'account-exec', 'customer-support', 'data-analytics']
      },
      {
        id: 'company-004',
        name: 'SwipeClock',
        activityLevel: 'High',
        activityScore: 82,
        employees: '76',
        employeeCount: 76,
        location: 'Boston, MA',
        revenue: '$18M',
        contacts: 3,
        unlockCost: 50,
        industry: 'Software Publishers',
        description: 'SwipeClock is a software publishers company providing innovative solutions to businesses worldwide. With 76 employees across multiple locations, the company serves clients with cutting-edge technology and expert consultation.',
        domain: 'swipeclock.com',
        status: 'acquired',
        departments: ['sales', 'marketing'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen']
      },
      {
        id: 'company-005',
        name: 'Cerner',
        activityLevel: 'High',
        activityScore: 94,
        employees: '15k',
        employeeCount: 15000,
        location: 'Boston, MA',
        revenue: '$3.2B',
        contacts: 8,
        unlockCost: 50,
        industry: 'Healthcare Technology',
        description: 'Based in Boston, MA, Cerner specializes in healthcare technology solutions for mid-market and enterprise clients. The company\'s 15k-person team delivers scalable platforms and services to drive business growth.',
        domain: 'cerner.com',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations', 'finance', 'hr', 'cs'],
        managementLevels: ['c-level', 'vp', 'director', 'manager', 'individual'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng', 'account-exec', 'customer-support', 'data-analytics']
      },
      {
        id: 'company-006',
        name: 'Media Booth',
        activityLevel: 'High',
        activityScore: 88,
        employees: '31',
        employeeCount: 31,
        location: 'Los Angeles, CA',
        revenue: '$6.2M',
        contacts: 3,
        unlockCost: 50,
        industry: 'Marketing & Advertising',
        description: 'Media Booth is a leading provider in the marketing & advertising space, offering comprehensive solutions for modern enterprises. Headquartered in Los Angeles, CA, the company has grown to 31 employees serving customers globally.',
        domain: 'mediabooth.com.au',
        status: 'operating',
        departments: ['sales', 'marketing'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen']
      },
      {
        id: 'company-007',
        name: 'Infogain',
        activityLevel: 'Medium',
        activityScore: 71,
        employees: '3.0k',
        employeeCount: 3000,
        location: 'New York, NY',
        revenue: '$522M',
        contacts: 7,
        unlockCost: 50,
        industry: 'Professional Services',
        description: 'Infogain is a professional services company providing innovative solutions to businesses worldwide. With 3.0k employees across multiple locations, the company serves clients with cutting-edge technology and expert consultation.',
        domain: 'infogain.com',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations', 'finance', 'hr', 'cs'],
        managementLevels: ['c-level', 'vp', 'director', 'manager', 'individual'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng', 'account-exec', 'customer-support', 'data-analytics']
      },
      {
        id: 'company-008',
        name: 'Fueled',
        activityLevel: 'Medium',
        activityScore: 57,
        employees: '76',
        employeeCount: 76,
        location: 'San Francisco, CA',
        revenue: '$21M',
        contacts: 3,
        unlockCost: 50,
        industry: 'Software Publishers',
        description: 'Based in San Francisco, CA, Fueled specializes in software publishers solutions for mid-market and enterprise clients. The company\'s 76-person team delivers scalable platforms and services to drive business growth.',
        domain: 'fueled.be',
        status: 'operating',
        departments: ['sales', 'marketing'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen']
      },
      {
        id: 'company-009',
        name: 'BIM360',
        activityLevel: 'High',
        activityScore: 85,
        employees: '176',
        employeeCount: 176,
        location: 'San Francisco, CA',
        revenue: '$38M',
        contacts: 4,
        unlockCost: 50,
        industry: 'Software Publishers',
        description: 'BIM360 is a leading provider in the software publishers space, offering comprehensive solutions for modern enterprises. Headquartered in San Francisco, CA, the company has grown to 176 employees serving customers globally.',
        domain: 'bim360.com',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations'],
        managementLevels: ['c-level', 'vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng']
      },
      {
        id: 'company-010',
        name: 'IFX Networks',
        activityLevel: 'Medium',
        activityScore: 62,
        employees: '750',
        employeeCount: 750,
        location: 'Austin, TX',
        revenue: '$201M',
        contacts: 6,
        unlockCost: 50,
        industry: 'Software Publishers',
        description: 'IFX Networks is a software publishers company providing innovative solutions to businesses worldwide. With 750 employees across multiple locations, the company serves clients with cutting-edge technology and expert consultation.',
        domain: 'ifxcorp.com',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations', 'finance', 'hr', 'cs'],
        managementLevels: ['c-level', 'vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng', 'account-exec', 'customer-support', 'data-analytics']
      },
      {
        id: 'company-011',
        name: 'JM Financial Services',
        activityLevel: 'Low',
        activityScore: 43,
        employees: '375',
        employeeCount: 375,
        location: 'New York, NY',
        revenue: '$145M',
        contacts: 5,
        unlockCost: 50,
        industry: 'Financial Services',
        description: 'Based in New York, NY, JM Financial Services specializes in financial services solutions for mid-market and enterprise clients. The company\'s 375-person team delivers scalable platforms and services to drive business growth.',
        domain: 'jmfinancialservices.in',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations', 'finance', 'hr', 'cs'],
        managementLevels: ['c-level', 'vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng', 'account-exec', 'customer-support', 'data-analytics']
      },
      {
        id: 'company-012',
        name: 'Europe Express',
        activityLevel: 'High',
        activityScore: 79,
        employees: '176',
        employeeCount: 176,
        location: 'Chicago, IL',
        revenue: '$30M',
        contacts: 4,
        unlockCost: 50,
        industry: 'Professional Services',
        description: 'Europe Express is a leading provider in the professional services space, offering comprehensive solutions for modern enterprises. Headquartered in Chicago, IL, the company has grown to 176 employees serving customers globally.',
        domain: 'europeexpress.com',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations'],
        managementLevels: ['c-level', 'vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng']
      },
      {
        id: 'company-013',
        name: 'Law Ruler',
        activityLevel: 'Medium',
        activityScore: 66,
        employees: '31',
        employeeCount: 31,
        location: 'Austin, TX',
        revenue: '$6.8M',
        contacts: 3,
        unlockCost: 50,
        industry: 'Software Publishers',
        description: 'Law Ruler is a software publishers company providing innovative solutions to businesses worldwide. With 31 employees across multiple locations, the company serves clients with cutting-edge technology and expert consultation.',
        domain: 'lawruler.com',
        status: 'operating',
        departments: ['sales', 'marketing'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen']
      },
      {
        id: 'company-014',
        name: 'GBST',
        activityLevel: 'High',
        activityScore: 92,
        employees: '750',
        employeeCount: 750,
        location: 'Charlotte, NC',
        revenue: '$289M',
        contacts: 6,
        unlockCost: 50,
        industry: 'Financial Services',
        description: 'Based in Charlotte, NC, GBST specializes in financial services solutions for mid-market and enterprise clients. The company\'s 750-person team delivers scalable platforms and services to drive business growth.',
        domain: 'gbst.com',
        status: 'acquired',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations', 'finance', 'hr', 'cs'],
        managementLevels: ['c-level', 'vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng', 'account-exec', 'customer-support', 'data-analytics']
      },
      {
        id: 'company-015',
        name: 'iCan Benefit Group',
        activityLevel: 'Medium',
        activityScore: 54,
        employees: '176',
        employeeCount: 176,
        location: 'Dallas, TX',
        revenue: '$29M',
        contacts: 4,
        unlockCost: 50,
        industry: 'Professional Services',
        description: 'iCan Benefit Group is a leading provider in the professional services space, offering comprehensive solutions for modern enterprises. Headquartered in Dallas, TX, the company has grown to 176 employees serving customers globally.',
        domain: 'icanbenefit.com',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations'],
        managementLevels: ['c-level', 'vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng']
      },
      {
        id: 'company-016',
        name: 'Island Club',
        activityLevel: 'Low',
        activityScore: 38,
        employees: '76',
        employeeCount: 76,
        location: 'New York, NY',
        revenue: '$16M',
        contacts: 3,
        unlockCost: 50,
        industry: 'Professional Services',
        description: 'Island Club is a professional services company providing innovative solutions to businesses worldwide. With 76 employees across multiple locations, the company serves clients with cutting-edge technology and expert consultation.',
        domain: 'islandclub.com',
        status: 'operating',
        departments: ['sales', 'marketing'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen']
      },
      {
        id: 'company-017',
        name: 'MaxCDN',
        activityLevel: 'High',
        activityScore: 81,
        employees: '76',
        employeeCount: 76,
        location: 'Seattle, WA',
        revenue: '$22M',
        contacts: 3,
        unlockCost: 50,
        industry: 'Software Publishers',
        description: 'Based in Seattle, WA, MaxCDN specializes in software publishers solutions for mid-market and enterprise clients. The company\'s 76-person team delivers scalable platforms and services to drive business growth.',
        domain: 'maxcdn.com',
        status: 'closed',
        departments: ['sales', 'marketing'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen']
      },
      {
        id: 'company-018',
        name: '5p Consulting',
        activityLevel: 'Medium',
        activityScore: 59,
        employees: '31',
        employeeCount: 31,
        location: 'Toronto, Canada',
        revenue: '$5.1M',
        contacts: 3,
        unlockCost: 50,
        industry: 'Professional Services',
        description: '5p Consulting is a leading provider in the professional services space, offering comprehensive solutions for modern enterprises. Headquartered in Toronto, Canada, the company has grown to 31 employees serving customers globally.',
        domain: '5pconsulting.biz',
        status: 'operating',
        departments: ['sales', 'marketing'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen']
      },
      {
        id: 'company-019',
        name: 'Channel Factory',
        activityLevel: 'High',
        activityScore: 86,
        employees: '176',
        employeeCount: 176,
        location: 'New York, NY',
        revenue: '$35M',
        contacts: 4,
        unlockCost: 50,
        industry: 'Marketing & Advertising',
        description: 'Channel Factory is a marketing & advertising company providing innovative solutions to businesses worldwide. With 176 employees across multiple locations, the company serves clients with cutting-edge technology and expert consultation.',
        domain: 'channelfactory.com',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations'],
        managementLevels: ['c-level', 'vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng']
      },
      {
        id: 'company-020',
        name: 'Lipman Hearne',
        activityLevel: 'Medium',
        activityScore: 64,
        employees: '176',
        employeeCount: 176,
        location: 'Atlanta, GA',
        revenue: '$31M',
        contacts: 4,
        unlockCost: 50,
        industry: 'Professional Services',
        description: 'Based in Atlanta, GA, Lipman Hearne specializes in professional services solutions for mid-market and enterprise clients. The company\'s 176-person team delivers scalable platforms and services to drive business growth.',
        domain: 'lipmanhearne.com',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations'],
        managementLevels: ['c-level', 'vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng']
      },
      {
        id: 'company-021',
        name: 'BestReviews',
        activityLevel: 'High',
        activityScore: 77,
        employees: '76',
        employeeCount: 76,
        location: 'San Francisco, CA',
        revenue: '$25M',
        contacts: 3,
        unlockCost: 50,
        industry: 'E-commerce & Retail',
        description: 'BestReviews is a leading provider in the e-commerce & retail space, offering comprehensive solutions for modern enterprises. Headquartered in San Francisco, CA, the company has grown to 76 employees serving customers globally.',
        domain: 'bestreviews.com',
        status: 'acquired',
        departments: ['sales', 'marketing'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen']
      },
      {
        id: 'company-022',
        name: 'Ext JS',
        activityLevel: 'Low',
        activityScore: 47,
        employees: '176',
        employeeCount: 176,
        location: 'Boston, MA',
        revenue: '$48M',
        contacts: 4,
        unlockCost: 50,
        industry: 'Software Publishers',
        description: 'Ext JS is a software publishers company providing innovative solutions to businesses worldwide. With 176 employees across multiple locations, the company serves clients with cutting-edge technology and expert consultation.',
        domain: 'sencha.com',
        status: 'operating',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations'],
        managementLevels: ['c-level', 'vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng']
      },
      {
        id: 'company-023',
        name: 'Donatos Pizza',
        activityLevel: 'Medium',
        activityScore: 69,
        employees: '7.5k',
        employeeCount: 7500,
        location: 'New York, NY',
        revenue: '$2.4B',
        contacts: 8,
        unlockCost: 50,
        industry: 'E-commerce & Retail',
        description: 'Based in New York, NY, Donatos Pizza specializes in e-commerce & retail solutions for mid-market and enterprise clients. The company\'s 7.5k-person team delivers scalable platforms and services to drive business growth.',
        domain: 'donatos.com',
        status: 'acquired',
        departments: ['sales', 'marketing', 'engineering', 'product', 'operations', 'finance', 'hr', 'cs'],
        managementLevels: ['c-level', 'vp', 'director', 'manager', 'individual'],
        jobFunctions: ['business-dev', 'demand-gen', 'product-mgmt', 'software-eng', 'account-exec', 'customer-support', 'data-analytics']
      },
      {
        id: 'company-024',
        name: 'Gemini Mobile',
        activityLevel: 'High',
        activityScore: 95,
        employees: '76',
        employeeCount: 76,
        location: 'Austin, TX',
        revenue: '$19M',
        contacts: 3,
        unlockCost: 50,
        industry: 'Software Publishers',
        description: 'Gemini Mobile is a leading provider in the software publishers space, offering comprehensive solutions for modern enterprises. Headquartered in Austin, TX, the company has grown to 76 employees serving customers globally.',
        domain: 'geminimobile.com',
        status: 'operating',
        departments: ['sales', 'marketing'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen']
      },
      {
        id: 'company-025',
        name: 'CampusU',
        activityLevel: 'High',
        activityScore: 83,
        employees: '31',
        employeeCount: 31,
        location: 'Raleigh, NC',
        revenue: '$3.5M',
        contacts: 3,
        unlockCost: 50,
        industry: 'Education',
        description: 'CampusU is an education company providing innovative solutions to businesses worldwide. With 31 employees across multiple locations, the company serves clients with cutting-edge technology and expert consultation.',
        domain: 'campusu.com',
        status: 'operating',
        departments: ['sales', 'marketing'],
        managementLevels: ['vp', 'director', 'manager'],
        jobFunctions: ['business-dev', 'demand-gen']
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
   * Mark a company as viewed
   */
  function markViewed(companyId) {
    const state = get();
    if (!state.viewedCompanies) state.viewedCompanies = [];
    if (!state.viewedCompanies.includes(companyId)) {
      state.viewedCompanies.push(companyId);
      save(state);
    }
  }

  /**
   * Check if a company has been viewed
   */
  function isViewed(companyId) {
    const state = get();
    return (state.viewedCompanies || []).includes(companyId);
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
    updateCreditDisplay,
    markViewed,
    isViewed
  };
})();

// Auto-update credit display on page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    G2ActivateState.updateCreditDisplay();
  });
}
