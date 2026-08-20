const defaultFeeData = [
  {
    id: 1,
    stage: 'Nursery – UKG',
    admissionFee: '₹25,000',
    tuitionFee: '₹12,500 / Month',
    annualFee: '₹15,000',
  },
  {
    id: 2,
    stage: 'Primary (Class 1 – 5)',
    admissionFee: '₹30,000',
    tuitionFee: '₹14,800 / Month',
    annualFee: '₹18,000',
  },
  {
    id: 3,
    stage: 'Middle (Class 6 – 8)',
    admissionFee: '₹35,000',
    tuitionFee: '₹17,200 / Month',
    annualFee: '₹20,000',
  },
  {
    id: 4,
    stage: 'Senior (Class 9 – 12)',
    admissionFee: '₹40,000',
    tuitionFee: '₹19,500 / Month',
    annualFee: '₹24,000',
  },
]

export const getFeeStructure = () => {
  try {
    const stored = localStorage.getItem('greenwood_fee_structure')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (err) {
    console.error('Error reading fee structure from localStorage:', err)
  }
  return defaultFeeData
}

export const saveFeeStructure = (fees) => {
  try {
    localStorage.setItem('greenwood_fee_structure', JSON.stringify(fees))
    window.dispatchEvent(new Event('feesUpdated'))
  } catch (err) {
    console.error('Error saving fee structure to localStorage:', err)
  }
}

export default defaultFeeData
