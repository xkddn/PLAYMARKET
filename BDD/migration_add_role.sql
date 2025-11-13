ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';
UPDATE users SET role = 'user' WHERE role IS NULL;
ALTER TABLE users ADD CONSTRAINT check_role CHECK (role IN ('user', 'admin'));
COMMENT ON COLUMN users.role IS 'Rôle de l''utilisateur : user ou admin';

