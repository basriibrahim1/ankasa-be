-- Active: 1682482660362@@149.129.241.190@5432@basri02@public


CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    photo VARCHAR DEFAULT 'https://res.cloudinary.com/dhzw6m9xs/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682492268/user_angkasa/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5_gxia8e.jpg',
    phone VARCHAR,
    address VARCHAR,
    city VARCHAR,
    country VARCHAR,
    postal_code VARCHAR,
    verification INT DEFAULT 0,
    role VARCHAR DEFAULT 'user',
    OTP VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE users;


CREATE TABLE ticket(
    id SERIAL PRIMARY KEY,
    users_id VARCHAR REFERENCES users(id),
    transit VARCHAR NOT NULL,
    facilities VARCHAR NOT NULL,
    departure_time VARCHAR NOT NULL,
    time_arrived VARCHAR NOT NULL,
    price VARCHAR NOT NULL,
    stock INT NOT NULL,
    airlines_class VARCHAR NOT NULL,
    schedule TIMESTAMP NOT NULL NOT NULL,
    gate VARCHAR NOT NULL,
    terminal VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL
);


ALTER TABLE ticket_booking ADD status VARCHAR DEFAULT 'Waiting for payment';


CREATE TABLE ticket_booking(
    id SERIAL PRIMARY KEY,
    users_id VARCHAR REFERENCES users(id),
    ticket_id INT REFERENCES ticket(id),
    created_at TIMESTAMP DEFAULT NOW()
);