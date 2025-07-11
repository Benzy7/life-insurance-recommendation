from core.models import Recommendation
from decimal import Decimal

def generate_recommendation(data):
    age = data["age"]
    risk = data["risk"]
    income = Decimal(data["income"])
    dependents = data["dependents"]

    # Calculate base coverage amount (10x annual income, capped at $1M)
    base_coverage = min(income * 10, Decimal('1000000'))
    
    # Adjust coverage based on dependents (+$100k per dependent)
    adjusted_coverage = base_coverage + (Decimal(dependents) * Decimal('100000'))
    
    # Risk multiplier (higher risk = higher coverage)
    risk_multiplier = {
        'low': Decimal('0.8'),
        'medium': Decimal('1.0'),
        'high': Decimal('1.5')
    }.get(risk.lower(), Decimal('1.0'))
    
    final_coverage = adjusted_coverage * risk_multiplier
    
    # Determine plan type based on age and risk
    if age < 30:
        if risk == 'high':
            plan_type = "Term Life"
            term_years = 30
        else:
            plan_type = "Term Life"
            term_years = 20
    elif age < 50:
        if risk == 'low' and income > 100000:
            plan_type = "Universal Life"
            term_years = None
        else:
            plan_type = "Term Life"
            term_years = 20
    else:
        plan_type = "Whole Life"
        term_years = None
    
    # Format the plan description
    if term_years:
        plan_desc = f"{plan_type} – ${final_coverage:,.0f} for {term_years} years"
    else:
        plan_desc = f"{plan_type} – ${final_coverage:,.0f} for life"
    
    # Add detailed explanation
    explanation = (
        f"After analyzing your profile, we've developed a customized insurance recommendation. "
        f"Using standard financial planning principles, Our comprehensive assessment recommends: {plan_desc}. This plan balances protection with "
        f"affordability while accounting for your life stage and financial obligations."
    )
    # Save
    Recommendation.objects.create(
        age=age,
        income=income,
        dependents=dependents,
        risk=risk,
        plan=plan_desc,
        explanation=explanation,
    )
    
    return {
        "recommended_plan": plan_desc,
        "coverage_amount": str(final_coverage),
        "plan_type": plan_type,
        "reason": explanation,
    }