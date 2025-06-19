import React, { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { STUDY_PLANS } from '../data/mockData'
import './StudyPlansScreen.css'

const StudyPlansScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('intermediate')

  return (
    <div className="study-plans-screen">
      <div className="screen-header">
        <h1 className="screen-title">Study Plans</h1>
      </div>
      
      <div className="plans-list">
        {STUDY_PLANS.map((plan) => (
          <button
            key={plan.id}
            className={`plan-item ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <div className="plan-radio">
              {selectedPlan === plan.id && (
                <CheckCircle size={20} className="check-icon" />
              )}
            </div>
            <div className="plan-details">
              <h3 className="plan-title">{plan.title}</h3>
              <p className="plan-time">{plan.timeStart} - {plan.timeEnd}</p>
              <p className="plan-duration">{plan.duration}</p>
              <div className="plan-subjects">
                {plan.subjects.map((subject, index) => (
                  <span key={index} className="subject-tag">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            <div className="plan-difficulty">
              <span className={`difficulty-badge ${plan.difficulty.toLowerCase()}`}>
                {plan.difficulty}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="plan-actions">
        <button className="secondary-button">
          Create Custom Plan
        </button>
        <button className="primary-button">
          Start Selected Plan
        </button>
      </div>
    </div>
  )
}

export default StudyPlansScreen