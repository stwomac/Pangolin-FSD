<<<<<<< HEAD
/******* Remove existing schema *******/
-- Drop all tables (in reverse order of reliances)
DROP TABLE IF EXISTS annotation;
DROP TABLE IF EXISTS context;
DROP TABLE IF EXISTS context_type;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS users;
-- Drop types
DROP TYPE IF EXISTS report_type_enum;
DROP TYPE IF EXISTS payment_method_enum;
=======
-- Create tables in the specified order to satisfy foreign key dependencies
>>>>>>> origin/feat/password_hashing

/*************** Types ****************/
CREATE TYPE report_type_enum AS ENUM (
    'IMPERSONATOR',
    'JOB_OPPORTUNITY', -- Job, investment, money making opportunity, franchise
    'SERVICE_SCAM', -- Phone, internet, TV service
    'HEALTH_SCAM', -- Health (ex. weightloss, eye care, treatment)
    'ANNOYING_CALL', -- Just an annoying call
    'ONLINE_SHOPPING',
    'SWEEPSTAKES', -- Sweepstakes, prize, lottery
    'AUTO_SALE', -- Auto sale, repair
    'CREDIT_SCAM', -- Credit, debt, loan
    'OTHER'
);

CREATE TYPE payment_method_enum AS ENUM (
    'CASH',
    'CHECK',
    'BITCOIN',
    'EFT'
);

/*************** TABLES ***************/
-- Create tables in the specified order to satisfy foreign key dependencies

-- Create the users table with auto-incrementing user_id
CREATE TABLE users (
    user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(50) NOT NULL,
    pass_hash VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- -- Create the method table
-- CREATE TABLE method (
--     method_id INT PRIMARY KEY NOT NULL,
--     method_name VARCHAR(50) NOT NULL
-- );

-- Create the context_type table
CREATE TABLE context_type (
    context_type_id INT PRIMARY KEY NOT NULL,
    context_name VARCHAR(100) NOT NULL,
    report_type REPORT_TYPE_ENUM NOT NULL
);
-- Create the reports table with auto-incrementing report_id
CREATE TABLE reports (
    report_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    reportee_id INT NOT NULL,
    report_type REPORT_TYPE_ENUM NOT NULL,
    description VARCHAR(2500) NOT NULL,
    paid BOOLEAN NOT NULL,
    amount MONEY NOT NULL,
    payment_method PAYMENT_METHOD_ENUM NOT NULL,
    recent_date DATE,
    initial_date DATE,
    is_sus BOOLEAN NOT NULL,
    is_done BOOLEAN NOT NULL,
    FOREIGN KEY (reportee_id) REFERENCES users(user_id)
);

-- Create the context table with auto-incrementing context_id
CREATE TABLE context (
    context_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    context_type INT NOT NULL,
    org_claim VARCHAR(50),
    first_name VARCHAR(35),
    last_name VARCHAR(35),
    street_address VARCHAR(70),
    city VARCHAR(50),
    zip VARCHAR(5),
    country VARCHAR(50),
    phone VARCHAR(10),
	report_id INT NOT NULL,
	FOREIGN KEY (report_id) REFERENCES reports(report_id),
    FOREIGN KEY (context_type) REFERENCES context_type(context_type_id)
);


-- Create the annotation table
CREATE TABLE annotation (
    annotation_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    annotation VARCHAR(500) NOT NULL,
	report_id INT NOT NULL,
	FOREIGN KEY (report_id) REFERENCES reports(report_id)
);

/************ INSERT DATA *************/
-- Insert data into context_type table
INSERT INTO context_type (context_type_id, context_name, report_type) VALUES
(0, 'None/Other', 'OTHER'),
(1, 'Government authority or agency', 'IMPERSONATOR'),
(2, 'Grandchild, family member, friend', 'IMPERSONATOR'),
(3, 'Your boss or co-worker', 'IMPERSONATOR'),
(4, 'Well-known or trusted business', 'IMPERSONATOR'),
(5, 'Love interest', 'IMPERSONATOR'),
(6, 'Charity or charitable cause', 'JOB_OPPORTUNITY'),
(7, 'Investment/seminar', 'JOB_OPPORTUNITY'),
(8, 'Program for self/employ or start business', 'JOB_OPPORTUNITY'),
(9, 'Franchise', 'JOB_OPPORTUNITY'),
(10, 'Job scam, job listing or employment service', 'JOB_OPPORTUNITY'),
(11, 'Pyramid scheme', 'JOB_OPPORTUNITY'),
(12, 'Computer tech support service', 'SERVICE_SCAM'),
(13, 'Internet service', 'SERVICE_SCAM'),
(14, 'Privacy or data security concern', 'SERVICE_SCAM'),
(15, 'Cellular or landline phone service', 'SERVICE_SCAM'),
(16, 'TV Service', 'SERVICE_SCAM'),
(17, 'Weight loss product or plan', 'HEALTH_SCAM'),
(18, 'Eye care', 'HEALTH_SCAM'),
(19, 'Any other health care problem', 'HEALTH_SCAM'),
(20, 'Fake or misleading medical treatment', 'HEALTH_SCAM'),
(21, 'Pretending to be working with government health agency (Medicare, Medicaid)', 'HEALTH_SCAM'),
(22, 'Problem with online purchase or sale', 'ONLINE_SHOPPING'),
(23, 'Someone pretending to be a well-known online seller', 'ONLINE_SHOPPING'),
(24, 'Vacation or cruise', 'SWEEPSTAKES'),
(25, 'Money or prize', 'SWEEPSTAKES'),
(26, 'New auto sales experience', 'AUTO_SALE'),
(27, 'Auto parts or repair', 'AUTO_SALE'),
(28, 'Used auto sales experience', 'AUTO_SALE'),
(29, 'Auto warranty', 'AUTO_SALE'),
(30, 'Credit repair, debt relief (including student loan debt relief)', 'CREDIT_SCAM'),
(31, 'Debt collection, credit card, credit reporting, or banking', 'CREDIT_SCAM'),
(32, 'Company charging fees to get a loan or credit card', 'CREDIT_SCAM');

-- Insert data into users table
INSERT INTO users (email, pass_hash, role) VALUES
('user@gmail.com', 'password', 'user'),
('anonymous@gmail.com', 'password',  'anonymous'),
('admin@gmail.com', 'admin', 'admin');



INSERT INTO reports (
    reportee_id,
    report_type,
    description,
    paid,
    amount,
    payment_method,
    recent_date,
    initial_date,
    is_sus,
    is_done
) VALUES
(2, 'IMPERSONATOR', 'Reported an impersonator claiming to be from the IRS.', false, 0.00, 'BITCOIN', '2024-11-20', '2024-11-15', false, false),
(2, 'SERVICE_SCAM', 'Internet service provider charged for services not provided.', true, 120.00, 'EFT', '2024-11-18', '2024-10-01', false, false),
(2, 'HEALTH_SCAM', 'Purchased a weight loss plan online that turned out to be fraudulent.', true, 250.00, 'EFT', '2024-11-19', '2024-10-15', false, false),
(2, 'JOB_OPPORTUNITY', 'Invested in a pyramid scheme disguised as a job seminar.', false, 0.00, 'CASH', '2024-11-21', '2024-11-01', false, false),
(2, 'ONLINE_SHOPPING', 'Encountered an issue with an online shopping transaction.', true, 45.99, 'EFT', '2024-11-20', '2024-10-10', false, false),
(2, 'SWEEPSTAKES', 'Received a call claiming I won a cruise but required payment upfront.', false, 0.00, 'BITCOIN', '2024-11-18', '2024-10-28', false, false),
(2, 'AUTO_SALE', 'Auto repair shop charged for services not completed.', true, 550.00, 'EFT', '2024-11-20', '2024-10-12', false, false),
(2, 'CREDIT_SCAM', 'Scammed by a fake credit repair company.', false, 0.00, 'CASH', '2024-11-19', '2024-11-05', false, false);

INSERT INTO context (
context_type,
org_claim,
first_name,
last_name,
street_address,
city,
zip,
country,
phone,
report_id
) VALUES
-- Context for Report 1 (Impersonator)
(1, 'IRS', NULL, NULL, NULL, NULL, NULL, 'USA', '8005551234', 1),

-- Context for Report 2 (Internet service issue)
(13, 'ISP Co.', NULL, NULL, '123 Elm St', 'Somewhere', '12345', 'USA', '8005555678', 2),

-- Context for Report 3 (Fraudulent weight loss plan)
(17, 'QuickFit', NULL, NULL, NULL, NULL, NULL, 'USA', '8005558765', 3),

-- Context for Report 4 (Pyramid scheme investment seminar)
(7, 'Global Wealth Seminar', NULL, NULL, NULL, NULL, NULL, 'USA', NULL, 4),

-- Context for Report 5 (Online shopping issue)
(22, 'ShopFast', NULL, NULL, NULL, NULL, NULL, 'USA', '8005554321', 5),

-- Context for Report 6 (Cruise scam)
(24, 'Cruise Adventures', NULL, NULL, NULL, NULL, NULL, 'USA', '8005556789', 6),

-- Context for Report 7 (Auto repair issue)
(27, 'FixIt Auto', 'John', 'Doe', '456 Main St', 'CarCity', '54321', 'USA', '8005550987', 7),

-- Context for Report 8 (Credit repair scam)
(30, 'Credit Fixers', NULL, NULL, NULL, NULL, NULL, 'USA', '8005552345', 8);


-- Print a success message
DO $$ BEGIN RAISE NOTICE 'Database schema created and populated successfully!'; END $$;
