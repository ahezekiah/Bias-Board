DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS idols;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE idols (
    id SERIAL PRIMARY KEY,
    stage_name VARCHAR(100) NOT NULL,
    real_name VARCHAR(100),
    group_name VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    idol_id INTEGER NOT NULL REFERENCES idols(id) ON DELETE CASCADE,
    ranking INTEGER CHECK (ranking BETWEEN 1 AND 10),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, idol_id)
);

INSERT INTO idols (stage_name, real_name, group_name, position, image_url)
VALUES 
(
    'Jungkook',
    'Jeon Jung-kook',
    'BTS',
    'Main Vocalist',
    'https://cdn.shopify.com/s/files/1/0469/3927/5428/files/7788dc8fe991fcb8c684d1e462c7a61a.jpg?v=1724081793'
),
(
    'Jennie',
    'Kim Jennie',
    'BLACKPINK',
    'Rapper / Vocalist',
    'https://www.rollingstone.com/wp-content/uploads/2025/01/2409_JENNIE38564_highres-F-PC_-Cho-Gi-Seok-1.jpg'
),
(
    'Bang Chan',
    'Christopher Bang',
    'Stray Kids',
    'Leader / Producer',
    'https://assets.teenvogue.com/photos/61f2dd2fed95ef661a32349c/master/w_1600%2Cc_limit/NOEASY_BangChan_01.jpg'
),
(
    'Karina',
    'Yu Ji-min',
    'Aespa',
    'Leader / Rapper',
    'https://legacy.kpopping.com/f8/1/231112-aespa-Karina-Drama-at-Inkigayo-documents-1.jpeg'
),
(
    'Yeonjun',
    'Choi Yeon-jun',
    'TXT',
    'Rapper / Dancer',
    'https://cdn.shopify.com/s/files/1/0469/3927/5428/files/TXT-The-Name-Chapter-FREEFALL-3rd-Full-Album-Concept-Photos-documents-1_13.jpg?v=1733320183'
),
(
    'Nayeon',
    'Im Na-yeon',
    'TWICE',
    'Vocalist',
    'https://static.wikia.nocookie.net/nayeon/images/8/83/Nayeon_Profile_Picture_-_South_Korea.jpg/revision/latest?cb=20240904115809'
);

