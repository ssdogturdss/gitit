create table products (id uuid primary key default gen_random_uuid(), user_id uuid, image_url text, caption text, price int, category text, status text default 'draft', created_at timestamp default now());
create table drops (id uuid primary key default gen_random_uuid(), product_id uuid references products, live_at timestamp default now());
create table orders (id uuid primary key, product_id uuid, seller_id uuid, buyer_id uuid, amount int, created_at timestamp default now());
create table automations (user_id uuid primary key, auto_dm bool, auto_relist bool, auto_price_drop bool);
create bucket if not exists products with (public = true);