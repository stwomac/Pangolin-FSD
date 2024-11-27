/******* Remove existing schema *******/
-- Drop all tables (in reverse order of reliances)
DROP TABLE IF EXISTS annotation;
DROP TABLE IF EXISTS context;
DROP TABLE IF EXISTS context_type;
DROP TABLE IF EXISTS report;
DROP TABLE IF EXISTS person;
-- Drop types
DROP TYPE IF EXISTS report_type_enum;
DROP TYPE IF EXISTS payment_method_enum;

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

-- Create the person table with auto-incrementing user_id
CREATE TABLE person (
    user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(50) NOT NULL,
    pass_hash VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create the context_type table
CREATE TABLE context_type (
    context_type_id INT PRIMARY KEY NOT NULL,
    context_name VARCHAR(100) NOT NULL,
    report_type REPORT_TYPE_ENUM NOT NULL
);
-- Create the report table with auto-incrementing report_id
CREATE TABLE report (
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
    FOREIGN KEY (reportee_id) REFERENCES person(user_id)
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
	FOREIGN KEY (report_id) REFERENCES report(report_id),
    FOREIGN KEY (context_type) REFERENCES context_type(context_type_id)
);


-- Create the annotation table
CREATE TABLE annotation (
    annotation_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    annotation VARCHAR(500) NOT NULL,
	report_id INT NOT NULL,
	FOREIGN KEY (report_id) REFERENCES report(report_id)
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

-- Insert data into person table
INSERT INTO person (email, pass_hash, role) VALUES
('user@gmail.com', 'password', 'user'),
('anonymous@gmail.com', 'password',  'anonymous'),
('admin@gmail.com', 'admin', 'admin');

-- Insert more data into report table
INSERT INTO report (reportee_id, report_type, description, paid, amount, payment_method, recent_date, initial_date, is_sus, is_done)
VALUES
(1, 'HEALTH_SCAM', 'Claimed to sell fake weight loss supplements.', TRUE, 150.00, 'EFT', '2024-11-12', '2024-10-18', TRUE, FALSE),
(2, 'ONLINE_SHOPPING', 'Received counterfeit goods instead of what I ordered.', FALSE, 300.00, 'CASH', '2024-11-08', '2024-10-28', TRUE, TRUE),
(3, 'SWEEPSTAKES', 'Promised a fake lottery prize.', FALSE, 0.00, 'CHECK', NULL, NULL, FALSE, FALSE),
(1, 'CREDIT_SCAM', 'Pretended to be a credit repair service, charged upfront.', TRUE, 1000.00, 'BITCOIN', '2024-11-15', '2024-10-10', TRUE, TRUE),
(2, 'AUTO_SALE', 'Sold a used car with undisclosed damages.', TRUE, 5000.00, 'CHECK', '2024-11-20', '2024-10-30', TRUE, FALSE);

-- Insert more data into context table (some reports with multiple contexts, others with none)
INSERT INTO context (context_type, org_claim, first_name, last_name, street_address, city, zip, country, phone, report_id)
VALUES
(17, NULL, 'Alice', 'Wonder', '101 Dream Rd', 'Imaginetown', '98765', 'USA', '2223334444', 1), -- Single context for report 1
(22, 'OnlineShopFake', NULL, NULL, NULL, NULL, NULL, NULL, '1234567890', 2), -- Single context for report 2
(25, NULL, 'Bob', 'Smith', '789 Lucky Ln', 'SweepstakesCity', '56789', 'USA', NULL, 3), -- Multiple contexts for report 3
(6, 'CharityScam', NULL, NULL, NULL, NULL, NULL, NULL, '9876543210', 3),
(30, 'CreditFixers', 'John', 'Doe', '456 Credit St', 'Debtville', '54321', 'USA', '1231231234', 3),
(27, 'UsedAutoDeals', NULL, NULL, NULL, NULL, NULL, NULL, '5556667777', 4); -- Single context for report 4

-- Insert more data into annotation table (some reports with multiple annotations, others with none)
INSERT INTO annotation (annotation, report_id)
VALUES
('Ad claimed immediate weight loss but had no scientific backing.', 1), -- Single annotation for report 1
('Received wrong product with no refund option.', 2), -- Multiple annotations for report 2
('Email claimed I won a lottery without entering.', 2),
('Asked for my personal information to claim a prize.', 2),
('Promised to fix credit in days but scammed me.', 3), -- Single annotation for report 3
('Provided a fake vehicle history report.', 4), -- Multiple annotations for report 4
('Seller disappeared after the sale.', 4);

-- Print a success message
DO $$ BEGIN RAISE NOTICE 'Additional data inserted into the database successfully!'; END $$;