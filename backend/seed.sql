-- Insert sample users
INSERT INTO users (name, email, password, address, role) VALUES
('Alice', 'alice@example.com', 'hashedpassword1', '123 Main St, Pune', 'user'),
('Bob', 'bob@example.com', 'hashedpassword2', '45 Market Rd, Mumbai', 'owner'),
('Charlie', 'charlie@example.com', 'hashedpassword3', '99 Tech Park, Nagpur', 'admin');

-- Insert sample stores
INSERT INTO stores (name, email, address) VALUES
('Tech Store', 'techstore@example.com', 'Pune'),
('Food Plaza', 'foodplaza@example.com', 'Mumbai'),
('Book Haven', 'bookhaven@example.com', 'Nagpur');

-- Insert sample ratings
INSERT INTO ratings (rating, user_id, store_id) VALUES
(5, 1, 1), -- Alice rates Tech Store
(4, 1, 2), -- Alice rates Food Plaza
(3, 2, 2), -- Bob rates Food Plaza
(5, 2, 3), -- Bob rates Book Haven
(4, 3, 1); -- Charlie rates Tech Store
