# TradeFinanceBlockChainExplorer


#Frontend

run "npm i" to install node modules 
run "npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss" to install tailwind css

run "npm run dev" to start server


#Backend

cd Backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

use postgres database `trade_finance` (default) or set custom `DATABASE_URL`

run migrations:
`alembic upgrade head`

seed sample users:
`python scripts/seed_sample_users.py`

validate role/org queries:
`python scripts/test_role_org_queries.py`

run "uvicorn main:app --reload" to run backend server
