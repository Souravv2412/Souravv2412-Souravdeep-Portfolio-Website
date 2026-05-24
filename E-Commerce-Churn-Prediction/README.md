# E-Commerce Customer Churn Prediction

This project analyzes churn behavior on an imbalanced e-commerce dataset (16.8% churn rate) and builds predictive models to prioritize retention actions.

## Key Performance Framing

- Primary business metric: `52% churner recall` (catching about half of future churners for intervention).
- Supporting metrics: `AUC 0.88`, `89.3% overall accuracy`.
- Note on accuracy: in imbalanced churn datasets, accuracy alone can be misleading, so recall and AUC are emphasized.

## Model Comparison Scope

- Published benchmark in this project compares:
  - `Decision Tree` (non-linear, explainable rules)
  - `Logistic Regression` (interpretable baseline)
- `XGBoost` and `LightGBM` are planned next-step benchmarks and were not included in the current published results.

## Business Impact Interpretation

- Retention impact and financial values in this project are presented as `illustrative projections`.
- Projections depend on assumptions such as:
  - intervention success rates
  - average customer lifetime value
  - campaign execution quality
- These values should be treated as planning scenarios, not audited financial outcomes.

## Core Insights

- Highest churn risk appears in early tenure (0-3 months).
- Complaint behavior is a strong churn signal.
- Cashback and engagement patterns help identify hidden-risk segments.

