CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    image_name VARCHAR(255),
    issued_month INT,
    issue_at_time DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bill_id INT NOT NULL,
    plan VARCHAR(255) NOT NULL,
    FOREIGN KEY (bill_id) REFERENCES bills(id)
);

CREATE TABLE charges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bill_id INT NOT NULL,
    charge VARCHAR(255) NOT NULL,
    FOREIGN KEY (bill_id) REFERENCES bills(id)
);
