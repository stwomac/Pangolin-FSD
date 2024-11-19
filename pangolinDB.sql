    
-- Create tables in the specified order to satisfy foreign key dependencies

-- Create the type table
CREATE TABLE type (
    type_id INT PRIMARY KEY NOT NULL,
    type_name VARCHAR(100) NOT NULL
);

-- Create the users table with auto-incrementing user_id
CREATE TABLE users (
    user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(50) NOT NULL,
    pass_hash VARCHAR(50) NOT NULL,
    salt VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create the method table
CREATE TABLE method (
    method_id INT PRIMARY KEY NOT NULL,
    method_name VARCHAR(50) NOT NULL
);

-- Create the context_type table
CREATE TABLE context_type (
    context_type_id INT PRIMARY KEY NOT NULL,
    context_name VARCHAR(100) NOT NULL,
    type_id INT NOT NULL,
    FOREIGN KEY (type_id) REFERENCES type(type_id)
);
-- Create the reports table with auto-incrementing report_id
CREATE TABLE reports (
    report_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    reportee_id INT NOT NULL,
    type INT NOT NULL,
    description VARCHAR(2500) NOT NULL,
    paid BOOLEAN NOT NULL,
    amount MONEY NOT NULL,
    payment_method INT NOT NULL,
    recent_date DATE,
    initial_date DATE,
    is_sus BOOLEAN NOT NULL,
    is_done BOOLEAN NOT NULL,
    FOREIGN KEY (reportee_id) REFERENCES users(user_id),
    FOREIGN KEY (type) REFERENCES type(type_id),
    FOREIGN KEY (payment_method) REFERENCES method(method_id)
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

-- Insert data into type table
INSERT INTO type (type_id, type_name) VALUES
(0, 'Other'),
(1, 'Impersonator'),
(2, 'Job, investment, money making opportunity, franchise'),
(3, 'Phone, internet, TV service'),
(4, 'Health (ex. weightloss, eye care, treatment)'),
(5, 'Just an annoying call'),
(6, 'Online Shopping'),
(7, 'Sweepstakes, prize, lottery'),
(8, 'Auto sale, repair'),
(9, 'Credit, debt, loan');

-- Insert data into context_type table
INSERT INTO context_type (context_type_id, context_name, type_id) VALUES
(0, 'None/Other', 1),
(1, 'Government authority or agency', 1),
(2, 'Grandchild, family member, friend', 1),
(3, 'Your boss or co-worker', 1),
(4, 'Well-known or trusted business', 1),
(5, 'Love interest', 1),
(6, 'Charity or charitable cause', 2),
(7, 'Investment/seminar', 2),
(8, 'Program for self/employ or start business', 2),
(9, 'Franchise', 2),
(10, 'Job scam, job listing or employment service', 2),
(11, 'Pyramid scheme', 2),
(12, 'Computer tech support service', 3),
(13, 'Internet service', 3),
(14, 'Privacy or data security concern', 3),
(15, 'Cellular or landline phone service', 3),
(16, 'TV Service', 3),
(17, 'Weight loss product or plan', 4),
(18, 'Eye care', 4),
(19, 'Any other health care problem', 4),
(20, 'Fake or misleading medical treatment', 4),
(21, 'Pretending to be working with government health agency (Medicare, Medicaid)', 4),
(22, 'Problem with online purchase or sale', 6),
(23, 'Someone pretending to be a well-known online seller', 6),
(24, 'Vacation or cruise', 7),
(25, 'Money or prize', 7),
(26, 'New auto sales experience', 8),
(27, 'Auto parts or repair', 8),
(28, 'Used auto sales experience', 8),
(29, 'Auto warranty', 8),
(30, 'Credit repair, debt relief (including student loan debt relief)', 9),
(31, 'Debt collection, credit card, credit reporting, or banking', 9),
(32, 'Company charging fees to get a loan or credit card', 9);

-- Insert data into users table
INSERT INTO users (email, pass_hash, salt, role) VALUES
('user@gmail.com', 'password', '', 'user'),
('anonymous@gmail.com', 'password', '', 'anonymous'),
('admin@gmail.com', 'admin', '', 'admin');

-- Insert data into method table
INSERT INTO method (method_id, method_name) VALUES
(1, 'Cash'),
(2, 'Check'),
(3, 'Bitcoin'),
(4, 'EFT');

-- Print a success message
DO $$ BEGIN RAISE NOTICE 'Database schema created and populated successfully!'; END $$;
